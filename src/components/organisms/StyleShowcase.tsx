import { ArrowRight } from "lucide-react";
import { ButtonLink, Container, Heading, Text } from "@/components/atoms";
import { StyleCard } from "@/components/molecules";
import { ANIME_STYLES } from "@/constants";

export function StyleShowcase() {
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl space-y-3">
            <Heading className="text-white">Pilih gayamu.</Heading>
            <Text className="text-white/70">
              Dari ninja jagoan sampai lukisan cat air yang hangat — setiap gaya dirancang supaya wajahmu tetap
              dikenali.
            </Text>
          </div>
          <ButtonLink href="/anime" variant="secondary" icon={<ArrowRight className="size-4" />}>
            Mulai sekarang
          </ButtonLink>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {ANIME_STYLES.map((s) => (
            <div key={s.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <StyleCard style={s} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-white/50 sm:hidden">Geser untuk melihat gaya lainnya →</p>
      </Container>
    </section>
  );
}
