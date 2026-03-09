import { auth } from "@/auth";
import { db } from "@/db";
import { users, comments, verses } from "@/db/schema";
import { eq, desc, gte } from "drizzle-orm";
import { redirect } from "next/navigation";
import { approveContributor, approveComment, deleteComment, toggleUserSuspension } from "@/lib/actions";
import { 
  ShieldAlertIcon, 
  UsersIcon, 
  MessageCircleIcon, 
  ClockIcon, 
  FilterIcon, 
  Trash2Icon, 
  CheckCircleIcon 
} from "@/components/ui/Icons";
import Link from "next/link";


//export const runtime = "nodejs";
export const runtime = "edge";

interface AdminPageProps {
  searchParams: Promise<{ days?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await auth();
  
  // Requirement #12: Strict Backend Access Control with Logging
  if (!session || session.user.role !== "ADMIN") {
    console.warn("🚫 Unauthorized Admin Access Attempt:", session?.user?.email);
    redirect("/");
  }

  const now = new Date();
  const queryParams = await searchParams;
  const days = queryParams.days ? parseInt(queryParams.days) : null;
  const filterDate = days ? new Date(now.getTime() - days * 24 * 60 * 60 * 1000) : null;

  const allUsers = await db.select().from(users).orderBy(desc(users.role));
  const pendingUpgrades = allUsers.filter(u => u.requestingUpgrade);
  
  // Fix: Defined as const to satisfy ESLint
  const commentQuery = db
    .select({
      id: comments.id,
      content: comments.content,
      isApproved: comments.isApproved,
      userName: users.name,
      userEmail: users.email,
      verseTitle: verses.title,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .innerJoin(verses, eq(comments.verseId, verses.id));

  const filteredComments = filterDate 
    ? await commentQuery.where(gte(comments.createdAt, filterDate)).orderBy(desc(comments.createdAt))
    : await commentQuery.orderBy(desc(comments.createdAt));

  const pendingCommentsCount = filteredComments.filter(c => !c.isApproved).length;

  return (
    <div className="min-h-screen bg-obsidian text-stone-300 p-4 lg:p-12 lg:pl-80">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/10 pb-8">
          <div>
            <h1 className="text-3xl font-serif text-gold uppercase tracking-tight">Control Centre</h1>
            <p className="text-stone-500 text-sm mt-1 font-serif italic">Administrator: {session.user.name}</p>
          </div>
          
          <div className="flex items-center gap-2 bg-charcoal/80 p-1 rounded-lg border border-gold/10 shadow-inner">
            <span className="px-3 text-[9px] uppercase tracking-widest text-stone-600 font-bold flex items-center gap-1">
              <FilterIcon className="w-3 h-3" /> Timeframe:
            </span>
            {[
              { label: 'All History', val: '' },
              { label: '7 Days', val: '7' },
              { label: '30 Days', val: '30' }
            ].map((f) => (
              <Link
                key={f.label}
                href={`/admin?days=${f.val}`}
                className={`px-4 py-1.5 rounded text-[10px] font-bold transition-all uppercase tracking-widest ${
                  (queryParams.days || '') === f.val ? "bg-gold text-black shadow-lg" : "text-stone-500 hover:text-gold"
                }`}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-charcoal/40 border border-gold/5 p-6 rounded-xl hover:bg-white/2 transition-colors">
            <UsersIcon className="w-4 h-4 text-gold/40 mb-3" />
            <p className="text-[10px] uppercase text-stone-600 font-black">Total Members</p>
            <p className="text-2xl font-mono text-stone-200">{allUsers.length}</p>
          </div>
          <div className="bg-charcoal/40 border border-gold/5 p-6 rounded-xl hover:bg-white/2 transition-colors">
            <ShieldAlertIcon className={`w-4 h-4 mb-3 ${pendingUpgrades.length > 0 ? "text-blue-400 animate-pulse" : "text-stone-800"}`} />
            <p className="text-[10px] uppercase text-stone-600 font-black">Role Requests</p>
            <p className="text-2xl font-mono text-stone-200">{pendingUpgrades.length}</p>
          </div>
          <div className="bg-charcoal/40 border border-gold/5 p-6 rounded-xl hover:bg-white/2 transition-colors">
            <MessageCircleIcon className={`w-4 h-4 mb-3 ${pendingCommentsCount > 0 ? "text-gold animate-bounce" : "text-stone-800"}`} />
            <p className="text-[10px] uppercase text-stone-600 font-black">Pending Approval</p>
            <p className="text-2xl font-mono text-gold">{pendingCommentsCount}</p>
          </div>
          <div className="bg-charcoal/40 border border-gold/5 p-6 rounded-xl">
            <ClockIcon className="w-4 h-4 text-stone-800 mb-3" />
            <p className="text-[10px] uppercase text-stone-600 font-black">Active Scope</p>
            <p className="text-xs font-bold text-stone-400 uppercase">{days ? `${days} Day Filter` : "Entire Archive"}</p>
          </div>
        </div>

        {/* Section: User Management */}
        <section className="space-y-4">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold font-black underline underline-offset-8 decoration-gold/20">Member Directory</h2>
          <div className="bg-charcoal/50 rounded-xl border border-gold/10 overflow-hidden shadow-2xl overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/60 text-[9px] uppercase text-stone-500 tracking-widest">
                <tr>
                  <th className="p-5">User Identity</th>
                  <th className="p-5">Role</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-serif">
                {allUsers.map(user => (
                  <tr key={user.id} className={`group transition-colors ${user.isSuspended ? "opacity-30 grayscale" : "hover:bg-white/2"}`}>
                    <td className="p-5">
                      <p className="text-stone-200">{user.name}</p>
                      <p className="text-[10px] text-stone-600 font-mono italic">{user.email}</p>
                    </td>
                    <td className="p-5">
                      <span className={`text-[9px] px-3 py-1 rounded-sm border font-sans font-black ${
                        user.role === 'ADMIN' ? 'border-gold text-gold bg-gold/5' : 
                        user.role === 'CONTRIBUTOR' ? 'border-blue-500/40 text-blue-400' : 'border-stone-800 text-stone-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-5 text-[10px] uppercase tracking-tighter">
                       {user.requestingUpgrade ? <span className="text-blue-400 font-bold animate-pulse">● Requesting Promotion</span> : <span className="text-stone-700">Stable</span>}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        {user.requestingUpgrade && (
                          <form action={approveContributor.bind(null, user.id)}>
                            <button type="submit" className="text-[10px] bg-blue-600 text-white px-4 py-1.5 font-bold rounded-sm uppercase tracking-tighter hover:bg-blue-500 cursor-pointer">Approve</button>
                          </form>
                        )}
                        <form action={toggleUserSuspension.bind(null, user.id)}>
                          <button type="submit" className={`text-[10px] px-4 py-1.5 rounded-sm border font-bold uppercase transition-all cursor-pointer ${
                            user.isSuspended ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-black" : "border-red-900 text-red-900 hover:border-red-600"
                          }`}>
                            {user.isSuspended ? 'Reactivate' : 'Suspend'}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section: Content Queue */}
        <section className="space-y-6 pb-20">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold font-black underline underline-offset-8 decoration-gold/20">Latest Reflections</h2>
          <div className="grid gap-6">
            {filteredComments.length > 0 ? (
              filteredComments.map(c => (
                <div key={c.id} className={`p-8 border rounded-xl transition-all duration-500 ${!c.isApproved ? "bg-gold/5 border-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.05)]" : "bg-charcoal/20 border-white/5 opacity-40"}`}>
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="space-y-4 flex-1">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-gold font-serif text-base font-bold">{c.userName}</span>
                        <span className="text-[10px] text-stone-600 uppercase tracking-widest font-sans">contributing on</span>
                        <span className="text-[11px] text-stone-300 font-serif border-b border-gold/20 pb-0.5">{c.verseTitle}</span>
                        <span className="text-[9px] text-stone-700 font-mono">/ {c.createdAt?.toLocaleDateString()}</span>
                      </div>
                      <p className="text-stone-300 font-serif leading-relaxed text-xl italic text-justify">&quot;{c.content}&quot;</p>
                    </div>
                    <div className="flex lg:flex-col items-center justify-center gap-4 shrink-0">
                      {!c.isApproved && (
                        <form action={approveComment.bind(null, c.id)} className="w-full">
                          <button type="submit" className="w-full flex items-center justify-center gap-2 text-[10px] text-white bg-green-800 px-6 py-2.5 rounded-sm font-bold uppercase tracking-widest hover:bg-green-700 transition-all cursor-pointer">
                             <CheckCircleIcon className="w-3 h-3" /> Approve
                          </button>
                        </form>
                      )}
                      <form action={deleteComment.bind(null, c.id)} className="w-full">
                        <button type="submit" className="w-full flex items-center justify-center gap-2 text-[10px] text-stone-500 hover:text-red-500 px-6 py-2.5 rounded border border-white/5 font-bold uppercase tracking-widest transition-all cursor-pointer">
                           <Trash2Icon className="w-3 h-3" /> Discard
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center border border-dashed border-white/5 rounded-xl opacity-20 italic">
                No activity found for this timeframe.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}