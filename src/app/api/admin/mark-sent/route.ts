import { NextResponse } from "next/server";
import { z } from "zod";
import { markContentAsSent } from "@/lib/sendNotification";

const bodySchema = z.object({
  contentType: z.enum(["post", "announcement"]),
  slug: z.string().min(1),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const result = await markContentAsSent(parsed.data.contentType, parsed.data.slug);

  if (!result.ok) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  return NextResponse.json({
    message: `Marked as sent (${result.recipientCount} confirmed subscriber(s) at the time).`,
  });
}
