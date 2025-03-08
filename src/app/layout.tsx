import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { AnimationProvider } from "@/components/animation-provider";
import ScrollTracker from "@/components/scroll-tracker";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScrollProvider from "@/providers/smooth-scroll-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sreejith Nair",
  description: "Portfolio website for Sreejith Nair, a full-stack developer",
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
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <ScrollTracker />
                <main className="flex-1 container mx-auto px-4 overflow-x-hidden">
                  {children}
                </main>
                <Footer />
              </div>
            </SmoothScrollProvider>
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
