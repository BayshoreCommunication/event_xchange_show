"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Host {
    readonly id: number;
    readonly name: string;
    readonly role: string;
    readonly bio: string;
    readonly quote: string;
    readonly image: string;
}

const HOSTS: readonly Host[] = [
    {
        id: 0,
        name: "Ace Johnson",
        role: "Co-host · Producer · CEO",
        bio: "Twenty-five years in live event production, from broken general sessions to transformational work. Ace brings the industry to life with real stories and no fluff.",
        quote: '"The best stories start with the best conversations."',
        image: "/images/home/conversation/ace.png",
    },
    {
        id: 1,
        name: "Suley Usman",
        role: "Co-host · Producer · CEO",
        bio: "Twenty-five years in live event production, from broken general sessions to transformational work. Sulay brings the industry to life with real stories and no fluff.",
        quote: '"The best stories start with the best conversations."',
        image: "/images/home/conversation/usman.png",
    },
] as const;

export default function Conversation() {
    // Card 1 (bottom card) is active by default to match the reference image on initial load.
    // Hovering, clicking, or focusing either card smoothly activates its vibrant cyan gradient state.
    const [activeCard, setActiveCard] = useState<number>(1);

    return (
        <section
            aria-label="Conversation: Two seats. One honest conversation."
            className="relative w-full bg-[#030A16] text-white py-8 sm:py-16 lg:py-24 overflow-hidden"
        >
            {/* ---------------- ATMOSPHERIC BACKGROUND GLOWS ---------------- */}
            {/* 1. Atmospheric cyan-teal aura in bottom-left (matching reference screenshot) */}
            <div
                className="pointer-events-none absolute -bottom-24 -left-20 w-[500px] sm:w-[650px] lg:w-[800px] h-[500px] sm:h-[650px] lg:h-[800px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0, 180, 220, 0.22) 0%, rgba(6, 68, 98, 0.28) 40%, transparent 70%)",
                    filter: "blur(80px)",
                }}
                aria-hidden="true"
            />

            {/* 2. Ambient backlight in top-right */}
            <div
                className="pointer-events-none absolute -top-24 -right-20 w-[450px] sm:w-[600px] lg:w-[750px] h-[450px] sm:h-[600px] lg:h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(0, 140, 200, 0.12) 0%, rgba(8, 35, 55, 0.18) 45%, transparent 70%)",
                    filter: "blur(80px)",
                }}
                aria-hidden="true"
            />

            {/* ---------------- MAIN CONTAINER ---------------- */}
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                {/* 
                  Outer Rounded Card Frame 
                  Matches screenshot: Slate navy at top transitioning to rich teal at bottom
                */}
                <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 border border-white/[0.09] bg-gradient-to-b from-[#202a34] via-[#1c2e3f] to-[#1e485c] shadow-[0_30px_70px_rgba(0,0,0,0.55)] overflow-hidden">
                    {/* Inner bottom-left radial glow for deep ambient lighting */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(circle at 14% 94%, rgba(0, 190, 230, 0.22) 0%, rgba(20, 75, 100, 0.18) 45%, transparent 70%)",
                        }}
                        aria-hidden="true"
                    />

                    {/* Inner top-right subtle ambient glow */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(circle at 85% 15%, rgba(0, 160, 210, 0.08) 0%, transparent 50%)",
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
                        {/* ================= LEFT COLUMN ================= */}
                        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
                            {/* Heading */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[34px] sm:text-[44px] md:text-[50px] lg:text-[52px] xl:text-[58px] font-extrabold text-white leading-[1.08] tracking-[-0.03em]"
                            >
                                Two seats.
                                <br />
                                One honest
                                <br />
                                <span className="bg-gradient-to-r from-[#00F0FF] via-[#00C4FB] to-[#0085F8] bg-clip-text text-transparent">
                                    conversation.
                                </span>
                            </motion.h2>

                            {/* Description Paragraph */}
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                                className="mt-5 sm:mt-7 text-xs sm:text-[13px] md:text-sm text-[#94a9bf] leading-relaxed max-w-[460px]"
                            >
                                Experienced colleagues, not keynote speakers. Our hosts know the pressures, moving
                                parts, and last-minute decisions that come with planning an event. They bring that
                                experience to every conversation, asking the questions planners actually want
                                answered—from managing tight budgets and working with production teams to handling
                                unexpected challenges.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                                className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
                            >
                                <Link
                                    href="#episodes"
                                    aria-label="Explore the conversations"
                                    className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-[#012232] font-semibold text-xs sm:text-[13px] md:text-sm bg-gradient-to-r from-[#00E5FF] to-[#00C2FF] hover:from-[#00F0FF] hover:to-[#00D5F8] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030A16] transition-all duration-300 whitespace-nowrap"
                                >
                                    Explore the conversations
                                </Link>

                                <Link
                                    href="#suggest"
                                    aria-label="Suggest a guest for the conversation"
                                    className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-white font-medium text-xs sm:text-[13px] md:text-sm border border-white/25 hover:border-[#00E5FF]/70 hover:bg-white/[0.06] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030A16] transition-all duration-300 whitespace-nowrap"
                                >
                                    Suggest a guest
                                </Link>
                            </motion.div>
                        </div>

                        {/* ================= RIGHT COLUMN: 2 HOST CARDS ================= */}
                        <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-5 sm:gap-6">
                            {HOSTS.map((host) => {
                                const isHovered = activeCard === host.id;

                                return (
                                    <motion.div
                                        key={host.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: host.id * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                        role="button"
                                        tabIndex={0}
                                        aria-pressed={isHovered}
                                        aria-label={`View host profile for ${host.name}`}
                                        onMouseEnter={() => setActiveCard(host.id)}
                                        onClick={() => setActiveCard(host.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                setActiveCard(host.id);
                                            }
                                        }}
                                        className={`relative w-full rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-4 md:p-5 transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 items-center sm:items-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${isHovered
                                            ? "bg-gradient-to-r from-[#00F0FF] via-[#09AFD0] to-[#204968] shadow-[0_12px_45px_rgba(0,240,255,0.38)] scale-[1.01]"
                                            : "bg-[#1c2734]/60 border border-white/[0.12] hover:bg-[#202e3d]/70 hover:border-white/20 shadow-none"
                                            }`}
                                    >
                                        {/* 
                                          Host Photo
                                          In the active card, the outer padding of bright cyan creates the vibrant cyan frame around this photo
                                        */}
                                        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-[#040e1a] shadow-md">
                                            <Image
                                                src={host.image}
                                                alt={`${host.name} - ${host.role}`}
                                                fill
                                                sizes="(min-width: 1024px) 180px, (min-width: 640px) 150px, 120px"
                                                className="object-cover object-top transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>

                                        {/* Host Info */}
                                        <div className="flex flex-col justify-between flex-1 text-center sm:text-left h-full">
                                            <div>
                                                {/* Name */}
                                                <h3
                                                    className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 ${isHovered ? "text-white drop-shadow-sm" : "text-[#00F0FF]"
                                                        }`}
                                                >
                                                    {host.name}
                                                </h3>

                                                {/* Role / Subtitle */}
                                                <p
                                                    className={`text-xs sm:text-[13px] font-semibold mt-1 tracking-wide transition-colors duration-300 ${isHovered ? "text-white/95" : "text-[#00E5FF]/85"
                                                        }`}
                                                >
                                                    {host.role}
                                                </p>

                                                {/* Bio */}
                                                <p
                                                    className={`text-xs sm:text-[13px] leading-relaxed mt-2.5 sm:mt-3 transition-colors duration-300 ${isHovered ? "text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" : "text-[#cbd5e1]"
                                                        }`}
                                                >
                                                    {host.bio}
                                                </p>
                                            </div>

                                            {/* Quote */}
                                            <p
                                                className={`text-xs sm:text-[13px] font-medium italic mt-3 sm:mt-4 transition-colors duration-300 ${isHovered ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" : "text-white/90"
                                                    }`}
                                            >
                                                {host.quote}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
