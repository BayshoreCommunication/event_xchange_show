"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubmitted(true);
            // Simulate submission
            setTimeout(() => {
                setIsSubmitted(false);
                setEmail("");
            }, 4000);
        }
    };

    return (
        <section
            aria-label="Newsletter: New Conversation. Fresh Perspective."
            className="relative w-full bg-[#051929] text-white py-8 sm:py-16 lg:py-24 overflow-hidden"
        >
            {/* ---------------- ATMOSPHERIC BACKGROUND GRADIENTS ---------------- */}
            {/* Base cross-gradient matching the reference screenshot */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(135deg, #06334a 0%, #07263b 25%, #071f32 50%, #072a40 75%, #064459 100%)",
                }}
                aria-hidden="true"
            />

            {/* 1. Top-left rich teal glow */}
            <div
                className="pointer-events-none absolute -top-24 -left-20 w-[450px] sm:w-[600px] lg:w-[750px] h-[450px] sm:h-[600px] lg:h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0, 180, 220, 0.18) 0%, rgba(6, 54, 76, 0.35) 40%, transparent 70%)",
                    filter: "blur(80px)",
                }}
                aria-hidden="true"
            />

            {/* 2. Bottom-right vibrant cyan-teal glow */}
            <div
                className="pointer-events-none absolute -bottom-24 -right-20 w-[480px] sm:w-[620px] lg:w-[780px] h-[480px] sm:h-[620px] lg:h-[780px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0, 210, 245, 0.22) 0%, rgba(6, 68, 89, 0.4) 42%, transparent 70%)",
                    filter: "blur(85px)",
                }}
                aria-hidden="true"
            />

            {/* Top & Bottom seamless edge blending */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-[#030A16]/60 to-transparent"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-[#030A16]/60 to-transparent"
                aria-hidden="true"
            />

            {/* ---------------- MAIN CONTAINER ---------------- */}
            <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
                    {/* ================= LEFT COLUMN: HEADLINE ================= */}
                    <div className="lg:col-span-6 xl:col-span-6 text-center lg:text-left">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[34px] sm:text-[44px] md:text-[50px] lg:text-[52px] xl:text-[58px] font-extrabold text-white leading-[1.08] tracking-[-0.03em]"
                        >
                            New
                            <br />
                            Conversation.
                            <br />
                            <span className="bg-gradient-to-r from-[#00F0FF] via-[#00C4FB] to-[#0085F8] bg-clip-text text-transparent">
                                Fresh Perspective.
                            </span>
                        </motion.h2>
                    </div>

                    {/* ================= RIGHT COLUMN: COPY & FORM ================= */}
                    <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                            className="w-full max-w-[500px] flex flex-col items-center lg:items-start"
                        >
                            {/* Explanatory description */}
                            <p className="text-xs sm:text-[13px] md:text-sm text-gray-200 leading-relaxed text-center lg:text-left">
                                One useful idea from each week&apos;s episode, followed
                                <br className="hidden sm:inline" />
                                {" "}by a clear invitation to listen. That&apos;s it.
                            </p>

                            {/* Email Subscription Form Pill */}
                            <form onSubmit={handleSubmit} className="mt-5 sm:mt-6 w-full">
                                <div className="relative flex items-center w-full rounded-full bg-[#08121c] border border-white/10 p-1.5 focus-within:border-[#00F0FF]/70 focus-within:ring-2 focus-within:ring-[#00F0FF]/20 shadow-[0_6px_25px_rgba(0,0,0,0.45)] transition-all duration-300">
                                    <label htmlFor="newsletter-email" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="newsletter-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@organization.com"
                                        aria-label="Email address for newsletter"
                                        className="flex-1 bg-transparent px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-[13px] md:text-sm text-white placeholder-[#5d7285] focus:outline-none min-w-0"
                                    />
                                    <button
                                        type="submit"
                                        className="shrink-0 inline-flex items-center justify-center px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-[#012232] font-semibold text-xs sm:text-[13px] md:text-sm bg-gradient-to-r from-[#00E5FF] to-[#00C2FF] hover:from-[#00F0FF] hover:to-[#00D5F8] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08121c] transition-all duration-300 whitespace-nowrap cursor-pointer"
                                    >
                                        Subscribe
                                    </button>
                                </div>

                                {/* Success message */}
                                {isSubmitted && (
                                    <motion.p
                                        role="status"
                                        aria-live="polite"
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-xs sm:text-[13px] text-[#00F0FF] font-medium"
                                    >
                                        ✓ Thank you! You&apos;re now subscribed to the newsletter.
                                    </motion.p>
                                )}
                            </form>

                            {/* Disclaimer / reassurance below input */}
                            <p className="mt-3 text-[11px] sm:text-xs text-[#6e859b] text-center lg:text-left">
                                No sales follow-ups. Unsubscribe anytime.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
