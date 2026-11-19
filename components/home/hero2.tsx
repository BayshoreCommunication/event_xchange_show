"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero2() {
  return (
    <section className="relative w-full bg-[#020813] overflow-hidden text-white flex items-center">
      {/* ---------------- LAYERED ATMOSPHERIC GRADIENTS ---------------- */}
      {/* 1. Core Emerald/Cyan glow in bottom-left corner exactly like screenshot */}
      <div
        className="absolute -bottom-24 -left-20 w-[380px] sm:w-[520px] lg:w-[680px] h-[380px] sm:h-[520px] lg:h-[680px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 215, 235, 0.28) 0%, rgba(0, 160, 200, 0.16) 35%, rgba(0, 110, 160, 0.08) 55%, transparent 72%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      {/* 2. Soft Ambient blue-cyan aura in middle-left */}
      <div
        className="absolute top-1/4 -left-10 w-[350px] lg:w-[480px] h-[350px] lg:h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 140, 220, 0.12) 0%, rgba(2, 246, 248, 0.04) 40%, transparent 68%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      {/* 3. Subtle background backlight around microphone on the right */}
      <div
        className="absolute top-1/3 right-10 lg:right-1/4 w-[320px] lg:w-[450px] h-[320px] lg:h-[450px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 180, 220, 0.06) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-14 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Image Column: On mobile order-1 (shows on top), on desktop order-2 (right side) */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-6 relative w-full h-[240px] sm:h-[320px] md:h-[380px] lg:h-[500px] xl:h-[560px]">
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex justify-center lg:justify-end items-center"
            >
              <Image
                src="/images/home/hero/hero2-bg.png"
                alt="Broadcast microphone with boom arm"
                fill
                priority
                sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 45vw, 100vw"
                className="object-contain object-center lg:object-right drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          </div>

          {/* Left Column: Heading & CTAs - On mobile order-2 (below image), on desktop order-1 */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-6 z-20">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[40px] sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[78px] font-extrabold text-white tracking-[-0.03em] leading-[1.08] sm:leading-[1.05]"
            >
              The
              <br />
              conversations
              <br />
              behind{" "}
              <span className="text-[#02F6F8] bg-gradient-to-r from-[#00C2FF] to-[#02F6F8] bg-clip-text text-transparent">
                great
              </span>
              <br />
              <span className="text-[#02F6F8]">events.</span>
            </motion.h1>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                href="#explore"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-black font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#02F6F8] to-[#0085F8] hover:shadow-[0_0_25px_rgba(2,246,248,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
              >
                Explore the conversations
              </Link>

              <Link
                href="#suggest"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-white font-medium text-xs sm:text-sm bg-[#041122]/40 border border-[#02F6F8]/40 hover:border-[#02F6F8] hover:bg-[#02F6F8]/10 hover:text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
              >
                Suggest a guest
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom subtle divider line */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-white/[0.08] pointer-events-none" />
    </section>
  );
}
