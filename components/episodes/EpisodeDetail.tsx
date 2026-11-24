"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Clock, Link2, Play, Pause } from "lucide-react";
import {
  EPISODES,
  Episode,
  HOSTS,
  PODCAST_CONFIG,
  episodeNumber,
  episodeUrl,
  formatDate,
  isReleased,
  toSeconds,
} from "data/podcast";
import { usePlayer } from "components/podcast/AudioPlayerProvider";
import EpisodeCard, { PlayDot } from "components/podcast/EpisodeCard";
import { SuggestGuestButton } from "components/podcast/SuggestGuestProvider";
import SubscribeInline from "components/podcast/SubscribeInline";
import PageBackdrop from "components/podcast/PageBackdrop";
import Reveal from "components/podcast/Reveal";
import Wave from "components/podcast/Wave";
import { TypingHeading } from "components/ui/TypingTitle";
import { readLocal, writeLocal } from "lib/forms";
import { btnGhost, btnPrimary, btnSm, card, container, eyebrow, gradText, h2, heroY, lead, panel, sectionBottom, sectionY } from "lib/ui";

const SAVED_KEY = "exs-saved";
const P = PODCAST_CONFIG.platforms;
const ALSO_ON = [
  { name: "Apple Podcasts", href: P.apple },
  { name: "Spotify", href: P.spotify },
  { name: "YouTube", href: P.youtube },
  { name: "Amazon Music", href: P.amazon },
];

const iconBtn =
  "grid place-items-center w-12 h-12 rounded-full border border-solid border-white/25 text-white transition-all hover:border-[#00E5FF]/70 hover:bg-white/[0.06] cursor-pointer aria-pressed:border-[#00E5FF] aria-pressed:text-[#00F0FF]";

export default function EpisodeDetail({ ep }: { ep: Episode }) {
  const { current, playing, realTime, play, load, seekReal } = usePlayer();
  const out = isReleased(ep);
  const isCurrent = current?.id === ep.id;
  const on = isCurrent && playing;

  const [saved, setSaved] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setSaved(readLocal<string[]>(SAVED_KEY, []).includes(ep.id));
  }, [ep.id]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const sorted = useMemo(() => EPISODES.slice().sort((a, b) => a.number - b.number), []);
  const idx = sorted.findIndex((e) => e.id === ep.id);
  const prev = sorted[idx - 1];
  const next = sorted[idx + 1];

  const related = useMemo(
    () =>
      sorted
        .filter((e) => e.id !== ep.id)
        .map((e) => ({
          e,
          s:
            e.topics.filter((t) => ep.topics.includes(t)).length * 10 +
            (isReleased(e) ? 5 : 0) -
            Math.abs(e.number - ep.number),
        }))
        .sort((a, b) => b.s - a.s)
        .slice(0, 3)
        .map((x) => x.e),
    [sorted, ep]
  );
  const newestNumber = Math.max(0, ...EPISODES.filter((e) => isReleased(e)).map((e) => e.number));

  // Highlight the chapter the player is in
  const activeChapter = useMemo(() => {
    if (!isCurrent) return -1;
    let i = 0;
    ep.chapters.forEach((c, ci) => {
      if (toSeconds(c.time) <= realTime) i = ci;
    });
    return i;
  }, [isCurrent, realTime, ep.chapters]);

  const share = async () => {
    const url = window.location.origin + episodeUrl(ep);
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copied");
    } catch {
      setToast("Copy this link: " + url);
    }
  };

  const toggleSave = () => {
    const list = readLocal<string[]>(SAVED_KEY, []);
    const nowSaved = !list.includes(ep.id);
    writeLocal(SAVED_KEY, nowSaved ? [...list, ep.id] : list.filter((x) => x !== ep.id));
    setSaved(nowSaved);
    setToast(nowSaved ? "Saved for later" : "Removed from saved");
  };

  const jumpTo = (seconds: number) => {
    if (!isCurrent) load(ep, 0, false);
    seekReal(seconds);
  };

  return (
    <div className="bg-[#030A16] text-white">
      {/* ---------------- HERO ---------------- */}
      <section className={"relative isolate overflow-hidden " + heroY}>
        <PageBackdrop src="/images/pages/hero-bg.jpg" priority />
        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-sm text-[#94a9bf]">
            <Link href="/" className="hover:text-[#00F0FF]">
              Home
            </Link>
            <span>/</span>
            <Link href="/episodes" className="hover:text-[#00F0FF]">
              Episodes
            </Link>
            <span>/</span>
            <span aria-current="page">{episodeNumber(ep.number)}</span>
          </nav>

          <div className="grid items-center gap-9 lg:grid-cols-[1fr_1.05fr]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-[#1c2e3f] bg-[#061c2d] shadow-[0_30px_80px_rgba(0,0,0,0.45),0_0_60px_rgba(0,229,255,0.12)]">
              <Image
                src={ep.image}
                alt={ep.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {out && <PlayDot ep={ep} size="lg" />}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#94a9bf]">
                <span className="font-bold text-[#00F0FF]">{episodeNumber(ep.number)}</span>
                <span>{ep.format}</span>
                <span>{ep.duration} min</span>
                <span>{out ? formatDate(ep.date) : "Coming " + formatDate(ep.date)}</span>
              </div>
              <TypingHeading
                key={ep.id}
                as="h1"
                className="my-4 text-[32px] sm:text-[44px] lg:text-[54px] font-extrabold leading-[1.06] tracking-[-0.035em]"
                segments={[{ text: ep.title }]}
                triggerOnView={false}
                ariaLabel={ep.title}
              />
              <p className="text-lg sm:text-xl leading-relaxed text-[#a9bccd]">{ep.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {ep.topics.map((t) => (
                  <Link
                    key={t}
                    href="/episodes#all"
                    className="rounded-full border border-[#202e3d] px-3 py-1.5 text-[13px] text-[#cbd5e1] hover:border-[#00E5FF]/50"
                  >
                    {t}
                  </Link>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {out ? (
                  <button type="button" onClick={() => play(ep.id)} className={btnPrimary}>
                    {on ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    {on ? "Pause" : isCurrent ? "Resume" : "Play Episode"}
                  </button>
                ) : (
                  <Link href="/subscribe" className={btnPrimary}>
                    <Clock className="w-4 h-4" />
                    Get notified when it&apos;s out
                  </Link>
                )}
                <button type="button" onClick={share} className={iconBtn} aria-label="Copy link to this episode" title="Copy link">
                  <Link2 className="w-[18px] h-[18px]" />
                </button>
                <button
                  type="button"
                  onClick={toggleSave}
                  className={iconBtn}
                  aria-pressed={saved}
                  aria-label="Save for later"
                  title="Save for later"
                >
                  <Bookmark className={`w-[18px] h-[18px] ${saved ? "fill-current" : ""}`} />
                </button>
                {out && <Wave bars={16} playing={on} />}
              </div>

              <p className="mt-6 text-sm text-[#94a9bf]">
                Also on{" "}
                {ALSO_ON.map((p, i) => (
                  <React.Fragment key={p.name}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-[#00F0FF]">
                      {p.name}
                    </a>
                    {i < ALSO_ON.length - 2 ? ", " : i === ALSO_ON.length - 2 ? " and " : ""}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CONTENT + SIDEBAR ---------------- */}
      <section className={sectionY}>
        <div className={container + " grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]"}>
          <div>
            <Reveal className="mb-11">
              <TypingHeading
                as="h2"
                className="mb-3.5 text-[26px] sm:text-[28px] font-bold tracking-tight"
                segments={[{ text: "About this episode" }]}
                ariaLabel="About this episode"
              />
              {ep.notes.map((p) => (
                <p key={p} className="mb-4 text-base sm:text-lg leading-relaxed text-[#cbd5e1]">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal className="mb-11 rounded-[20px] border border-[#00E5FF]/35 bg-gradient-to-br from-[#00E5FF]/[0.12] to-[#0085F8]/[0.06] px-6 py-6 sm:px-7">
              <span className={eyebrow}>Take this back to your next program</span>
              <p className="mt-2.5 text-lg sm:text-xl font-semibold leading-snug tracking-tight text-white">{ep.takeaway}</p>
            </Reveal>

            <Reveal className="mb-11">
              <TypingHeading
                as="h2"
                className="mb-3.5 text-[26px] sm:text-[28px] font-bold tracking-tight"
                segments={[{ text: "Chapters" }]}
                ariaLabel="Chapters"
              />
              <ol className="overflow-hidden rounded-[20px] border border-[#1c2e3f]">
                {ep.chapters.map((c, i) => (
                  <li key={c.time} className={i ? "border-t border-[#1c2e3f]" : ""}>
                    <button
                      type="button"
                      disabled={!out}
                      onClick={() => jumpTo(toSeconds(c.time))}
                      className={`flex w-full items-center gap-5 px-5 py-4 text-left text-[15px] sm:text-base transition-colors enabled:hover:bg-white/[0.04] enabled:cursor-pointer disabled:text-[#94a9bf] ${
                        i === activeChapter ? "bg-[#00E5FF]/[0.08]" : ""
                      }`}
                    >
                      <span className="min-w-[48px] text-sm font-bold tabular-nums text-[#00F0FF]">{c.time}</span>
                      <span>{c.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
              {out && <p className="mt-2.5 text-[13px] text-[#6e859b]">Select a chapter to jump straight to it.</p>}
            </Reveal>

            <Reveal className="mb-11">
              <blockquote className="rounded-r-2xl border-l-[3px] border-[#00F0FF] bg-[#041122]/80 px-6 py-6 text-lg sm:text-xl italic text-white sm:px-7">
                “{ep.quote}”
                <cite className="mt-2.5 block text-sm not-italic text-[#94a9bf]">
                  {ep.guest.name}, {episodeNumber(ep.number)}
                </cite>
              </blockquote>
            </Reveal>

            <Reveal className="mb-4">
              <TypingHeading
                as="h2"
                className="mb-3.5 text-[26px] sm:text-[28px] font-bold tracking-tight"
                segments={[{ text: "From the conversation" }]}
                ariaLabel="From the conversation"
              />
              <div
                id="transcript"
                className={`relative overflow-hidden ${transcriptOpen ? "" : "max-h-[230px]"}`}
              >
                {ep.transcript.map((t, i) => (
                  <p key={i} className="mb-4 text-base sm:text-lg leading-relaxed text-[#cbd5e1]">
                    <b className="font-semibold text-[#00F0FF]">
                      {t.speaker === "Guest" ? ep.guest.name : t.speaker}:
                    </b>{" "}
                    {t.line}
                  </p>
                ))}
                {!transcriptOpen && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#030A16]" />
                )}
              </div>
              <button
                type="button"
                aria-expanded={transcriptOpen}
                aria-controls="transcript"
                onClick={() => setTranscriptOpen((v) => !v)}
                className={btnGhost + btnSm + " mt-3.5"}
              >
                {transcriptOpen ? "Show less" : "Read more of the transcript"}
              </button>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="grid content-start gap-5 lg:sticky lg:top-32">
            <Reveal className={card + " p-6 sm:p-7"}>
              <span className={eyebrow}>Guest</span>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#061c2d]">
                  <Image src={ep.guest.image} alt={ep.guest.name} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <b className="block text-base">{ep.guest.name}</b>
                  <small className="text-sm text-[#94a9bf]">{ep.guest.role}</small>
                </div>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#a9bccd]">{ep.guest.bio}</p>
            </Reveal>

            <Reveal className={card + " p-6 sm:p-7"}>
              <span className={eyebrow}>Your hosts</span>
              {HOSTS.map((h) => (
                <div key={h.id} className="mt-4 flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#061c2d]">
                    <Image src={h.image} alt={h.name} fill sizes="64px" className="object-cover object-top" />
                  </div>
                  <div>
                    <b className="block text-base">{h.name}</b>
                    <small className="text-sm text-[#94a9bf]">{h.role}</small>
                  </div>
                </div>
              ))}
              <p className="mt-4 text-[15px] leading-relaxed text-[#a9bccd]">
                Twenty-five years each in live event production, asking the questions event professionals actually want
                answered.
              </p>
              <Link href="/#hosts" className={btnGhost + btnSm + " mt-5"}>
                Meet the hosts
              </Link>
            </Reveal>

            <Reveal className={card + " p-6 sm:p-7"}>
              <span className={eyebrow}>Get the weekly idea</span>
              <p className="mt-3.5 mb-4 text-[15px] leading-relaxed text-[#a9bccd]">
                One useful idea from each episode, in your inbox.
              </p>
              <SubscribeInline id="side-email" variant="stacked" source="episode" />
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ---------------- PREV / NEXT ---------------- */}
      <section className={sectionBottom}>
        <nav aria-label="More episodes" className={container + " grid gap-4 sm:grid-cols-2"}>
          {prev ? (
            <Link
              href={episodeUrl(prev)}
              className="rounded-[20px] border border-[#1c2e3f] bg-[#041122]/80 px-6 py-5 transition-colors hover:border-[#00E5FF]/50"
            >
              <small className="text-xs font-bold uppercase tracking-[0.08em] text-[#94a9bf]">
                ← Previous · {episodeNumber(prev.number)}
              </small>
              <b className="mt-1.5 block text-lg tracking-tight">{prev.title}</b>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={episodeUrl(next)}
              className="rounded-[20px] border border-[#1c2e3f] bg-[#041122]/80 px-6 py-5 text-right transition-colors hover:border-[#00E5FF]/50"
            >
              <small className="text-xs font-bold uppercase tracking-[0.08em] text-[#94a9bf]">
                Next · {episodeNumber(next.number)} →
              </small>
              <b className="mt-1.5 block text-lg tracking-tight">{next.title}</b>
            </Link>
          )}
        </nav>
      </section>

      {/* ---------------- KEEP LISTENING ---------------- */}
      <section className={sectionY}>
        <div className={container}>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <TypingHeading
              as="h2"
              className={h2}
              segments={[{ text: "Keep " }, { text: "listening", className: gradText }]}
              ariaLabel="Keep listening"
            />
            <Link href="/episodes" className={btnGhost + btnSm}>
              All episodes
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.06} className="h-full">
                <EpisodeCard ep={e} released={isReleased(e)} isNewest={e.number === newestNumber} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SUGGEST CTA ---------------- */}
      <section className={sectionY}>
        <div className={container}>
          <div className={panel + " text-center"}>
            <TypingHeading
              as="h2"
              className={h2}
              segments={[{ text: "Know who we should " }, { text: "talk to next?", className: gradText }]}
              ariaLabel="Know who we should talk to next?"
            />
            <p className={lead + " mx-auto mt-5 max-w-[640px]"}>
              The best episodes start with a recommendation from a listener.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <SuggestGuestButton className={btnPrimary} />
              <Link href="/be-a-guest" className={btnGhost}>
                Be a guest
              </Link>
            </div>
          </div>
        </div>
      </section>

      {toast && (
        <div
          role="status"
          className="fixed bottom-7 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#012232] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
