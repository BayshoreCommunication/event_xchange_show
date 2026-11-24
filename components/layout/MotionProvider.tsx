"use client";

import { MotionConfig } from "framer-motion";

/**
 * Site-wide framer-motion settings. `reducedMotion="user"` turns off
 * movement (keeps fades) for visitors who ask their OS to reduce motion.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
