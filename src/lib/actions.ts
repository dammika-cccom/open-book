"use server";

import { auth, signIn, signOut } from "@/auth";
import { db } from "@/db";
import { bookmarks, comments, users } from "@/db/schema"; // Added users import
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * AUTHENTICATION ACTIONS
 */
export async function handleSignIn() {
  await signIn("google");
}

export async function handleSignOut() {
  await signOut();
}

/**
 * COMMENT SECURITY ACTIONS
 */
export async function submitComment(verseId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Authentication required.");

  const role = session.user.role;
  const words = content.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  if (role === "READER" && wordCount > 60) {
    throw new Error("Reader reflections are limited to 60 words.");
  }

  if (wordCount === 0) throw new Error("Comment cannot be empty.");

  await db.insert(comments).values({
    verseId,
    userId: session.user.id,
    content,
    isApproved: role === "ADMIN" || role === "CONTRIBUTOR", 
  });

  revalidatePath("/book/[slug]", "page");
}

/**
 * ROLE MANAGEMENT ACTIONS
 */
export async function requestUpgrade() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.update(users)
    .set({ requestingUpgrade: true })
    .where(eq(users.id, session.user.id));

  revalidatePath("/book/my-bookmarks");
}

export async function approveContributor(userId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Admin only");

  await db.update(users)
    .set({ role: "CONTRIBUTOR", requestingUpgrade: false })
    .where(eq(users.id, userId));

  revalidatePath("/admin");
}

export async function approveComment(commentId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Admin only");

  await db.update(comments)
    .set({ isApproved: true })
    .where(eq(comments.id, commentId));

  revalidatePath("/admin");
  revalidatePath("/book", "layout");
}

export async function deleteComment(commentId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Admin only");

  await db.delete(comments).where(eq(comments.id, commentId));
  revalidatePath("/admin");
}

/**
 * BOOKMARK ACTIONS
 */
export async function toggleBookmark(verseId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Authentication required.");

  const existing = await db.select().from(bookmarks).where(
    and(eq(bookmarks.userId, session.user.id), eq(bookmarks.verseId, verseId))
  ).limit(1);

  if (existing.length > 0) {
    await db.delete(bookmarks).where(eq(bookmarks.id, existing[0].id));
  } else {
    await db.insert(bookmarks).values({
      userId: session.user.id,
      verseId: verseId,
    });
  }
  revalidatePath("/book/[slug]", "page");
}

export async function removeBookmark(bookmarkId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  
  await db.delete(bookmarks).where(
    and(eq(bookmarks.id, bookmarkId), eq(bookmarks.userId, session.user.id))
  );
  revalidatePath("/book/my-bookmarks");
}

export async function deleteUserComment(commentId: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await db.delete(comments).where(
    and(eq(comments.id, commentId), eq(comments.userId, session.user.id))
  );
  revalidatePath("/book/my-bookmarks");
}
export async function toggleUserSuspension(userId: string) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Admin only");

  const [targetUser] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!targetUser) throw new Error("User not found");

  await db.update(users)
    .set({ isSuspended: !targetUser.isSuspended })
    .where(eq(users.id, userId));

  revalidatePath("/admin");
}