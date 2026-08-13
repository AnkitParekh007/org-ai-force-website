import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Org AI Force — Your organization, augmented",
  description: "Meet 55 specialized, governed AI agents built to make every team more capable.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Org AI Force — Your organization, augmented",
    description: "55 specialized AI agents. One governed operating layer.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Org AI Force agent team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Org AI Force — Your organization, augmented",
    description: "55 specialized AI agents. One governed operating layer.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
