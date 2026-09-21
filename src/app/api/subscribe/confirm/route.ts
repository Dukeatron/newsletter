import { NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/resend";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${SITE_URL}/subscribe/confirm?status=invalid`);
  }

  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("subscribers")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
    .eq("confirm_token", token)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return NextResponse.redirect(`${SITE_URL}/subscribe/confirm?status=invalid`);
  }

  return NextResponse.redirect(`${SITE_URL}/subscribe/confirm?status=success`);
}
