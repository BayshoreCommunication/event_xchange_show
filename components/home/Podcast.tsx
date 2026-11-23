"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
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

const BASE_EPISODES: Episode[] = [
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

// The 3 base episodes repeated 3 times = 9 slider items (each with a unique id).
// Replace with real episodes when they are available.
const EPISODES: Episode[] = Array.from({ length: 3 }, (_, round) =>
  BASE_EPISODES.map((ep) => ({ ...ep, id: `${ep.id}-${round + 1}` }))
).flat();

const AUTOPLAY_MS = 3500;
// Slider track is rendered twice so it can loop forward endlessly, one card at a time.
const SLIDE_COPIES = 2;

// Audio SoundWave graphic component matching screenshot
function SoundWave({ isPlaying, compact = false }: { isPlaying: boolean; compact?: boolean }) {
  const allBars = [5, 9, 15, 20, 11, 16, 22, 14, 18, 12, 6, 16, 20, 11, 16, 9, 5];
  const barHeights = compact ? allBars.slice(3, 12) : allBars;

  return (
    <div
      className={`flex items-center gap-[2.5px] px-1 select-none ${compact ? "h-5" : "h-6"}`}
      aria-hidden="true"
    >
      {barHeights.map((h, i) => (
        <span
          key={i}
          className={`w-[2px] rounded-full transition-all duration-200 ${
            isPlaying ? "bg-[#02F6F8] animate-pulse" : "bg-[#02F6F8]/60"
          }`}
          style={{
            height: isPlaying
              ? `${Math.max(4, (h * ((i % 3) + 1)) % (compact ? 18 : 22))}px`
              : `${compact ? Math.round(h * 0.8) : h}px`,
            transitionDelay: `${i * 25}ms`,
          }}
        />
      ))}
    </div>
  );
}

type CardProps = {
  ep: Episode;
  isPlaying: boolean;
  onToggle: () => void;
  isClone?: boolean;
};

// Big, fixed featured card (left of the slider)
function FeaturedCard({ ep, isPlaying, onToggle }: CardProps) {
  return (
    <article className="group relative flex flex-col h-full bg-[#071f31]/90 hover:bg-[#0a253c]/95 border border-white/[0.08] hover:border-[#02F6F8]/30 rounded-[20px] sm:rounded-[22px] p-3.5 sm:p-4 transition-all duration-300 shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
      <div className="relative w-full aspect-[4/3] md:aspect-[5/4] rounded-[14px] sm:rounded-2xl overflow-hidden bg-[#040e1a]">
        <Image
          src={ep.image}
          alt={ep.title}
          fill
          priority
          sizes="(min-width: 1280px) 310px, (min-width: 768px) 280px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: ep.objectPosition }}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? "Pause episode" : "Play episode"}
          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-xl hover:scale-110 hover:bg-[#02F6F8]/25 hover:border-[#02F6F8]/70 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-white text-white" />
          ) : (
            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
          )}
        </button>
      </div>

      <div className="flex flex-col flex-1 px-1 pt-4">
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#02F6F8] font-bold tracking-wider">{ep.episode}</span>
          <span className="text-[#8fa7be]">{ep.type}</span>
          <span className="text-[#8fa7be]">{ep.duration}</span>
        </div>

        <h3 className="mt-2.5 text-lg sm:text-xl xl:text-[22px] font-bold text-white group-hover:text-[#02F6F8] transition-colors leading-snug">
          {ep.title}
        </h3>

        <p className="mt-2 text-xs sm:text-[13px] text-[#8fa7be] leading-relaxed">
          {ep.description}
        </p>

        <div className="mt-auto pt-4">
          <div className="pt-3.5 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white hover:text-[#02F6F8] transition-colors cursor-pointer"
              >
                <span className="w-8 h-8 rounded-full bg-[#02F6F8] flex items-center justify-center text-[#020813] shadow-[0_0_15px_rgba(2,246,248,0.5)] hover:scale-105 active:scale-95 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-[#020813] text-[#020813]" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-[#020813] text-[#020813] ml-0.5" />
                  )}
                </span>
                <span>{isPlaying ? "Pause Episode" : "Play Episode"}</span>
              </button>
              <SoundWave isPlaying={isPlaying} />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] sm:text-xs text-[#6e859b]">
              <span>{ep.guest}</span>
              <span>{ep.role}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// Smaller card used inside the auto-advancing slider
function SmallCard({ ep, isPlaying, onToggle, isClone = false }: CardProps) {
  const tab = isClone ? -1 : undefined;

  return (
    <article
      aria-hidden={isClone || undefined}
      className="group relative flex flex-col h-full bg-[#071f31]/80 hover:bg-[#0a253c]/90 border border-white/[0.07] hover:border-[#02F6F8]/30 rounded-[18px] p-3 transition-all duration-300"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#040e1a]">
        <Image
          src={ep.image}
          alt={isClone ? "" : ep.title}
          fill
          sizes="(min-width: 768px) 220px, 75vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: ep.objectPosition }}
        />
        <button
          type="button"
          tabIndex={tab}
          onClick={onToggle}
          aria-label={isPlaying ? "Pause episode" : "Play episode"}
          className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg hover:scale-110 hover:bg-[#02F6F8]/25 hover:border-[#02F6F8]/70 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-white text-white" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
          )}
        </button>
      </div>

      <div className="flex flex-col flex-1 px-0.5 pt-3">
        <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px]">
          <span className="text-[#02F6F8] font-bold tracking-wider">{ep.episode}</span>
          <span className="text-[#8fa7be]">{ep.type}</span>
          <span className="text-[#8fa7be]">{ep.duration}</span>
        </div>

        <h3 className="mt-1.5 text-sm sm:text-[15px] font-bold text-white group-hover:text-[#02F6F8] transition-colors leading-snug line-clamp-2">
          {ep.title}
        </h3>

        <p className="mt-1.5 text-[11px] sm:text-xs text-[#8fa7be] leading-relaxed line-clamp-2">
          {ep.description}
        </p>

        <div className="mt-auto pt-3">
          <div className="pt-3 border-t border-white/[0.08]">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                tabIndex={tab}
                onClick={onToggle}
                className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white hover:text-[#02F6F8] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-6 h-6 rounded-full bg-[#02F6F8] flex items-center justify-center text-[#020813] shadow-[0_0_12px_rgba(2,246,248,0.45)]">
                  {isPlaying ? (
                    <Pause className="w-3 h-3 fill-[#020813] text-[#020813]" />
                  ) : (
                    <Play className="w-3 h-3 fill-[#020813] text-[#020813] ml-0.5" />
                  )}
                </span>
                <span>{isPlaying ? "Pause" : "Play Episode"}</span>
              </button>
              <SoundWave isPlaying={isPlaying} compact />
            </div>

            <div className="mt-2 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#6e859b]">
              <span className="truncate">{ep.guest}</span>
              <span className="truncate">{ep.role}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Podcast() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  // ---------------- SLIDER STATE ----------------
  const total = EPISODES.length;
  const slides = Array.from({ length: SLIDE_COPIES }, () => EPISODES).flat();

  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Measure one card + gap so the track moves exactly one card per step
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setStep(first.offsetWidth + gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => (i >= total ? i : i + 1));
  }, [total]);

  const prev = useCallback(() => {
    if (index > 0) {
      setAnimate(true);
      setIndex(index - 1);
      return;
    }
    // At the very start: jump (no animation) to the same card in the next copy, then slide back one
    setAnimate(false);
    setIndex(total);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(total - 1);
      })
    );
  }, [index, total]);

  const goTo = (target: number) => {
    setAnimate(true);
    setIndex(target);
  };

  // Once we have slid into the second copy, silently snap back to the first copy
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (index >= total) {
      setAnimate(false);
      setIndex(index - total);
    }
  };

  // Autoplay: advance one card at a time; pauses on hover/touch/focus, hidden tab and reduced motion
  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) next();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, next, total]);

  // Pagination: 3 dots, each dot covers a group of 3 cards
  const DOT_COUNT = 3;
  const perDot = Math.ceil(total / DOT_COUNT);
  const activeDot = Math.min(DOT_COUNT - 1, Math.floor((index % total) / perDot));

  return (
    <section className="relative w-full bg-[#02121c] text-white py-6 sm:py-10 lg:py-12 overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          
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
              viewport={{ once: false }}
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
              viewport={{ once: false }}
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

          {/* Right Column: big fixed featured card + auto-advancing slider of smaller cards.
              On md+ the panel bleeds to the right edge of the screen. */}
          <motion.div
            initial={{ opacity: 0, x: 140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 min-w-0 md:-mr-8 lg:mr-[calc(-3rem_-_max(0px,(100vw_-_80rem)/2))]"
          >
            <div
              className="relative flex flex-col md:flex-row md:items-start gap-4 lg:gap-5"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {/* Featured (fixed) */}
              <div className="w-full md:w-[280px] lg:w-[260px] xl:w-[300px] shrink-0">
                <FeaturedCard
                  ep={FEATURED_EPISODE}
                  isPlaying={playingId === FEATURED_EPISODE.id}
                  onToggle={() => togglePlay(FEATURED_EPISODE.id)}
                />
              </div>

              {/* Slider */}
              <div
                className="flex-1 min-w-0"
                role="region"
                aria-roledescription="carousel"
                aria-label="More episodes"
              >
                <div
                  className="overflow-hidden -my-2 py-2"
                  onTouchStart={(e) => {
                    touchStartX.current = e.touches[0].clientX;
                    setPaused(true);
                  }}
                  onTouchEnd={(e) => {
                    const start = touchStartX.current;
                    touchStartX.current = null;
                    setPaused(false);
                    if (start === null) return;
                    const dx = e.changedTouches[0].clientX - start;
                    if (dx < -40) next();
                    else if (dx > 40) prev();
                  }}
                >
                  <div
                    ref={trackRef}
                    onTransitionEnd={handleTransitionEnd}
                    className={`flex gap-3 sm:gap-4 ${
                      animate ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
                    }`}
                    style={{ transform: `translate3d(-${index * step}px,0,0)` }}
                  >
                    {slides.map((ep, i) => (
                      <div
                        key={`${ep.id}-${i}`}
                        className="w-[64%] sm:w-[42%] md:w-[200px] lg:w-[190px] xl:w-[215px] shrink-0"
                      >
                        <SmallCard
                          ep={ep}
                          isPlaying={playingId === ep.id}
                          onToggle={() => togglePlay(ep.id)}
                          isClone={i >= total}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination (centered under the slider cards) */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: DOT_COUNT }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goTo(i * perDot)}
                        aria-label={`Go to slide group ${i + 1}`}
                        aria-current={activeDot === i}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeDot === i ? "w-6 bg-[#02F6F8]" : "w-1.5 bg-white/25 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
