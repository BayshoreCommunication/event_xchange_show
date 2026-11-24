"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { EPISODES, episodeNumber, episodeUrl, formatDate, isReleased } from "data/podcast";
import EpisodeCard, { PlayDot, PlayEpisodeButton } from "components/podcast/EpisodeCard";
import { usePlayer } from "components/podcast/AudioPlayerProvider";
import { SuggestGuestButton } from "components/podcast/SuggestGuestProvider";
import SubscribeInline from "components/podcast/SubscribeInline";
import PageBackdrop from "components/podcast/PageBackdrop";
import Reveal from "components/podcast/Reveal";
import Wave from "components/podcast/Wave";
import { TypingHeading } from "components/ui/TypingTitle";
import { btnGhost, btnPrimary, btnSm, container, display, eyebrow, gradText, h2, lead, pill, pillOff, pillOn, sectionY, heroY } from "lib/ui";

type Sort = "new" | "old" | "short";
type Filters = { q: string; topic: string; format: string; sort: Sort };
const DEFAULT_FILTERS: Filters = { q: "", topic: "", format: "", sort: "new" };
const FILTER_KEY = "exs-filters";

const selectCls =
  "rounded-full border border-[#1c2e3f] bg-[#041122] px-4 py-3 text-sm sm:text-[15px] text-white outline-none cursor-pointer focus:border-[#00E5FF]/60";

export default function EpisodesView() {
  const { current, playing } = usePlayer();

  const released = useMemo(() => EPISODES.filter((e) => isReleased(e)), []);
  const latest = useMemo(
    () => released.slice().sort((a, b) => b.date.localeCompare(a.date) || b.number - a.number)[0],
    [released]
  );
  const newestNumber = Math.max(0, ...released.map((e) => e.number));
  const nextUp = useMemo(
    () => EPISODES.filter((e) => !isReleased(e)).sort((a, b) => a.date.localeCompare(b.date))[0],
    []
  );
  const minutes = released.reduce((s, e) => s + e.duration, 0);

  const topics = useMemo(() => Array.from(new Set(EPISODES.flatMap((e) => e.topics))).sort(), []);
  const formats = useMemo(() => Array.from(new Set(EPISODES.map((e) => e.format))).sort(), []);

  const [f, setF] = useState<Filters>(DEFAULT_FILTERS);
  const [query, setQuery] = useState("");

  // Restore filters for this browser tab
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(FILTER_KEY) || "null");
      if (saved) {
        setF({ ...DEFAULT_FILTERS, ...saved });
        setQuery(saved.q || "");
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(FILTER_KEY, JSON.stringify(f));
    } catch {}
  }, [f]);

  // Debounce the search box
  useEffect(() => {
    const t = setTimeout(() => setF((p) => ({ ...p, q: query })), 120);
    return () => clearTimeout(t);
  }, [query]);

  const list = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const matches = EPISODES.filter(
      (e) =>
        (!f.topic || e.topics.includes(f.topic)) &&
        (!f.format || e.format === f.format) &&
        (!q ||
          [e.title, e.summary, e.guest.name, e.guest.role, e.format, ...e.topics, episodeNumber(e.number)]
            .join(" ")
            .toLowerCase()
            .includes(q))
    );
    const by = {
      new: (a: (typeof EPISODES)[number], b: (typeof EPISODES)[number]) => b.number - a.number,
      old: (a: (typeof EPISODES)[number], b: (typeof EPISODES)[number]) => a.number - b.number,
      short: (a: (typeof EPISODES)[number], b: (typeof EPISODES)[number]) => a.duration - b.duration,
    }[f.sort];
    const sorted = matches.slice().sort(by);
    // Released episodes first, upcoming after (soonest first)
    return [
      ...sorted.filter((e) => isReleased(e)),
      ...sorted.filter((e) => !isReleased(e)).sort((a, b) => a.date.localeCompare(b.date)),
    ];
  }, [f]);

  const upcomingShown = list.filter((e) => !isReleased(e)).length;

  const clear = () => {
    setQuery("");
    setF((p) => ({ ...p, q: "", topic: "", format: "" }));
  };

  const stats = released.length
    ? `${released.length} episode${released.length > 1 ? "s" : ""} · ${minutes} minutes of conversation` +
      (nextUp ? ` · Next episode ${formatDate(nextUp.date, false)}` : "")
    : nextUp
    ? `First episode coming ${formatDate(nextUp.date)}`
    : "";

  return (
    <div className="bg-[#030A16] text-white">
      {/* ---------------- HERO ---------------- */}
      <section className={"relative isolate overflow-hidden text-center " + heroY}>
        <PageBackdrop src="/images/pages/hero-bg.jpg" priority />
        <div className={container}>
          <span className={eyebrow}>All episodes</span>
          <TypingHeading
            as="h1"
            className={display + " mt-5"}
            segments={[{ text: "Explore the", lineBreak: true }, { text: "conversations.", className: gradText }]}
            triggerOnView={false}
            ariaLabel="Explore the conversations."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href="#latest" className={btnPrimary}>
              Hear the latest
            </a>
            <SuggestGuestButton className={btnGhost} />
          </div>
          {stats && <p className="mt-6 text-[15px] text-[#94a9bf]">{stats}</p>}
        </div>
      </section>

      {/* ---------------- LATEST EPISODE ---------------- */}
      {latest && (
        <section id="latest" className={"scroll-mt-32 " + sectionY}>
          <div className={container}>
            <Reveal>
              <article
                className={`grid items-center gap-7 rounded-[28px] sm:rounded-[32px] border border-[#1c2e3f] bg-gradient-to-br from-[#0a253c]/70 to-[#041122]/95 p-4 sm:p-5 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:p-6`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[#061c2d]">
                  <Image
                    src={latest.image}
                    alt={latest.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                  <PlayDot ep={latest} />
                  <span className="absolute right-3 top-3 rounded-full border border-[#00E5FF]/40 bg-[#030A16]/75 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#00F0FF]">
                    Latest episode
                  </span>
                </div>
                <div className="px-1.5 pb-2 lg:px-2">
                  <div className="flex flex-wrap items-center gap-3 text-[13px] sm:text-sm text-[#94a9bf]">
                    <span className="font-bold text-[#00F0FF]">{episodeNumber(latest.number)}</span>
                    <span>{latest.format}</span>
                    <span>{latest.duration} min</span>
                    <span>{formatDate(latest.date)}</span>
                  </div>
                  <h2 className="mt-3 mb-3 text-[26px] sm:text-[32px] lg:text-[36px] font-bold leading-tight tracking-tight">
                    <Link href={episodeUrl(latest)} className="hover:text-[#00F0FF] transition-colors">
                      {latest.title}
                    </Link>
                  </h2>
                  <p className="text-base sm:text-lg leading-relaxed text-[#a9bccd]">{latest.summary}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <PlayEpisodeButton ep={latest} />
                    <Link href={episodeUrl(latest)} className={btnGhost + btnSm}>
                      Show notes
                    </Link>
                    <Wave bars={18} playing={current?.id === latest.id && playing} />
                  </div>
                  <div className="mt-6 flex justify-between gap-3 text-[13px] sm:text-sm text-[#6e859b]">
                    <span>{latest.guest.name}</span>
                    <span>{latest.guest.role}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- EVERY EPISODE ---------------- */}
      <section id="all" className={"scroll-mt-28 " + sectionY}>
        <div className={container}>
          <TypingHeading
            as="h2"
            className={h2 + " mb-7"}
            segments={[{ text: "Every " }, { text: "episode", className: gradText }]}
            ariaLabel="Every episode"
          />

          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative w-full lg:max-w-[440px]">
              <span className="sr-only">Search episodes</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94a9bf]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by topic, title or guest"
                autoComplete="off"
                className="w-full rounded-full border border-solid border-[#1c2e3f] bg-[#041122] py-3.5 pl-12 pr-5 text-[15px] sm:text-base text-white placeholder:text-[#6e859b] outline-none focus:border-[#00E5FF]/60"
              />
            </label>
            <div className="flex flex-wrap gap-2.5">
              <label className="sr-only" htmlFor="ep-format">
                Format
              </label>
              <select
                id="ep-format"
                value={f.format}
                onChange={(e) => setF((p) => ({ ...p, format: e.target.value }))}
                className={selectCls}
              >
                <option value="">All formats</option>
                {formats.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <label className="sr-only" htmlFor="ep-sort">
                Sort
              </label>
              <select
                id="ep-sort"
                value={f.sort}
                onChange={(e) => setF((p) => ({ ...p, sort: e.target.value as Sort }))}
                className={selectCls}
              >
                <option value="new">Newest first</option>
                <option value="old">Oldest first</option>
                <option value="short">Shortest first</option>
              </select>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            {["", ...topics].map((t) => (
              <button
                key={t || "all"}
                type="button"
                aria-pressed={f.topic === t}
                onClick={() => setF((p) => ({ ...p, topic: t }))}
                className={pill + (f.topic === t ? pillOn : pillOff)}
              >
                {t || "All topics"}
              </button>
            ))}
          </div>

          <p className="mb-5 text-sm sm:text-[15px] text-[#94a9bf]" aria-live="polite">
            {list.length
              ? `Showing ${list.length} episode${list.length > 1 ? "s" : ""}${
                  upcomingShown ? ` (${upcomingShown} coming soon)` : ""
                }`
              : ""}
          </p>

          {list.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((ep, i) => (
                <Reveal key={ep.id} delay={(i % 3) * 0.06} className="h-full">
                  <EpisodeCard ep={ep} released={isReleased(ep)} isNewest={ep.number === newestNumber} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-[#1c2e3f] px-5 py-14 text-center text-[#94a9bf]">
              <p className="mb-4 text-base">No episodes match that yet. Know someone who should talk about it?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button type="button" onClick={clear} className={btnGhost + btnSm}>
                  Clear filters
                </button>
                <SuggestGuestButton className={btnPrimary + btnSm} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- HAVE A STORY ---------------- */}
      <section className={"relative isolate overflow-hidden text-center " + sectionY}>
        <PageBackdrop src="/images/pages/studio-bg.jpg" overlay="dim" />
        <div className={container}>
          <TypingHeading
            as="h2"
            className="text-[34px] sm:text-[46px] lg:text-[60px] font-extrabold leading-[1.05] tracking-[-0.035em]"
            segments={[{ text: "Have a story", lineBreak: true }, { text: "the industry needs to hear?", className: gradText }]}
            ariaLabel="Have a story the industry needs to hear?"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link href="/be-a-guest#pitch" className={btnPrimary}>
              Pitch yourself or a colleague
            </Link>
            <SuggestGuestButton className={btnGhost} />
          </div>
        </div>
      </section>

      {/* ---------------- SUBSCRIBE ---------------- */}
      <section className={sectionY + " text-center"}>
        <div className={container}>
          <TypingHeading
            as="h2"
            className={h2}
            segments={[{ text: "Never miss a " }, { text: "conversation.", className: gradText }]}
            ariaLabel="Never miss a conversation."
          />
          <p className={lead + " mx-auto mt-5 max-w-[640px]"}>
            One useful idea from each episode, followed by a clear invitation to listen.
          </p>
          <div className="mx-auto mt-7 max-w-[540px]">
            <SubscribeInline id="episodes-sub-email" source="episodes" />
          </div>
          <p className="mt-3 text-[13px] text-[#6e859b]">
            No sales follow-ups. Unsubscribe anytime.{" "}
            <Link href="/subscribe" className="text-[#00F0FF] hover:underline">
              What you&apos;ll get →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
