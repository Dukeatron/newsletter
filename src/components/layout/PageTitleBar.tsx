"use client";

import { useSyncExternalStore } from "react";

const SITE_SUFFIX = " · Marque & Manners";
const SITE_TITLE = "Marque & Manners";

function getSnapshot(): string {
  const title = document.title;
  if (title === SITE_TITLE) return "Home";
  return title.endsWith(SITE_SUFFIX)
    ? title.slice(0, -SITE_SUFFIX.length)
    : title;
}

function getServerSnapshot(): string {
  return "";
}

function subscribe(onChange: () => void): () => void {
  // Observe document.head rather than just the <title> node: Next.js can
  // replace the title element wholesale on navigation rather than mutating
  // its text, so subtree coverage is needed to catch either case.
  const observer = new MutationObserver(onChange);
  observer.observe(document.head, {
    childList: true,
    characterData: true,
    subtree: true,
  });
  return () => observer.disconnect();
}

export function PageTitleBar() {
  const label = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="flex h-8 items-center border-t border-midnight/10 px-6">
      <span className="mx-auto font-label text-[11px] font-medium uppercase tracking-[0.2em] text-umber sm:mx-0">
        {label}
      </span>
    </div>
  );
}
