import { NextResponse } from "next/server";
import { renderPreviewEmailHtml } from "@/lib/renderPreviewEmail";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const slug = url.searchParams.get("slug");

  if ((type !== "post" && type !== "announcement") || !slug) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const html = await renderPreviewEmailHtml(type, slug);
  if (!html) {
    return NextResponse.json({ message: "Content not found." }, { status: 404 });
  }

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
