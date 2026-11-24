"use client";

import React from "react";
import { motion } from "framer-motion";

/** Fades and lifts its children in once they scroll into view. */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article" | "li" | "section";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </Tag>
  );
}
