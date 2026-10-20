import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
  rounded?: "md" | "lg" | "xl" | "full";
}

const radius = { md: "rounded-md", lg: "rounded-lg", xl: "rounded-2xl", full: "rounded-full" };

export function Skeleton({ className, rounded = "lg" }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-shimmer bg-[linear-gradient(90deg,#efe9df_0%,#f8f4ee_40%,#efe9df_80%)] bg-[length:800px_100%]",
        radius[rounded],
        className,
      )}
    />
  );
}
