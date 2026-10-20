import { Container, Skeleton } from "@/components/atoms";

/** Mirrors EditorTemplate + editor two-column layout so the page doesn't jump when it loads. */
export function EditorSkeleton({ options = 6 }: { options?: number }) {
  return (
    <Container className="py-8 sm:py-12" aria-busy="true" aria-label="Memuat halaman">
      <div className="mb-8 max-w-2xl space-y-4 sm:mb-10">
        <Skeleton className="h-6 w-32" rounded="full" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
        <div className="space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="aspect-[4/3] w-full sm:aspect-[16/10]" rounded="xl" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-28" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: options }).map((_, i) => (
                <Skeleton key={i} className="h-28" rounded="xl" />
              ))}
            </div>
          </div>
          <Skeleton className="h-14 w-full" rounded="full" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="aspect-[4/5] w-full" rounded="xl" />
        </div>
      </div>
    </Container>
  );
}
