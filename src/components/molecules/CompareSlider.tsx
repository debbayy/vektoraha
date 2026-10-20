"use client";

import { MoveHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

/** Before / after slider. Both images are shown with object-contain over the same box. */
export function CompareSlider({
  before,
  after,
  className,
}: {
  before: string;
  after: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className={cn("relative select-none overflow-hidden rounded-2xl bg-ink", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt="Hasil" className="absolute inset-0 size-full object-contain" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt="Sebelum" className="absolute inset-0 size-full object-contain" />
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white">Sebelum</span>
      <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">Sesudah</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg">
          <MoveHorizontal className="size-4" />
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Geser untuk membandingkan"
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
