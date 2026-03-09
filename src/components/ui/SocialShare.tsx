"use client";

import { Share2Icon } from "./Icons";

export function SocialShare() {
  const handleShare = () => {
    const text = "The Open Book: A Scientific Rationalization of Buddhism";
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
  };

  return (
    <div className="flex justify-center gap-6 pb-20 opacity-40 hover:opacity-100 transition-opacity">
      <button 
        onClick={handleShare} 
        className="text-stone-400 hover:text-green-500 flex items-center gap-2 text-xs uppercase tracking-widest cursor-pointer"
      >
        <Share2Icon className="w-4 h-4" /> Share via WhatsApp
      </button>
    </div>
  );
}