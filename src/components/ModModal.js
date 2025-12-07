//ModModal.js
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0 }
};

export default function ModModal({ mod, onClose }) {
  if (!mod) return null;

  const hasMedia = Array.isArray(mod.media) && mod.media.length > 0;

  return (
    <AnimatePresence>
      {mod && (
        <motion.div
          key={mod.id}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          transition={{ type: "spring", stiffness: 210, damping: 22 }}
          className="relative w-full max-w-3xl rounded-[32px] border-4 border-black bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#1C1D60] shadow-[0_18px_0_rgba(0,0,0,0.9)] p-6 md:p-8 text-[#FDF2FF]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* corner accent */}
          <div className="absolute -left-3 -top-3 h-12 w-12 bg-[#ffb7d5] border-2 border-black rounded-br-3xl shadow-[0_5px_0_rgba(0,0,0,0.6)]" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-[#fecaca] text-black text-sm font-bold shadow-[0_4px_0_rgba(0,0,0,0.7)] hover:-translate-y-[2px] active:translate-y-[1px] transition-transform"
          >
            ✕
          </button>

          <div className="flex flex-col gap-6 md:flex-row">
            {/* Left: text */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl md:text-3xl font-extrabold drop-shadow-[0_3px_0_rgba(0,0,0,0.6)]">
                  {mod.name}
                </h3>
                {mod.tag && (
                  <span className="rounded-full border border-[#fecdd3] bg-[#f9a8d4]/30 px-3 py-1 text-xs font-semibold text-[#fef9c3]">
                    {mod.tag}
                  </span>
                )}
              </div>
              {mod.category && (
                <p className="text-xs uppercase tracking-[0.22em] text-[#a5b4fc]/80">
                  Category: <span className="font-semibold">{mod.category}</span>
                </p>
              )}

              <p className="text-sm md:text-base text-[#E0E7FF]/85">
                {mod.description}
              </p>

              {mod.details && (
                <div className="mt-2 space-y-1 text-sm md:text-base text-[#fef9c3]">
                  {Array.isArray(mod.details) ? (
                    <ul className="list-disc list-inside space-y-1">
                      {mod.details.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{mod.details}</p>
                  )}
                </div>
              )}

              {mod.vibe && (
                <p className="mt-3 text-sm italic text-[#f9e9ff]/90">
                  {mod.vibe}
                </p>
              )}
            </div>

            {/* Right: media */}
            <div className="mt-4 md:mt-0 md:w-64 flex-shrink-0">
              <div className="relative h-48 md:h-56 w-full rounded-3xl border-2 border-black bg-[#020617] overflow-hidden shadow-[0_8px_0_rgba(0,0,0,0.9)] flex items-center justify-center">
                {hasMedia ? (
                  <MediaSlideshow media={mod.media} />
                ) : (
                  <p className="px-4 text-center text-xs md:text-sm text-[#9ca3af]">
                    Add an image or gif for this mod by setting{" "}
                    <span className="font-mono bg-black/40 px-1 rounded">
                      "media"
                    </span>{" "}
                    in <span className="font-mono">mods.json</span>.
                  </p>
                )}
              </div>
              {hasMedia && (
                <p className="mt-2 text-[11px] text-[#9ca3af] text-center">
                  Tip: You can point media items to files in{" "}
                  <span className="font-mono">/public/mods/</span>.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
  );
}

function MediaSlideshow({ media }) {
  const [index, setIndex] = useState(0);

  const current = media[index];

  const go = (dir) => {
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return media.length - 1;
      if (next >= media.length) return 0;
      return next;
    });
  };

  return (
    <div className="relative h-full w-full">
      <img
        src={current}
        alt=""
        className="h-full w-full object-cover"
      />
      {media.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white text-xs w-7 h-7 flex items-center justify-center border border-white/40 hover:bg-black/80"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white text-xs w-7 h-7 flex items-center justify-center border border-white/40 hover:bg-black/80"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {media.map((_, i) => (
              <span
                key={i}
                className={
                  "h-1.5 w-3 rounded-full border border-black " +
                  (i === index ? "bg-white" : "bg-white/40")
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
