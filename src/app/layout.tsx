import type { Metadata } from "next";
import { Cormorant_Garamond, Newsreader, Hanken_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Marque & Manners",
    template: "%s · Marque & Manners",
  },
  description:
    "A newsletter on cars, ownership, and the manners of the road.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${newsreader.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-midnight">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageViewTracker />
          <SiteHeader />
          <main className="flex-1 pt-24">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
