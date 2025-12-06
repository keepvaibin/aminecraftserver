"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ModCard from "./ModCard";
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

// reusable section – can be dropped into other pages too
export default function ModsSection() {
  const [activeCategory, setActiveCategory] = useState("optimizers");

  const modsByCategory = useMemo(() => {
    const grouped = {};
    for (const cat of CATEGORIES) {
      grouped[cat.id] = [];
    }
    for (const mod of modsData) {
      if (!grouped[mod.category]) {
        grouped[mod.category] = [];
      }
      grouped[mod.category].push(mod);
    }
    return grouped;
  }, []);

  const currentCategory =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const currentMods = modsByCategory[currentCategory.id] || [];

  return (
    <motion.section
      className="w-full max-w-6xl px-6 pb-24"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={fadeUp} className="mb-6 text-center">
        <p className="text-sm tracking-[0.25em] uppercase text-[#f9e9ff]/80">
          The Modpack
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-[#FDF2FF] drop-shadow-[0_4px_0_rgba(0,0,0,0.6)]">
          Cute, Cursed, and Highly Optimized
        </h2>
        <p className="mt-3 text-sm md:text-base text-[#E0E7FF]/80 max-w-2xl mx-auto">
          Whether you just want to build a cottage, hunt bosses, or vibe with
          friends, this pack is tuned so everyone can play how they want.
        </p>
      </motion.div>

      {/* Category pills */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap justify-center gap-2 mb-6"
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={[
                "group flex items-center gap-2 rounded-full border-2 px-4 py-2 text-xs md:text-sm transition-all",
                isActive
                  ? "bg-[#ffb7d5] text-[#1C1D60] border-black shadow-[0_6px_0_rgba(0,0,0,0.6)] translate-y-[-2px]"
                  : "bg-[rgba(15,23,42,0.9)] text-[#E0E7FF]/80 border-black/60 hover:bg-[#1f2937] hover:-translate-y-[1px]"
              ].join(" ")}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="font-semibold">{cat.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Active category card */}
      <motion.div
        variants={fadeIn}
        className="bg-[rgba(15,23,42,0.95)] border-4 border-black rounded-[32px] shadow-[0_14px_0_rgba(0,0,0,0.8)] p-6 md:p-8 text-[#FDF2FF]"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-2xl">{currentCategory.emoji}</span>
              <span>{currentCategory.label}</span>
            </h3>
            <p className="mt-2 text-sm text-[#E0E7FF]/80">
              {currentCategory.blurb}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-dashed border-[#fecdd3]/70 bg-[#f9a8d4]/20 px-4 py-3 text-xs md:text-sm max-w-xs">
            <p className="font-semibold text-[#fef9c3]">
              Powered by JSON ✨
            </p>
            <p className="text-[#FFE4E6]/90 mt-1">
              Add new mods in{" "}
              <span className="font-mono bg-black/30 px-1.5 py-0.5 rounded">
                src/data/mods.json
              </span>{" "}
              and they’ll automatically show up under the right category.
            </p>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentMods.map((mod) => (
            <ModCard key={mod.id} mod={mod} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
