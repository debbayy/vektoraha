import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Label({
  step,
  children,
  hint,
  className,
}: {
  step?: number;
  children: ReactNode;
  hint?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-baseline justify-between gap-3", className)}>
      <span className="flex items-center gap-2 text-sm font-semibold text-ink">
        {step !== undefined && (
          <span className="grid size-6 place-items-center rounded-full bg-ink text-xs text-white">{step}</span>
        )}
        {children}
      </span>
      {hint && <span className="text-xs text-ink-muted">{hint}</span>}
    </div>
  );
}
