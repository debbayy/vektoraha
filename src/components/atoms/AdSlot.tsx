"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/constants";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  /** Ad unit ID from AdSense. When empty, nothing is rendered. */
  slot: string;
  className?: string;
}

/**
 * Responsive AdSense display unit. Reserves space up front so the page doesn't jump
 * when the ad loads, and renders nothing until AdSense is configured.
 */
export function AdSlot({ slot, className }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || !ref.current) return;
    if (ref.current.dataset.adsbygoogleStatus) return; // already filled (e.g. strict-mode remount)
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blockers or not-yet-approved accounts must never break the page */
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) return null;

  return (
    <aside aria-label="Iklan" className={cn("w-full", className)}>
      <span className="mb-1 block text-center text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
        Iklan
      </span>
      <div className="min-h-[100px] overflow-hidden rounded-xl bg-card sm:min-h-[120px]">
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
