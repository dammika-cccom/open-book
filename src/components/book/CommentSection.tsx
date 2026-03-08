"use client";
import { useState } from "react";
import { submitComment } from "@/lib/actions";

interface CommentSectionProps {
  verseId: string;
  role: string;
}

export function CommentSection({ verseId, role }: CommentSectionProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await submitComment(verseId, text);
      setText("");
      alert(role === "READER" ? "Comment submitted for admin review." : "Comment published.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 p-8 bg-charcoal/50 rounded-lg border border-gold/10">
      <h3 className="text-gold font-serif text-xl mb-6">Reflections</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={role === "READER" ? "Share a brief thought (max 60 words)..." : "Add your detailed view..."}
          className="w-full bg-black/50 border border-gold/20 rounded p-4 text-stone-300 font-serif focus:outline-none focus:border-gold/50 h-32 resize-none"
          required
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-gold text-black px-6 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-white disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit View"}
        </button>
      </form>
    </div>
  );
}