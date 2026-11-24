"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { PODCAST_CONFIG } from "data/podcast";
import { Field, PillGroup, PreviewNote, SuccessTick, TopicPicker } from "components/forms/FormParts";
import { isEmail, isUrl, isUrlList, readLocal, removeLocal, submitForm, writeLocal } from "lib/forms";
import { btnGhost, btnPrimary, eyebrow, gradText, input, inputInvalid } from "lib/ui";

const DRAFT = "exs-draft-suggest";
const STORY_MAX = 2000;

type Values = {
  guestName: string;
  guestRole: string;
  guestOrg: string;
  guestLink: string;
  topics: string[];
  story: string;
  guestPodcast: string;
  guestPodcastLinks: string;
  theyKnow: string;
  yourName: string;
  yourEmail: string;
  updates: boolean;
};

const EMPTY: Values = {
  guestName: "",
  guestRole: "",
  guestOrg: "",
  guestLink: "",
  topics: [],
  story: "",
  guestPodcast: "",
  guestPodcastLinks: "",
  theyKnow: "",
  yourName: "",
  yourEmail: "",
  updates: true,
};

type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.guestName.trim()) e.guestName = "Please add their name.";
  if (!v.guestRole.trim()) e.guestRole = "Please add their role.";
  if (!v.guestOrg.trim()) e.guestOrg = "Please add their organization.";
  if (v.guestLink.trim() && !isUrl(v.guestLink)) e.guestLink = "That doesn't look like a valid link.";
  if (v.story.trim().length < 40) e.story = "Tell us a little more (at least 40 characters).";
  if (v.guestPodcast === "Yes" && v.guestPodcastLinks.trim() && !isUrlList(v.guestPodcastLinks))
    e.guestPodcastLinks = "Please check the links (separate them with commas).";
  if (!v.theyKnow) e.theyKnow = "Please choose one.";
  if (!v.yourName.trim()) e.yourName = "Please add your name.";
  if (!isEmail(v.yourEmail)) e.yourEmail = "Please enter a valid email.";
  return e;
}

export default function SuggestGuestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [restored, setRestored] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ name: string; guest: string; preview: boolean } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Restore a saved draft once
  useEffect(() => {
    const d = readLocal<Values | null>(DRAFT, null);
    if (d) {
      setValues({ ...EMPTY, ...d });
      setRestored(true);
    }
  }, []);

  // Lock page scroll, focus the first field, restore focus on close
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => boxRef.current?.querySelector<HTMLElement>("input,button.js-again")?.focus(), 60);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
      lastFocus.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    setValues((prev) => {
      const next = { ...prev, [k]: v };
      writeLocal(DRAFT, next);
      return next;
    });
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key !== "Tab" || !boxRef.current) return;
    const f = Array.from(
      boxRef.current.querySelectorAll<HTMLElement>("button,a[href],input,textarea,select")
    ).filter((el) => !(el as HTMLButtonElement).disabled && el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const firstKey = Object.keys(errs)[0];
    if (firstKey) {
      boxRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setSending(true);
    try {
      const r = await submitForm(PODCAST_CONFIG.formEndpoint, { type: "guest-suggestion", ...values });
      removeLocal(DRAFT);
      setRestored(false);
      setSent({ name: values.yourName.trim().split(" ")[0], guest: values.guestName.trim(), preview: r.preview });
    } catch {
      setErrors({ story: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  const again = () => {
    setValues(EMPTY);
    setErrors({});
    setSent(null);
  };

  const cls = (k: keyof Values) => input + (errors[k] ? inputInvalid : "");

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-[#020813]/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sg-title"
        className="relative w-full max-w-[700px] max-h-[calc(100vh-32px)] overflow-y-auto rounded-[28px] border border-[#00E5FF]/35 bg-gradient-to-b from-[#0a253c] to-[#041122] px-6 pt-10 pb-8 sm:px-10 sm:pt-12 sm:pb-10 text-white shadow-[0_30px_90px_rgba(0,0,0,0.6),0_0_50px_rgba(0,229,255,0.15)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid place-items-center w-10 h-10 rounded-full border border-solid border-white/20 bg-[#030A16]/60 hover:border-[#00E5FF]/70 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {sent ? (
          <div className="text-center py-4">
            <SuccessTick />
            <h2 className="text-[28px] font-bold tracking-tight">Thanks, {sent.name}.</h2>
            <p className="mx-auto mt-3 max-w-[440px] text-base text-[#a9bccd]">
              We&apos;ll review your suggestion of <b className="text-white">{sent.guest}</b> and be in touch if
              it&apos;s a fit for an upcoming episode.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <button type="button" onClick={again} className={btnPrimary + " js-again"}>
                Suggest someone else
              </button>
              <button type="button" onClick={onClose} className={btnGhost}>
                Close
              </button>
            </div>
            <PreviewNote show={sent.preview} />
          </div>
        ) : (
          <>
            <span className={eyebrow}>Suggest a guest</span>
            <h2 id="sg-title" className="mt-3 text-[28px] sm:text-[32px] font-bold tracking-tight leading-tight">
              Who should we <span className={gradText}>talk to next?</span>
            </h2>
            <p className="mt-2 mb-6 text-[15px] sm:text-base text-[#a9bccd]">
              Point us to the planner, producer or leader whose story the industry needs to hear. About two minutes.
            </p>

            <form className="grid gap-5" noValidate onSubmit={onSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="sg-gname" label="Guest's name" required error={errors.guestName}>
                  <input
                    id="sg-gname"
                    name="guestName"
                    className={cls("guestName")}
                    placeholder="Full name"
                    autoComplete="off"
                    value={values.guestName}
                    onChange={(e) => set("guestName", e.target.value)}
                  />
                </Field>
                <Field id="sg-grole" label="Role / title" required error={errors.guestRole}>
                  <input
                    id="sg-grole"
                    name="guestRole"
                    className={cls("guestRole")}
                    placeholder="e.g. Director of Meetings"
                    value={values.guestRole}
                    onChange={(e) => set("guestRole", e.target.value)}
                  />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="sg-gorg" label="Organization" required error={errors.guestOrg}>
                  <input
                    id="sg-gorg"
                    name="guestOrg"
                    className={cls("guestOrg")}
                    placeholder="Company or association"
                    value={values.guestOrg}
                    onChange={(e) => set("guestOrg", e.target.value)}
                  />
                </Field>
                <Field id="sg-glink" label="LinkedIn or website" optional="optional" error={errors.guestLink}>
                  <input
                    id="sg-glink"
                    name="guestLink"
                    className={cls("guestLink")}
                    placeholder="linkedin.com/in/…"
                    value={values.guestLink}
                    onChange={(e) => set("guestLink", e.target.value)}
                  />
                </Field>
              </div>

              <TopicPicker
                name="sg-topics"
                legend="What could they talk about?"
                value={values.topics}
                onChange={(t) => set("topics", t)}
              />

              <Field
                id="sg-story"
                label="What story should they tell, and why would it appeal to other event professionals?"
                required
                error={errors.story}
                counter={`${values.story.length}/${STORY_MAX}`}
              >
                <textarea
                  id="sg-story"
                  name="story"
                  maxLength={STORY_MAX}
                  className={cls("story") + " min-h-[130px] resize-y"}
                  value={values.story}
                  onChange={(e) => set("story", e.target.value)}
                />
              </Field>

              <PillGroup
                name="guestPodcast"
                legend="Have they appeared on other podcasts?"
                optional="optional"
                options={["Yes", "No", "Not sure"]}
                value={values.guestPodcast}
                onChange={(v) => set("guestPodcast", v as string)}
              />
              {values.guestPodcast === "Yes" && (
                <Field
                  id="sg-gpodlinks"
                  label="Links to those episodes"
                  optional="separate with commas"
                  error={errors.guestPodcastLinks}
                >
                  <input
                    id="sg-gpodlinks"
                    name="guestPodcastLinks"
                    className={cls("guestPodcastLinks")}
                    placeholder="https://…, https://…"
                    value={values.guestPodcastLinks}
                    onChange={(e) => set("guestPodcastLinks", e.target.value)}
                  />
                </Field>
              )}

              <PillGroup
                name="theyKnow"
                legend="Do they know you're suggesting them?"
                required
                options={[
                  { value: "Yes", label: "Yes, they're keen" },
                  { value: "Not yet", label: "Not yet" },
                  { value: "Happy to introduce", label: "I can introduce you" },
                ]}
                value={values.theyKnow}
                onChange={(v) => set("theyKnow", v as string)}
                error={errors.theyKnow}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="sg-yname" label="Your name" required error={errors.yourName}>
                  <input
                    id="sg-yname"
                    name="yourName"
                    className={cls("yourName")}
                    autoComplete="name"
                    value={values.yourName}
                    onChange={(e) => set("yourName", e.target.value)}
                  />
                </Field>
                <Field id="sg-yemail" label="Your email" required error={errors.yourEmail}>
                  <input
                    id="sg-yemail"
                    name="yourEmail"
                    type="email"
                    className={cls("yourEmail")}
                    autoComplete="email"
                    placeholder="you@organization.com"
                    value={values.yourEmail}
                    onChange={(e) => set("yourEmail", e.target.value)}
                  />
                </Field>
              </div>

              <label className="flex items-start gap-3 text-[15px] text-[#a9bccd] cursor-pointer">
                <input
                  type="checkbox"
                  checked={values.updates}
                  onChange={(e) => set("updates", e.target.checked)}
                  className="mt-1 w-[18px] h-[18px] shrink-0 accent-[#00E5FF]"
                />
                Let me know if they&apos;re booked, and send me the weekly idea email.
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <button type="submit" disabled={sending} className={btnPrimary}>
                  {sending ? "Sending…" : "Send suggestion"}
                </button>
                <Link href="/be-a-guest#pitch" onClick={onClose} className="text-[15px] text-[#00F0FF] hover:underline">
                  Want to pitch yourself instead? →
                </Link>
              </div>
              <p className="text-[13px] text-[#6e859b]">
                {restored
                  ? "We restored the suggestion you started earlier."
                  : "Your answers are saved on this device until you send them."}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
