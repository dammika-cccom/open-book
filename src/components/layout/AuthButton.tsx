import { auth } from "@/auth";
import { handleSignIn, handleSignOut } from "@/lib/actions";

export async function AuthButton() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex flex-col gap-2 p-1">
        <div className="flex flex-col">
          <span className="text-[10px] text-gold font-bold uppercase tracking-widest leading-tight">
             {session.user.role}
          </span>
          <span className="text-xs text-stone-400 truncate w-32 font-serif italic">
            {session.user.name}
          </span>
        </div>
        <form action={handleSignOut}>
          <button 
            type="submit" 
            className="text-stone-500 text-[10px] uppercase hover:text-white transition-colors border border-stone-800 px-3 py-1 rounded w-full bg-black/20"
          >
            Log out
          </button>
        </form>
      </div>
    );
  }

  return (
    <form action={handleSignIn}>
      <button 
        type="submit" 
        className="bg-gold text-black px-5 py-2 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)] active:scale-95"
      >
        Member Login
      </button>
    </form>
  );
}