import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { AnimationProvider } from "@/providers/animation-provider";
import ScrollTracker from "@/components/scroll-tracker";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";
import { root_keywords } from "@/utils/keywords";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sreejith Nair | Senior Software Engineer",
  description: "Professional portfolio of Sreejith Nair, a Senior Software Engineer with 3.5+ years of experience building dynamic web applications across Java, PHP, and JavaScript. Explore projects, skills, and development expertise.",
  keywords: root_keywords,
  authors: [{ name: "Sreejith Nair" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://sreejithnair.me",
    title: "Sreejith Nair | Senior Software Engineer",
    description: "Professional portfolio showcasing full-stack development projects across Java, PHP, and JavaScript",
    images: [{
      url: "https://sreejithnair.me/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Sreejith Nair Portfolio",
    }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AnimationProvider>
            <SmoothScrollProvider>
              <Navbar />
              <ScrollTracker />
              <main className="flex-1 container mx-auto px-4 overflow-x-hidden">
                {children}
              </main>
              <Footer />
            </SmoothScrollProvider>
          </AnimationProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
