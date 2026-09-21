export function IssueBadge({ issue }: { issue: number }) {
  return (
    <span className="font-display text-sm text-umber">
      Issue {String(issue).padStart(2, "0")}
    </span>
  );
}
