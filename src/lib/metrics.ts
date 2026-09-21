export type PageViewRow = {
  path: string;
  post_slug: string | null;
  country: string | null;
  device: string;
  created_at: string;
};

export type RankedEntry = { label: string; count: number };

export type DailyCount = { date: string; count: number };

const DEVICE_ORDER = ["desktop", "mobile", "tablet", "unknown"] as const;

function rankAndCount(
  rows: PageViewRow[],
  key: (row: PageViewRow) => string | null,
  limit?: number
): RankedEntry[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const value = key(row);
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  const ranked = [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
  return limit ? ranked.slice(0, limit) : ranked;
}

export function topPosts(rows: PageViewRow[], limit = 10): RankedEntry[] {
  return rankAndCount(rows, (row) => row.post_slug, limit);
}

export function topCountries(rows: PageViewRow[], limit = 10): RankedEntry[] {
  return rankAndCount(rows, (row) => row.country, limit);
}

export function deviceBreakdown(rows: PageViewRow[]): RankedEntry[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    counts.set(row.device, (counts.get(row.device) ?? 0) + 1);
  }
  return DEVICE_ORDER.map((device) => ({
    label: device,
    count: counts.get(device) ?? 0,
  }));
}

export function dailyTrend(rows: PageViewRow[], days: number): DailyCount[] {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const day = row.created_at.slice(0, 10);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }

  const result: DailyCount[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    result.push({ date: key, count: counts.get(key) ?? 0 });
  }
  return result;
}
