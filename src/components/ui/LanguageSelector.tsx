"use client";

import { useEffect, useState } from "react";
import { LanguagesIcon } from "./Icons";
import { usePathname } from "next/navigation";

// Strict Interface for the Google Translate API
interface GoogleTranslateConfig {
  pageLanguage: string;
  layout: number;
  autoDisplay: boolean;
}

interface GoogleTranslateInstance {
  TranslateElement: new (options: GoogleTranslateConfig, elementId: string) => void;
  InlineLayout: { SIMPLE: number };
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: GoogleTranslateInstance;
    };
  }
}

export default function LanguageSelector() {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname(); // Detects navigation

  useEffect(() => {
    const initWidget = () => {
      // Check if the script has actually loaded the google object
      if (window.google?.translate?.TranslateElement) {
        const container = document.getElementById("google_translate_element");
        
        // Only initialize if the container is currently empty
        if (container && container.innerHTML === "") {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", layout: 0, autoDisplay: false },
            "google_translate_element"
          );
        }
        
        // Use a slight delay to trigger the fade-in animation
        setTimeout(() => setIsReady(true), 200);
      }
    };

    // Make the function available globally
    window.googleTranslateElementInit = initWidget;

    // Trigger initialization
    if (window.google?.translate) {
      initWidget();
    }
  }, [pathname]); // CRITICAL: Re-runs logic every time the page changes

  return (
    <div className="flex flex-col gap-3 p-1 animate-in fade-in duration-1000" suppressHydrationWarning>
      <div className="flex items-center gap-2 px-1">
        <LanguagesIcon className="w-3.5 h-3.5 text-gold/70" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 font-black">
          Global Reading Mode
        </span>
      </div>
      
      {/* The Target Container */}
      <div 
        id="google_translate_element" 
        className={`transition-all duration-700 border border-gold/10 rounded-lg bg-black/40 min-h-10.5 ${
          isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      />
      
      <style jsx global>{`
        /* Surgical removal of Google Branding and Clutter */
        .goog-logo-link, .goog-te-gadget span, .goog-te-banner-frame, 
        #goog-gt-tt, .goog-te-balloon-frame, .goog-te-gadget-icon,
        .goog-te-menu-value img, .goog-te-menu-value span:nth-child(3) {
          display: none !important;
        }
        
        /* Stop Google from breaking the layout */
        body { top: 0 !important; }
        .skiptranslate { display: block !important; }
        .goog-te-gadget { color: transparent !important; font-size: 0 !important; font-family: inherit !important; }

        /* Professional Premium Dropdown Styling */
        select.goog-te-combo {
          background-color: transparent !important;
          border: none !important;
          color: #d4af37 !important; /* Gold text */
          padding: 10px 12px !important;
          width: 100% !important;
          font-size: 11px !important;
          font-family: inherit !important;
          text-transform: uppercase !important;
          font-weight: 700 !important;
          letter-spacing: 0.1em !important;
          cursor: pointer !important;
          outline: none !important;
        }

        #google_translate_element:hover {
          border-color: rgba(212, 175, 55, 0.4) !important;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.05);
        }
      `}</style>
    </div>
  );
}