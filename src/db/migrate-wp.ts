import { db } from "./index";
import { verses, footnotes } from "./schema";
import sanitizeHtml from "sanitize-html";

// This represents the data you will extract from your SQL/WP-JSON
const wpData = [
  {
    id: 566,
    title: "LET'S UNDERSTAND SCIENCE THE EINSTEIN'S WAY",
    content: `<ol start="3"><li><h3 style="text-align: center;">...</h3></li></ol>... *(1) - BACTERIA...`, // Paste your content here or load from JSON
    slug: "science-einstein-way",
    verseNumber: 3,
    isIncomplete: false 
  }
];

async function migrate() {
  console.log("🚀 Starting Migration...");

  for (const item of wpData) {
    // 1. Extract Footnotes using Regex: looks for *(1) - Text
    const footnoteRegex = /\*\((\d+)\)\s?-\s?([^\*]+)/g;
    const foundFootnotes = [...item.content.matchAll(footnoteRegex)];

    // 2. Clean HTML (Remove inline WP styles but keep structure)
    const cleanHtml = sanitizeHtml(item.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h3', 'h4']),
      allowedAttributes: {} // Removes style="..." attributes
    });

    // 3. Insert Verse
    const [insertedVerse] = await db.insert(verses).values({
      verseNumber: item.verseNumber,
      title: item.title,
      contentHtml: cleanHtml,
      slug: item.slug,
      isIncomplete: item.isIncomplete,
    }).returning();

    // 4. Insert Footnotes
    if (foundFootnotes.length > 0) {
      for (const fn of foundFootnotes) {
        await db.insert(footnotes).values({
          verseId: insertedVerse.id,
          marker: fn[1],
          content: fn[2].trim(),
        });
      }
    }
    
    console.log(`✅ Migrated Verse ${item.verseNumber}: ${item.title}`);
  }

  console.log("⭐ Migration Complete.");
  process.exit(0);
}

migrate().catch(err => {
  console.error("❌ Migration Failed:", err);
  process.exit(1);
});