import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

import { personal } from "@/lib/data";

const display = Sora({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-loaded",
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
    "Business Analyst",
    "Business Data",
    "Dashboards",
    "Databases",
    "Analytics",
    "Next.js",
    "PostgreSQL",
    "West Bengal",
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
  themeColor: "#243e54",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
