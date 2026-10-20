"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/atoms";
import { cn } from "@/lib/cn";

/** Skeleton shown in the result panel while the AI works, with rotating status messages. */
export function ProcessingState({ messages, className }: { messages: string[]; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % messages.length), 2200);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <Skeleton className="absolute inset-0" rounded="xl" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="size-2.5 animate-bounce rounded-full bg-accent"
              style={{ animationDelay: `${d * 120}ms` }}
            />
          ))}
        </div>
        <p key={i} className="animate-fade-up text-center text-sm font-semibold text-ink-soft" aria-live="polite">
          {messages[i]}
        </p>
      </div>
    </div>
  );
}
