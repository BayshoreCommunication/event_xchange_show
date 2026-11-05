"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { TypingHeading, TypingSegment } from "components/ui/TypingTitle";

const PODCAST_TITLE_SEGMENTS: readonly TypingSegment[] = [
  { text: "Hear the " },
  { text: "latest", className: "text-[#02F6F8]", lineBreak: true },
  { text: "episodes", className: "text-[#02F6F8]", lineBreak: true },
  { text: "in the podcast." },
] as const;

type Episode = {
  id: string;
  episode: string;
  type: string;
  duration: string;
  title: string;
  description: string;
  image: string;
  objectPosition: string;
  guest: string;
  role: string;
};

const FEATURED_EPISODE: Episode = {
  id: "featured-01",
  episode: "EP 01",
  type: "Interview",
  duration: "32 min",
  title: "Building buy-in across stakeholders",
  description:
    "How to bring the right people together, navigate competing priorities and move an event forward.",
  image: "/images/home/podcast/featured.png",
  objectPosition: "center 85%",
  guest: "[Guest Name]",
  role: "[Role/Organization]",
};

const EPISODES: Episode[] = [
  {
    id: "ep-01",
    episode: "EP 01",
    type: "Interview",
    duration: "32 min",
    title: "Building buy-in across stakeholders",
    description:
      "How to bring the right people together, navigate competing priorities and move an event forward.",
    image: "/images/home/podcast/ep1.png",
    objectPosition: "center 38%",
    guest: "[Guest Name]",
    role: "[Role/Organization]",
  },
  {
    id: "ep-02",
    episode: "EP 01",
    type: "Interview",
    duration: "32 min",
    title: "From idea to an incredible event",
    description:
      "The decisions, collaboration and creative thinking behind memorable live experiences.",
    image: "/images/home/podcast/ep2.png",
    objectPosition: "center 50%",
    guest: "[Guest Name]",
    role: "[Role/Organization]",
  },
  {
    id: "ep-03",
    episode: "EP 01",
    type: "Interview",
    duration: "32 min",
    title: "What I wish I knew at the start.",
    description:
      "A planner looks back on the first conference that went sideways, the moment that changed everything.",
    image: "/images/home/podcast/ep3.png",
    objectPosition: "center 28%",
    guest: "[Guest Name]",
    role: "[Role/Organization]",
  },
];

// Audio SoundWave graphic component matching screenshot
function SoundWave({ isPlaying }: { isPlaying: boolean }) {
  const barHeights = [5, 9, 15, 20, 11, 16, 22, 14, 18, 12, 6, 16, 20, 11, 16, 9, 5];

  return (
    <div className="flex items-center gap-[2.5px] h-6 px-1 select-none" aria-hidden="true">
      {barHeights.map((h, i) => (
        <span
          key={i}
          className={`w-[2px] rounded-full transition-all duration-200 ${
            isPlaying ? "bg-[#02F6F8] animate-pulse" : "bg-[#02F6F8]/60"
          }`}
          style={{
            height: isPlaying ? `${Math.max(4, (h * ((i % 3) + 1)) % 22)}px` : `${h}px`,
            transitionDelay: `${i * 25}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function Podcast() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full bg-[#02121c] text-white py-8 sm:py-16 lg:py-24 overflow-hidden">
      {/* ---------------- ATMOSPHERIC GRADIENTS (EXACT TO REFERENCE SCREENSHOT) ---------------- */}
      {/* 1. Base dark teal wash across entire section */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 85% 35%, rgba(0, 150, 190, 0.16) 0%, rgba(2, 26, 42, 0.6) 50%, rgba(2, 18, 28, 0.95) 85%, #02121c 100%)",
        }}
        aria-hidden="true"
      />

      {/* 2. Vibrant, tall cyan-teal aura along the entire middle-right edge (exact to screenshot) */}
      <div
        className="pointer-events-none absolute top-0 -right-16 sm:-right-12 lg:-right-6 w-[450px] sm:w-[600px] lg:w-[750px] xl:w-[850px] h-full"
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 100% 40%, rgba(0, 220, 245, 0.32) 0%, rgba(0, 160, 200, 0.2) 32%, rgba(2, 50, 80, 0.08) 60%, transparent 85%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* 3. Vibrant cyan-teal aura at top left behind heading */}
      <div
        className="pointer-events-none absolute -top-12 -left-16 sm:-left-10 w-[500px] sm:w-[650px] lg:w-[750px] h-[450px] sm:h-[550px] lg:h-[650px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(0, 215, 235, 0.24) 0%, rgba(0, 140, 180, 0.14) 38%, rgba(2, 40, 65, 0.05) 60%, transparent 75%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      {/* 4. Soft atmospheric cyan-blue aura behind featured card */}
      <div
        className="pointer-events-none absolute top-8 right-1/4 w-[450px] sm:w-[600px] h-[380px] sm:h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 180, 220, 0.14) 0%, rgba(2, 246, 248, 0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      {/* 5. Subtle bottom-right depth glow */}
      <div
        className="pointer-events-none absolute bottom-0 right-10 w-[500px] sm:w-[650px] h-[380px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 160, 200, 0.09) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        aria-hidden="true"
      />

      {/* ---------------- MAIN CONTENT WRAPPER ---------------- */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
        
        {/* ================ TOP SECTION: HEADLINE + FEATURED EPISODE ================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Heading, description, and CTAs */}
          <div className="lg:col-span-5 xl:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Heading with Cursorless Typing Animation */}
            <TypingHeading
              as="h2"
              segments={PODCAST_TITLE_SEGMENTS}
              speedMs={32}
              ariaLabel="Hear the latest episodes in the podcast."
              className="text-[34px] sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-extrabold text-white leading-[1.12] tracking-tight"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mt-5 sm:mt-6 text-sm sm:text-[15px] text-[#8fa7be] leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Come for someone else&apos;s story. Leave with a fresh perspective on your own work.
              For corporate and association planners, early-career professionals and seasoned
              leaders alike. Each episode pairs a real person with a real decision — and something
              worth taking back to your next program. An independent show, not a vendor pitch
              dressed as a podcast.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <Link
                href="#explore"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-black font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#02F6F8] to-[#0085F8] hover:shadow-[0_0_25px_rgba(2,246,248,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
              >
                Explore the conversations
              </Link>

              <Link
                href="#suggest"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full text-white font-medium text-xs sm:text-sm bg-[#041122]/50 border border-white/20 hover:border-[#02F6F8] hover:text-[#02F6F8] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
              >
                Suggest a guest
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Featured Episode Card (reveals in from the right edge) */}
          <motion.div
            initial={{ opacity: 0, x: 140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7"
          >
            <div className="relative group bg-[#061c2d]/75 hover:bg-[#0a253c]/85 backdrop-blur-xl border border-white/[0.08] hover:border-[#02F6F8]/30 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.55)]">
              <div className="flex flex-col sm:flex-row gap-5 lg:gap-6 items-stretch">
                
                {/* Guest Image with Center Play Button */}
                <div className="relative w-full sm:w-[220px] md:w-[250px] lg:w-[230px] xl:w-[255px] aspect-[4/3] sm:aspect-square shrink-0 rounded-2xl overflow-hidden bg-[#040e1a]">
                  <Image
                    src={FEATURED_EPISODE.image}
                    alt={FEATURED_EPISODE.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 240px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: FEATURED_EPISODE.objectPosition }}
                  />
                  {/* Frosted Glass Play Button on Image */}
                  <button
                    type="button"
                    onClick={() => togglePlay(FEATURED_EPISODE.id)}
                    aria-label={playingId === FEATURED_EPISODE.id ? "Pause episode" : "Play episode"}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-xl hover:scale-110 hover:bg-[#02F6F8]/25 hover:border-[#02F6F8]/70 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    {playingId === FEATURED_EPISODE.id ? (
                      <Pause className="w-5 h-5 fill-white text-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Episode Details */}
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    {/* Meta Tags */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-[#02F6F8] font-bold tracking-wider">
                        {FEATURED_EPISODE.episode}
                      </span>
                      <span className="text-[#8fa7be]">{FEATURED_EPISODE.type}</span>
                      <span className="text-[#8fa7be]">{FEATURED_EPISODE.duration}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-lg sm:text-xl md:text-[22px] font-bold text-white group-hover:text-[#02F6F8] transition-colors leading-snug">
                      {FEATURED_EPISODE.title}
                    </h3>

                    {/* Subtitle / Description */}
                    <p className="mt-2 text-xs sm:text-sm text-[#8fa7be] leading-relaxed">
                      {FEATURED_EPISODE.description}
                    </p>
                  </div>

                  {/* Audio Controls and Guest Row */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08]">
                    {/* Play row with Audio Soundwave */}
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => togglePlay(FEATURED_EPISODE.id)}
                        className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white hover:text-[#02F6F8] transition-colors cursor-pointer"
                      >
                        <span className="w-8 h-8 rounded-full bg-[#02F6F8] flex items-center justify-center text-[#020813] shadow-[0_0_15px_rgba(2,246,248,0.5)] hover:scale-105 active:scale-95 transition-transform">
                          {playingId === FEATURED_EPISODE.id ? (
                            <Pause className="w-3.5 h-3.5 fill-[#020813] text-[#020813]" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-[#020813] text-[#020813] ml-0.5" />
                          )}
                        </span>
                        <span>{playingId === FEATURED_EPISODE.id ? "Pause Episode" : "Play Episode"}</span>
                      </button>

                      {/* Soundwave */}
                      <SoundWave isPlaying={playingId === FEATURED_EPISODE.id} />
                    </div>

                    {/* Guest name & role */}
                    <div className="mt-4 flex items-center justify-between text-[11px] sm:text-xs text-[#6e859b]">
                      <span>{FEATURED_EPISODE.guest}</span>
                      <span>{FEATURED_EPISODE.role}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* ================ BOTTOM SECTION: 3 EPISODE CARDS ================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-8 sm:mt-12 lg:mt-16">
          {EPISODES.map((ep, idx) => {
            // Card reveal directions matching user's arrow diagram:
            // idx 0 (left card): reveals in from the left (← arrow on left pointing right)
            // idx 1 (middle card): reveals in from the bottom (↑ arrow from bottom)
            // idx 2 (right card): reveals in from the right (← arrow from right pointing left)
            const initialPos =
              idx === 0
                ? { opacity: 0, x: -120, y: 0 }
                : idx === 1
                ? { opacity: 0, x: 0, y: 120 }
                : { opacity: 0, x: 120, y: 0 };

            return (
              <motion.div
                key={ep.id}
                initial={initialPos}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.85,
                  delay: idx * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between bg-[#061c2d]/75 hover:bg-[#0a253c]/85 backdrop-blur-xl border border-white/[0.08] hover:border-[#02F6F8]/30 rounded-[24px] sm:rounded-[26px] p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(2,246,248,0.06)] group"
              >
              <div>
                {/* Top Card Image with Frosted Play Button */}
                <div className="relative w-full aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden bg-[#040e1a] mb-5">
                  <Image
                    src={ep.image}
                    alt={ep.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: ep.objectPosition }}
                  />
                  {/* Frosted Glass Play Button on Image */}
                  <button
                    type="button"
                    onClick={() => togglePlay(ep.id)}
                    aria-label={playingId === ep.id ? "Pause episode" : "Play episode"}
                    className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg hover:scale-110 hover:bg-[#02F6F8]/25 hover:border-[#02F6F8]/70 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    {playingId === ep.id ? (
                      <Pause className="w-4 h-4 fill-white text-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Metadata Tags */}
                <div className="flex items-center gap-3 text-xs mb-3">
                  <span className="text-[#02F6F8] font-bold tracking-wider">{ep.episode}</span>
                  <span className="text-[#8fa7be]">{ep.type}</span>
                  <span className="text-[#8fa7be]">{ep.duration}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#02F6F8] transition-colors leading-snug">
                  {ep.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-[#8fa7be] leading-relaxed mb-6">
                  {ep.description}
                </p>
              </div>

              {/* Bottom Player & Info Area */}
              <div className="pt-4 border-t border-white/[0.08]">
                {/* Play row with SoundWave */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => togglePlay(ep.id)}
                    className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white hover:text-[#02F6F8] transition-colors cursor-pointer"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#02F6F8] flex items-center justify-center text-[#020813] shadow-[0_0_15px_rgba(2,246,248,0.5)] hover:scale-105 active:scale-95 transition-transform">
                      {playingId === ep.id ? (
                        <Pause className="w-3.5 h-3.5 fill-[#020813] text-[#020813]" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-[#020813] text-[#020813] ml-0.5" />
                      )}
                    </span>
                    <span>{playingId === ep.id ? "Pause Episode" : "Play Episode"}</span>
                  </button>

                  <SoundWave isPlaying={playingId === ep.id} />
                </div>

                {/* Guest name & role */}
                <div className="mt-4 flex items-center justify-between text-[11px] sm:text-xs text-[#6e859b]">
                  <span>{ep.guest}</span>
                  <span>{ep.role}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
        </div>

      </div>
    </section>
  );
}
