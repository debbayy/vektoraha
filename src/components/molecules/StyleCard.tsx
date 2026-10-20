import { Check } from "lucide-react";
import type { AnimeStyle } from "@/types";
import { cn } from "@/lib/cn";

interface StyleCardProps {
  style: AnimeStyle;
  selected?: boolean;
  onSelect?: () => void;
  compact?: boolean;
}

export function StyleCard({ style, selected, onSelect, compact }: StyleCardProps) {
  const Tag = onSelect ? "button" : "div";
  return (
    <Tag
      {...(onSelect ? { type: "button" as const, onClick: onSelect, "aria-pressed": selected } : {})}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 bg-card text-left transition-all",
        selected ? "border-ink shadow-[4px_4px_0_0_var(--color-ink)]" : "border-line",
        onSelect && !selected && "hover:-translate-y-0.5 hover:border-ink/40",
      )}
    >
      <div
        className={cn(
          "relative grid place-items-center bg-gradient-to-br",
          style.gradient,
          compact ? "h-16" : "h-28 sm:h-32",
        )}
      >
        <span className={cn("drop-shadow-sm transition-transform group-hover:scale-110", compact ? "text-2xl" : "text-4xl")}>
          {style.emoji}
        </span>
        {selected && (
          <span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-ink text-white">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
        )}
      </div>
      <div className={cn("flex flex-1 flex-col gap-1", compact ? "p-2.5" : "p-4")}>
        <span className={cn("font-display font-bold text-ink", compact ? "text-sm" : "text-base")}>{style.name}</span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-accent-dark">{style.inspiration}</span>
        {!compact && <span className="mt-1 text-sm leading-relaxed text-ink-soft">{style.description}</span>}
      </div>
    </Tag>
  );
}
