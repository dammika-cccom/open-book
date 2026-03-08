import { auth } from "@/auth";
import { getVerseBySlug, getApprovedComments } from "@/lib/queries";
import { VerseView } from "@/components/book/VerseView";
import { BookmarkButton } from "@/components/book/BookmarkButton";
import { CommentSection } from "@/components/book/CommentSection";
import { CommentList } from "@/components/book/CommentList";
import { VerseNavigation } from "@/components/book/VerseNavigation";
import { MobileNav } from "@/components/layout/MobileNav";
import { IPProtector } from "@/components/book/IPProtector";
import { db } from "@/db";
import { bookmarks } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function VersePage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const verse = await getVerseBySlug(slug);

  if (!verse) return notFound();

  const approvedReflections = await getApprovedComments(verse.id);

  let isBookmarked = false;
  if (session?.user?.id) {
    const bookmarkCheck = await db.select().from(bookmarks).where(
      and(eq(bookmarks.userId, session.user.id), eq(bookmarks.verseId, verse.id))
    ).limit(1);
    isBookmarked = bookmarkCheck.length > 0;
  }

  return (
    <div className="relative pb-32 lg:pb-12">
      {/* 1. TOP ACTION BAR (Moved OUTSIDE IPProtector to prevent hydration errors) */}
      <div className="flex justify-between items-center mb-12 border-b border-gold/10 pb-6" suppressHydrationWarning>
        <Link href="/foreword" className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest hover:text-gold transition-colors">
          <MoveLeft className="w-3 h-3" /> Foreword
        </Link>
        
        <div suppressHydrationWarning>
          {session ? (
            <BookmarkButton verseId={verse.id} isBookmarked={isBookmarked} />
          ) : (
            <div className="text-right">
               <span className="text-[9px] text-stone-600 uppercase block font-bold tracking-tighter">Sign in to save progress</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. PROTECTED CONTENT */}
      <IPProtector>
        <VerseView {...verse} />
        <CommentList comments={approvedReflections} />
      </IPProtector>

      {/* 3. INTERACTIVE SECTION */}
      {session && (
        <div className="select-text mt-12">
           <CommentSection verseId={verse.id} role={session.user.role} />
        </div>
      )}

      {/* 4. NAVIGATION */}
      <div className="hidden lg:block mt-24">
        <VerseNavigation currentNumber={verse.verseNumber} />
      </div>
      <MobileNav currentNumber={verse.verseNumber} />
    </div>
  );
}