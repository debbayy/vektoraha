import { AlertCircle, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Alert({
  tone = "danger",
  children,
  className,
}: {
  tone?: "danger" | "info";
  children: ReactNode;
  className?: string;
}) {
  const Icon = tone === "danger" ? AlertCircle : Info;
  return (
    <div
      role={tone === "danger" ? "alert" : "note"}
      className={cn(
        "flex gap-3 rounded-xl p-3.5 text-sm",
        tone === "danger" ? "bg-danger/10 text-danger" : "bg-violet-soft text-ink-soft",
        className,
      )}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", tone === "info" && "text-violet")} />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
