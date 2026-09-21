"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/useHasMounted";

export function FooterMonogram() {
  const { resolvedTheme } = useTheme();
  const mounted = useHasMounted();

  const src =
    mounted && resolvedTheme === "dark"
      ? "/brand/monogram-dark.png"
      : "/brand/monogram.png";

  return (
    <Image src={src} alt="Marque & Manners" width={44} height={44} loading="eager" />
  );
}
