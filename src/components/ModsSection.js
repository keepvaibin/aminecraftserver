//ModsSection.js
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ModCard from "./ModCard";
import ModModal from "./ModModal";
import modsData from "../data/mods.json"; 

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  show: { opacity: 1, scale: 1, y: 0 }
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const CATEGORIES = [
  {
    id: "optimizers",
    label: "Optimizers",
    emoji: "🛠️",
    blurb: "FPS boosters and lag killers so the chaos runs smooth."
  },
  {
    id: "dependencies",
    label: "Dependencies",
    emoji: "📦",
    blurb: "Little libraries that make the big mods possible."
  },
  {
    id: "casual",
    label: "Enhancements – Casual",
    emoji: "🎒",
    blurb: "Travel, decorate, and vibe without making the game sweaty."
  },
  {
    id: "challenge",
    label: "Enhancements – Challenge",
    emoji: "⚔️",
    blurb: "Optional bosses and dimensions for tryhards and thrill seekers."
  },
  {
    id: "terrain",
    label: "Terrain & Structures",
    emoji: "🌍",
    blurb: "Biomes, dungeons, ruins, and places to get lost in."
  },
  {
    id: "misc",
    label: "QoL & Misc",
    emoji: "🎤",
    blurb: "Voice chat, gravestones, recipe viewers, and other sanity savers."
  }
];

export default function ModsSection() {
  const [activeCategory, setActiveCategory] = useState("optimizers");
  const [selectedMod, setSelectedMod] = useState(null);

  const modsByCategory = useMemo(() => {
    const grouped = {};
    for (const cat of CATEGORIES) {
      grouped[cat.id] = [];
    }
    for (const mod of modsData) {
      if (grouped[mod.category]) {
        grouped[mod.category].push(mod);
      }
    }
    return grouped;
  }, []);

  const currentCategory =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const currentMods = modsByCategory[currentCategory.id] || [];

  return (
    <>
      <motion.section
        className="w-full max-w-6xl xl:max-w-7xl px-4 md:px-6 pb-24 font-minecraft mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp} className="mb-6 text-center">
          <p className="text-sm tracking-[0.25em] uppercase text-[#f9e9ff]/80">
            All the mods currently in
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[#FDF2FF] drop-shadow-[0_4px_0_rgba(0,0,0,0.6)]">
            The Modpack
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#E0E7FF]/80 max-w-2xl mx-auto">
            Whether you just want to build, hunt bosses, or hang out with your
            friends, this pack has something for you!
          </p>
        </motion.div>

        {/* Category pills */}
        <motion.div
          variants={fadeUp}
          // FIX: Width set to 90vw on mobile to match other cards, max-w-5xl on desktop
          className="w-[90vw] md:w-full max-w-5xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedMod(null);
                }}
                className={[
                  // FIX: Reduced padding (px-2) and text size (text-[11px]) for mobile fitting
                  "group flex w-full items-center justify-center gap-1.5 rounded-full border-2 px-2 py-2.5 md:px-3 md:py-2 text-[11px] sm:text-xs md:text-sm transition-all",
                  isActive
                    ? "bg-[#ffb7d5] text-[#1C1D60] border-black shadow-[0_6px_0_rgba(0,0,0,0.6)] translate-y-[-2px]"
                    : "bg-[rgba(15,23,42,0.9)] text-[#E0E7FF]/80 border-black/60 hover:bg-[#1f2937] hover:-translate-y-[1px]"
                ].join(" ")}
              >
                <span className="text-base md:text-lg">{cat.emoji}</span>
                <span className="font-semibold text-center leading-tight">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Active category card */}
        <motion.div
          key={activeCategory}
          variants={fadeIn}
          initial="hidden"
          animate="show"
          // FIX: Reduced padding to p-4 on mobile. Added box-border.
          className="bg-[rgba(15,23,42,0.95)] border-4 border-black rounded-[32px] shadow-[0_14px_0_rgba(0,0,0,0.8)] p-4 md:p-8 text-[#FDF2FF] box-border w-full"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              {/* FIX: break-words ensures long titles don't push width out */}
              <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3 break-words">
                <span className="text-2xl">{currentCategory.emoji}</span>
                <span>{currentCategory.label}</span>
              </h3>
              <p className="mt-2 text-sm text-[#E0E7FF]/80">
                {currentCategory.blurb}
              </p>
            </div>
          </div>

          {/* Card grid */}
          {currentMods.length === 0 ? (
            <p className="text-sm text-[#E0E7FF]/70 italic">
              No mods in this category yet. Double-check the{" "}
              <span className="font-mono">category</span> field in{" "}
              <span className="font-mono">mods.json</span>.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentMods.map((mod) => (
                <ModCard
                  key={mod.id}
                  mod={mod}
                  onSelect={setSelectedMod}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.section>

      {/* Modal for selected mod */}
      <ModModal mod={selectedMod} onClose={() => setSelectedMod(null)} />
    </>
  );
}