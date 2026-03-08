"use client";

import { useSearchParams } from "next/navigation";
import { highlightText } from "@/lib/utils";
import { IPProtector } from "./IPProtector";

interface Footnote {
  id: string;
  marker: string | null;
  content: string;
}

interface VerseProps {
  verseNumber: number;
  title: string;
  contentHtml: string;
  isIncomplete: boolean | null;
  footnotes: Footnote[];
}

export function VerseView({ verseNumber, title, contentHtml, isIncomplete, footnotes }: VerseProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  // Apply highlighting logic
  const highlightedContent = highlightText(contentHtml, query);

  return (
    <article className="animate-in fade-in duration-1000" suppressHydrationWarning>
      <header className="mb-16 text-center">
        <span className="text-gold text-xs uppercase tracking-[0.5em]">Verse {verseNumber}</span>
        <h1 className="text-3xl md:text-5xl font-serif text-gold mt-4">{title}</h1>
      </header>

      <IPProtector>
        <section className={isIncomplete ? 'incomplete-fragment' : ''}>
          <div 
            className="verse-content prose prose-invert prose-gold max-w-none text-stone-300 font-serif text-[18px] md:text-[21px] leading-[1.9] text-justify"
            dangerouslySetInnerHTML={{ __html: highlightedContent }} 
            suppressHydrationWarning
          />
        </section>
      </IPProtector>

      {footnotes.length > 0 && (
        <footer className="mt-24 pt-12 border-t border-gold/10">
          <h4 className="text-gold/40 font-sans text-[10px] uppercase tracking-[0.4em] mb-8">
            Footnotes & Commentary
          </h4>
          <ul className="space-y-6 list-none p-0">
            {footnotes.map((fn) => (
              <li key={fn.id} className="text-[15px] text-stone-500 font-serif leading-relaxed flex gap-4 italic group">
                <span className="text-gold/60 font-mono shrink-0 select-none">({fn.marker})</span>
                <span className="group-hover:text-stone-400 transition-colors">{fn.content}</span>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
}