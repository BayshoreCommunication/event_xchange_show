"use client";

import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, X } from "lucide-react";

type Props = {
  /** Which popup to show; null hides it. */
  status: "success" | "error" | null;
  title: string;
  message: React.ReactNode;
  /** Buttons under the message. The first one gets focus. */
  actions?: React.ReactNode;
  onClose: () => void;
};

/**
 * Small confirmation / error popup used after a form is sent.
 * Closes on Escape, the X button or a click on the dimmed backdrop.
 */
export default function StatusPopup({ status, title, message, actions, onClose }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const isError = status === "error";

  useEffect(() => {
    if (!status) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => {
      const box = boxRef.current;
      (box?.querySelector<HTMLElement>("[data-autofocus]") ?? box?.querySelector<HTMLElement>("button"))?.focus();
    }, 60);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [status, onClose]);

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          key="status-popup"
          className="fixed inset-0 z-[90] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-[#020813]/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            ref={boxRef}
            role={isError ? "alertdialog" : "dialog"}
            aria-modal="true"
            aria-labelledby="status-popup-title"
            aria-describedby="status-popup-msg"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`relative w-full max-w-[460px] rounded-[24px] border bg-gradient-to-b from-[#0a253c] to-[#041122] px-6 pt-10 pb-7 sm:px-9 text-center text-white shadow-[0_30px_90px_rgba(0,0,0,0.6)] ${
              isError ? "border-[#ff8a9b]/40" : "border-[#00E5FF]/35"
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full border border-solid border-white/15 text-[#94a9bf] hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div
              className={`mx-auto mb-5 grid h-[68px] w-[68px] place-items-center rounded-full border ${
                isError
                  ? "border-[#ff8a9b]/50 bg-[#ff8a9b]/[0.12] text-[#ff8a9b] shadow-[0_0_25px_rgba(255,138,155,0.35)]"
                  : "border-[#00E5FF]/50 bg-[#00E5FF]/[0.12] text-[#00F0FF] shadow-[0_0_25px_rgba(0,229,255,0.55)]"
              }`}
            >
              {isError ? <AlertTriangle className="h-8 w-8" strokeWidth={2.2} /> : <Check className="h-8 w-8" strokeWidth={2.4} />}
            </div>

            <h2 id="status-popup-title" className="text-[24px] sm:text-[28px] font-bold tracking-tight">
              {title}
            </h2>
            <div id="status-popup-msg" className="mt-3 text-[15px] sm:text-base leading-relaxed text-[#a9bccd]">
              {message}
            </div>

            {actions && <div className="mt-7 flex flex-wrap justify-center gap-3">{actions}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
