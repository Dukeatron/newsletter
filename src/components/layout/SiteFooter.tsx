import Image from "next/image";
import { SubscribeForm } from "@/components/layout/SubscribeForm";

export function SiteFooter() {
  return (
    <footer className="border-t border-midnight/10 bg-stone">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Image
            src="/brand/monogram.png"
            alt="Marque & Manners"
            width={44}
            height={44}
          />
          <p className="mt-2 max-w-sm font-body text-sm text-midnight/70">
            Motoring, mostly. Manners, occasionally.
          </p>
        </div>
        <div className="w-full max-w-sm">
          <p className="font-label text-xs font-medium uppercase tracking-[0.2em] text-umber">
            Join the mailing list
          </p>
          <SubscribeForm className="mt-3" />
        </div>
      </div>
      <div className="border-t border-midnight/10 py-4 text-center font-label text-[11px] uppercase tracking-[0.15em] text-midnight/50">
        Marque &amp; Manners
      </div>
    </footer>
  );
}
