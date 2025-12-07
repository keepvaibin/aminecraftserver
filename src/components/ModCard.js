//modcard.js
"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ModCard({ mod, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(mod)}
      variants={fadeUp}
      className="group relative h-full w-full text-left rounded-3xl border-2 border-black bg-gradient-to-br from-[#1e293b] via-[#111827] to-[#1C1D60] px-4 py-4 md:px-5 md:py-5 shadow-[0_8px_0_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#f9a8d4] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      whileHover={{ y: -4, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      {/* little pixel corner accent */}
      <div className="absolute -left-2 -top-2 h-10 w-10 bg-[#ffb7d5] border-2 border-black rounded-br-3xl shadow-[0_4px_0_rgba(0,0,0,0.6)]" />

      <div className="relative pt-3 pl-2">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="text-sm md:text-base font-bold tracking-tight text-[#FDF2FF]">
            {mod.name}
          </h4>
          {mod.tag && (
            <span className="text-[10px] md:text-[11px] px-2 py-1 rounded-full bg-[#f9a8d4]/30 border border-[#fecdd3] text-[#fef9c3]">
              {mod.tag}
            </span>
          )}
        </div>
        <p className="text-[11px] md:text-xs text-[#E0E7FF]/80 mb-2 line-clamp-3">
          {mod.description}
        </p>
        {mod.vibe && (
          <p className="text-[11px] text-[#f9e9ff]/90 italic line-clamp-2">
            {mod.vibe}
          </p>
        )}
        <p className="mt-3 text-[10px] md:text-[11px] text-[#a5b4fc]/80 flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f9a8d4]" />
          Click for full details
        </p>
      </div>

      {/* hover glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 opacity-0 group-hover:opacity-80 bg-gradient-to-t from-[#ffb7d5]/40 to-transparent transition-opacity" />
    </motion.button>
  );
}
