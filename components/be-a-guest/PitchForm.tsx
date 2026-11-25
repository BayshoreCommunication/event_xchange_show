"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GUEST_PROFILES, HEARD_ABOUT_OPTIONS, PODCAST_CONFIG } from "data/podcast";
import { Field, PillGroup, TopicPicker } from "components/forms/FormParts";
import StatusPopup from "components/forms/StatusPopup";
import { isEmail, isUrl, isUrlList, readLocal, removeLocal, writeLocal } from "lib/forms";
import { sendEmail } from "lib/emailjs";
import { btnGhost, btnPrimary, btnSm, input, inputInvalid } from "lib/ui";

const DRAFT = "exs-draft-pitch";

/* EmailJS account used to deliver guest pitches */
const EMAILJS_CONFIG = {
  serviceId: "service_oi8ox0s",
  templateId: "template_zf1j8jr",
  publicKey: "PwDu8o_HF3o907vKz",
};
const STORY_MAX = 2000;
const TAKEAWAY_MAX = 400;

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  organization: string;
  profile: string;
  experience: string;
  linkedin: string;
  podcastBefore: string;
  podcastLinks: string;
  story: string;
  takeaway: string;
  topics: string[];
  availability: string[];
  heard: string;
  consent: boolean;
};

const EMPTY: Values = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  organization: "",
  profile: "",
  experience: "",
  linkedin: "",
  podcastBefore: "",
  podcastLinks: "",
  story: "",
  takeaway: "",
  topics: [],
  availability: [],
  heard: "",
  consent: false,
};

type Errors = Partial<Record<keyof Values, string>>;

const STEPS = ["About you", "Your story", "Review & send"] as const;

function validateStep(step: number, v: Values): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!v.firstName.trim()) e.firstName = "Please add your first name.";
    if (!v.lastName.trim()) e.lastName = "Please add your last name.";
    if (!isEmail(v.email)) e.email = "Please enter a valid email.";
    if (!v.role.trim()) e.role = "Please add your role.";
    if (!v.organization.trim()) e.organization = "Please add your organization.";
    if (!v.profile) e.profile = "Please choose one.";
    if (v.experience.trim() && !/^\d{1,2}$/.test(v.experience.trim()))
      e.experience = "Please enter a number of years.";
    if (v.linkedin.trim() && !isUrl(v.linkedin)) e.linkedin = "That doesn't look like a valid link.";
    if (!v.podcastBefore) e.podcastBefore = "Please choose one.";
    if (v.podcastBefore === "Yes" && v.podcastLinks.trim() && !isUrlList(v.podcastLinks))
      e.podcastLinks = "Please check the links (separate them with commas).";
  }
  if (step === 2) {
    if (v.story.trim().length < 80) e.story = "Tell us a bit more (at least 80 characters).";
    if (v.takeaway.trim().length < 20) e.takeaway = "Add the one idea you'd want people to remember.";
  }
  if (step === 3) {
    if (!v.consent) e.consent = "Please confirm to send your pitch.";
  }
  return e;
}

/** Values passed to the EmailJS template. Each one is a {{variable}} there;
    {{message}} holds the whole pitch for a simple one-field template. */
function toEmailParams(v: Values): Record<string, string> {
  const name = `${v.firstName.trim()} ${v.lastName.trim()}`.trim();
  const fields: [string, string, string][] = [
    ["first_name", "First name", v.firstName.trim()],
    ["last_name", "Last name", v.lastName.trim()],
    ["email", "Email", v.email.trim()],
    ["role", "Role / title", v.role.trim()],
    ["organization", "Organization", v.organization.trim()],
    ["profile", "Describes them", v.profile],
    ["experience", "Years in events", v.experience.trim()],
    ["linkedin", "LinkedIn", v.linkedin.trim()],
    ["podcast_before", "Been on a podcast before", v.podcastBefore],
    ["podcast_links", "Podcast links", v.podcastBefore === "Yes" ? v.podcastLinks.trim() : ""],
    ["story", "Story", v.story.trim()],
    ["takeaway", "Takeaway", v.takeaway.trim()],
    ["topics", "Topics", v.topics.join(", ")],
    ["availability", "Could record", v.availability.join(", ")],
    ["heard", "Heard about the show", v.heard],
  ];
  const params: Record<string, string> = {
    form_type: "Guest pitch",
    subject: `New guest pitch: ${name}`,
    name,
    from_name: name,
    reply_to: v.email.trim(),
    submitted_at: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
  };
  for (const [key, , value] of fields) params[key] = value || "—";
  params.message = fields.map(([, label, value]) => `${label}: ${value || "—"}`).join("\n\n");
  return params;
}

/** The next six months, e.g. "Dec 2026". */
function nextMonths(count = 6) {
  const d = new Date();
  d.setDate(1);
  return Array.from({ length: count }, () => {
    const m = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    d.setMonth(d.getMonth() + 1);
    return m;
  });
}

type Popup = { status: "success" | "error"; firstName: string; email: string } | null;

export default function PitchForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState(1);
  const [months, setMonths] = useState<string[]>([]);
  const [restored, setRestored] = useState(false);
  const [sending, setSending] = useState(false);
  const [popup, setPopup] = useState<Popup>(null);
  const closePopup = useCallback(() => setPopup(null), []);
  const formRef = useRef<HTMLFormElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Months and draft are browser-only. A saved draft fills the fields back in,
  // but the form always opens on step 1 so the whole form is visible.
  useEffect(() => {
    setMonths(nextMonths());
    const d = readLocal<(Partial<Values> & { _step?: number }) | null>(DRAFT, null);
    if (d) {
      const { _step, ...rest } = d; // older drafts also stored the step
      setValues({ ...EMPTY, ...rest });
      setRestored(true);
    }
  }, []);

  const save = (next: Values) => writeLocal(DRAFT, next);

  const startOver = () => {
    removeLocal(DRAFT);
    setValues(EMPTY);
    setErrors({});
    setRestored(false);
    setStep(1);
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    setValues((prev) => {
      const next = { ...prev, [k]: v };
      save(next);
      return next;
    });
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const focusFirstError = (errs: Errors) => {
    const k = Object.keys(errs)[0];
    if (k) setTimeout(() => formRef.current?.querySelector<HTMLElement>(`[name="${k}"]`)?.focus(), 30);
  };

  const goTo = (n: number) => {
    setStep(n);
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const nextStep = () => {
    const errs = validateStep(step, values);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    goTo(step + 1);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return nextStep();
    for (const s of [1, 2, 3]) {
      const errs = validateStep(s, values);
      if (Object.keys(errs).length) {
        setErrors(errs);
        if (s !== 3) setStep(s);
        return focusFirstError(errs);
      }
    }
    setSending(true);
    const who = { firstName: values.firstName.trim(), email: values.email.trim() };
    try {
      await sendEmail(EMAILJS_CONFIG, toEmailParams(values));
      // Sent: clear the draft and reset the form behind the popup
      removeLocal(DRAFT);
      setValues(EMPTY);
      setErrors({});
      setRestored(false);
      setStep(1);
      setPopup({ status: "success", ...who });
    } catch (err) {
      // Not sent: keep everything the visitor typed so they can try again
      console.error(err);
      setPopup({ status: "error", ...who });
    } finally {
      setSending(false);
    }
  };

  // Enter in a text input moves to the next step instead of submitting
  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT" && step < 3) {
      e.preventDefault();
      nextStep();
    }
  };

  const cls = (k: keyof Values) => input + (errors[k] ? inputInvalid : "");

  const review: [string, string][] = [
    ["Name", `${values.firstName} ${values.lastName}`.trim()],
    ["Email", values.email],
    ["Role", [values.role, values.organization].filter(Boolean).join(" · ")],
    ["Describes you", values.profile],
    ["Years in events", values.experience],
    [
      "Other podcasts",
      values.podcastBefore === "Yes" && values.podcastLinks.trim()
        ? `Yes · ${values.podcastLinks}`
        : values.podcastBefore,
    ],
    ["Story", values.story.length > 220 ? values.story.slice(0, 220) + "…" : values.story],
    ["Takeaway", values.takeaway],
    ["Topics", values.topics.join(", ")],
  ];

  return (
    <div ref={rootRef} className="scroll-mt-32">
      {/* Steps progress */}
      <div className="mb-7 flex gap-2" aria-hidden="true">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const lit = n <= step;
          return (
            <div key={label} className="flex-1">
              <span className="relative block h-1 overflow-hidden rounded bg-[#1c2e3f]">
                <span
                  className={`absolute inset-0 origin-left bg-gradient-to-r from-[#00E5FF] to-[#0085F8] transition-transform duration-300 ${
                    lit ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </span>
              <small className={`mt-2 block text-xs sm:text-[13px] font-semibold ${lit ? "text-[#e5e7eb]" : "text-[#6e859b]"}`}>
                {n} · {label}
              </small>
            </div>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Step {step} of 3: {STEPS[step - 1]}
      </p>

      <form ref={formRef} noValidate onSubmit={onSubmit} onKeyDown={onKeyDown} className="grid gap-5">
        {/* ---------- Step 1: About you ---------- */}
        {step === 1 && (
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="p-first" label="First name" required error={errors.firstName}>
                <input id="p-first" name="firstName" autoComplete="given-name" className={cls("firstName")} value={values.firstName} onChange={(e) => set("firstName", e.target.value)} />
              </Field>
              <Field id="p-last" label="Last name" required error={errors.lastName}>
                <input id="p-last" name="lastName" autoComplete="family-name" className={cls("lastName")} value={values.lastName} onChange={(e) => set("lastName", e.target.value)} />
              </Field>
            </div>
            <Field id="p-email" label="Email" required error={errors.email}>
              <input id="p-email" name="email" type="email" autoComplete="email" placeholder="you@organization.com" className={cls("email")} value={values.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="p-role" label="Role / title" required error={errors.role}>
                <input id="p-role" name="role" autoComplete="organization-title" className={cls("role")} value={values.role} onChange={(e) => set("role", e.target.value)} />
              </Field>
              <Field id="p-org" label="Organization" required error={errors.organization}>
                <input id="p-org" name="organization" autoComplete="organization" className={cls("organization")} value={values.organization} onChange={(e) => set("organization", e.target.value)} />
              </Field>
            </div>

            <PillGroup
              name="profile"
              legend="Which best describes you?"
              required
              options={GUEST_PROFILES}
              value={values.profile}
              onChange={(v) => set("profile", v as string)}
              error={errors.profile}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="p-years" label="Years in events" error={errors.experience}>
                <input
                  id="p-years"
                  name="experience"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={70}
                  placeholder="e.g. 8"
                  className={cls("experience")}
                  value={values.experience}
                  onChange={(e) => set("experience", e.target.value)}
                />
              </Field>
              <Field id="p-link" label="LinkedIn" optional="optional" error={errors.linkedin}>
                <input id="p-link" name="linkedin" placeholder="linkedin.com/in/…" className={cls("linkedin")} value={values.linkedin} onChange={(e) => set("linkedin", e.target.value)} />
              </Field>
            </div>

            <PillGroup
              name="podcastBefore"
              legend="Have you appeared on another podcast before?"
              required
              options={["Yes", "No"]}
              value={values.podcastBefore}
              onChange={(v) => set("podcastBefore", v as string)}
              error={errors.podcastBefore}
            />
            {values.podcastBefore === "Yes" && (
              <Field
                id="p-podlinks"
                label="Please share links to those episodes"
                optional="optional, separate with commas"
                error={errors.podcastLinks}
              >
                <input
                  id="p-podlinks"
                  name="podcastLinks"
                  placeholder="https://…, https://…"
                  className={cls("podcastLinks")}
                  value={values.podcastLinks}
                  onChange={(e) => set("podcastLinks", e.target.value)}
                />
              </Field>
            )}
          </div>
        )}

        {/* ---------- Step 2: Your story ---------- */}
        {step === 2 && (
          <div className="grid gap-5">
            <Field
              id="p-story"
              label="What story do you want to tell, and why would it appeal to other event professionals?"
              required
              error={errors.story}
              hint="Be candid. The part that went sideways is usually the best bit."
              counter={`${values.story.length}/${STORY_MAX}`}
            >
              <textarea
                id="p-story"
                name="story"
                maxLength={STORY_MAX}
                className={cls("story") + " min-h-[170px] resize-y"}
                value={values.story}
                onChange={(e) => set("story", e.target.value)}
              />
            </Field>
            <Field
              id="p-take"
              label="What should listeners take back to their next program?"
              required
              error={errors.takeaway}
              counter={`${values.takeaway.length}/${TAKEAWAY_MAX}`}
            >
              <textarea
                id="p-take"
                name="takeaway"
                maxLength={TAKEAWAY_MAX}
                placeholder="One practical idea."
                className={cls("takeaway") + " min-h-[100px] resize-y"}
                value={values.takeaway}
                onChange={(e) => set("takeaway", e.target.value)}
              />
            </Field>
            <TopicPicker
              name="p-topics"
              legend="Select the categories you'd like to discuss"
              value={values.topics}
              onChange={(t) => set("topics", t)}
            />
          </div>
        )}

        {/* ---------- Step 3: Review & send ---------- */}
        {step === 3 && (
          <div className="grid gap-5">
            <PillGroup
              name="availability"
              legend="When could you record?"
              optional="pick any"
              multiple
              options={months}
              value={values.availability}
              onChange={(v) => set("availability", v as string[])}
            />
            <Field id="p-heard" label="How did you hear about the show?">
              <select id="p-heard" name="heard" className={input + " cursor-pointer"} value={values.heard} onChange={(e) => set("heard", e.target.value)}>
                <option value="">Select…</option>
                {HEARD_ABOUT_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>

            <div className="rounded-[20px] border border-[#1c2e3f] bg-[#030A16]/60 p-6 sm:p-7">
              <h3 className="mb-4 text-lg sm:text-xl font-bold">Review your pitch</h3>
              <dl className="grid gap-x-4 gap-y-2.5 text-[15px] sm:grid-cols-[150px_1fr]">
                {review.map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt className="text-[#94a9bf]">{k}</dt>
                    <dd className="mb-2 break-words sm:mb-0">{v || "—"}</dd>
                  </React.Fragment>
                ))}
              </dl>
              <button type="button" onClick={() => goTo(1)} className={btnGhost + btnSm + " mt-5"}>
                Edit details
              </button>
            </div>

            <div>
              <label className="flex items-start gap-3 text-[15px] text-[#a9bccd] cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={values.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-1 w-[18px] h-[18px] shrink-0 accent-[#00E5FF]"
                />
                I&apos;m happy to be contacted about this pitch, and I understand recorded episodes are published
                publicly.
              </label>
              {errors.consent && (
                <p className="mt-1.5 text-[13px] text-[#ff8a9b]" role="alert">
                  {errors.consent}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ---------- Navigation ---------- */}
        <div className="mt-2 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button type="button" onClick={() => goTo(step - 1)} className={btnGhost}>
              Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className={btnPrimary}>
              Continue
            </button>
          ) : (
            <button type="submit" disabled={sending} className={btnPrimary}>
              {sending ? "Sending…" : "Send my pitch"}
            </button>
          )}
        </div>
        <p className="text-[13px] text-[#6e859b]">
          {restored ? (
            <>
              We restored the pitch you started earlier.{" "}
              <button type="button" onClick={startOver} className="text-[#00F0FF] hover:underline cursor-pointer">
                Start over
              </button>
            </>
          ) : (
            "Your progress is saved on this device until you send it."
          )}
        </p>
      </form>

      <StatusPopup
        status={popup?.status ?? null}
        onClose={closePopup}
        title={popup?.status === "success" ? `Pitch received, ${popup.firstName}!` : "Your pitch didn't send"}
        message={
          popup?.status === "success" ? (
            <>
              Thanks for sharing your story. We read every pitch and will reply to{" "}
              <b className="text-white break-all">{popup.email}</b> within two weeks.
            </>
          ) : (
            <>
              Something went wrong on our side. Your answers are still here, so please try again in a moment, or
              email us at{" "}
              <a href={`mailto:${PODCAST_CONFIG.contactEmail}`} className="text-[#00F0FF] hover:underline break-all">
                {PODCAST_CONFIG.contactEmail}
              </a>
              .
            </>
          )
        }
        actions={
          popup?.status === "success" ? (
            <>
              <Link href="/episodes" className={btnPrimary} data-autofocus>
                Listen while you wait
              </Link>
              <button type="button" onClick={closePopup} className={btnGhost}>
                Close
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  closePopup();
                  formRef.current?.requestSubmit();
                }}
                className={btnPrimary}
              >
                Try again
              </button>
              <button type="button" onClick={closePopup} className={btnGhost}>
                Close
              </button>
            </>
          )
        }
      />
    </div>
  );
}
