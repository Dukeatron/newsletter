import { cn } from "@/lib/cn";

/**
 * Text-rendered ampersand mark standing in for the brand monogram.
 * Source brand sheets (public/brand/logo.png) are a spec sheet, not a
 * cropped icon asset, so this is set in the display face instead of
 * extracted from the PNG.
 */
export function AmpersandMark({
  variant = "midnight",
  className,
  size = "md",
}: {
  variant?: "midnight" | "champagne" | "bone" | "umber";
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const colorClass = {
    midnight: "text-midnight",
    champagne: "text-champagne",
    bone: "text-bone",
    umber: "text-umber",
  }[variant];

  const sizeClass = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-5xl",
  }[size];

  return (
    <span
      aria-hidden
      className={cn("font-display italic leading-none", colorClass, sizeClass, className)}
    >
      &amp;
    </span>
  );
}
