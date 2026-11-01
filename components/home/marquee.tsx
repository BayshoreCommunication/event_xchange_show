"use client";

import React from "react";
import { motion } from "framer-motion";

const TOPICS = [
  "People + paths",
  "Real decisions",
  "Planning + production",
  "What comes next",
  "Budgets + value",
  "Stakeholders",
];

export default function Marquee() {
  // Multiply topics to ensure seamless looping without gaps on any screen size
  const repeatedTopics = [...TOPICS, ...TOPICS, ...TOPICS, ...TOPICS];

  return (
    <section className="relative w-full bg-[#020813] border-y border-white/[0.08] py-3.5 sm:py-4 md:py-4.5 overflow-hidden select-none">
      {/* Left & Right subtle gradient fade masks for clean edge transition */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#020813] to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#020813] to-transparent z-10"
        aria-hidden="true"
      />

      {/* Infinite Scrolling Ticker Track */}
      <div className="flex w-max">
        <motion.div
          className="flex items-center shrink-0 will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 28,
            repeat: Infinity,
          }}
        >
          {repeatedTopics.map((topic, index) => (
            <div key={index} className="flex items-center shrink-0">
              <span className="text-xs sm:text-sm md:text-[15px] font-normal text-[#cfe6f4] hover:text-[#02F6F8] tracking-wide px-4 sm:px-6 md:px-8 transition-colors duration-200">
                {topic}
              </span>
              <span
                className="text-[#02F6F8]/40 text-sm sm:text-base select-none"
                aria-hidden="true"
              >
                ·
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
