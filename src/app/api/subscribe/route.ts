import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { getResendClient, EMAIL_FROM, SITE_URL } from "@/lib/resend";
import { ConfirmSubscriptionEmail } from "@/emails/ConfirmSubscription";

const bodySchema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const email = parsed.data.email.toLowerCase().trim();
  const supabase = getSupabaseServiceClient();
  // Temporary stopgap until a sending domain is verified with Resend — see
  // .env.example. Remove this branch (and the env var) once real double
  // opt-in confirmation emails can reach arbitrary subscriber addresses.
  const autoConfirm = process.env.AUTO_CONFIRM_SUBSCRIBERS === "true";

  const { data: existing } = await supabase
    .from("subscribers")
    .select("id, status")
    .eq("email", email)
    .maybeSingle();

  if (existing && existing.status === "confirmed") {
    return NextResponse.json({
      message: "You're already subscribed.",
    });
  }

  if (autoConfirm) {
    const confirmedFields = { status: "confirmed", confirmed_at: new Date().toISOString() };
    const { error } = existing
      ? await supabase.from("subscribers").update(confirmedFields).eq("id", existing.id)
      : await supabase.from("subscribers").insert({ email, ...confirmedFields });

    if (error) {
      return NextResponse.json(
        { message: "Something went wrong. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "You're subscribed!" });
  }

  let confirmToken: string;

  if (existing) {
    const { data: updated, error } = await supabase
      .from("subscribers")
      .update({
        status: "pending",
        confirm_token: crypto.randomUUID(),
      })
      .eq("id", existing.id)
      .select("confirm_token")
      .single();

    if (error || !updated) {
      return NextResponse.json(
        { message: "Something went wrong. Try again." },
        { status: 500 }
      );
    }
    confirmToken = updated.confirm_token;
  } else {
    const { data: inserted, error } = await supabase
      .from("subscribers")
      .insert({ email })
      .select("confirm_token")
      .single();

    if (error || !inserted) {
      return NextResponse.json(
        { message: "Something went wrong. Try again." },
        { status: 500 }
      );
    }
    confirmToken = inserted.confirm_token;
  }

  const confirmUrl = `${SITE_URL}/api/subscribe/confirm?token=${confirmToken}`;

  const resend = getResendClient();
  await resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: "Confirm your subscription",
    react: ConfirmSubscriptionEmail({ confirmUrl, siteUrl: SITE_URL }),
  });

  return NextResponse.json({
    message: "Check your inbox to confirm your subscription.",
  });
}
