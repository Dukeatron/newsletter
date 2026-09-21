import type { RankedEntry } from "@/lib/metrics";

export function BarList({
  title,
  entries,
  emptyLabel = "No data yet.",
}: {
  title: string;
  entries: RankedEntry[];
  emptyLabel?: string;
}) {
  const max = Math.max(1, ...entries.map((entry) => entry.count));

  return (
    <div>
      <p className="font-label text-[11px] uppercase tracking-[0.15em] text-umber">
        {title}
      </p>
      <div className="mt-3 space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.label}
            title={`${entry.label}: ${entry.count}`}
            className="flex items-center gap-3"
          >
            <span className="w-28 shrink-0 truncate font-body text-sm text-midnight/80">
              {entry.label}
            </span>
            <div className="h-2 flex-1 bg-stone">
              <div
                className="h-2 bg-midnight"
                style={{ width: `${(entry.count / max) * 100}%` }}
              />
            </div>
            <span className="w-10 shrink-0 text-right font-label text-xs text-midnight/60">
              {entry.count}
            </span>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="font-body text-sm text-midnight/50">{emptyLabel}</p>
        )}
      </div>
    </div>
  );
}
