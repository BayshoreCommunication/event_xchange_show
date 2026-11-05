"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypingHeading, TypingSegment } from "components/ui/TypingTitle";

const HERO_TITLE_SEGMENTS: readonly TypingSegment[] = [
  { text: "The", lineBreak: true },
  { text: "conversations", lineBreak: true },
  { text: "behind " },
  {
    text: "great",
    className: "bg-gradient-to-r from-[#00F0FF] via-[#00C4FB] to-[#07A6F7] bg-clip-text text-transparent",
    lineBreak: true,
  },
  { text: "events.", className: "text-[#00F0FF]" },
] as const;

/**
 * 6 wide animated audio equalizer capsule bars:
 * Positioned behind the top-right of the Event XChange speech bubble badge.
 * Continuously bounces and pulses like a live music equalizer / audio spectrum.
 */
interface EqualizerBarConfig {
  readonly id: number;
  readonly heightPercent: number;
  readonly scaleY: readonly number[];
  readonly duration: number;
  readonly delay: number;
}

const EQUALIZER_BARS: readonly EqualizerBarConfig[] = [
  {
    id: 1,
    heightPercent: 45,
    scaleY: [0.35, 0.95, 0.45, 0.8, 0.35],
    duration: 1.4,
    delay: 0,
  },
  {
    id: 2,
    heightPercent: 75,
    scaleY: [0.45, 1.0, 0.35, 0.85, 0.45],
    duration: 1.1,
    delay: 0.15,
  },
  {
    id: 3,
    heightPercent: 90,
    scaleY: [0.5, 0.95, 0.6, 1.0, 0.5],
    duration: 1.6,
    delay: 0.05,
  },
  {
    id: 4,
    heightPercent: 100,
    scaleY: [0.6, 0.35, 1.0, 0.55, 0.6],
    duration: 1.25,
    delay: 0.2,
  },
  {
    id: 5,
    heightPercent: 100,
    scaleY: [0.45, 0.9, 0.3, 0.85, 0.45],
    duration: 1.5,
    delay: 0.1,
  },
  {
    id: 6,
    heightPercent: 100,
    scaleY: [0.55, 1.0, 0.45, 0.75, 0.55],
    duration: 1.35,
    delay: 0.25,
  },
] as const;

export default function Hero3() {
  return (
    <section
      aria-label="Hero: The Event XChange Show"
      className="relative w-full bg-[#030A16] overflow-hidden text-white"
    >
      {/* ---------------- ATMOSPHERIC BACKGROUND LAYERS ---------------- */}
      {/* 1. Base dark blue-teal atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(90% 90% at 80% 25%, rgba(0, 110, 180, 0.22) 0%, rgba(2, 26, 40, 0.7) 45%, rgba(1, 20, 30, 0.96) 80%, #030A16 100%)",
        }}
        aria-hidden="true"
      />

      {/* 2. Soft cyan glow on bottom-left for text contrast */}
      <div
        className="absolute -bottom-28 -left-20 w-[420px] sm:w-[560px] lg:w-[680px] h-[420px] sm:h-[560px] lg:h-[680px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 215, 235, 0.12) 0%, rgba(0, 130, 190, 0.05) 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
        aria-hidden="true"
      />

      {/* 3. Top-right ambient bloom illuminating the equalizer bars and badge */}
      <div
        className="absolute -top-24 -right-16 w-[450px] sm:w-[600px] lg:w-[750px] h-[450px] sm:h-[600px] lg:h-[750px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 75% 25%, rgba(2, 246, 248, 0.28) 0%, rgba(0, 133, 248, 0.18) 32%, rgba(0, 60, 130, 0.08) 55%, transparent 75%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      {/* 4. Top-right sharp luminous flare */}
      <div
        className="absolute -top-10 -right-10 w-[200px] sm:w-[280px] lg:w-[340px] h-[200px] sm:h-[280px] lg:h-[340px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.85) 0%, rgba(2, 246, 248, 0.45) 28%, rgba(0, 140, 255, 0.15) 55%, transparent 75%)",
          filter: "blur(35px)",
        }}
        aria-hidden="true"
      />

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 lg:pt-24 pb-8 sm:pb-16 lg:pb-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Action Buttons */}
          <div className="lg:col-span-7 xl:col-span-6 z-20 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Main Headline with Cursorless Typing Animation */}
            <TypingHeading
              as="h1"
              segments={HERO_TITLE_SEGMENTS}
              triggerOnView={false}
              delayMs={150}
              speedMs={32}
              ariaLabel="The conversations behind great events."
              className="text-[36px] xs:text-[42px] sm:text-[54px] md:text-6xl lg:text-[68px] xl:text-[76px] font-extrabold text-white tracking-[-0.035em] leading-[1.08] sm:leading-[1.05]"
            />

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mt-7 sm:mt-9 lg:mt-11 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4"
            >
              <Link
                href="#explore"
                aria-label="Explore the podcast conversations"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-[#012232] font-semibold text-xs sm:text-[13px] md:text-sm bg-gradient-to-r from-[#00E5FF] to-[#00C2FF] hover:from-[#00F0FF] hover:to-[#00D5F8] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030A16] transition-all duration-300 whitespace-nowrap"
              >
                Explore the conversations
              </Link>

              <Link
                href="#suggest"
                aria-label="Suggest a guest for the podcast"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-white font-medium text-xs sm:text-[13px] md:text-sm border border-white/25 hover:border-[#00E5FF]/70 hover:bg-white/[0.06] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030A16] transition-all duration-300 whitespace-nowrap"
              >
                Suggest a guest
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Event XChange Show Badge & Wide Background Equalizer Bars */}
          <div className="lg:col-span-5 xl:col-span-6 relative w-full flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 70, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] xl:max-w-[600px]"
            >
              {/* Soft backlight aura directly behind speech bubble badge */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] lg:w-[460px] h-[280px] sm:h-[380px] lg:h-[460px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0, 180, 240, 0.22) 0%, rgba(0, 110, 210, 0.1) 40%, transparent 70%)",
                  filter: "blur(50px)",
                }}
                aria-hidden="true"
              />

              {/* 
                Wide Animated Equalizer Bars matching live music rhythm:
                - Positioned behind the top-right of the badge (z-0)
                - Continuously dances up and down like a live music equalizer
                - GPU-accelerated scaleY with origin-bottom
              */}
              <div
                className="absolute -top-8 sm:-top-12 lg:-top-16 -right-20 sm:-right-28 md:-right-36 lg:-right-48 xl:-right-60 2xl:-right-72 h-[220px] sm:h-[280px] md:h-[340px] lg:h-[390px] xl:h-[430px] flex items-end gap-2 sm:gap-2.5 md:gap-3.5 lg:gap-4 xl:gap-5 z-0 pointer-events-none opacity-60 sm:opacity-65 lg:opacity-75"
                aria-hidden="true"
              >
                {EQUALIZER_BARS.map((bar) => (
                  <motion.div
                    key={bar.id}
                    style={{ height: `${bar.heightPercent}%` }}
                    animate={{
                      scaleY: [...bar.scaleY],
                      opacity: [0.75, 1, 0.7, 0.95, 0.75],
                    }}
                    transition={{
                      duration: bar.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: bar.delay,
                    }}
                    className="origin-bottom w-3 sm:w-4 md:w-5 lg:w-6 xl:w-7 2xl:w-8 rounded-full bg-gradient-to-t from-transparent via-[#005596]/75 to-[#008bd6] shadow-[0_0_16px_rgba(0,139,214,0.4)]"
                  />
                ))}
              </div>

              {/* The Event XChange Show Speech-Bubble Logo Badge with Reveal-Up */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full aspect-[632/408]"
              >
                <Image
                  src="/images/home/hero/hero3-bg.png"
                  alt="The Event XChange Show - Where Planning Meets Production logo"
                  fill
                  priority
                  sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 45vw, 95vw"
                  className="object-contain object-center lg:object-right select-none drop-shadow-[0_15px_45px_rgba(0,180,240,0.22)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}