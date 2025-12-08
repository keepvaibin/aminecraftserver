// components/NavButton.js
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NavButton() {
  return (
    <Link
      href="/"
      // CONTAINER CHANGES:
      // 1. Reduced pt-6 to pt-4 (less gap at the top).
      // 2. Added sm:max-w-md to keep it from getting TOO huge on tablets.
      className="
        group z-50 
        relative w-full flex justify-center pt-3 mb-0
        md:absolute md:top-6 md:left-6 md:w-auto md:block md:pt-0 md:mb-0
      "
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        // BUTTON VISUAL CHANGES:
        // 1. w-[90%]: Forces the button to stretch across the screen on mobile.
        // 2. justify-center: Ensures the text sits in the middle of that wide bar.
        // 3. md:w-auto & md:justify-start: Resets it to the "pill" shape on desktop.
        className="
          bg-[#111827] text-[#FDF2FF] border-2 border-black 
          w-[90%] flex justify-center items-center gap-2 py-3 rounded-full 
          
          md:w-auto md:justify-start md:px-8 md:py-4 md:text-base 
          
          text-sm font-bold shadow-[4px_4px_0_rgba(0,0,0,1)] 
          hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer
        "
      >
        <span>Main page</span>
        <span className="text-base md:text-lg mt-[1px]">:)</span>
      </motion.div>
    </Link>
  );
}