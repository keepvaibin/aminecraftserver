// app/mods/page.js
import ModsExplorer from "@/components/ModsExplorer";
import NavButton from "@/components/NavButton"; // Import the new component

export const metadata = {
  title: "Mod Library – A Minecraft Server",
  description: "Browse the full mod list with search and filters.",
};

export default function ModsPage() {
  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden cross-section-bg" />

      {/* NAVIGATION BUTTON (Client Component) */}
      <NavButton />

      <main className="relative min-h-screen flex flex-col items-center pb-20">
        <header className="w-full max-w-4xl px-4 sm:px-6 pt-4 sm:pt-14 mb-4 text-center font-minecraft-bold">
          <h1 className="text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_4px_0_rgba(0,0,0,0.8)] text-[#FDF2FF]">
            Mod Library
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#E0E7FF]/85 font-minecraft">
            This is the &quot;big&quot; view of the pack. Use the search and
            filters below to drill into performance mods, cozy building tools,
            brutal end-game dimensions, or anything else that catches your eye.
          </p>
        </header>

        {/* Assuming ModsExplorer is also a "use client" component internally */}
        <ModsExplorer />
      </main>
    </>
  );
}