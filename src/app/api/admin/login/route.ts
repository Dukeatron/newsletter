import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from "@/lib/auth";

const bodySchema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: "Password required." }, { status: 400 });
  }

  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!passwordHash) {
    return NextResponse.json(
      { message: "Admin login is not configured." },
      { status: 500 }
    );
  }

  let isValid = false;
  try {
    isValid = await bcrypt.compare(parsed.data.password, passwordHash);
  } catch {
    // A malformed hash (e.g. corrupted by shell `$`-interpolation when the
    // env var was set) throws here instead of just returning false — surface
    // it as a clear config error rather than a generic 500.
    return NextResponse.json(
      { message: "ADMIN_PASSWORD_HASH looks malformed — regenerate it." },
      { status: 500 }
    );
  }

  if (!isValid) {
    return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
