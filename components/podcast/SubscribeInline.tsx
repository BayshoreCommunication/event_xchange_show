"use client";

import React, { useState } from "react";
import { PODCAST_CONFIG } from "data/podcast";
import { isEmail, submitForm, writeLocal } from "lib/forms";
import { btnPrimary, input } from "lib/ui";

/** Email-only newsletter form. `variant="pill"` is the one-line version. */
export default function SubscribeInline({
  id,
  variant = "pill",
  source,
}: {
  id: string;
  variant?: "pill" | "stacked";
  source: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setState("sending");
    setMessage("");
    try {
      const r = await submitForm(PODCAST_CONFIG.newsletterEndpoint, { email: email.trim(), source });
      writeLocal("exs-subscribed", email.trim());
      setState("done");
      setEmail("");
      setMessage(r.preview ? "Preview mode: subscription not sent." : "You're subscribed!");
    } catch {
      setState("idle");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const label = state === "sending" ? "Subscribing…" : state === "done" ? "Subscribed ✓" : "Subscribe";

  return (
    <form noValidate onSubmit={onSubmit} className="w-full">
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      {variant === "pill" ? (
        <div className="flex gap-2 rounded-full border border-[#202e3d] bg-[#030A16]/85 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] focus-within:border-[#00E5FF]/70">
          <input
            id={id}
            type="email"
            autoComplete="email"
            placeholder="you@organization.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-1 bg-transparent px-4 text-[15px] sm:text-base text-white placeholder:text-[#6e859b] outline-none"
          />
          <button type="submit" disabled={state === "sending"} className={btnPrimary + " !px-5 sm:!px-7 !py-3"}>
            {label}
          </button>
        </div>
      ) : (
        <div className="grid gap-2.5">
          <input
            id={id}
            type="email"
            autoComplete="email"
            placeholder="you@organization.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
          />
          <button type="submit" disabled={state === "sending"} className={btnPrimary}>
            {label}
          </button>
        </div>
      )}
      {message && (
        <p className="mt-2.5 text-sm text-[#00F0FF]" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
