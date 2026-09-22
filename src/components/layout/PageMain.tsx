"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isArticleRoute } from "@/lib/isArticleRoute";

/**
 * The header's total height varies: the page-title bar row only shows at
 * desktop widths on article pages (see SiteHeader), so <main>'s top
 * padding has to match that per-route, per-breakpoint height exactly to
 * avoid a gap or overlap.
 */
export function PageMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isArticle = isArticleRoute(pathname);

  return (
    <main className={cn("flex-1", isArticle ? "pt-24" : "pt-24 lg:pt-16")}>
      {children}
    </main>
  );
}
