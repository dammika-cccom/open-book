import { db } from "@/db";
import { verses, footnotes, comments, users, bookmarks } from "@/db/schema";
import { asc, desc, eq, and, or, ilike } from "drizzle-orm";

/**
 * FETCH ALL VERSES (METADATA ONLY)
 * We removed contentHtml to keep the Cloudflare Worker under 3MB.
 */
export async function getAllVerses() {
  try {
    return await db.select({
      id: verses.id,
      verseNumber: verses.verseNumber,
      title: verses.title,
      slug: verses.slug,
      // contentHtml removed for size optimization
    })
    .from(verses)
    .orderBy(asc(verses.verseNumber));
  } catch (error) {
    console.error("Database Error (getAllVerses):", error);
    return [];
  }
}

/**
 * FETCH SINGLE VERSE + FOOTNOTES
 */
export async function getVerseBySlug(slug: string) {
  try {
    const result = await db.select().from(verses).where(eq(verses.slug, slug)).limit(1);
    if (!result[0]) return null;
    
    const verseData = result[0];
    const verseFootnotes = await db.select()
      .from(footnotes)
      .where(eq(footnotes.verseId, verseData.id))
      .orderBy(asc(footnotes.marker));
      
    return { ...verseData, footnotes: verseFootnotes };
  } catch (error) {
    console.error(`Database Error (getVerseBySlug):`, error);
    return null;
  }
}

/**
 * FETCH APPROVED COMMENTS FOR KNOWLEDGE BASE
 */
export async function getApprovedComments(verseId: string) {
  try {
    return await db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        userName: users.name,
        userRole: users.role,
      })
      .from(comments)
      .innerJoin(users, eq(comments.userId, users.id))
      .where(
        and(
          eq(comments.verseId, verseId), 
          eq(comments.isApproved, true)
        )
      )
      .orderBy(desc(comments.createdAt));
  } catch (error) {
    console.error("Database Error (getApprovedComments):", error);
    return [];
  }
}

/**
 * FETCH USER'S PERSONAL COMMENTS (FOR VAULT)
 */
export async function getUserComments(userId: string) {
  try {
    return await db
      .select({
        id: comments.id,
        content: comments.content,
        isApproved: comments.isApproved,
        createdAt: comments.createdAt,
        verseTitle: verses.title,
        verseSlug: verses.slug,
      })
      .from(comments)
      .innerJoin(verses, eq(comments.verseId, verses.id))
      .where(eq(comments.userId, userId))
      .orderBy(desc(comments.createdAt));
  } catch (error) {
    console.error("Database Error (getUserComments):", error);
    return [];
  }
}

/**
 * FETCH USER'S BOOKMARKS (FOR VAULT)
 */
export async function getUserBookmarks(userId: string) {
  try {
    return await db
      .select({
        bookmarkId: bookmarks.id,
        verseNumber: verses.verseNumber,
        title: verses.title,
        slug: verses.slug,
        savedAt: bookmarks.createdAt,
      })
      .from(bookmarks)
      .innerJoin(verses, eq(bookmarks.verseId, verses.id))
      .where(eq(bookmarks.userId, userId))
      .orderBy(desc(bookmarks.createdAt));
  } catch (error) {
    console.error("Database Error (getUserBookmarks):", error);
    return [];
  }
}

/**
 * GLOBAL SEARCH UTILITY (Server Side)
 */
export async function searchContent(query: string) {
  try {
    return await db.select()
      .from(verses)
      .where(
        or(
          ilike(verses.title, `%${query}%`),
          ilike(verses.contentHtml, `%${query}%`)
        )
      )
      .limit(10);
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
}