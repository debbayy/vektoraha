import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FeatureCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  points: string[];
  tone: "accent" | "violet";
}

export function FeatureCard({ href, icon, title, description, points, tone }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-5 rounded-3xl border-2 border-ink bg-card p-6 shadow-[6px_6px_0_0_var(--color-ink)] transition-all hover:-translate-y-1 hover:shadow-[8px_10px_0_0_var(--color-ink)] sm:p-8"
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "grid size-14 place-items-center rounded-2xl",
            tone === "accent" ? "bg-accent-soft text-accent" : "bg-violet-soft text-violet",
          )}
        >
          {icon}
        </span>
        <span className="grid size-10 place-items-center rounded-full border-2 border-line text-ink transition-all group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-2xl font-bold text-ink">{title}</h3>
        <p className="text-ink-soft">{description}</p>
      </div>
      <ul className="mt-auto flex flex-wrap gap-2">
        {points.map((p) => (
          <li key={p} className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink-soft">
            {p}
          </li>
        ))}
      </ul>
    </Link>
  );
}
