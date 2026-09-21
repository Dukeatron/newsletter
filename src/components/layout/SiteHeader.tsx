import Link from "next/link";
import { AmpersandMark } from "@/components/ui/AmpersandMark";

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/announcements", label: "Announcements" },
  { href: "/subscribe", label: "Subscribe" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-midnight/10 bg-bone">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wide text-midnight">
            MARQUE
          </span>
          <AmpersandMark variant="umber" size="sm" />
          <span className="font-display text-2xl tracking-wide text-midnight">
            MANNERS
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label text-xs font-medium uppercase tracking-[0.15em] text-midnight/70 transition-colors hover:text-umber"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
