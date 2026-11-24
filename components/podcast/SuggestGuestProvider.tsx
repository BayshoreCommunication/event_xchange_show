"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import SuggestGuestModal from "./SuggestGuestModal";

const Ctx = createContext<{ openSuggest: () => void } | null>(null);

export const useSuggestGuest = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSuggestGuest must be used inside <SuggestGuestProvider>");
  return ctx;
};

/** Makes the "Suggest a guest" pop-up available on every page. */
export default function SuggestGuestProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openSuggest = useCallback(() => setOpen(true), []);

  return (
    <Ctx.Provider value={{ openSuggest }}>
      {children}
      <SuggestGuestModal open={open} onClose={() => setOpen(false)} />
    </Ctx.Provider>
  );
}

/** A button that opens the suggest-a-guest pop-up. */
export function SuggestGuestButton({
  className,
  children = "Suggest a guest",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { openSuggest } = useSuggestGuest();
  return (
    <button type="button" onClick={openSuggest} className={className} {...rest}>
      {children}
    </button>
  );
}
