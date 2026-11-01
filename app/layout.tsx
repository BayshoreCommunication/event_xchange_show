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

const siteUrl = "https://www.dxg.agency";

/* ---------------- METADATA ---------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Digital Xperience Group",
  description: "Digital Xperience Group Website",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Digital Xperience Group",
    description: "Digital Xperience Group Website",
    url: siteUrl,
    siteName: "Digital Xperience Group",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Xperience Group",
    description: "Digital Xperience Group Website",
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
