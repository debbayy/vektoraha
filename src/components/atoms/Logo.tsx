import Link from "next/link";
import { APP_NAME } from "@/constants";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2", className)} aria-label={APP_NAME}>
      <span className="relative grid size-9 place-items-center rounded-xl bg-ink text-white transition-transform group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
          <path d="M4 5l8 14 8-14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="9" r="2" fill="var(--color-accent)" />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-ink">
        Vektor<span className="text-accent">Aha</span>
      </span>
    </Link>
  );
}
