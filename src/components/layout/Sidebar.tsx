"use client";

import Link from "next/link";
import React, { useState, useEffect, useMemo, useDeferredValue } from "react";
import { SearchIcon, XIcon, MenuIcon, BookMarkedIcon, LibraryIcon } from "../ui/Icons";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const LanguageSelector = dynamic(() => import("../ui/LanguageSelector"), { 
  ssr: false,
  loading: () => <div className="h-10 w-full bg-white/5 animate-pulse rounded-lg" />
});

interface VerseLink {
  id: string;
  verseNumber: number;
  title: string;
  slug: string;
  // contentHtml removed to save bundle weight
}

interface SidebarProps {
  verses: VerseLink[];
  children?: React.ReactNode;
}

export function Sidebar({ verses, children }: SidebarProps) {
  const params = useParams();
  const currentSlug = params?.slug as string;
  
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearch = useDeferredValue(searchTerm);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const filteredVerses = useMemo(() => {
    const term = deferredSearch.toLowerCase();
    return verses.filter((v) =>
      v.verseNumber.toString().includes(term) ||
      v.title.toLowerCase().includes(term)
    );
  }, [verses, deferredSearch]);

  if (!isMounted) {
    return (
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-gold/10 bg-charcoal lg:flex flex-col overflow-hidden z-70">
        <div className="p-6 border-b border-gold/5 bg-black/20 space-y-8">
           <div className="h-20 bg-white/5 animate-pulse rounded" />
        </div>
      </aside>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="lg:hidden fixed top-6 left-6 z-50 p-2.5 bg-gold rounded shadow-2xl active:scale-95 transition-transform"
      >
        <MenuIcon className="w-5 h-5 text-black" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-60 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-72 border-r border-gold/10 bg-charcoal flex flex-col overflow-hidden z-70 transition-transform duration-500 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`} suppressHydrationWarning>
        <button onClick={() => setIsOpen(false)} className="lg:hidden absolute top-4 right-4 text-stone-600 hover:text-gold transition-colors"><XIcon className="w-6 h-6" /></button>

        <div className="p-6 border-b border-gold/5 bg-black/20 space-y-8">
          <div className="scale-95 origin-left">{children}</div>
          <LanguageSelector />

          <Link href="/" className="group block outline-none" onClick={() => setIsOpen(false)}>
            <h1 className="text-xl font-bold tracking-tight text-gold uppercase font-serif group-hover:text-white transition-colors">The Open Book</h1>
            <p className="text-[10px] text-stone-500 uppercase tracking-[0.3em]">Dr. S. P. de Silva</p>
          </Link>

          <Link href="/book/my-bookmarks" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[10px] uppercase tracking-widest text-stone-400 hover:text-gold transition-all border border-gold/10 rounded-md bg-white/2">
            <BookMarkedIcon className="w-3.5 h-3.5" /> My Saved Verses
          </Link>

          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-700" />
            <input 
              type="text" 
              placeholder="Filter index..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full bg-black/60 border border-gold/10 rounded-lg py-3 pl-10 pr-4 text-xs text-stone-300 focus:outline-none focus:border-gold/30 font-sans tracking-wide" 
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1 bg-black/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)]">
          <div className="px-4 py-3 flex items-center gap-2 mb-2 opacity-30 border-b border-white/5">
            <LibraryIcon className="w-3 h-3 text-gold" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-black">Archive Index</span>
          </div>
          {filteredVerses.map((v) => (
            <Link 
              key={v.id} 
              href={`/book/${v.slug}${searchTerm ? `?search=${searchTerm}` : ""}`} 
              onClick={() => setIsOpen(false)} 
              className={`flex flex-col px-4 py-3 rounded-md transition-all border-l-2 ${
                currentSlug === v.slug ? "bg-gold/10 border-gold shadow-lg" : "border-transparent hover:bg-white/5"
              }`}
            >
              <span className={`text-[10px] uppercase font-bold tracking-widest ${currentSlug === v.slug ? "text-gold" : "text-stone-500"}`}>
                Verse {v.verseNumber} Chapter {v.verseNumber}
              </span>
              <span className={`truncate text-[11px] font-serif mt-1 ${currentSlug === v.slug ? "text-white" : "text-stone-400 opacity-60"}`}>
                {v.title.toLowerCase().replace(/chapter\s*\d+\s*/gi, "").trim() || "Untitled Segment"}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}