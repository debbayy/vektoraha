"use client";

import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Alert, CompareSlider, ProcessingState } from "@/components/molecules";
import { cn } from "@/lib/cn";

interface ResultPanelProps {
  status: "idle" | "loading" | "success" | "error";
  before: string | null;
  after: string | null;
  error: string | null;
  loadingMessages: string[];
  emptyText: string;
  actions?: ReactNode;
  aspect?: string;
  /** Custom success view instead of the before/after slider */
  children?: ReactNode;
}

export function ResultPanel({
  status,
  before,
  after,
  error,
  loadingMessages,
  emptyText,
  actions,
  aspect = "aspect-[4/5]",
  children,
}: ResultPanelProps) {
  return (
    <div className="space-y-4">
      {status === "loading" ? (
        <ProcessingState messages={loadingMessages} className={aspect} />
      ) : children ? (
        children
      ) : status === "success" && before && after ? (
        <CompareSlider before={before} after={after} className={cn("animate-fade-up", aspect)} />
      ) : (
        <div
          className={cn(
            "bg-grain flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line px-6 text-center",
            aspect,
          )}
        >
          <span className="grid size-14 place-items-center rounded-2xl bg-card text-ink-muted shadow-sm">
            <ImageIcon className="size-7" />
          </span>
          <p className="max-w-xs text-sm text-ink-muted">{emptyText}</p>
        </div>
      )}

      {status === "error" && error && <Alert>{error}</Alert>}
      {actions}
    </div>
  );
}
