"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function NavLink({
  href,
  children,
  onClick,
  block,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  block?: boolean;
}) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        block && "block w-full rounded-xl px-4 py-3 text-base",
        active ? "bg-ink text-white" : "text-ink-soft hover:bg-ink/5 hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}
