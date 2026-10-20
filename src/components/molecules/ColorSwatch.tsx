import { Check } from "lucide-react";
import type { BackgroundColor } from "@/types";
import { cn } from "@/lib/cn";

export function ColorSwatch({
  color,
  selected,
  onClick,
}: {
  color: BackgroundColor;
  selected?: boolean;
  onClick?: () => void;
}) {
  const light = color.hex.toUpperCase() === "#FFFFFF" || color.id === "gray";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Latar ${color.label}`}
      className="flex flex-col items-center gap-1.5"
    >
      <span
        className={cn(
          "grid size-11 place-items-center rounded-full border-2 transition-all",
          selected ? "scale-110 border-ink ring-4 ring-ink/10" : "border-line hover:scale-105",
        )}
        style={{ backgroundColor: color.hex }}
      >
        {selected && <Check className={cn("size-4", light ? "text-ink" : "text-white")} strokeWidth={3} />}
      </span>
      <span className={cn("text-xs", selected ? "font-semibold text-ink" : "text-ink-muted")}>{color.label}</span>
    </button>
  );
}
