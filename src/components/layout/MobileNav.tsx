"use client";

import { ChevronLeftIcon, ChevronRightIcon, ListIcon } from "../ui/Icons";
import Link from "next/link";

interface MobileNavProps {
  currentNumber: number;
}

export function MobileNav({ currentNumber }: MobileNavProps) {
  const prev = currentNumber > 1 ? currentNumber - 1 : null;
  const next = currentNumber < 50 ? currentNumber + 1 : null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-charcoal/90 backdrop-blur-lg border-t border-gold/10 px-6 py-4 flex items-center justify-between z-50">
      {/* Previous Button */}
      {prev ? (
        <Link 
          href={`/book/chapter-${prev}`} 
          className="text-gold p-2 hover:bg-gold/10 rounded-full transition-colors"
          aria-label="Previous Verse"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
      ) : (
        <div className="w-10" />
      )}

      {/* Middle Info & Menu Trigger */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 text-gold">
          <ListIcon className="w-4 h-4 opacity-50" /> {/* Now using the List icon */}
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
            Verse {currentNumber} / 50
          </span>
        </div>
      </div>

      {/* Next Button */}
      {next ? (
        <Link 
          href={`/book/chapter-${next}`} 
          className="text-gold p-2 hover:bg-gold/10 rounded-full transition-colors"
          aria-label="Next Verse"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Link>
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
}