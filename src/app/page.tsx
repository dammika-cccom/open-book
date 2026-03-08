import Link from "next/link";
import { AuthButton } from "@/components/layout/AuthButton";
import { SocialShare } from "@/components/ui/SocialShare";
import { Scroll, BookOpen, Compass } from "lucide-react"; // Removed Heart
export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-obsidian flex flex-col items-center justify-center overflow-x-hidden">
      {/* Auth Button positioned top right */}
      <div className="absolute top-8 right-8 z-50">
        <AuthButton />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center px-6 py-20 max-w-5xl">
        <div className="h-px w-16 bg-gold/30 mx-auto mb-10" />
        <h1 className="text-6xl md:text-9xl font-serif text-gold tracking-tighter mb-4 drop-shadow-2xl">
          THE OPEN BOOK
        </h1>
        <p className="text-stone-500 uppercase tracking-[0.6em] text-xs mb-8">The Science of Buddhism</p>
        
        <p className="text-stone-400 max-w-2xl mx-auto font-serif italic text-xl md:text-2xl leading-relaxed mb-12">
          &quot;Dr. S. P. de Silva gave up medicine to spend 39 years in the pursuit of the understanding of the true nature of things.&quot;
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/foreword" className="px-10 py-4 border border-gold text-gold font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gold hover:text-black transition-all">
            Read Foreword
          </Link>
          <Link href="/book/chapter-1" className="px-10 py-4 bg-gold text-black font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            The 50 Verses
          </Link>
          <Link href="/author" className="px-10 py-4 border border-gold/10 text-stone-500 font-bold uppercase tracking-[0.2em] text-[10px] hover:text-gold transition-all">
            The Author
          </Link>
        </div>
      </div>

      {/* Requirement #7: Summarized Overview Blocks */}
      <div className="relative z-10 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mb-20">
        <div className="p-8 bg-white/2 border border-white/10 rounded-2xl hover:border-gold/30 transition-all duration-500 group">
          <Scroll className="w-6 h-6 text-gold/40 mb-6 group-hover:text-gold transition-colors" />
          <h3 className="text-gold font-serif text-xl mb-3">Scientific Rationalization</h3>
          <p className="text-stone-500 text-sm leading-[1.8] text-justify">
            A meticulous breakdown of Buddhist philosophy using logical deduction and empirical observation, removing the shroud of mysticism.
          </p>
        </div>

        <div className="p-8 bg-white/2 border border-white/10 rounded-2xl hover:border-gold/30 transition-all duration-500 group">
          <BookOpen className="w-6 h-6 text-gold/40 mb-6 group-hover:text-gold transition-colors" />
          <h3 className="text-gold font-serif text-xl mb-3">50 Verses of Insight</h3>
          <p className="text-stone-500 text-sm leading-[1.8] text-justify">
            Dr. S. P. de Silva&apos;s life work condensed into a sequential path of 50 verses covering the mind, matter, and cosmic evolution.
          </p>
        </div>

        <div className="p-8 bg-white/2 border border-white/10 rounded-2xl hover:border-gold/30 transition-all duration-500 group">
          <Compass className="w-6 h-6 text-gold/40 mb-6 group-hover:text-gold transition-colors" />
          <h3 className="text-gold font-serif text-xl mb-3">Knowledge Base</h3>
          <p className="text-stone-500 text-sm leading-[1.8] text-justify">
            An interactive platform where readers and contributors build a comprehensive understanding of existence for future generations.
          </p>
        </div>
      </div>

      <SocialShare />
    </main>
  );
}