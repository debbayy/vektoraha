import type { ReactNode } from "react";

export function StepItem({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  return (
    <li className="relative flex gap-4">
      <span className="font-display grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-xl font-bold text-white">
        {String(index).padStart(2, "0")}
      </span>
      <div className="pt-1">
        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{children}</p>
      </div>
    </li>
  );
}
