import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

import { personal } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${personal.name} — ${personal.role}`;
const description = personal.intro;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Biswodip Goj",
    "Software Engineer",
    "Distributed Systems",
    "Full-Stack Developer",
    "Systems Architecture",
    "Next.js",
    "Rust",
    "TypeScript",
    "PostgreSQL",
    "India",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F7F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
