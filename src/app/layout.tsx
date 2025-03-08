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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sreejith Nair | Full-Stack Developer",
  description: "Professional portfolio of Sreejith Nair, a full-stack developer specializing in modern web development. Explore projects, skills, and development expertise.",
  keywords: root_keywords,
  authors: [{ name: "Sreejith Nair" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://sreejithnair.me",
    title: "Sreejith Nair | Full-Stack Developer",
    description: "Professional portfolio showcasing full-stack development projects",
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
      </body>
    </html>
  );
}
