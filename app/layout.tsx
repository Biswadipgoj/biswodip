import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./compile.css";

import { personal } from "@/lib/data";

const display = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
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
    "Software Developer",
    "Full-Stack Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Portfolio",
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
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
