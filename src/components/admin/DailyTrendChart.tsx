import type { DailyCount } from "@/lib/metrics";

export function DailyTrendChart({ data }: { data: DailyCount[] }) {
  const max = Math.max(1, ...data.map((day) => day.count));

  return (
    <div>
      <p className="font-label text-[11px] uppercase tracking-[0.15em] text-umber">
        Views, Last {data.length} Days
      </p>
      <div className="mt-3 flex h-24 items-end gap-1">
        {data.map((day) => (
          <div
            key={day.date}
            title={`${day.date}: ${day.count} view${day.count === 1 ? "" : "s"}`}
            className="flex-1 bg-midnight/80 transition-colors hover:bg-umber"
            style={{ height: `${Math.max(4, (day.count / max) * 100)}%` }}
          />
        ))}
      </div>
    </div>
  );
}
