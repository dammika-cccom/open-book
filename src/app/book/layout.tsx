import { getAllVerses } from "@/lib/queries";
import { Sidebar } from "@/components/layout/Sidebar";
import { AuthButton } from "@/components/layout/AuthButton";

export default async function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allChapters = await getAllVerses();

  return (
    // FIX: suppressHydrationWarning added to line 13 to stop the crash
    <div className="flex min-h-screen bg-obsidian text-stone-text" suppressHydrationWarning>
      {/* 
        The Sidebar is a Client component. 
        The AuthButton is a Server component.
      */}
      <Sidebar verses={allChapters}>
        <AuthButton />
      </Sidebar>

      <main className="flex-1 lg:ml-72">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:px-12 lg:py-24 mb-20 lg:mb-0 text-stone-300">
          {children}
        </div>
      </main>
    </div>
  );
}