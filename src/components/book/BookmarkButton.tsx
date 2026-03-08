"use client";
import { Bookmark } from "lucide-react";
import { toggleBookmark } from "@/lib/actions";
import { useTransition } from "react";

export function BookmarkButton({ verseId, isBookmarked }: { verseId: string, isBookmarked: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button 
      onClick={() => startTransition(() => toggleBookmark(verseId))}
      disabled={isPending}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
        isBookmarked 
          ? "bg-gold border-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
          : "border-gold/30 text-gold hover:bg-gold/10"
      }`}
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      <span className="text-xs font-bold uppercase tracking-widest">
        {isBookmarked ? "Saved to Bookmarks" : "Bookmark Verse"}
      </span>
    </button>
  );
}