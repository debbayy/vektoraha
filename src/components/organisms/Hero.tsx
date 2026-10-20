import { IdCard, Sparkles } from "lucide-react";
import { Badge, ButtonLink, Container, Heading, Text } from "@/components/atoms";
import { ANIME_STYLES } from "@/constants";
import { cn } from "@/lib/cn";

export function Hero() {
  const tiles = ANIME_STYLES.slice(0, 3);
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grain absolute inset-0 -z-10 opacity-70" />
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div className="animate-fade-up space-y-6">
          <Badge>
            <Sparkles className="size-3.5" /> Editor foto bertenaga AI
          </Badge>
          <Heading level={1}>
            Satu foto, <span className="relative whitespace-nowrap text-accent">banyak wajah<svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden><path d="M2 9c40-6 120-8 196-3" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" /></svg></span>.
          </Heading>
          <Text className="max-w-xl text-lg">
            Ubah fotomu jadi karakter anime bergaya ninja, film cat air, atau aksi 90-an — atau rapikan jadi pasfoto
            studio siap lamar kerja, lengkap dengan latar merah/biru dan ukuran cetak.
          </Text>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ButtonLink href="/anime" size="lg" icon={<Sparkles className="size-5" />}>
              Ubah jadi anime
            </ButtonLink>
            <ButtonLink href="/pasfoto" size="lg" variant="secondary" icon={<IdCard className="size-5" />}>
              Bikin pasfoto
            </ButtonLink>
          </div>
          <p className="text-sm text-ink-muted">Tanpa daftar akun · Foto diproses lalu tidak disimpan</p>
        </div>

        <div className="relative mx-auto h-[330px] w-full max-w-sm sm:h-[400px] sm:max-w-md" aria-hidden>
          {tiles.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "absolute w-[54%] rounded-3xl border-2 border-ink bg-card p-2.5 shadow-[6px_6px_0_0_var(--color-ink)]",
                i === 0 && "left-0 top-6 -rotate-6",
                i === 1 && "right-0 top-0 rotate-6",
                i === 2 && "bottom-0 left-1/2 z-10 -translate-x-1/2 rotate-1",
              )}
            >
              <div className={cn("relative grid aspect-[4/5] place-items-center rounded-2xl bg-gradient-to-br", s.gradient)}>
                <span className="absolute left-2.5 top-2.5 max-w-[calc(100%-1.25rem)] truncate rounded-full bg-card/90 px-2.5 py-1 font-display text-[11px] font-bold text-ink shadow-sm sm:text-xs">
                  {s.name}
                </span>
                <span className="text-5xl sm:text-6xl">{s.emoji}</span>
              </div>
            </div>
          ))}
          <div className="absolute -right-2 bottom-10 z-20 rotate-3 rounded-2xl border-2 border-ink bg-card px-3 py-2 shadow-[4px_4px_0_0_var(--color-ink)] sm:-right-6">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-8 place-items-end overflow-hidden rounded-md bg-[#1C4E9C]">
                <span className="mb-[-6px] h-6 w-6 rounded-t-full bg-[#f0c9a7]" />
              </span>
              <div className="text-xs">
                <div className="font-bold">Pasfoto 3×4</div>
                <div className="text-ink-muted">300 dpi · siap cetak</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
