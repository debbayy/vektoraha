import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_6px_0_0_var(--color-accent-dark)] hover:translate-y-[2px] hover:shadow-[0_4px_0_0_var(--color-accent-dark)] active:translate-y-[6px] active:shadow-none",
  dark: "bg-ink text-white shadow-[0_6px_0_0_#000] hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#000] active:translate-y-[6px] active:shadow-none",
  secondary: "bg-card text-ink border-2 border-ink hover:bg-paper",
  ghost: "text-ink-soft hover:text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-full gap-1.5",
  md: "h-11 px-5 text-sm rounded-full gap-2",
  lg: "h-14 px-7 text-base rounded-full gap-2.5",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30 disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon,
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: BaseProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner className="size-4" /> : icon}
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  fullWidth,
  className,
  children,
  ...props
}: BaseProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {icon}
      {children}
    </Link>
  );
}
