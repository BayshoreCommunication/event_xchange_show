"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "The Show",
            links: [
                { name: "Episodes", href: "#episodes" },
                { name: "Hosts", href: "#hosts" },
                { name: "About", href: "#about" },
            ],
        },
        {
            title: "Listen",
            links: [
                { name: "Apple Podcasts", href: "https://podcasts.apple.com", external: true },
                { name: "Spotify", href: "https://spotify.com", external: true },
                { name: "Youtube", href: "https://youtube.com", external: true },
            ],
        },
        {
            title: "Connect",
            links: [
                { name: "Be a guest", href: "#be-a-guest" },
                { name: "Linkedin", href: "https://linkedin.com", external: true },
                { name: "Contact", href: "#contact" },
            ],
        },
    ];

    return (
        <footer className="w-full bg-[#030A16] text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
                {/* ---------------- TOP CONTENT (LOGO + NAV COLUMNS) ---------------- */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
                    {/* Brand / Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="inline-block group focus:outline-none">
                            <Image
                                src="/images/home/footer/footer-logo.png"
                                alt="The Event Xchange Show"
                                width={180}
                                height={117}
                                className="w-36 sm:w-44 md:w-48 h-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Nav Link Columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 w-full lg:w-auto">
                        {footerSections.map((section) => (
                            <div key={section.title} className="flex flex-col space-y-4">
                                <h3 className="text-[#02F6F8] font-semibold text-sm sm:text-base tracking-wide">
                                    {section.title}
                                </h3>
                                <ul className="space-y-2.5 sm:space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                target={link.external ? "_blank" : undefined}
                                                rel={link.external ? "noopener noreferrer" : undefined}
                                                className="text-sm sm:text-[15px] text-gray-300 hover:text-white transition-colors duration-200 inline-block py-0.5"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---------------- BOTTOM COPYRIGHT & POWERED BY ---------------- */}
                <div className="pt-16 sm:pt-20 md:pt-28 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-400">
                    <p className="text-center sm:text-left">
                        {currentYear} The Event Exchange Show- Where Planning Meets Production
                    </p>
                    <div className="flex items-center justify-center sm:justify-end gap-2 text-gray-400">
                        <span>Powered by</span>
                        <Link
                            href="https://www.dxg.agency"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Digital Xperience Group"
                            className="inline-flex items-center hover:opacity-80 transition-opacity"
                        >
                            <Image
                                src="/images/home/footer/dxg-logo.png"
                                alt="DXG - Digital Xperience Group"
                                width={68}
                                height={28}
                                className="h-5 sm:h-6 w-auto object-contain"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
