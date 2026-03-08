import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Load environment variables immediately
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { db } from "../src/db/index";
import { verses, footnotes } from "../src/db/schema";
import { eq } from "drizzle-orm";
import sanitizeHtml from "sanitize-html";

interface WPPost {
  ID: string;
  post_title: string;
  post_content: string;
  post_name: string;
  post_status: string;
  post_type: string;
}

interface WPTable {
  type: string;
  name: string;
  data: WPPost[];
}

async function seed() {
  try {
    console.log("📂 Opening JSON data source...");
    const filePath = path.join(process.cwd(), "src/db/data/wp_data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const parsed: (WPTable | object)[] = JSON.parse(rawData);
    
    const wpTable = parsed.find((item): item is WPTable => 
      'type' in item && item.type === "table" && item.name === "wp_posts"
    );

    if (!wpTable) throw new Error("Could not find wp_posts table");

    const wpPosts = wpTable.data;
    
    // --- DEDUPLICATION LOGIC ---
    // We only want the latest version (highest ID) for each Verse Number
    const uniqueChapters = new Map<number, WPPost>();

    wpPosts.forEach((post) => {
      if (post.post_status === "publish" && post.post_type === "post" && post.post_title.toLowerCase().includes("chapter")) {
        const numMatch = post.post_title.match(/\d+/);
        const num = numMatch ? parseInt(numMatch[0]) : 0;
        
        if (num > 0) {
          const existing = uniqueChapters.get(num);
          // If this ID is higher than the one we have, replace it
          if (!existing || parseInt(post.ID) > parseInt(existing.ID)) {
            uniqueChapters.set(num, post);
          }
        }
      }
    });

    const chaptersToProcess = Array.from(uniqueChapters.values());
    console.log(`🚀 Starting migration of ${chaptersToProcess.length} unique chapters...`);

    for (const post of chaptersToProcess) {
      const numMatch = post.post_title.match(/\d+/);
      const verseNumber = parseInt(numMatch![0]);
      const forcedSlug = `chapter-${verseNumber}`;

      // 1. Regex Footnotes
      const footnoteRegex = /\*\((\d+)\)\s?-\s?([^\*<]+)/g;
      const foundFootnotes = [...post.post_content.matchAll(footnoteRegex)];

      // 2. Clean Content
      let cleanContent = post.post_content.replace(/\[\/?\w+[^\]]*\]/g, "");
      cleanContent = sanitizeHtml(cleanContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'table', 'tr', 'td', 'tbody', 'ol', 'ul', 'li', 'strong', 'u', 'p', 'br']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          'table': ['width'], 'td': ['width'], 'ol': ['start'], 'p': ['style']
        }
      });

      // 3. Upsert Verse
      const [insertedVerse] = await db.insert(verses).values({
        verseNumber: verseNumber,
        title: post.post_title,
        contentHtml: cleanContent,
        slug: forcedSlug, 
        isIncomplete: cleanContent.includes("???") || cleanContent.length < 300,
      }).onConflictDoUpdate({
        target: verses.verseNumber,
        set: { contentHtml: cleanContent, title: post.post_title, slug: forcedSlug }
      }).returning();

      // 4. CLEAN & INSERT FOOTNOTES
      // Crucial: delete existing footnotes for this verse before inserting 
      // to avoid duplicates from previous runs.
      if (insertedVerse) {
        await db.delete(footnotes).where(eq(footnotes.verseId, insertedVerse.id));
        
        for (const fn of foundFootnotes) {
          await db.insert(footnotes).values({
            verseId: insertedVerse.id,
            marker: fn[1],
            content: fn[2].trim(),
          });
        }
      }
      console.log(`✅ CHAPTER-${verseNumber} synced cleanly.`);
    }

    console.log("\n⭐ PHASE 3 SUCCESS: Cloud database is now clean and populated.");
    process.exit(0);

  } catch (error) {
    console.error("❌ ERROR:", error);
    process.exit(1);
  }
}

seed();