import { cn } from "@/lib/cn";

export function Rule({
  className,
  tone = "midnight",
}: {
  className?: string;
  tone?: "midnight" | "champagne";
}) {
  const toneClass =
    tone === "champagne" ? "border-champagne/40" : "border-midnight/15";

  return <hr className={cn("border-t", toneClass, className)} />;
}
