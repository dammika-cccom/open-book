import { auth } from "@/auth";
import { getUserBookmarks, getUserComments } from "@/lib/queries";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookMarked, MessageSquare, Calendar, Trash2, ShieldCheck, Trophy, AlertCircle } from "lucide-react";
import { requestUpgrade, removeBookmark, deleteUserComment, handleSignOut } from "@/lib/actions";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

//export const runtime = "nodejs";
export const runtime = "edge";

export default async function MyBookmarksPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  // 1. Fetch User Data with Safety Check
  const userResults = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);
  const userData = userResults[0];

  // Fix for the "role undefined" crash:
  if (!userData) {
    return (
      <div className="max-w-md mx-auto py-20 px-6 text-center space-y-4 font-serif">
        <AlertCircle className="w-12 h-12 text-gold/40 mx-auto" />
        <h2 className="text-xl text-gold">Identity Out of Sync</h2>
        <p className="text-stone-500 text-sm">Please refresh your session to register in this database.</p>
        <form action={handleSignOut}>
          <button type="submit" className="bg-gold text-black px-8 py-2 rounded-sm font-bold uppercase tracking-widest text-[10px]">Refresh</button>
        </form>
      </div>
    );
  }

  const savedVerses = await getUserBookmarks(session.user.id);
  const myComments = await getUserComments(session.user.id);

  const stats = [
    { label: "Saved", value: savedVerses.length, icon: BookMarked },
    { label: "Reflections", value: myComments.length, icon: MessageSquare },
    { label: "Level", value: userData.role, icon: ShieldCheck },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-1000">
      <header className="space-y-8">
        <h1 className="text-4xl font-serif text-gold tracking-tighter uppercase font-bold">My Personal Vault</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 bg-white/2 border border-gold/10 rounded-xl flex items-center gap-4">
              <stat.icon className="w-5 h-5 text-gold/30" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-600 font-black">{stat.label}</p>
                <p className="text-xl font-mono text-gold leading-none mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 border-t border-gold/5 pt-12 text-stone-300">
        {/* Saved Verses using 'Calendar' */}
        <section className="space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-gold font-black border-b border-gold/10 pb-4">Saved Archive</h2>
          {savedVerses.map((v) => (
            <div key={v.slug} className="group p-5 bg-charcoal/40 border border-white/5 rounded-lg hover:border-gold/20 transition-all">
              <div className="flex justify-between items-start">
                <Link href={`/book/${v.slug}`} className="flex-1">
                  <p className="text-[9px] text-stone-600 font-mono mb-1 uppercase flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Saved {v.savedAt?.toLocaleDateString()}
                  </p>
                  <h3 className="text-stone-200 font-serif group-hover:text-gold transition-colors text-lg italic">Verse {v.verseNumber}: {v.title}</h3>
                </Link>
                <form action={removeBookmark.bind(null, v.bookmarkId)}>
                  <button type="submit" className="text-stone-800 hover:text-red-500 p-2 cursor-pointer transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </section>

        {/* Previous Comments */}
        <section className="space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-gold font-black border-b border-gold/10 pb-4">My Knowledge Base</h2>
          {myComments.map((c) => (
            <div key={c.id} className="p-5 bg-black/20 border border-white/5 rounded-lg space-y-3">
              <p className="text-[9px] text-gold/40 uppercase tracking-widest">{c.verseTitle}</p>
              <p className="text-stone-400 text-sm font-serif italic leading-relaxed text-justify">&quot;{c.content}&quot;</p>
              <form action={deleteUserComment.bind(null, c.id)}>
                <button type="submit" className="text-[10px] text-stone-700 hover:text-red-400 uppercase font-black cursor-pointer transition-colors">Discard</button>
              </form>
            </div>
          ))}
        </section>
      </div>

      {/* Role Upgrade Section using 'Trophy' and 'requestUpgrade' */}
      {userData.role === "READER" && (
        <div className="mt-20 p-12 rounded-2xl border border-gold/20 bg-linear-to-br from-gold/3 to-transparent relative overflow-hidden group">
          <Trophy className="absolute top-0 right-0 p-10 opacity-[0.02] w-48 h-48 text-gold group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 max-w-xl">
            <h2 className="text-gold font-serif text-2xl mb-4 tracking-tight uppercase">Elevate to Contributor</h2>
            <p className="text-stone-500 text-sm mb-10 leading-relaxed text-justify">
              Become a verified contributor to share comprehensive views and support the scientific legacy of Buddhism.
            </p>
            {userData.requestingUpgrade ? (
              <div className="inline-flex items-center gap-4 px-6 py-3 border border-gold/30 rounded text-gold text-[10px] uppercase font-black bg-gold/5 animate-pulse">
                Pending Approval
              </div>
            ) : (
              <form action={requestUpgrade}>
                <button type="submit" className="bg-gold text-black px-12 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all cursor-pointer">
                  Request Upgrade
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}