import { IdCard, Wand2 } from "lucide-react";
import { Container, Heading, Text } from "@/components/atoms";
import { FeatureCard } from "@/components/molecules";

export function FeatureGrid() {
  return (
    <section id="fitur" className="py-16 sm:py-20">
      <Container>
        <div className="mb-10 max-w-2xl space-y-3">
          <Heading>Dua alat, satu tempat.</Heading>
          <Text>Pilih mau seru-seruan atau urusan serius. Dua-duanya rapi dan cepat.</Text>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            href="/anime"
            tone="accent"
            icon={<Wand2 className="size-7" />}
            title="Gaya Anime"
            description="Upload selfie, pilih gaya, dan AI menggambar ulang dirimu jadi karakter anime yang tetap mirip."
            points={["6 gaya", "Wajah tetap dikenali", "Bandingkan sebelum/sesudah"]}
          />
          <FeatureCard
            href="/pasfoto"
            tone="violet"
            icon={<IdCard className="size-7" />}
            title="Pasfoto Studio"
            description="Foto biasa jadi pasfoto formal: baju rapi, latar polos, cahaya studio, langsung potong ukuran resmi."
            points={["Latar merah / biru / putih", "2×3, 3×4, 4×6, visa", "Lembar cetak 4R"]}
          />
        </div>
      </Container>
    </section>
  );
}
