"use client";

import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { TOPIC_CATEGORIES } from "data/podcast";
import { pill, pillOff, pillOn } from "lib/ui";

/* ---------------- Field wrapper ---------------- */

export function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  counter,
  children,
}: {
  id?: string;
  label: React.ReactNode;
  required?: boolean;
  optional?: string;
  error?: string;
  hint?: React.ReactNode;
  counter?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm sm:text-[15px] font-semibold text-[#e5e7eb]">
        {label}
        {required && <span className="text-[#00F0FF]"> *</span>}
        {optional && <span className="font-medium text-[#6e859b]"> ({optional})</span>}
      </label>
      {children}
      {(hint || counter) && (
        <div className="mt-1.5 flex justify-between gap-4 text-[13px] text-[#6e859b]">
          <span>{hint}</span>
          {counter && <span className="tabular-nums">{counter}</span>}
        </div>
      )}
      {error && (
        <p className="mt-1.5 text-[13px] text-[#ff8a9b]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------- Pill choices (radio / checkbox) ---------------- */

export function PillGroup({
  legend,
  required,
  optional,
  options,
  value,
  multiple,
  onChange,
  error,
  name,
}: {
  legend: React.ReactNode;
  required?: boolean;
  optional?: string;
  options: readonly string[] | { value: string; label: string }[];
  value: string | string[];
  multiple?: boolean;
  onChange: (v: string | string[]) => void;
  error?: string;
  name: string;
}) {
  const opts = (options as (string | { value: string; label: string })[]).map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const toggle = (v: string) => {
    if (multiple) onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
    else onChange(v);
  };

  return (
    <fieldset className="min-w-0">
      <legend className="block mb-2 text-sm sm:text-[15px] font-semibold text-[#e5e7eb]">
        {legend}
        {required && <span className="text-[#00F0FF]"> *</span>}
        {optional && <span className="font-medium text-[#6e859b]"> ({optional})</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {opts.map((o, i) => {
          const on = selected.includes(o.value);
          const id = `${name}-${i}`;
          return (
            <span key={o.value}>
              <input
                type={multiple ? "checkbox" : "radio"}
                id={id}
                name={name}
                value={o.value}
                checked={on}
                onChange={() => toggle(o.value)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={
                  pill +
                  (on ? pillOn : pillOff) +
                  " peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#00E5FF]"
                }
              >
                {o.label}
              </label>
            </span>
          );
        })}
      </div>
      {error && (
        <p className="mt-1.5 text-[13px] text-[#ff8a9b]" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

/* ---------------- Topic picker: category → topics ---------------- */

export function TopicPicker({
  legend,
  value,
  onChange,
  name,
}: {
  legend: React.ReactNode;
  value: string[];
  onChange: (topics: string[]) => void;
  name: string;
}) {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (t: string) => onChange(value.includes(t) ? value.filter((x) => x !== t) : [...value, t]);

  return (
    <fieldset className="min-w-0">
      <legend className="block mb-1 text-sm sm:text-[15px] font-semibold text-[#e5e7eb]">
        {legend} <span className="font-medium text-[#6e859b]">(pick any)</span>
      </legend>
      <p className="mb-3 text-[13px] text-[#6e859b]">Choose a category to see its topics.</p>

      <div className="grid gap-2.5">
        {TOPIC_CATEGORIES.map((cat, ci) => {
          const count = cat.topics.filter((t) => value.includes(t)).length;
          const isOpen = open === cat.name;
          const panelId = `${name}-cat-${ci}`;
          return (
            <div
              key={cat.name}
              className={`rounded-2xl border transition-colors ${
                isOpen || count ? "border-[#00E5FF]/50 bg-[#00E5FF]/[0.04]" : "border-[#202e3d]"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : cat.name)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-sm sm:text-[15px] font-semibold text-white cursor-pointer"
              >
                <span>
                  {cat.name}
                  {count > 0 && (
                    <span className="ml-2 rounded-full bg-[#00E5FF]/15 px-2 py-0.5 text-xs text-[#00F0FF]">
                      {count} selected
                    </span>
                  )}
                </span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-[#00F0FF] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div id={panelId} className="flex flex-wrap gap-2 px-4 pb-4">
                  {cat.topics.map((t, ti) => {
                    const on = value.includes(t);
                    const id = `${name}-${ci}-${ti}`;
                    return (
                      <span key={t}>
                        <input
                          type="checkbox"
                          id={id}
                          checked={on}
                          onChange={() => toggle(t)}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={id}
                          className={
                            pill +
                            (on ? pillOn : pillOff) +
                            " gap-1.5 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#00E5FF]"
                          }
                        >
                          {on && <Check className="w-3.5 h-3.5" />}
                          {t}
                        </label>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ---------------- Success / preview ---------------- */

export function SuccessTick({ className = "mx-auto" }: { className?: string }) {
  return (
    <div
      className={`${className} mb-5 grid place-items-center w-[72px] h-[72px] rounded-full border border-[#00E5FF]/50 bg-[#00E5FF]/[0.12] text-[#00F0FF] shadow-[0_0_25px_rgba(0,229,255,0.55)]`}
    >
      <Check className="w-8 h-8" strokeWidth={2.4} />
    </div>
  );
}

export function PreviewNote({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p className="mt-5 rounded-xl border border-dashed border-[#202e3d] bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-[#6e859b]">
      Preview mode: nothing was sent. Add a form endpoint in <code>data/podcast.ts</code> to deliver submissions.
    </p>
  );
}
