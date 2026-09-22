"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";
import { useHasMounted } from "@/lib/useHasMounted";
import { isArticleRoute } from "@/lib/isArticleRoute";
import { NAV_LINKS, isNavLinkActive } from "@/components/layout/nav-links";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { PageTitleBar } from "@/components/layout/PageTitleBar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const SCROLL_THRESHOLD = 24;

export function SiteHeader() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const mounted = useHasMounted();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const monogramSrc =
    mounted && resolvedTheme === "dark"
      ? "/brand/monogram-dark.png"
      : "/brand/monogram.png";
  const isArticle = isArticleRoute(pathname);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-midnight/10 bg-bone/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="relative -ml-1 block h-9 w-56 shrink-0">
            <span
              className={cn(
                "absolute inset-y-0 left-0 flex items-center gap-2 transition-all duration-300",
                scrolled
                  ? "translate-y-1 scale-95 opacity-0"
                  : "translate-y-0 scale-100 opacity-100"
              )}
            >
              <span className="font-display text-2xl tracking-wide whitespace-nowrap text-midnight">
                Marque &amp; Manners
              </span>
            </span>
            <span
              className={cn(
                "absolute inset-y-0 left-0 flex items-center gap-2 transition-all duration-300",
                scrolled
                  ? "translate-y-0 scale-100 opacity-100"
                  : "-translate-y-1 scale-95 opacity-0"
              )}
            >
              <Image
                src={monogramSrc}
                alt="Marque & Manners"
                width={32}
                height={32}
                priority
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isNavLinkActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-label text-xs font-medium uppercase tracking-[0.15em] transition-colors",
                    active
                      ? "text-umber"
                      : "text-midnight/70 hover:text-umber"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-label="Open menu"
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span className="h-px w-5 bg-midnight" />
              <span className="h-px w-5 bg-midnight" />
              <span className="h-px w-5 bg-midnight" />
            </button>
          </div>
        </div>

        <div className={isArticle ? "" : "lg:hidden"}>
          <PageTitleBar />
        </div>
      </header>

      <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
