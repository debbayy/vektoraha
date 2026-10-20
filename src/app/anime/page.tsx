import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AdSlot } from "@/components/atoms";
import { AnimeEditor } from "@/components/organisms";
import { EditorTemplate } from "@/components/templates";
import { AD_SLOTS } from "@/constants";

export const metadata: Metadata = pageMetadata({
  title: "Ubah Foto Jadi Anime dengan AI",
  description:
    "Ubah fotomu jadi karakter anime dengan AI: gaya ninja shonen, lukisan cat air, aksi 90-an, shoujo, cyberpunk, dan chibi. Gratis, wajah tetap mirip.",
  path: "/anime",
  keywords: ["ubah foto jadi anime","foto anime AI","foto jadi kartun","anime filter online","edit foto anime gratis"],
});

export default function AnimePage() {
  return (
    <EditorTemplate
      badge="Gaya Anime"
      title="Jadi karakter anime favoritmu."
      description="Unggah fotomu, pilih gaya, dan biarkan AI menggambar ulang dirimu — wajah, rambut, dan ekspresi tetap dikenali."
    >
      <AnimeEditor />
      <AdSlot slot={AD_SLOTS.editor} className="mt-12" />
    </EditorTemplate>
  );
}
