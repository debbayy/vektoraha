import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { AdSlot } from "@/components/atoms";
import { FaqSection, PasfotoEditor } from "@/components/organisms";
import { EditorTemplate } from "@/components/templates";
import { AD_SLOTS } from "@/constants";
import { PASFOTO_FAQ } from "@/constants/faq";

export const metadata: Metadata = pageMetadata({
  title: "Pasfoto Online Latar Merah & Biru",
  description:
    "Bikin pasfoto online untuk lamaran kerja, KTP, ijazah, dan visa. Ganti latar merah, biru, atau putih, ukuran 2×3, 3×4, 4×6, unduh 300 dpi atau lembar cetak 4R.",
  path: "/pasfoto",
  keywords: ["pasfoto online","pas foto 3x4","pas foto 4x6","pasfoto latar merah","pasfoto latar biru","foto lamaran kerja","ganti background pas foto"],
});

export default function PasfotoPage() {
  return (
    <>
      <EditorTemplate
        badge="Pasfoto Studio"
        title="Pasfoto rapi tanpa ke studio."
        description="Baju formal, cahaya studio, latar polos, dan ukuran resmi siap cetak — langsung dari foto biasa."
      >
        <PasfotoEditor />
        <AdSlot slot={AD_SLOTS.editor} className="mt-12" />
      </EditorTemplate>
      <FaqSection title="Seputar pasfoto" items={PASFOTO_FAQ} />
    </>
  );
}
