"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

export interface TypingSegment {
  text: string;
  className?: string;
  lineBreak?: boolean;
}

export interface TypingHeadingProps {
  segments: readonly TypingSegment[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  speedMs?: number; // Keystroke cadence in ms (default: 32ms)
  delayMs?: number; // Delay before typing starts (default: 150ms)
  triggerOnView?: boolean; // Trigger on scroll into view (default: true, set false for Hero)
  ariaLabel: string;
}

/**
 * TypingHeading
 * Animates headline text character-by-character in a typing style without any cursor bar.
 *
 * Key guarantees:
 * 1. Zero clipping on letters with overhangs or descenders (like 'g' or 'y') because text
 *    remains in natural inline layout flow.
 * 2. 100% fidelity continuous gradients across words/phrases matching the original design.
 * 3. 0px layout shift (CLS = 0) because remaining characters are pre-allocated with opacity-0.
 * 4. Full accessibility via aria-label on the heading element.
 */
export function TypingHeading({
  segments,
  as: Tag = "h2",
  className,
  speedMs = 32,
  delayMs = 150,
  triggerOnView = true,
  ariaLabel,
}: TypingHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldStart = triggerOnView ? inView : true;

  // Pre-calculate cumulative character offsets
  const { totalChars, enrichedSegments } = useMemo(() => {
    let total = 0;
    const enriched = segments.map((seg) => {
      const start = total;
      total += seg.text.length;
      return {
        ...seg,
        start,
        end: total,
      };
    });
    return { totalChars: total, enrichedSegments: enriched };
  }, [segments]);

  const [typedCount, setTypedCount] = useState<number>(0);

  useEffect(() => {
    if (!shouldStart) return;

    // Accessibility check: immediately complete if reduced motion is requested
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTypedCount(totalChars);
      return;
    }

    let intervalId: NodeJS.Timeout | null = null;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setTypedCount((prev) => {
          if (prev >= totalChars) {
            if (intervalId) clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [shouldStart, totalChars, speedMs, delayMs]);

  return (
    <Tag ref={ref} className={className} aria-label={ariaLabel}>
      {enrichedSegments.map((seg, idx) => {
        const isComplete = typedCount >= seg.end;
        const isPending = typedCount <= seg.start;

        let visible = "";
        let hidden = "";

        if (isComplete) {
          visible = seg.text;
        } else if (isPending) {
          hidden = seg.text;
        } else {
          const count = typedCount - seg.start;
          visible = seg.text.slice(0, count);
          hidden = seg.text.slice(count);
        }

        return (
          <React.Fragment key={idx}>
            {visible.length > 0 && (
              <span className={seg.className}>{visible}</span>
            )}
            {hidden.length > 0 && (
              <span
                className="opacity-0 pointer-events-none select-none inline"
                aria-hidden="true"
              >
                {hidden}
              </span>
            )}
            {seg.lineBreak && <br />}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
