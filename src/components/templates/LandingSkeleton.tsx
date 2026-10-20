import { Container, Skeleton } from "@/components/atoms";

export function LandingSkeleton() {
  return (
    <div aria-busy="true" aria-label="Memuat halaman">
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div className="space-y-5">
          <Skeleton className="h-7 w-48" rounded="full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-4/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Skeleton className="h-14 w-full sm:w-52" rounded="full" />
            <Skeleton className="h-14 w-full sm:w-48" rounded="full" />
          </div>
        </div>
        <Skeleton className="mx-auto h-[330px] w-full max-w-sm sm:h-[400px] sm:max-w-md" rounded="xl" />
      </Container>
      <Container className="grid gap-6 py-16 md:grid-cols-2">
        <Skeleton className="h-72" rounded="xl" />
        <Skeleton className="h-72" rounded="xl" />
      </Container>
    </div>
  );
}
