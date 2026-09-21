import { NextResponse } from "next/server";
import { getConfirmedSubscriberEmails } from "@/lib/subscribers";

export async function GET() {
  const emails = await getConfirmedSubscriberEmails();
  return NextResponse.json({ emails });
}
