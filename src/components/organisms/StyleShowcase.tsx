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
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {ANIME_STYLES.map((s) => (
            <StyleCard key={s.id} style={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
