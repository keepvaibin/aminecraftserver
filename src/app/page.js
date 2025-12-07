//page.js
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ModsSection from "../components/ModsSection";

// images
import titleUCSC from "../../assets/ucsc.png";
import titleMinecraft from "../../assets/aminecraftserver.png";
import titleModded from "../../assets/modded.png";
import backgroundMc from "../../assets/backgroundmc.jpg";
import animals from "../../assets/minecraftanimals.png";
import arrow from "../../assets/arrow.png";

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

export default function Home() {
  return (
    <main
      className="
        min-h-screen
        font-minecraft-bold
        bg-gradient-to-b from-[#C7FFB8] via-[#385282] to-[#70350D]
        flex flex-col items-center
        pb-24
      "
    >
      {/* ---------------- HERO ---------------- */}
      <motion.div
        className="mt-6 mb-12 flex flex-col items-center gap-3 px-4"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <Image src={titleUCSC} alt="UCSC Logo" width={220} priority />
        </motion.div>

        <motion.div
          variants={fadeUp}
          whileHover={{ scale: 1.02, rotate: -0.5 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <Image
            src={titleMinecraft}
            alt="A Minecraft Server"
            width={820}
            className="max-w-full drop-shadow-[0_6px_0_rgba(0,0,0,1)]"
          />
        </motion.div>

        {/* MODDED image */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -3, rotate: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <Image
            src={titleModded}
            alt="Modded"
            width={150}
            className="max-w-full drop-shadow-[0_4px_0_rgba(0,0,0,1)]"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-3 text-center text-sm md:text-base max-w-2xl text-[#E0E7FF]/90"
        >
          A cozy-chaotic, modded Fabric server where you can build a tiny
          cottage, fight terrifying bosses <span className="italic">if</span>{" "}
          you want, and spend way too long decorating your base.
        </motion.p>
      </motion.div>

      {/* ------------- MAP + IP + DISCORD GRID ------------- */}
      <motion.section
        className="w-full max-w-[90vw] px-4 mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[70%_1fr] items-stretch">
          {/* Left: Map card */}
          <div className="bg-[rgba(15,23,42,0.9)]/90 border-4 border-black rounded-[32px] shadow-[0_12px_0_rgba(0,0,0,0.7)] overflow-hidden backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between px-6 pt-4 pb-2">
              <div>
                <h3 className="text-xl font-bold text-[#FDF2FF] flex items-center gap-2">
                  <span>Overworld Live Map</span>
                  <span className="text-lg">🗺️</span>
                </h3>
                <p className="text-xs text-[#f9e9ff]/80">
                  Peek at bases, shops, and the occasional “who put lava there?”
                  moment in real time.
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 text-[11px] text-[#bbf7d0]">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4df2a1] shadow-[0_0_8px_#4df2a1]" />
                  Online
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/40 text-[#E0F2FE] border border-white/20">
                  map.chickenjockey.lol
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] border-t border-white/10 flex-1">
              <iframe
                src="https://map.chickenjockey.lol/?worldname=world&mapname=flat&zoom=0&x=16&y=64&z=0"
                title="ChickenJockey Dynmap"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[320px] md:h-[380px] lg:h-full"
              />
            </div>
          </div>

          {/* Right: IP info + Discord button (stacked) */}
          <div className="flex flex-col gap-6">
            {/* Server info card (now has shine) */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="show"
              className="group relative overflow-hidden bg-gradient-to-br from-[#ffb7d5] via-[#f9a8d4] to-[#60a5fa] border-4 border-black rounded-[32px] shadow-[0_12px_0_rgba(0,0,0,0.8)] px-6 py-6 md:px-8 md:py-8 text-[#111827]"
            >
              {/* shine overlay */}
              <div className="pointer-events-none absolute -left-20 top-0 h-full w-32 translate-x-0 rotate-12 bg-gradient-to-b from-white/60 via-white/20 to-transparent opacity-0 group-hover:translate-x-[140%] group-hover:opacity-100 transition-all duration-700" />

              <div className="relative">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span>Server Info</span>
                  <span className="text-lg">🐔</span>
                </h3>
                <p className="text-sm mb-4">
                  Semi-cozy, semi-chaotic survival. Bring your friends, build a
                  base, or just log in to pet every animal you see.
                </p>

                <div className="space-y-3 text-xs md:text-sm">
                  <div className="rounded-2xl bg-[#020617]/60 border border-white/20 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#A5B4FC] mb-1">
                      IP Address
                    </p>
                    <p className="font-mono text-sm md:text-base bg-black/40 inline-block px-2 py-1 rounded-lg border border-black">
                      chickenjockey.lol
                    </p>
                    <p className="mt-1 text-[11px] text-[#E0E7FF]/70">
                      Java Edition · Fabric · 1.21.1 modded
                    </p>
                  </div>

                  <ul className="list-disc list-inside space-y-1.5">
                    <li>
                      Play casually or go full sweat with optional bosses.
                    </li>
                    <li>
                      Builders, redstone nerds, and chaos gremlins welcome.
                    </li>
                    <li>
                      Live map, waystones, and plenty of cute mods to keep
                      things cozy.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Discord CTA card – only button is clickable */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="show"
              className="group relative overflow-hidden bg-gradient-to-br from-[#ffb7d5] via-[#f9a8d4] to-[#60a5fa] border-4 border-black rounded-[32px] shadow-[0_12px_0_rgba(0,0,0,0.8)] px-6 py-6 md:px-8 md:py-8 text-[#111827]"
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              {/* animated shine */}
              <div className="pointer-events-none absolute -left-20 top-0 h-full w-32 translate-x-0 rotate-12 bg-gradient-to-b from-white/60 via-white/20 to-transparent opacity-0 group-hover:translate-x-[140%] group-hover:opacity-100 transition-all duration-700" />

              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xs uppercase tracking-[0.25em] mb-2">
                    Join the flock
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold">
                    Hop into the ChickenJockey Discord
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-black/80">
                    Get whitelisted, see the full mod list, join events, and
                    scream in voice chat when a creeper shows up behind you.
                  </p>

                  {/* clickable button */}
                  <a
                    href="https://discord.gg/your-invite-code-here"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#111827] px-4 py-2 text-sm font-semibold text-[#FDF2FF] shadow-[0_4px_0_rgba(0,0,0,0.8)] hover:translate-y-[-2px] transition-transform"
                  >
                    <span>Join Discord</span>
                    {/* CHANGED: Removed 'group-hover:' prefix so it always bounces */}
                    <span className="text-lg animate-bounce mt-1.5">
                      💬
                    </span>
                  </a>
                </div>

                <div className="relative hidden md:block">
                  <Image
                    src={arrow}
                    alt="Arrow"
                    width={120}
                    className="rotate-[100] translate-y-30 drop-shadow-[0_4px_0_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ------------- ABOUT / ANIMALS SECTION ------------- */}
      <motion.section
        className="w-full max-w-[1280px] px-4 mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Text side */}
          <motion.div variants={fadeUp} className="space-y-4">
            <p className="text-sm tracking-[0.25em] uppercase text-[#f9e9ff]/80">
              What is ChickenJockey?
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#FDF2FF] drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">
              Build a silly little life on a silly little server.
            </h2>
            <p className="text-sm md:text-base text-[#E0E7FF]/80">
              Think: a comfy SMP where players can{" "}
              <span className="font-semibold">opt into</span> harder content
              instead of being forced into it. The overworld is cozy and
              colorful, but if you want to go fight terrible things in weird
              dimensions, we absolutely support that.
            </p>
            <ul className="list-disc list-inside text-sm md:text-base text-[#E0E7FF]/90 space-y-1.5">
              <li>
                <span className="font-semibold">Casual path:</span> decorate,
                farm, explore cute structures, collect critters.
              </li>
              <li>
                <span className="font-semibold">Challenge path:</span> optional
                bosses, Deeper &amp; Darker, and other “why did I queue for
                this?” content.
              </li>
              <li>
                <span className="font-semibold">Social path:</span> Simple Voice
                Chat, community events, and shared build projects.
              </li>
            </ul>
          </motion.div>

          {/* Image side */}
          <motion.div
            variants={fadeIn}
            className="relative flex justify-center"
          >
            <div className="relative">
              <Image
                src={backgroundMc}
                alt="Minecraft World"
                width={600}
                className="rounded-[32px] border-[10px] border-black shadow-[0_10px_0_rgba(0,0,0,0.6)]"
              />
              <Image
                src={animals}
                alt="Animals"
                width={520}
                className="absolute bottom-[-160px] left-1/2 -translate-x-1/2 drop-shadow-[0_10px_0_rgba(0,0,0,0.7)]"
              />
            </div>
          </motion.div>
        </div>

        {/* “That could be you!” */}
        <div className="flex flex-col items-center mt-40">
          <Image
            src={arrow}
            alt="Arrow"
            width={130}
            className="rotate-[200deg] mb-1"
          />
          <p className="text-xl md:text-2xl font-bold text-[#fdf2ff] drop-shadow-[0_2px_0_rgba(0,0,0,0.7)]">
            That could be you!
          </p>
        </div>
      </motion.section>

      {/* ------------- MODS SECTION (REUSABLE COMPONENT) ------------- */}
      <ModsSection />
    </main>
  );
}