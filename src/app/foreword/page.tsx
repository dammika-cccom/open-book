import Link from "next/link";
import { 
  MoveLeftIcon, 
  MoveRightIcon, 
  QuoteIcon 
} from "@/components/ui/Icons";

export default function ForewordPage() {
  return (
    <main className="min-h-screen bg-obsidian py-12 md:py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-1000">
        <Link href="/" className="text-gold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 hover:opacity-70 transition-all border border-gold/10 w-fit px-4 py-2 rounded-full bg-white/5">
          <MoveLeftIcon className="w-3 h-3" /> Back to Home
        </Link>
        
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif text-gold tracking-tight">Foreword</h1>
          <p className="text-stone-500 uppercase tracking-[0.4em] text-[10px] font-black">The Foundation of Truth</p>
        </header>

        <section className="relative group">
          <QuoteIcon className="absolute -top-8 -left-8 w-16 h-16 text-gold/5 rotate-12" />
          <div className="verse-content italic border-l border-gold/20 pl-8 text-stone-300 space-y-6 text-justify leading-loose">
            <p>
              My father Dr S. P. de Silva born in Sri Lanka in 1931 he was educated at trinity college kandy and excelled in all sports and was head prefect and vice captain cricket. He graduated from the Colombo medical college and after internship proceeded to England. 
            </p>
            <p>
              He was a consultant in physical medicine (what is now called rheumatology) at Guys hospital London in the 1960’s. He gave up medicine and spent 39 years in the pursuit of the TRUTH. The truth being the understanding of the true nature of things. 
            </p>
            <p>
              This is a scientific rationalization of Buddhism. <strong>The OPEN BOOK</strong> is all of his life’s work in 50 verses. This transcends all boundaries of religion and is truly a cosmic formula to understand our purpose of existence. 
            </p>
            <p>
              This is a lifetimes work painstakingly documented over time. It is my duty as a scientist and as his only child to share this with the world.
            </p>
            
            <div className="pt-8 not-italic">
              <p className="text-gold font-bold tracking-widest uppercase text-[11px]">Prof. Arjuna P. De Silva</p>
              <p className="text-stone-600 text-[10px] uppercase">Scientist & Custodian</p>
            </div>
          </div>
        </section>

        <div className="flex justify-center pt-10">
          <Link href="/book/chapter-1" className="bg-gold text-black px-12 py-4 font-bold uppercase tracking-[0.2em] text-[11px] flex items-center gap-4 hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] active:scale-95">
            Begin the 50 Verses <MoveRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}