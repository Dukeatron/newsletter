import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatTile } from "@/components/admin/StatTile";
import { BarList } from "@/components/admin/BarList";
import { DailyTrendChart } from "@/components/admin/DailyTrendChart";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import {
  dailyTrend,
  deviceBreakdown,
  topCountries,
  topPosts,
  type PageViewRow,
} from "@/lib/metrics";

export const dynamic = "force-dynamic";

const WINDOW_DAYS = 30;

export default async function AdminMetricsPage() {
  const supabase = getSupabaseServiceClient();
  const since = new Date();
  since.setDate(since.getDate() - WINDOW_DAYS);

  const { data } = await supabase
    .from("page_views")
    .select("path, post_slug, country, device, created_at")
    .gte("created_at", since.toISOString());

  const rows: PageViewRow[] = data ?? [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Eyebrow>Admin</Eyebrow>
      <h1 className="mt-2 font-display text-4xl text-midnight">Metrics</h1>
      <p className="mt-3 font-body text-midnight/70">
        Last {WINDOW_DAYS} days. No IPs, cookies, or per-visitor identity are
        stored.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatTile label="Total views" value={rows.length} />
        <StatTile
          label="Confirmed countries"
          value={new Set(rows.map((row) => row.country).filter(Boolean)).size}
        />
        <StatTile
          label="Posts read"
          value={new Set(rows.map((row) => row.post_slug).filter(Boolean)).size}
        />
      </div>

      <div className="mt-10">
        <DailyTrendChart data={dailyTrend(rows, WINDOW_DAYS)} />
      </div>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <BarList title="Top posts" entries={topPosts(rows)} />
        <BarList title="Top countries" entries={topCountries(rows)} />
        <BarList title="Devices" entries={deviceBreakdown(rows)} />
      </div>
    </div>
  );
}
