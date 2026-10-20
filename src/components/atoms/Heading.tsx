import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3;

const styles: Record<Level, string> = {
  1: "text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight",
  2: "text-3xl sm:text-4xl leading-tight tracking-tight",
  3: "text-lg sm:text-xl leading-snug",
};

export function Heading({
  level = 2,
  children,
  className,
}: {
  level?: Level;
  children: ReactNode;
  className?: string;
}) {
  const Tag = `h${level}` as const;
  return <Tag className={cn("font-display font-bold text-ink", styles[level], className)}>{children}</Tag>;
}

export function Text({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-ink-soft leading-relaxed", className)}>{children}</p>;
}
