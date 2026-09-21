import { Resend } from "resend";

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  return new Resend(apiKey);
}

export const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "Marque & Manners <newsletter@marqueandmanners.com>";

export const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";
