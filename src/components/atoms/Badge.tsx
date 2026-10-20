import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "accent" | "violet" | "neutral" | "success";

const tones: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent-dark",
  violet: "bg-violet-soft text-violet",
  neutral: "bg-ink/5 text-ink-soft",
  success: "bg-success/10 text-success",
};

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
