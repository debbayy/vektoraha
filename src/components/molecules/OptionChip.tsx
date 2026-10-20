import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface OptionChipProps {
  selected?: boolean;
  onClick?: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  className?: string;
}

export function OptionChip({ selected, onClick, title, subtitle, leading, className }: OptionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex min-h-11 items-center gap-2.5 rounded-xl border-2 px-3 py-2 text-left transition-all",
        selected ? "border-ink bg-ink text-white" : "border-line bg-card text-ink hover:border-ink/40",
        className,
      )}
    >
      {leading}
      <span className="flex flex-col">
        <span className="text-sm font-semibold leading-tight">{title}</span>
        {subtitle && (
          <span className={cn("text-[11px] leading-tight", selected ? "text-white/70" : "text-ink-muted")}>{subtitle}</span>
        )}
      </span>
    </button>
  );
}
