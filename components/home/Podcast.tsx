"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, Zap, ArrowLeft, ArrowRight } from "lucide-react";
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
  objectPosition: "center 30%",
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

function PlayRow({
  isPlaying,
  onToggle,
  tabIndex,
  size = "md",
}: {
  isPlaying: boolean;
  onToggle: () => void;
  tabIndex?: number;
  size?: "md" | "sm";
}) {
  const sm = size === "sm";
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={onToggle}
        className={`inline-flex items-center font-semibold text-white hover:text-[#02F6F8] transition-colors cursor-pointer whitespace-nowrap ${
          sm ? "gap-2 text-xs sm:text-[13px]" : "gap-2.5 text-sm sm:text-[15px]"
        }`}
      >
        <span
          className={`rounded-full bg-[#02F6F8] flex items-center justify-center text-[#020813] shadow-[0_0_14px_rgba(2,246,248,0.5)] ${
            sm ? "w-7 h-7" : "w-8 h-8 sm:w-9 sm:h-9"
          }`}
        >
          {isPlaying ? (
            <Pause className={`${sm ? "w-3 h-3" : "w-3.5 h-3.5"} fill-[#020813] text-[#020813]`} />
          ) : (
            <Play className={`${sm ? "w-3 h-3" : "w-3.5 h-3.5"} fill-[#020813] text-[#020813] ml-0.5`} />
          )}
        </span>
        <span>{isPlaying ? "Pause Episode" : "Play Episode"}</span>
      </button>
      <SoundWave isPlaying={isPlaying} compact={sm} />
    </div>
  );
}

function ImagePlayButton({
  isPlaying,
  onToggle,
  tabIndex,
  size = "md",
}: {
  isPlaying: boolean;
  onToggle: () => void;
  tabIndex?: number;
  size?: "md" | "sm";
}) {
  const sm = size === "sm";
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      onClick={onToggle}
      aria-label={isPlaying ? "Pause episode" : "Play episode"}
      className={`absolute inset-0 m-auto rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center text-white shadow-xl hover:scale-110 hover:bg-[#02F6F8]/30 active:scale-95 transition-all duration-300 cursor-pointer ${
        sm ? "w-10 h-10" : "w-12 h-12"
      }`}
    >
      {isPlaying ? (
        <Pause className={`${sm ? "w-4 h-4" : "w-5 h-5"} fill-white text-white`} />
      ) : (
        <Play className={`${sm ? "w-4 h-4" : "w-5 h-5"} fill-white text-white ml-0.5`} />
      )}
    </button>
  );
}

function EpisodeMeta({ ep, size = "md" }: { ep: Episode; size?: "md" | "sm" }) {
  return (
    <div
      className={`flex items-center whitespace-nowrap ${
        size === "sm"
          ? "gap-3 text-[11px] sm:text-xs"
          : "gap-3 sm:gap-4 text-xs sm:text-[13px]"
      }`}
    >
      <span className="text-[#02F6F8] font-bold tracking-wider">{ep.episode}</span>
      <span className="text-[#a9bccd]">{ep.type}</span>
      <span className="text-[#a9bccd]">{ep.duration}</span>
    </div>
  );
}

// One card design for all episodes; the featured one gets the glowing border + badge.
function EpisodeCard({
  ep,
  isPlaying,
  onToggle,
  isClone = false,
  featured = false,
}: CardProps & { featured?: boolean }) {
  const tab = isClone ? -1 : undefined;

  return (
    <article
      aria-hidden={isClone || undefined}
      className={`group relative flex flex-col h-full rounded-[22px] p-2.5 sm:p-3 transition-all duration-300 ${
        featured
          ? "bg-gradient-to-b from-[#0a2c40] to-[#071b2b] border-2 border-[#02F6F8]/80 shadow-[0_0_28px_rgba(2,246,248,0.35),inset_0_0_18px_rgba(2,246,248,0.08)] hover:shadow-[0_0_40px_rgba(2,246,248,0.5),inset_0_0_18px_rgba(2,246,248,0.1)]"
          : "bg-[#08202f]/90 border-2 border-[#02F6F8]/20 hover:border-[#02F6F8]/55 hover:shadow-[0_0_22px_rgba(2,246,248,0.18)]"
      }`}
    >
      <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-[#040e1a]">
        <Image
          src={ep.image}
          alt={isClone ? "" : ep.title}
          fill
          priority={featured}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: ep.objectPosition }}
        />
        {featured && (
          <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#02F6F8] px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-[#012232] shadow-[0_0_14px_rgba(2,246,248,0.6)]">
            <Zap className="w-3 h-3 fill-[#012232]" />
            Featured Episode
          </span>
        )}
        <ImagePlayButton isPlaying={isPlaying} onToggle={onToggle} tabIndex={tab} />
      </div>

      <div className="flex flex-col flex-1 px-1.5 pt-3.5 pb-1">
        <EpisodeMeta ep={ep} size="sm" />
        <h3
          className={`mt-1.5 text-lg 2xl:text-xl font-bold leading-[1.2] tracking-tight line-clamp-2 transition-colors ${
            featured ? "text-white" : "text-white group-hover:text-[#02F6F8]"
          }`}
        >
          {ep.title}
        </h3>
        <p className="mt-1.5 text-[13px] text-[#b4c4d3] leading-snug line-clamp-2">
          {ep.description}
        </p>
        <div className="mt-auto pt-3">
          <div className="pt-3 border-t border-white/[0.12]">
            <PlayRow isPlaying={isPlaying} onToggle={onToggle} tabIndex={tab} size="sm" />
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
        <div className="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)] 2xl:grid-cols-[350px_minmax(0,1fr)] gap-8 lg:gap-10 xl:gap-10 items-center xl:items-start">
          
          {/* Left Column: Heading, description, and CTAs */}
          <div className="min-w-0 text-center xl:text-left flex flex-col items-center xl:items-start">
            {/* Heading with Cursorless Typing Animation */}
            <TypingHeading
              as="h2"
              segments={PODCAST_TITLE_SEGMENTS}
              speedMs={32}
              ariaLabel="Hear the latest episodes in the podcast."
              className="text-[34px] sm:text-4xl md:text-5xl lg:text-5xl xl:text-[44px] 2xl:text-[46px] font-extrabold text-white leading-[1.12] tracking-tight"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mt-5 sm:mt-6 text-sm sm:text-[15px] text-[#8fa7be] leading-relaxed max-w-lg mx-auto xl:mx-0"
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
              className="mt-7 sm:mt-8 flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-start gap-3 xl:gap-2.5"
            >
              <Link
                href="#explore"
                className="inline-flex items-center justify-center px-6 xl:px-[18px] py-3 rounded-full text-black font-semibold text-xs sm:text-sm xl:text-[13px] bg-gradient-to-r from-[#02F6F8] to-[#0085F8] hover:shadow-[0_0_25px_rgba(2,246,248,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
              >
                Explore the conversations
              </Link>

              <Link
                href="#suggest"
                className="inline-flex items-center justify-center px-6 xl:px-[18px] py-3 rounded-full text-white font-medium text-xs sm:text-sm xl:text-[13px] bg-[#041122]/50 border border-white/20 hover:border-[#02F6F8] hover:text-[#02F6F8] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
              >
                Suggest a guest
              </Link>
            </motion.div>
          </div>

          {/* Right Column: 3 equal cards — fixed featured card + 2-card slider.
              On xl+ it extends into the empty right-side page margin so the cards are wider. */}
          <motion.div
            initial={{ opacity: 0, x: 140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 xl:mr-[calc(-1*max(0px,(100vw_-_80rem)/2))]"
          >
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
                {/* Featured (fixed) */}
                <div className="min-w-0">
                  <EpisodeCard
                    featured
                    ep={FEATURED_EPISODE}
                    isPlaying={playingId === FEATURED_EPISODE.id}
                    onToggle={() => togglePlay(FEATURED_EPISODE.id)}
                  />
                </div>

                {/* Slider */}
                <div
                  className="min-w-0 md:col-span-2 overflow-hidden -my-3 py-3"
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="More episodes"
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
                    className={`flex gap-4 h-full ${
                      animate ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
                    }`}
                    style={{ transform: `translate3d(-${index * step}px,0,0)` }}
                  >
                    {slides.map((ep, i) => (
                      <div
                        key={`${ep.id}-${i}`}
                        className="w-full md:w-[calc((100%_-_1rem)/2)] shrink-0"
                      >
                        <EpisodeCard
                          ep={ep}
                          isPlaying={playingId === ep.id}
                          onToggle={() => togglePlay(ep.id)}
                          isClone={i >= total}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrows (bottom-right) */}
              <div className="mt-5 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous episode"
                  className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:border-[#02F6F8] hover:text-[#02F6F8] active:scale-95 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next episode"
                  className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:border-[#02F6F8] hover:text-[#02F6F8] active:scale-95 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
