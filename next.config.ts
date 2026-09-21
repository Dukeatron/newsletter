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
};

export default nextConfig;
