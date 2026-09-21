export function RatingBadge({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-champagne bg-midnight px-3 py-1 font-display text-sm text-champagne">
      {rating}/10
    </span>
  );
}
