"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Maximize2 } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  caption: string;
}

export function HeritageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to load archive images:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  if (loading) {
    return (
      <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-3/4 bg-white/5 animate-pulse rounded-sm" />
        ))}
      </div>
    );
  }

  if (images.length === 0) return null;

  return (
    <section className="mt-32 space-y-16 border-t border-gold/10 pt-20">
      <div className="flex flex-col items-center gap-4 text-center">
        <Camera className="w-6 h-6 text-gold/30" />
        <h2 className="text-[11px] uppercase tracking-[0.5em] text-gold font-black">
          The Heritage Archive
        </h2>
        <p className="text-stone-500 font-serif italic text-sm max-w-md">
          A visual record of Dr. S. P. de Silva&apos;s journey and medical prestige.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {images.map((photo, idx) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group space-y-6"
            >
              {/* Image Container */}
              <div className="relative aspect-3/4 bg-charcoal overflow-hidden rounded-sm border border-gold/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Image 
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Modern Interaction: The Maximize Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gold/5 backdrop-blur-[2px]">
                   <div className="p-3 border border-gold/50 rounded-full bg-obsidian/80 text-gold shadow-2xl">
                      <Maximize2 className="w-5 h-5" /> 
                   </div>
                </div>

                {/* Aesthetic Framing */}
                <div className="absolute inset-0 border-0 group-hover:border border-gold/30 transition-all duration-700 pointer-events-none" />
              </div>

              {/* Requirement: Image name listed under the image */}
              <div className="text-center space-y-1 transform group-hover:-translate-y-2 transition-transform duration-500">
                <p className="text-[9px] text-gold uppercase tracking-[0.3em] font-black opacity-40">
                  Plate {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="text-[15px] text-stone-300 font-serif leading-relaxed italic px-4">
                  {photo.caption}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pt-10 flex justify-center">
         <div className="h-px w-24 bg-gold/10" />
      </div>
    </section>
  );
}