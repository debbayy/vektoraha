import type { Metadata } from "next";
import { AnimeEditor } from "@/components/organisms";
import { EditorTemplate } from "@/components/templates";

export const metadata: Metadata = {
  title: "Gaya Anime",
  description: "Ubah fotomu jadi karakter anime: ninja shonen, cat air, aksi 90-an, shoujo, cyber, dan chibi.",
};

export default function AnimePage() {
  return (
    <EditorTemplate
      badge="Gaya Anime"
      title="Jadi karakter anime favoritmu."
      description="Unggah fotomu, pilih gaya, dan biarkan AI menggambar ulang dirimu — wajah, rambut, dan ekspresi tetap dikenali."
    >
      <AnimeEditor />
    </EditorTemplate>
  );
}
