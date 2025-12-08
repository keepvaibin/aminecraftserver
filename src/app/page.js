// page.js
"use client";

import { useEffect, useState } from "react";
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  show: { opacity: 1, scale: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const SERVER_STATUS_URL = "https://api.mcsrvstat.us/2/chickenjockey.lol";

export default function Home() {
  const [bgOffset, setBgOffset] = useState(0); // in vh
  const [serverStatus, setServerStatus] = useState(null);

  // Parallax background
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || window.pageYOffset;
      const maxScroll = doc.scrollHeight - window.innerHeight;

      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0; // 0 → 1
      const maxShift = 5; // smaller, safe parallax range
      const baseOffset = 0; // tweak this if you want the image initially higher/lower

      setBgOffset(baseOffset - progress * maxShift);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Server status polling (every 10s)
  useEffect(() => {
    let isMounted = true;

    const fetchStatus = async () => {
      try {
        const res = await fetch(SERVER_STATUS_URL);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted) {
          setServerStatus(data);
        }
      } catch (err) {
        console.error("Failed to fetch server status", err);
      }
    };

    fetchStatus(); // initial
    const intervalId = setInterval(fetchStatus, 10000); // 10 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Derived display values for the card
  const isOnline =
    serverStatus == null
      ? null
      : Boolean(serverStatus.online && serverStatus.debug?.ping);

  const playersOnline =
    serverStatus && serverStatus.players
      ? serverStatus.players.online
      : null;

  const playersMax =
    serverStatus && serverStatus.players ? serverStatus.players.max : null;

  const serverVersion = serverStatus?.version ?? null;

  return (
    <>
      {/* BACKGROUND LAYER */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none overflow-hidden cross-section-bg"
        style={{
          backgroundPositionY: `${bgOffset}vh`,
        }}
      />

      {/* =========================================================================
          CONTENT LAYER
          Sits on top (z-10). The background is transparent so we see the layers below.
         ========================================================================= */}
      <main className="flex flex-col items-center pb-24 z-10 relative">
        {/* ---------------- HERO (Sky Layer) ---------------- */}
        <motion.div
          className="mt-6 mb-12 flex flex-col items-center gap-3 px-4 pt-10"
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

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3, rotate: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <Image
              src={titleModded}
              alt="Modded"
              width={150}
              className="max-w-full drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]"
            />
          </motion.div>
        </motion.div>

        {/* ---------------- MAP + IP + DISCORD GRID ---------------- */}
        <motion.section
          className="w-full max-w-[90vw] px-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-6 lg:gaplg lg:grid-cols-[70%_1fr] items-stretch">
            {/* Left: Map card */}
            <div className="bg-[rgba(15,23,42,0.9)]/90 border-4 border-black rounded-[32px] shadow-[0_12px_0_rgba(0,0,0,0.7)] overflow-hidden backdrop-blur-sm flex flex-col">
              <div className="flex items-center justify-between px-6 pt-4 pb-2">
                <div>
                  <h3 className="text-xl font-bold text-[#FDF2FF] flex items-center gap-2">
                    <span>Overworld Live Map</span>
                  </h3>
                  <p className="text-xs text-[#f9e9ff]/80">
                    Check out what people are up to and help explore more of the map to uncover new areas!
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
              {/* Server info card (now dynamic status) */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="show"
                className="group relative overflow-hidden bg-gradient-to-br from-[#ffb7d5] via-[#f9a8d4] to-[#60a5fa] border-4 border-black rounded-[32px] shadow-[0_12px_0_rgba(0,0,0,0.8)] px-6 py-8 md:px-8 md:py-8 text-[#111827]"
              >
                <div className="pointer-events-none absolute -left-20 top-0 h-full w-32 translate-x-0 rotate-12 bg-gradient-to-b from-white/60 via-white/20 to-transparent opacity-0 group-hover:translate-x-[140%] group-hover:opacity-100 transition-all duration-700" />

                <div className="relative">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>Server Info</span>
                    <span className="text-lg">🐔</span>
                  </h3>

                  <div className="space-y-3 text-xs md:text-sm">
                    {/* IP block stays, but version is dynamic */}
                    <div className="rounded-2xl bg-[#EDE9FF]/60 border border-white/20 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#4b5563] mb-1">
                        IP Address
                      </p>
                      <p className="font-mono text-sm md:text-base bg-[#EDE9FF]/60 inline-block px-2 py-1 rounded-lg border border-black">
                        chickenjockey.lol
                      </p>
                      <p className="mt-1 text-[11px] text-[#4b5563]/70">
                        Java Edition · Fabric
                        {serverVersion ? ` · ${serverVersion} modded` : ""}
                      </p>
                    </div>

                    {/* Status rows */}
                    <div className="rounded-2xl bg-white/60 border border-black/10 px-4 py-3 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[#4b5563]">
                        Status
                      </span>
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <span
                          className={
                            "w-2.5 h-2.5 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.6)] " +
                            (isOnline === null
                              ? "bg-gray-400"
                              : isOnline
                              ? "bg-emerald-500"
                              : "bg-red-500")
                          }
                        />
                        <span>
                          {isOnline === null
                            ? "Checking..."
                            : isOnline
                            ? "Online"
                            : "Offline"}
                        </span>
                      </span>
                    </div>

                    <div className="rounded-2xl bg-white/60 border border-black/10 px-4 py-3 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[#4b5563]">
                        Players
                      </span>
                      <span className="text-sm font-semibold">
                        {playersOnline != null ? playersOnline : "—"}{" "}
                        <span className="text-xs text-[#4b5563]">/</span>{" "}
                        {playersMax != null ? playersMax : "—"}
                      </span>
                    </div>

                    <div className="rounded-2xl bg-white/60 border border-black/10 px-4 py-3 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[#4b5563]">
                        Version
                      </span>
                      <span className="text-sm font-semibold">
                        {serverVersion ?? "—"}
                      </span>
                    </div>
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
                <div className="pointer-events-none absolute -left-20 top-0 h-full w-32 translate-x-0 rotate-12 bg-gradient-to-b from-white/60 via-white/20 to-transparent opacity-0 group-hover:translate-x-[140%] group-hover:opacity-100 transition-all duration-700" />

                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xs uppercase tracking-[0.25em] mb-2">
                      Stay updated!
                    </p>
                    <h3 className="text-2xl md:text-3xl font-extrabold">
                      Hop into the ChickenJockey Discord
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-black/80">
                      Get whitelisted, see the full mod list, join events, and
                      meet new people!
                    </p>

                    <a
                      href="https://discord.gg/your-invite-code-here"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#111827] px-4 py-2 text-sm font-semibold text-[#FDF2FF] shadow-[0_4px_0_rgba(0,0,0,0.8)] hover:translate-y-[-2px] transition-transform"
                    >
                      <span>Join Discord</span>
                      <span className="text-lg mt-1">💬</span>
                    </a>
                  </div>

                  <div className="relative hidden md:block">
                    <Image
                      src={arrow}
                      alt="Arrow"
                      width={120}
                      className="translate-y-30 drop-shadow-[0_4px_0_rgba(0,0,0,0.6)] rotate-150"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ---------------- ABOUT / ANIMALS SECTION ---------------- */}
        <motion.section
          className="w-full max-w-[1280px] px-4 mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp} className="relative">
              <div className="space-y-4 bg-white/60 border-4 border-black rounded-[32px] shadow-[0_10px_0_rgba(0,0,0,0.7)] px-6 md:px-8 py-6 md:py-8 backdrop-blur-sm">
                <p className="text-sm tracking-[0.25em] uppercase text-[#1f2937]/70">
                  What is ChickenJockey?
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]">
                  Build a silly little life on a silly little server.
                </h2>
                <p className="text-sm md:text-base text-[#111827]/80">
                  Think: a comfy SMP where players can{" "}
                  <span className="font-semibold">opt into</span> harder
                  content instead of being forced into it. The overworld is cozy
                  and colorful, but if you want to go fight terrible things in
                  weird dimensions, we absolutely support that.
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-[#111827]/90 space-y-1.5">
                  <li>
                    <span className="font-semibold">Casual path:</span>{" "}
                    decorate, farm, explore cute structures, collect critters.
                  </li>
                  <li>
                    <span className="font-semibold">Challenge path:</span>{" "}
                    optional bosses, Deeper &amp; Darker, and other “why did I
                    queue for this?” content.
                  </li>
                  <li>
                    <span className="font-semibold">Social path:</span> Simple
                    Voice Chat, community events, and shared build projects.
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="relative flex justify-center"
            >
              {/* existing backgroundMc + animals images stay exactly the same */}
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
        </motion.section>

        {/* ---------------- MODS SECTION (Deepslate Layer) ---------------- */}
        <div className="w-full max-w-[1280px] px-4 mt-20">
          <ModsSection />
        </div>
      </main>
    </>
  );
}
