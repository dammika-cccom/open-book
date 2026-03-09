import Link from "next/link";
import Image from "next/image";
import { 
  MoveLeftIcon, 
  QuoteIcon, 
  Share2Icon, 
  AwardIcon, 
  CalendarIcon 
} from "@/components/ui/Icons";
import { HeritageGallery } from "@/components/book/HeritageGallery";
import { IPProtector } from "@/components/book/IPProtector";
import { SocialShare } from "@/components/ui/SocialShare";

export default function AuthorPage() {
  return (
    <main className="min-h-screen bg-obsidian pb-32">
      <IPProtector>
        {/* Requirement #4: Hero space for Author Image */}
        <div className="relative h-[55vh] w-full flex items-center justify-center overflow-hidden border-b border-gold/10">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
          
          <div className="relative z-10 w-full max-w-lg flex flex-col items-center px-6 animate-in fade-in zoom-in duration-1000">
            <div className="w-56 h-72 md:w-72 md:h-96 border border-gold/20 bg-charcoal/50 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden rounded-sm group">
                 <Image 
                    src="/images/author/primary.jpg" 
                    alt="Dr. S. P. de Silva"
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
                    priority
                 />
                 <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-obsidian to-transparent z-10" />
            </div>
            <div className="absolute -bottom-16 md:-bottom-24 text-gold/3 font-serif text-[100px] md:text-[200px] select-none pointer-events-none tracking-tighter whitespace-nowrap uppercase">
              De Silva
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 -mt-6 relative z-20">
          <Link href="/" className="inline-flex items-center text-gold text-[10px] uppercase tracking-[0.3em] hover:text-white mb-20 transition-all border border-gold/20 px-6 py-2.5 rounded-full bg-obsidian shadow-2xl">
            <MoveLeftIcon className="mr-3 w-3.5 h-3.5" /> Library Home
          </Link>

          <div className="grid lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-24 items-start">
            
            <aside className="space-y-12 lg:sticky lg:top-12">
              <div className="space-y-2">
                <h1 className="text-5xl font-serif text-gold leading-tight tracking-tighter">Dr. S. P. de Silva</h1>
                <p className="text-stone-600 text-[10px] uppercase tracking-[0.4em] font-black">Sri Lanka | 1931 — 2024</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4 group">
                  <AwardIcon className="w-5 h-5 text-gold/40 mt-1" />
                  <div>
                    <h3 className="text-stone-300 text-xs uppercase tracking-widest font-bold mb-1">Medical Consultant</h3>
                    <p className="text-stone-500 text-xs leading-relaxed italic">Guys Hospital London, 1960s</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <CalendarIcon className="w-5 h-5 text-gold/40 mt-1" />
                  <div>
                    <h3 className="text-stone-300 text-xs uppercase tracking-widest font-bold mb-1">Inquiry Period</h3>
                    <p className="text-stone-500 text-xs leading-relaxed italic">39 Years in Pursuit of Truth</p>
                  </div>
                </div>
                <button className="flex items-center gap-3 text-gold/60 hover:text-gold transition-colors text-[10px] uppercase tracking-[0.2em] pt-4 cursor-pointer">
                  <Share2Icon className="w-4 h-4" /> Share Biography
                </button>
              </div>
            </aside>

            {/* Requirement #5: Professional Justified Content */}
            <section className="space-y-12">
              <div className="relative p-10 bg-white/2 border border-white/5 rounded-2xl shadow-inner">
                <QuoteIcon className="absolute -top-4 -left-4 w-10 h-10 text-gold/10" />
                <p className="text-xl md:text-2xl font-serif text-stone-300 italic leading-[1.8] text-justify tracking-wide">
                  &quot;The truth being the understanding of the true nature of things. 
                  This is a scientific rationalization of Buddhism.&quot;
                </p>
              </div>

              <div className="prose prose-invert prose-gold max-w-none">
                <div className="text-stone-400 font-serif text-lg md:text-[19px] leading-loose text-justify space-y-8 hyphens-auto">
                  <p>
                    Born in Sri Lanka in 1931, Dr. S.P. de Silva was educated at Trinity College, Kandy. 
                    An exceptional student and athlete, he embodied the holistic development of the human spirit—serving 
                    as Head Prefect and Vice Captain of Cricket. He later graduated from the 
                    Colombo Medical College before proceeding to England for advanced specialization.
                  </p>
                  <p>
                    He reached the height of clinical medicine as a consultant in physical medicine 
                    (Rheumatology) at Guy&apos;s Hospital, London during the 1960s. However, he recognized that 
                    the healing of the body was only a partial understanding of existence.
                  </p>
                  <p>
                    In a historic act of renunciation, he gave up his medical career to dedicate 39 years 
                    to the systematic analysis of reality. <strong>The Open Book</strong> condenses this lifetime 
                    of rigorous inquiry into 50 verses—a cosmic formula designed to enable future readers to 
                    comprehend the true nature of things.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Requirement #4: Integrated Gallery */}
          <HeritageGallery />
        </div>
      </IPProtector>
      <SocialShare />
    </main>
  );
}