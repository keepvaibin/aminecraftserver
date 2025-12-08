"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModCard from "./ModCard";
import ModModal from "./ModModal";
import modsData from "../data/mods.json";

// Animation settings
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function ModsExplorer() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedMod, setSelectedMod] = useState(null);

  const { categories, tags } = useMemo(() => {
    const catSet = new Set();
    const tagSet = new Set();
    for (const mod of modsData) {
      if (mod.category) catSet.add(mod.category);
      if (mod.tag) tagSet.add(mod.tag);
    }
    return {
      categories: Array.from(catSet).sort(),
      tags: Array.from(tagSet).sort(),
    };
  }, []);

  const filteredMods = useMemo(() => {
    const q = search.trim().toLowerCase();

    let result = modsData.filter((mod) => {
      if (categoryFilter !== "all" && mod.category !== categoryFilter) return false;
      if (tagFilter !== "all" && mod.tag !== tagFilter) return false;
      if (!q) return true;

      const haystackParts = [
        mod.name,
        mod.description,
        mod.tag,
        mod.fileName,
      ];
      if (Array.isArray(mod.features)) haystackParts.push(mod.features.join(" "));
      if (Array.isArray(mod.howTo)) haystackParts.push(mod.howTo.join(" "));
      else if (mod.howTo) haystackParts.push(mod.howTo);

      const haystack = haystackParts.filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(q);
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "category") {
        const catCompare = (a.category || "").localeCompare(b.category || "");
        if (catCompare !== 0) return catCompare;
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "tag") {
        const tagCompare = (a.tag || "").localeCompare(b.tag || "");
        if (tagCompare !== 0) return tagCompare;
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [search, categoryFilter, tagFilter, sortBy]);

  const resultsLabel =
    filteredMods.length === modsData.length && !search && categoryFilter === "all" && tagFilter === "all"
      ? `Showing all ${modsData.length} mods`
      : `Showing ${filteredMods.length} of ${modsData.length} mods`;

  const handleTagClick = (tag) => {
    setTagFilter(prev => (prev === tag ? "all" : tag));
  };

  return (
    <>
      <motion.section
        // UPDATED: Wide container on desktop (85vw)
        className="w-full md:max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8 pb-16 font-minecraft"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Filters */}
        <motion.div
          variants={fadeIn}
          className="mb-6 rounded-3xl border-4 border-black bg-[rgba(15,23,42,0.97)] shadow-[0_12px_0_rgba(0,0,0,0.8)] px-4 py-4 sm:px-6 sm:py-5"
        >
          {/* Top Row: Inputs */}
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[11px] uppercase tracking-[0.2em] text-[#a5b4fc]/90 mb-1">
                Live search
              </label>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border-2 border-black bg-[#020617] px-4 py-2 text-sm text-[#E0E7FF] shadow-[0_4px_0_rgba(0,0,0,0.8)] placeholder:text-[#6b7280]"
              />
            </div>

            {/* Category */}
            <div className="min-w-[160px]">
              <label className="block text-[11px] uppercase tracking-[0.2em] text-[#a5b4fc]/90 mb-1">
                Category
              </label>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full appearance-none rounded-full border-2 border-black bg-[#020617] px-4 py-2 pr-8 text-sm text-[#E0E7FF] shadow-[0_4px_0_rgba(0,0,0,0.8)]"
                >
                  <option value="all">All categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-[#E0E7FF]/70">▼</span>
              </div>
            </div>

            {/* Tag */}
            <div className="min-w-[160px]">
              <label className="block text-[11px] uppercase tracking-[0.2em] text-[#a5b4fc]/90 mb-1">
                Tag
              </label>
              <div className="relative">
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="w-full appearance-none rounded-full border-2 border-black bg-[#020617] px-4 py-2 pr-8 text-sm text-[#E0E7FF] shadow-[0_4px_0_rgba(0,0,0,0.8)]"
                >
                  <option value="all">All tags</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-[#E0E7FF]/70">▼</span>
              </div>
            </div>

            {/* Sort */}
            <div className="min-w-[160px]">
              <label className="block text-[11px] uppercase tracking-[0.2em] text-[#a5b4fc]/90 mb-1">
                Sort by
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none rounded-full border-2 border-black bg-[#020617] px-4 py-2 pr-8 text-sm text-[#E0E7FF] shadow-[0_4px_0_rgba(0,0,0,0.8)]"
                >
                  <option value="name">Name (A → Z)</option>
                  <option value="category">Category</option>
                  <option value="tag">Tag</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-[#E0E7FF]/70">▼</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Tags + Meta */}
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <p className="text-xs sm:text-[13px] text-[#E0E7FF]/70 whitespace-nowrap mt-1">
              {resultsLabel}
            </p>

            {tags.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-3 justify-start lg:justify-end">
                <button
                  type="button"
                  onClick={() => setTagFilter("all")}
                  className={`rounded-full border px-3 py-1 text-[11px] transition-all ${
                    tagFilter === "all"
                      ? "bg-[#f9a8d4] text-black border-black shadow-[0_3px_0_rgba(0,0,0,0.7)]"
                      : "bg-[#020617] text-[#E0E7FF]/80 border-[#4b5563] hover:bg-[#111827] hover:border-[#9ca3af]"
                  }`}
                >
                  All tags
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`rounded-full border px-3 py-1 text-[11px] transition-all ${
                      tagFilter === tag
                        ? "bg-[#f9a8d4] text-black border-black shadow-[0_3px_0_rgba(0,0,0,0.7)]"
                        : "bg-[#020617] text-[#E0E7FF]/80 border-[#4b5563] hover:bg-[#111827] hover:border-[#9ca3af]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          layout
          // UPDATED: Grid breakpoints to scale up to 4 columns on wide screens
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredMods.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full rounded-3xl border-4 border-black bg-[rgba(15,23,42,0.98)] px-6 py-8 text-center text-sm text-[#E0E7FF]/80"
              >
                No mods match that search/filter combo. Try clearing some filters or searching for a simpler term.
              </motion.div>
            ) : (
              filteredMods.map((mod) => (
                <motion.div
                  key={mod.id}
                  layout
                  transition={{ layout: { type: "spring", stiffness: 50, damping: 15 } }}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  <ModCard mod={mod} onSelect={(m) => setSelectedMod(m)} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      <ModModal mod={selectedMod} onClose={() => setSelectedMod(null)} />
    </>
  );
}