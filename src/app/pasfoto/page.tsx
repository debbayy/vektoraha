import type { Metadata } from "next";
import { AdSlot } from "@/components/atoms";
import { PasfotoEditor } from "@/components/organisms";
import { EditorTemplate } from "@/components/templates";
import { AD_SLOTS } from "@/constants";

export const metadata: Metadata = {
  title: "Pasfoto Studio",
  description: "Bikin pasfoto profesional untuk lamaran kerja: baju formal, latar merah/biru, ukuran 2×3, 3×4, 4×6, siap cetak.",
};

export default function PasfotoPage() {
  return (
    <EditorTemplate
      badge="Pasfoto Studio"
      title="Pasfoto rapi tanpa ke studio."
      description="Baju formal, cahaya studio, latar polos, dan ukuran resmi siap cetak — langsung dari foto biasa."
    >
      <PasfotoEditor />
      <AdSlot slot={AD_SLOTS.editor} className="mt-12" />
    </EditorTemplate>
  );
}
