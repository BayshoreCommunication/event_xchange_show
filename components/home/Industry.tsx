"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Industry() {
    return (
        <section
            aria-label="Have a story the industry needs to hear?"
            className="relative w-full min-h-[460px] sm:min-h-[560px] lg:min-h-[660px] xl:min-h-[720px] bg-[#030A16] text-white py-8 sm:py-16 lg:py-24 overflow-hidden flex items-center"
        >
            {/* ---------------- BACKGROUND IMAGE ---------------- */}
            <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none" aria-hidden="true">
                <Image
                    src="/images/home/industry/industry-bg.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-right lg:object-center"
                    quality={90}
                />

                {/* Left Scrim on mobile & tablet for flawless text readability */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-[#030A16]/95 via-[#030A16]/75 to-transparent lg:from-[#030A16]/50 lg:via-transparent lg:to-transparent"
                    aria-hidden="true"
                />

                {/* Top edge blend into preceding section */}
                <div
                    className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[#030A16] to-transparent pointer-events-none"
                    aria-hidden="true"
                />

                {/* Bottom edge blend into subsequent section */}
                <div
                    className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#030A16] to-transparent pointer-events-none"
                    aria-hidden="true"
                />
            </div>

            {/* ---------------- MAIN CONTENT ---------------- */}
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-xl lg:max-w-2xl flex flex-col justify-center">
                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[34px] sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[68px] font-extrabold text-white leading-[1.06] tracking-[-0.03em]"
                    >
                        Have
                        <br />
                        a story
                        <br />
                        <span className="bg-gradient-to-r from-[#00F0FF] via-[#00C4FB] to-[#0085F8] bg-clip-text text-transparent">
                            the industry
                            <br />
                            needs to hear?
                        </span>
                    </motion.h2>

                    {/* Description Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                        className="mt-5 sm:mt-7 text-xs sm:text-[13px] md:text-sm text-[#94a9bf] leading-relaxed max-w-[420px]"
                    >
                        Experienced colleagues, not keynote speakers. They ask the
                        questions planners actually want answered.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                        className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
                    >
                        {/* Primary Button */}
                        <Link
                            href="#pitch"
                            className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-[#012232] font-semibold text-xs sm:text-[13px] md:text-sm bg-gradient-to-r from-[#00E5FF] to-[#00C2FF] hover:from-[#00F0FF] hover:to-[#00D5F8] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030A16] transition-all duration-300 whitespace-nowrap"
                        >
                            Pitch Yourself or a Colleague
                        </Link>

                        {/* Secondary Outline Button */}
                        <Link
                            href="#how-it-works"
                            className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-white font-medium text-xs sm:text-[13px] md:text-sm border border-white/30 hover:border-[#00E5FF]/70 hover:bg-white/[0.08] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030A16] transition-all duration-300 whitespace-nowrap"
                        >
                            How an Episode Works
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
