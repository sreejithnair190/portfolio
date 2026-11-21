import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";
import "./studio.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { root_keywords } from "@/utils/keywords";
import { EXPERIENCE } from "@/utils/experience";

import { portfolioDescription, siteUrl } from "@/utils/constants";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Sreejith Nair | ${EXPERIENCE[0].title}`,
    template: "%s | Sreejith Nair",
  },
  description: portfolioDescription,
  keywords: root_keywords,
  authors: [{ name: "Sreejith Nair" }],
  openGraph: {
    type: "website",
    siteName: "Sreejith Nair",
    images: ["/studio/terminal.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          {(process.env.VERCEL === "1" || process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH) && <SpeedInsights />}
        </ThemeProvider>
      </body>
    </html>
  );
}
