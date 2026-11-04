// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

const switzer = localFont({
  src: [
    {
      path: "../public/fonts/Switzer-Variable.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../public/fonts/Switzer-VariableItalic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const siteUrl = "https://event-xchange-show.vercel.app/";

/* ---------------- METADATA ---------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Event XChange Show | Digital Xperience Group",
    template: "%s | The Event XChange Show",
  },
  description:
    "The Event XChange Show — Where planning meets production. Real conversations, honest stories, and insights from corporate and association event leaders.",
  keywords: [
    "The Event XChange Show",
    "Digital Xperience Group",
    "DXG",
    "Event Production",
    "Event Planning",
    "Corporate Events",
    "Podcast",
  ],
  authors: [{ name: "Digital Xperience Group", url: siteUrl }],
  creator: "Digital Xperience Group",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "The Event XChange Show | Digital Xperience Group",
    description:
      "Where planning meets production. An independent podcast exploring real stories, tough decisions, and transformational live event experiences.",
    url: siteUrl,
    siteName: "The Event XChange Show",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Event XChange Show - Where Planning Meets Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Event XChange Show | Digital Xperience Group",
    description:
      "Where planning meets production. Real stories and insights for corporate and association event leaders.",
    images: ["/opengraph-image.jpg"],
  },
};

/* ---------------- ROOT LAYOUT ---------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${switzer.variable} font-sans`}>
      <body>
        {/* NoScript Fallback */}
        <noscript>
          <style>
            {`
              * {
                opacity: 1 !important;
                transform: none !important;
              }
            `}
          </style>
        </noscript>

        {children}
      </body>
    </html>
  );
}
