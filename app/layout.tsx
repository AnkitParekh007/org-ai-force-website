import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = DM_Sans({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Employee Force — Enterprise AI workforce & agent marketplace",
  description: "Discover, deploy, and orchestrate role-based AI employees across engineering, product, operations, and more. Enterprise-ready governance for AI-native organizations.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "AI Employee Force — Build your AI workforce",
    description: "Hire specialized AI employees, orchestrate multi-agent execution, and govern AI-native operations at enterprise scale.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Org AI Force agent team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Employee Force — Build your AI workforce",
    description: "Hire specialized AI employees, orchestrate multi-agent execution, and govern AI-native operations at enterprise scale.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
