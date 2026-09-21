import type { NextConfig } from "next";
import redirectEntries from "./content-config/redirects.json";

type RedirectEntry = {
  source: string;
  destination: string;
  permanent: boolean;
};

const nextConfig: NextConfig = {
  async redirects() {
    return redirectEntries as RedirectEntry[];
  },
  // Lets phones/tablets on the same Wi-Fi load the dev server's JS via the
  // "Network" URL `next dev` prints (e.g. http://10.10.7.79:3000) instead of
  // having Next.js block it as a cross-origin dev request. Only affects
  // `next dev`; irrelevant once deployed. If your machine's LAN IP changes,
  // update this to match.
  allowedDevOrigins: ["10.10.7.79", "192.168.68.53"],
};

export default nextConfig;
