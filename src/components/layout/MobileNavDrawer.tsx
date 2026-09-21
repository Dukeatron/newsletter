"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_LINKS, isNavLinkActive } from "@/components/layout/nav-links";

export function MobileNavDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  // Close whenever the route actually changes underneath the drawer.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-midnight/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={cn(
          "absolute inset-y-0 right-0 flex w-72 max-w-[80vw] flex-col bg-bone shadow-xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-end px-6 py-6">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="font-label text-xs uppercase tracking-[0.2em] text-midnight/60 hover:text-umber"
          >
            Close
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6">
          {NAV_LINKS.map((link) => {
            const active = isNavLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between border-b border-midnight/10 py-4 font-display text-2xl",
                  active ? "text-umber" : "text-midnight"
                )}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-umber"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
