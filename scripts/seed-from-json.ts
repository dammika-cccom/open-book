import fs from "fs";
import path from "path";
import { db } from "../src/db/index";
import { verses, footnotes } from "../src/db/schema";
import { eq } from "drizzle-orm";
import sanitizeHtml from "sanitize-html";

/**
 * ARCHITECTURAL NOTE:
 * This script is designed to run LOCALLY. 
 * We do not import 'dotenv' here to keep the production bundle size under 3MB.
 * Run this using: npx tsx --env-file=.env.local scripts/seed-from-json.ts
 */

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
    // 1. Verify Environment
    if (!process.env.DATABASE_URL) {
      throw new Error("❌ DATABASE_URL is not set. Did you forget --env-file=.env.local?");
    }

    console.log("📂 Opening JSON data source...");
    
    // Path logic: We are in /scripts, JSON is in /scripts/data/
    const filePath = path.join(process.cwd(), "scripts/data/wp_data.json");
    
    if (!fs.existsSync(filePath)) {
        throw new Error(`❌ JSON file not found at: ${filePath}`);
    }

    const rawData = fs.readFileSync(filePath, "utf-8");
    const parsed: (WPTable | object)[] = JSON.parse(rawData);
    
    const wpTable = parsed.find((item): item is WPTable => 
      'type' in item && item.type === "table" && item.name === "wp_posts"
    );

    if (!wpTable) throw new Error("❌ Could not find wp_posts table in JSON");

    const wpPosts = wpTable.data;
    
    // 2. DEDUPLICATION LOGIC
    // WordPress exports often contain multiple revisions. We only take the LATEST ID per Chapter.
    const uniqueChapters = new Map<number, WPPost>();

    wpPosts.forEach((post) => {
      if (post.post_status === "publish" && post.post_type === "post" && post.post_title.toLowerCase().includes("chapter")) {
        const numMatch = post.post_title.match(/\d+/);
        const num = numMatch ? parseInt(numMatch[0]) : 0;
        
        if (num > 0) {
          const existing = uniqueChapters.get(num);
          if (!existing || parseInt(post.ID) > parseInt(existing.ID)) {
            uniqueChapters.set(num, post);
          }
        }
      }
    });

    const chaptersToProcess = Array.from(uniqueChapters.values());
    console.log(`🚀 Starting migration of ${chaptersToProcess.length} unique chapters to Neon Cloud...`);

    for (const post of chaptersToProcess) {
      const numMatch = post.post_title.match(/\d+/);
      const verseNumber = parseInt(numMatch![0]);
      const forcedSlug = `chapter-${verseNumber}`;

      // 3. Extract Footnotes using Regex
      const footnoteRegex = /\*\((\d+)\)\s?-\s?([^\*<]+)/g;
      const foundFootnotes = [...post.post_content.matchAll(footnoteRegex)];

      // 4. Clean Content (Remove WordPress shortcodes and specific styling)
      let cleanContent = post.post_content.replace(/\[\/?\w+[^\]]*\]/g, "");
      cleanContent = sanitizeHtml(cleanContent, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'table', 'tr', 'td', 'tbody', 'ol', 'ul', 'li', 'strong', 'u', 'p', 'br']),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          'table': ['width'], 'td': ['width'], 'ol': ['start'], 'p': ['style']
        }
      });

      // 5. Upsert Verse into Database
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

      // 6. Clean and Re-insert Footnotes to avoid duplicates
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
      console.log(`✅ Verse ${verseNumber} synced.`);
    }

    console.log("\n⭐ SUCCESS: Cloud database is now clean and populated.");
    process.exit(0);

  } catch (error) {
    console.error("❌ SEEDING ERROR:", error);
    process.exit(1);
  }
}

seed();