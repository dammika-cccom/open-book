import Link from "next/link";
import { MoveRight, ScrollText } from "lucide-react";

export default function BookIndexPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 lg:py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-8">
        <ScrollText className="w-12 h-12 text-gold/20 mx-auto" />
        
        <header className="space-y-4">
          <h2 className="text-stone-500 uppercase tracking-[0.4em] text-xs">The Digital Manuscript</h2>
          <h1 className="text-5xl md:text-6xl font-serif text-gold leading-tight">
            50 Verses on the <br />True Nature of Things
          </h1>
        </header>

        <div className="h-px w-24 bg-gold/20 mx-auto" />

        <div className="prose prose-invert prose-gold mx-auto text-stone-400 font-serif text-lg leading-relaxed italic">
          <p>
            &quot;The truth being the understanding of the true nature of things. 
            This is a scientific rationalization of Buddhism. 
            The OPEN BOOK is all of his life&apos;s work...&quot;
          </p>
        </div>

        <div className="pt-10 flex flex-col items-center gap-6">
          <Link 
            href="/book/chapter-1"
            className="flex items-center gap-4 bg-gold text-black px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all group"
          >
            Start with Verse 01
            <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
          
          <p className="text-[10px] text-stone-600 uppercase tracking-widest">
            Select a specific chapter from the sidebar to jump to a verse
          </p>
        </div>
      </div>
    </div>
  );
}