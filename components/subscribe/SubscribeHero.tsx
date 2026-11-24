"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { EPISODES, GUEST_PROFILES, PODCAST_CONFIG, episodeNumber, episodeUrl, isReleased } from "data/podcast";
import { Field, PreviewNote, SuccessTick } from "components/forms/FormParts";
import { usePlayer } from "components/podcast/AudioPlayerProvider";
import PageBackdrop from "components/podcast/PageBackdrop";
import { TypingHeading } from "components/ui/TypingTitle";
import { isEmail, readLocal, submitForm, writeLocal } from "lib/forms";
import { btnGhost, btnPrimary, container, display, eyebrow, gradText, heroY, input, inputInvalid, lead } from "lib/ui";

const ROLE_OPTIONS = [...GUEST_PROFILES.filter((p) => p !== "Other"), "Student or early-career", "Other"];

export default function SubscribeHero() {
  const { play } = usePlayer();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ email: string; firstName: string; preview: boolean } | null>(null);

  // Latest released episode (falls back to the first one before launch)
  const latest = useMemo(
    () => EPISODES.filter((e) => isReleased(e)).sort((a, b) => b.number - a.number)[0] ?? EPISODES[0],
    []
  );

  useEffect(() => {
    const already = readLocal<string | null>("exs-subscribed", null);
    if (already) setEmail(already);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setSending(true);
    try {
      const r = await submitForm(PODCAST_CONFIG.newsletterEndpoint, {
        email: email.trim(),
        firstName: firstName.trim(),
        role,
        source: "subscribe-page",
      });
      writeLocal("exs-subscribed", email.trim());
      setDone({ email: email.trim(), firstName: firstName.trim(), preview: r.preview });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={"relative isolate overflow-hidden " + heroY}>
      <PageBackdrop src="/images/pages/hero-bg.jpg" priority />
      <div className={container + " grid items-center gap-12 lg:grid-cols-2"}>
        {/* Copy + form */}
        <div>
          <span className={eyebrow}>The weekly idea</span>
          <TypingHeading
            as="h1"
            className={display + " mt-5 lg:!text-[56px] xl:!text-[64px]"}
            segments={[{ text: "New conversation.", lineBreak: true }, { text: "Fresh perspective.", className: gradText }]}
            triggerOnView={false}
            ariaLabel="New conversation. Fresh perspective."
          />
          <p className={lead + " mt-6 max-w-[560px]"}>
            One useful idea from each episode, followed by a clear invitation to listen.
          </p>

          {done ? (
            <div className="mt-8 max-w-[540px]">
              <SuccessTick className="" />
              <h2 className="text-[28px] font-bold tracking-tight">
                You&apos;re in{done.firstName ? `, ${done.firstName}` : ""}.
              </h2>
              <p className="mt-2.5 text-base sm:text-lg text-[#a9bccd]">
                The next idea arrives on Wednesday at <b className="text-white">{done.email}</b>. In the meantime,
                start with the latest episode.
              </p>
              <div className="mt-6 flex flex-wrap gap-3.5">
                <button type="button" onClick={() => play(latest.id)} className={btnPrimary}>
                  <Play className="w-4 h-4 fill-current" />
                  Play the latest
                </button>
                <Link href="/episodes" className={btnGhost}>
                  All episodes
                </Link>
              </div>
              <PreviewNote show={done.preview} />
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="mt-8 grid max-w-[540px] gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="s-email" label="Email address" required error={error}>
                  <input
                    id="s-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@organization.com"
                    className={input + (error ? inputInvalid : "")}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                  />
                </Field>
                <Field id="s-name" label="First name" optional="optional">
                  <input
                    id="s-name"
                    autoComplete="given-name"
                    className={input}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Field>
              </div>
              <Field id="s-role" label="I mostly work as a…" optional="optional">
                <select id="s-role" className={input + " cursor-pointer"} value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select…</option>
                  {ROLE_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
              <button type="submit" disabled={sending} className={btnPrimary + " justify-self-start"}>
                {sending ? "Subscribing…" : "Subscribe"}
              </button>
              <p className="text-[13px] text-[#6e859b]">No sales follow-ups. Unsubscribe anytime.</p>
            </form>
          )}
        </div>

        {/* Sample newsletter */}
        <div aria-label="Sample newsletter" className="lg:rotate-[1.2deg]">
          <div className="overflow-hidden rounded-[24px] border border-[#1c2e3f] bg-[#f8fafc] text-[#0f172a] shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(0,229,255,0.12)]">
            <div className="grid gap-1 border-b border-[#e2e8f0] bg-white px-5 py-3.5 text-[13px] text-[#64748b]">
              <span>
                <b className="text-[#0f172a]">The Event XChange Show</b> &lt;weekly@eventxchangeshow.com&gt;
              </span>
              <span>
                Subject: <b className="text-[#0f172a]">{latest.takeaway.split(".")[0].slice(0, 60)}…</b>
              </span>
            </div>
            <div className="flex items-center gap-3.5 bg-[#030A16] px-6 py-5">
              <Image src="/images/home/navbar/logo.png" alt="The Event Xchange Show" width={62} height={40} className="h-10 w-auto" />
              <span className="text-[13px] text-[#94a9bf]">This week · {episodeNumber(latest.number)}</span>
            </div>
            <div className="p-6 text-[15px] leading-relaxed">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0085F8]">
                This week&apos;s idea
              </span>
              <h3 className="mt-1.5 mb-2.5 text-[21px] font-bold leading-snug tracking-tight">{latest.takeaway}</h3>
              <p className="text-[#475569]">
                From <b>{latest.title}</b>, a {latest.duration}-minute conversation with {latest.guest.name}.
              </p>
              <div className="relative mt-4 aspect-[2/1] overflow-hidden rounded-xl">
                <Image src={latest.image} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
              </div>
              <Link
                href={episodeUrl(latest)}
                className="mt-4 inline-block rounded-full bg-gradient-to-r from-[#00E5FF] to-[#00C2FF] px-5 py-3 text-sm font-bold text-[#012232]"
              >
                Listen to the episode →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
