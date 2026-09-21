export function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-midnight/10 p-4">
      <p className="font-label text-[11px] uppercase tracking-[0.15em] text-umber">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl text-midnight">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
