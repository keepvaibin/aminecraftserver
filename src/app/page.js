// page.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; 
import { motion } from "framer-motion";
import ModsSection from "../components/ModsSection";

// --- EXISTING IMAGES ---
import titleUCSC from "../../assets/ucsc.png";
import titleMinecraft from "../../assets/aminecraftserver.png";
import titleModded from "../../assets/modded.png";
import backgroundMc from "../../assets/backgroundmc.jpg";
import animals from "../../assets/minecraftanimals.png";
import arrow from "../../assets/arrow.png";

// --- SCRAPBOOK IMAGES ---
import imgSpawn from "../../assets/spawn.png";
import imgRuined from "../../assets/ruined.png";
import imgTower from "../../assets/talltower night.png";
import imgTree from "../../assets/treelava.png";
import imgFlower from "../../assets/flowerfieldnight.png";
import imgPortal from "../../assets/wardendcityportal.png";
import imgCity from "../../assets/wardencityother.png";

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

// FIXED POSITIONS: Positive values (left-[2%]) for mobile to prevent clipping off-screen.
const SCRAPBOOK_PHOTOS = [
  { 
    id: 1, 
    src: imgSpawn, 
    alt: "Spawn Area",
    className: "top-[10%] left-[-2%] md:left-[-5%] xl:left-[2%] rotate-[-8deg] w-[75vw] xl:w-[28vw]",
  },
  { 
    id: 2, 
    src: imgRuined, 
    alt: "Ruined Portal",
    className: "top-[22%] right-[-2%] md:right-[-5%] xl:right-[2%] rotate-[12deg] w-[75vw] xl:w-[28vw]", 
  },
  { 
    id: 3, 
    src: imgTree, 
    alt: "Lava Tree",
    className: "top-[35%] left-[-1%] md:left-[-4%] xl:left-[5%] rotate-[-5deg] w-[75vw] xl:w-[28vw]", 
  },
  { 
    id: 4, 
    src: imgFlower, 
    alt: "Flower Field",
    className: "top-[48%] right-[-1%] md:right-[-4%] xl:right-[4%] rotate-[8deg] w-[75vw] xl:w-[28vw]", 
  },
  { 
    id: 5, 
    src: imgTower, 
    alt: "Tall Tower",
    className: "top-[62%] left-[1%] md:left-[-3%] xl:left-[3%] rotate-[-10deg] w-[75vw] xl:w-[28vw]", 
  },
  { 
    id: 6, 
    src: imgPortal, 
    alt: "Warden Portal",
    className: "top-[75%] right-[-2%] md:right-[-5%] xl:right-[2%] rotate-[5deg] w-[75vw] xl:w-[30vw]", 
  },
  { 
    id: 7, 
    src: imgCity, 
    alt: "Ancient City",
    className: "top-[88%] left-[1%] md:left-[-2%] xl:left-[6%] rotate-[-3deg] w-[55vw] xl:w-[28vw]", 
  },
];

const SERVER_STATUS_URL = "https://api.mcsrvstat.us/2/chickenjockey.lol";

export default function Home() {
  const [bgOffset, setBgOffset] = useState(0); 
  const [serverStatus, setServerStatus] = useState(null);

  // --- PARALLAX LOGIC (UPDATED) ---
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || window.pageYOffset;
      const maxScroll = doc.scrollHeight - window.innerHeight;

      // 1. Calculate how far down the page we are (0.0 to 1.0)
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0; 

      // 2. Define the "buffer" we have available.
      // We set the background height to 120vh. 
      // This means we have 20vh of "extra" image to scroll through.
      // We limit the shift to exactly that amount (minus a tiny buffer).
      const MAX_POSSIBLE_SHIFT = 18; // We will move up to 18vh (leaving 2vh safety)
      
      // 3. Dynamic adjustment:
      // On mobile, the page is very long, so a linear 1-to-1 map feels slow.
      // On desktop, it's short. 
      // But keeping it mapped to 'progress * MAX' ensures we NEVER show the black bar.
      setBgOffset(-(progress * MAX_POSSIBLE_SHIFT));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // Recalculate on resize/rotate
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Server status polling
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

    fetchStatus(); 
    const intervalId = setInterval(fetchStatus, 10000); 

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

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
      {/* 1. BACKGROUND LAYER 
        - Height set to 120vh (20vh taller than screen).
        - Top set to 0.
        - As you scroll down, 'bgOffset' becomes negative (e.g. -18vh).
        - Since 120vh - 18vh > 100vh, we never see the bottom edge.
      */}
      <div
        className="fixed inset-0 -z-50 pointer-events-none overflow-hidden cross-section-bg"
        style={{
          height: '120vh', 
          top: 0,
          backgroundPositionY: `${bgOffset}vh`,
          backgroundSize: 'cover',
          backgroundPositionX: 'center'
        }}
      />

      {/* NAVIGATION BUTTON */}
      <Link href="/mods" className="absolute top-4 left-4 z-50 md:top-6 md:left-6 group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className = "bg-[#111827] text-[#FDF2FF] border-2 border-black px-3 py-1.5 text-sm md:px-8 md:py-4 md:text-base rounded-full font-bold shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2 cursor-pointer">
            <span>Mod List</span>
            <span className="text-base md:text-lg mt-[1px]">:)</span>
          </motion.div>
      </Link>

      {/* CONTENT LAYER */}
      <main className="flex flex-col items-center pb-24 z-10 relative overflow-x-hidden w-full">
        
        {/* SCRAPBOOK PHOTOS LAYER */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
           {SCRAPBOOK_PHOTOS.map((photo) => (
             <motion.div
               key={photo.id}
               className={`absolute p-1 xl:p-3 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.6)] ${photo.className}`}
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-50px" }}
             >
               <div className="relative overflow-hidden border border-gray-200 bg-gray-100 w-full h-full">
                 <Image 
                   src={photo.src} 
                   alt={photo.alt}
                   className="object-cover w-full h-auto"
                   placeholder="blur" 
                 />
               </div>
               
               {/* Tape Effect */}
               <div className="absolute -top-3 xl:-top-5 left-1/2 -translate-x-1/2 w-10 h-3 xl:w-16 xl:h-5 bg-[#ffffffaa] shadow-sm rotate-1" />
             </motion.div>
           ))}
        </div>

        {/* ---------------- HERO ---------------- */}
        <motion.div
          className="mt-6 mb-12 flex flex-col items-center gap-3 px-4 pt-10 relative z-10 w-full"
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <Image src={titleUCSC} alt="UCSC Logo" width={220} priority className="w-[160px] md:w-[220px]" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02, rotate: -0.5 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="w-full flex justify-center"
          >
            <Image
              src={titleMinecraft}
              alt="A Minecraft Server"
              width={820}
              className="max-w-[95vw] md:max-w-full drop-shadow-[0_6px_0_rgba(0,0,0,1)]"
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
              className="max-w-[120px] md:max-w-full drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]"
            />
          </motion.div>
        </motion.div>

        {/* ---------------- MAP + IP + DISCORD ---------------- */}
        <motion.section
          className="w-full max-w-[95vw] lg:max-w-[90vw] px-0 md:px-4 mb-20 relative z-10"
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
                  <p className="text-xs text-[#f9e9ff]/80 hidden md:block">
                    Check out what people are up to and help explore more of the map!
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

              <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] border-t border-white/10 flex-1 min-h-[300px]">
                <iframe
                  src="https://map.chickenjockey.lol/?worldname=world&mapname=flat&zoom=0&x=16&y=64&z=0"
                  title="ChickenJockey Dynmap"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right: IP info + Discord button */}
            <div className="flex flex-col gap-6">
              {/* Server info card */}
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
                    <div className="rounded-2xl bg-[#EDE9FF]/60 border border-white/20 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#4b5563] mb-1">
                        IP Address
                      </p>
                      <p className="font-mono text-sm md:text-base bg-[#EDE9FF]/60 inline-block px-2 py-1 rounded-lg border border-black break-all">
                        chickenjockey.lol
                      </p>
                      <p className="mt-1 text-[11px] text-[#4b5563]/70">
                        Java Edition · Fabric
                        {serverVersion ? ` · ${serverVersion} modded` : ""}
                      </p>
                    </div>

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

              {/* Discord CTA */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="show"
                className="group relative overflow-hidden bg-gradient-to-br from-[#ffb7d5] via-[#f9a8d4] to-[#60a5fa] border-4 border-black rounded-[32px] shadow-[0_12px_0_rgba(0,0,0,0.8)] px-6 py-6 md:px-8 md:py-8 text-[#111827]"
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <div className="pointer-events-none absolute -left-20 top-0 h-full w-32 translate-x-0 rotate-12 bg-gradient-to-b from-white/60 via-white/20 to-transparent opacity-0 group-hover:translate-x-[140%] group-hover:opacity-100 transition-all duration-700" />

                {/* Content */}
                <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xs uppercase tracking-[0.25em] mb-2">
                      Stay updated!
                    </p>
                    <h3 className="text-2xl md:text-3xl font-extrabold">
                      (IMPORTANT)
                    </h3>
                    <h3 className="text-2xl md:text-3xl font-extrabold">
                      Join the ChickenJockey Discord!
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-black/80">
                      It's where you'll find the full modpack download instructions,
                      server status updates, announcements, and community events.
                      Don't miss it!
                    </p>

                    <a
                      href="http://invite.chickenjockey.lol"
                      target="_blank"
                      rel="noreferrer"
                      // CHANGED: Removed 'max-w-sm', 'md:w-auto', 'md:mx-0'. Added 'w-full'.
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-black bg-[#111827] px-6 py-3 text-base md:px-8 md:py-3 md:text-lg font-semibold text-[#FDF2FF] shadow-[0_4px_0_rgba(0,0,0,0.8)] hover:translate-y-[-2px] transition-transform"
                    >
                      <span>Join Discord</span>
                      <span className="text-xl md:text-2xl mt-1">💬</span>
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.section>

        {/* ---------------- ABOUT / ANIMALS SECTION ---------------- */}
        <motion.section
          className="w-full max-w-[1280px] px-4 mb-20 relative z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="grid gap-30 lg:grid-cols-2 items-center">
            <motion.div variants={fadeUp} className="relative">
              <div className="space-y-4 bg-white/60 border-4 border-black rounded-[32px] shadow-[0_10px_0_rgba(0,0,0,0.7)] px-6 md:px-8 py-6 md:py-8 backdrop-blur-sm">
                <p className="text-sm tracking-[0.25em] uppercase text-[#1f2937]/70">
                  Play however you'd like
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]">
                  Build a silly little life on a silly little server!
                </h2>
                <p className="text-sm md:text-base text-[#111827]/80">
                  This is meant to be an SMP where you can choose your
                  challenges instead of being forced into them! The overworld has lots of 
                  cute guys, but if you want to go fight bosses in
                  new dimensions, we support that.
                </p>
                <ul className="list-disc list-inside text-sm md:text-base text-[#111827]/90 space-y-1.5">
                  <li>
                    <span className="font-semibold">Casual play:</span>{" "}
                    Decorate, farm, and explore cute structures!
                  </li>
                  <li>
                    <span className="font-semibold">Challenges:</span>{" "}
                    BoMD, Deeper &amp; Darker, etc.
                  </li>
                  <li>
                    <span className="font-semibold">Extras:</span> Proximity
                    Voice Chat, waystones, and more!
                  </li>
                </ul>
              </div>
            </motion.div>

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
                  className="absolute bottom-[-20%] md:bottom-[-160px] left-1/2 -translate-x-1/2 drop-shadow-[0_10px_0_rgba(0,0,0,0.7)] w-[80%] md:w-auto max-w-none"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ---------------- MODS SECTION ---------------- */}
        <div className="w-full max-w-[1280px] px-4 mt-20 relative z-10">
          <ModsSection />
        </div>
      </main>
    </>
  );
}