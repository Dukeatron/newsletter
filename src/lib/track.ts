const BOT_UA_PATTERN =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot/i;

export function isLikelyBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_UA_PATTERN.test(userAgent);
}

export type Device = "mobile" | "tablet" | "desktop" | "unknown";

export function deviceFromUserAgent(userAgent: string | null): Device {
  if (!userAgent) return "unknown";
  if (/ipad|tablet|playbook|silk/i.test(userAgent)) return "tablet";
  if (/mobile|iphone|ipod|android/i.test(userAgent)) return "mobile";
  return "desktop";
}

export function postSlugFromPath(path: string): string | null {
  const match = path.match(/^\/(?:blog|announcements)\/([^/?#]+)/);
  return match ? match[1] : null;
}

export function shouldSkipTracking(path: string): boolean {
  return path.startsWith("/admin") || path.startsWith("/api");
}
