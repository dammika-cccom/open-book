"use client";
import { ArrowUp, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function GlobalTools() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-50 lg:bottom-10">
      <Link 
        href="/"
        className="p-3 bg-charcoal border border-gold/20 rounded-full text-gold hover:bg-gold hover:text-black transition-all shadow-lg"
        title="Back to Home"
      >
        <Home className="w-5 h-5" />
      </Link>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 bg-gold text-black rounded-full transition-all shadow-lg animate-in fade-in zoom-in duration-300 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}