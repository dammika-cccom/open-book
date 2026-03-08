interface Reflection {
  id: string;
  content: string;
  userName: string | null;
  userRole: "ADMIN" | "CONTRIBUTOR" | "READER" | null;
  createdAt: Date | null;
}

export function CommentList({ comments }: { comments: Reflection[] }) {
  if (comments.length === 0) {
    return (
      <div className="mt-8 py-10 border-t border-gold/5 text-center">
        <p className="text-stone-600 font-serif italic text-sm">
          No reflections have been shared for this verse yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 space-y-10 border-t border-gold/10 pt-12">
      <h4 className="text-gold/40 font-sans text-[10px] uppercase tracking-[0.4em] mb-8">
        Scholarly Reflections
      </h4>
      <div className="space-y-8">
        {comments.map((c) => (
          <div key={c.id} className="group relative pl-6 border-l border-gold/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-stone-300 font-serif text-sm font-bold">
                {c.userName}
              </span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full border ${
                c.userRole === 'CONTRIBUTOR' ? 'border-blue-500/30 text-blue-400' : 
                c.userRole === 'ADMIN' ? 'border-gold text-gold' : 'border-stone-700 text-stone-500'
              }`}>
                {c.userRole}
              </span>
              <span className="text-[10px] text-stone-600">
                {c.createdAt?.toLocaleDateString()}
              </span>
            </div>
            <p className="text-stone-400 font-serif leading-relaxed text-base">
              {c.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}