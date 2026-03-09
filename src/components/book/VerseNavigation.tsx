import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/Icons";

export function VerseNavigation({ currentNumber }: { currentNumber: number }) {
  const prev = currentNumber > 1 ? currentNumber - 1 : null;
  const next = currentNumber < 50 ? currentNumber + 1 : null;

  return (
    <div className="mt-20 grid grid-cols-2 gap-4 border-t border-gold/10 pt-10">
      {prev ? (
        <Link 
          href={`/book/chapter-${prev}`}
          className="group flex flex-col items-start p-4 rounded-lg border border-gold/5 hover:border-gold/20 transition-all bg-charcoal/20"
        >
          <span className="flex items-center text-[10px] text-stone-500 uppercase tracking-widest mb-2">
            <ChevronLeftIcon className="w-3 h-3 mr-1" /> Previous Verse
          </span>
          <span className="text-stone-300 font-serif group-hover:text-gold transition-colors">
            Verse {prev}
          </span>
        </Link>
      ) : <div />}

      {next ? (
        <Link 
          href={`/book/chapter-${next}`}
          className="group flex flex-col items-end p-4 rounded-lg border border-gold/5 hover:border-gold/20 transition-all bg-charcoal/20 text-right"
        >
          <span className="flex items-center text-[10px] text-stone-500 uppercase tracking-widest mb-2">
            Next Verse <ChevronRightIcon className="w-3 h-3 ml-1" />
          </span>
          <span className="text-stone-300 font-serif group-hover:text-gold transition-colors">
            Verse {next}
          </span>
        </Link>
      ) : <div />}
    </div>
  );
}