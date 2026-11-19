"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full bg-[#030A16] overflow-hidden text-white">
            {/* Ambient background glow behind top content */}
            <div
                className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[350px] bg-[#02F6F8]/[0.06] blur-[120px] rounded-full pointer-events-none"
                aria-hidden="true"
            />

            {/* ---------------- TOP CONTENT (HEADING & DESCRIPTION & CTAS) ---------------- */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-8 sm:pb-12 md:pb-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start justify-between">
                    {/* Left Column: Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-7 xl:col-span-7"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-bold text-white tracking-tight leading-[1.12]">
                            The conversations
                            <br />
                            behind{" "}
                            <span className="bg-gradient-to-r from-[#02F6F8] to-[#0085F8] bg-clip-text text-transparent">
                                great events.
                            </span>
                        </h1>
                    </motion.div>

                    {/* Right Column: Description + Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                        className="lg:col-span-5 xl:col-span-5 flex flex-col justify-start lg:pt-2"
                    >
                        <p className="text-sm sm:text-base md:text-[17px] text-gray-300 font-normal leading-relaxed max-w-[480px]">
                            Honest stories from the people who plan meetings — their careers,
                            their decisions and the work behind the experience.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                            <Link
                                href="#explore"
                                className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-black font-semibold text-xs sm:text-sm md:text-[15px] bg-gradient-to-r from-[#02F6F8] to-[#0085F8] hover:shadow-[0_0_25px_rgba(2,246,248,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                            >
                                Explore the conversations
                            </Link>

                            <Link
                                href="#suggest"
                                className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-white font-medium text-xs sm:text-sm md:text-[15px] border border-white/25 hover:border-[#02F6F8]/60 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                            >
                                Suggest a guest
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ---------------- BOTTOM MICROPHONE HERO IMAGE ---------------- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative w-full overflow-hidden border-b border-white/10"
            >
                <div className="relative w-full h-[260px] sm:h-[360px] md:h-[460px] lg:h-[530px] xl:h-[560px]">
                    <Image
                        src="/images/home/hero/hero-bg.png"
                        alt="Studio microphone with glowing blue bokeh lights"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />

                    {/* Seamless top blend gradient */}
                    <div
                        className="absolute inset-x-0 top-0 h-16 sm:h-24 md:h-32 bg-gradient-to-b from-[#030A16] via-[#030A16]/50 to-transparent pointer-events-none"
                        aria-hidden="true"
                    />
                </div>
            </motion.div>
        </section>
    );
}
