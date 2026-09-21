import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import {
  deviceFromUserAgent,
  isLikelyBot,
  postSlugFromPath,
  shouldSkipTracking,
} from "@/lib/track";

const bodySchema = z.object({
  path: z.string().min(1),
  referrer: z.string().optional(),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return new NextResponse(null, { status: 204 });
  }

  const { path, referrer } = parsed.data;
  const userAgent = request.headers.get("user-agent");

  if (shouldSkipTracking(path) || isLikelyBot(userAgent)) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const { country } = geolocation(request);
    const supabase = getSupabaseServiceClient();

    await supabase.from("page_views").insert({
      path,
      post_slug: postSlugFromPath(path),
      referrer: referrer || null,
      country: country ?? null,
      device: deviceFromUserAgent(userAgent),
    });
  } catch {
    // Tracking is best-effort (e.g. Supabase isn't configured yet in this
    // environment) — never surface an error to the page that pinged us.
  }

  return new NextResponse(null, { status: 204 });
}
