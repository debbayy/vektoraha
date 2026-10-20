import { Container, Heading } from "@/components/atoms";
import { StepItem } from "@/components/molecules";

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Heading>Tiga langkah, selesai.</Heading>
        <ol className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
          <StepItem index={1} title="Unggah foto">
            Pakai foto wajah yang jelas dan terang. Foto akan dikecilkan otomatis agar cepat diproses.
          </StepItem>
          <StepItem index={2} title="Atur gaya">
            Pilih gaya anime, atau tentukan baju, warna latar, dan ukuran pasfoto.
          </StepItem>
          <StepItem index={3} title="Unduh hasil">
            Bandingkan hasilnya, lalu unduh PNG atau lembar cetak 4R untuk studio foto.
          </StepItem>
        </ol>
      </Container>
    </section>
  );
}
