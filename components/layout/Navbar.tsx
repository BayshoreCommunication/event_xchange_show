"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "The show", href: "#the-show" },
        { name: "Episodes", href: "#episodes" },
        { name: "Hosts", href: "#hosts" },
        { name: "Be a guest", href: "#be-a-guest" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full transition-all duration-300">
            {/* ---------------- TOP ANNOUNCEMENT BAR ---------------- */}
            <div className="w-full bg-white py-1.5 sm:py-2 px-4 text-center border-b border-gray-100">
                <p className="text-xs sm:text-[13px] md:text-sm font-semibold text-[#0085F8] tracking-tight">
                    New podcast · Premiere November 2024!
                </p>
            </div>

            {/* ---------------- MAIN NAVBAR ---------------- */}
            <nav
                className={`w-full bg-[#030A16] transition-colors duration-300 ${scrolled ? "bg-[#030A16]/95 backdrop-blur-md shadow-lg shadow-black/20" : ""
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20 md:h-24">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="inline-flex items-center focus:outline-none">
                                <Image
                                    src="/images/home/navbar/logo.png"
                                    alt="The Event Xchange Show"
                                    width={103}
                                    height={67}
                                    priority
                                    className="h-12 sm:h-14 md:h-16 w-auto object-contain "
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm lg:text-[15px] font-medium text-gray-200 hover:text-white transition-colors duration-200 tracking-wide relative group py-1"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#02F6F8] to-[#0085F8] transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA Button */}
                        <div className="hidden md:flex items-center">
                            <Link
                                href="#listen-now"
                                className="inline-flex items-center justify-center px-7 py-2.5 rounded-full text-black font-semibold text-sm lg:text-[15px] bg-gradient-to-r from-[#02F6F8] to-[#0085F8] hover:shadow-[0_0_25px_rgba(2,246,248,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
                            >
                                Listen Now
                            </Link>
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex md:hidden items-center gap-3">
                            <Link
                                href="#listen-now"
                                className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-black font-semibold text-xs bg-gradient-to-r from-[#02F6F8] to-[#0085F8] shadow-[0_0_15px_rgba(2,246,248,0.4)]"
                            >
                                Listen Now
                            </Link>

                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
                                aria-label="Toggle Navigation Menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-[#02F6F8]" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-200" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ---------------- MOBILE DRAWER MENU ---------------- */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden border-t border-white/10 bg-[#030A16]/98 backdrop-blur-xl ${mobileMenuOpen ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0 py-0"
                        }`}
                >
                    <div className="px-5 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-base font-medium text-gray-200 hover:text-white hover:translate-x-1.5 transition-all duration-200 py-2 border-b border-white/5"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="pt-2">
                            <Link
                                href="#listen-now"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-black font-semibold text-sm bg-gradient-to-r from-[#02F6F8] to-[#0085F8] shadow-[0_0_20px_rgba(2,246,248,0.5)] active:scale-95 transition-all duration-300"
                            >
                                Listen Now
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
