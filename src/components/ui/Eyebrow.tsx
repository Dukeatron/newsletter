import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  tone = "umber",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "umber" | "champagne" | "midnight";
}) {
  const toneClass = {
    umber: "text-umber",
    champagne: "text-champagne",
    midnight: "text-midnight/70",
  }[tone];

  return (
    <p
      className={cn(
        "font-label text-xs font-medium uppercase tracking-[0.2em]",
        toneClass,
        className
      )}
    >
      {children}
    </p>
  );
}
