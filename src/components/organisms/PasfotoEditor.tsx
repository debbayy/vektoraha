"use client";

import { Download, Printer, RotateCcw, ScanFace, Wand2, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Button, Label } from "@/components/atoms";
import { Alert, ColorSwatch, FileDropzone, OptionChip, ProcessingState } from "@/components/molecules";
import { BACKGROUND_COLORS, OUTFITS, PHOTO_SIZES } from "@/constants";
import { useBackgroundRemoval } from "@/hooks/useBackgroundRemoval";
import { useGenerate } from "@/hooks/useGenerate";
import { cn } from "@/lib/cn";
import {
  buildPrintSheet,
  compositeOnColor,
  cropToSize,
  downloadCanvas,
  fileToDataUrl,
  type PixelArea,
} from "@/lib/image";
import { trackEvent } from "@/lib/analytics";
import { validatePhoto } from "@/lib/validation/client";
import type { OutfitId } from "@/types";

type Phase = "idle" | "ai" | "cutout" | "ready" | "error";

const AI_MESSAGES = [
  "Merapikan pakaian…",
  "Menyalakan lampu studio…",
  "Meratakan latar belakang…",
  "Menjaga wajah tetap asli…",
];

export function PasfotoEditor() {
  const [source, setSource] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [useAI, setUseAI] = useState(true);
  const [outfitId, setOutfitId] = useState<OutfitId>("white-shirt");
  const [bgId, setBgId] = useState("red");
  const [sizeId, setSizeId] = useState("3x4");

  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [cutout, setCutout] = useState<string | null>(null);
  const [composite, setComposite] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<PixelArea | null>(null);
  const [exporting, setExporting] = useState<"single" | "sheet" | null>(null);

  const { generate } = useGenerate();
  const { remove, progress } = useBackgroundRemoval();
  const resultRef = useRef<HTMLDivElement>(null);

  const bg = BACKGROUND_COLORS.find((b) => b.id === bgId)!;
  const size = PHOTO_SIZES.find((s) => s.id === sizeId)!;
  const busy = phase === "ai" || phase === "cutout";

  // Re-paint the cut-out whenever the background colour changes (no need to re-run AI).
  useEffect(() => {
    if (!cutout) return;
    let cancelled = false;
    compositeOnColor(cutout, bg.hex).then((url) => !cancelled && setComposite(url));
    return () => {
      cancelled = true;
    };
  }, [cutout, bg.hex]);

  // Free the object URL for the old cut-out.
  useEffect(() => () => void (cutout && URL.revokeObjectURL(cutout)), [cutout]);

  const onFile = useCallback(async (file: File) => {
    setChecking(true);
    setUploadError(null);
    setCutout(null);
    setComposite(null);
    setPhase("idle");
    setError(null);
    try {
      const dataUrl = await fileToDataUrl(file, 2048, 0.92);
      const invalid = await validatePhoto(dataUrl, { faces: "one" });
      if (invalid) {
        setUploadError(invalid);
        trackEvent("photo_rejected", { tool: "pasfoto", reason: invalid.slice(0, 90) });
        setSource(null);
        return;
      }
      setSource(dataUrl);
    } catch {
      setUploadError("Foto tidak bisa dibaca. Coba file lain.");
      setSource(null);
    } finally {
      setChecking(false);
    }
  }, []);

  const process = async () => {
    if (!source) return;
    setError(null);
    if (window.innerWidth < 1024) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    trackEvent("generate_start", { tool: "pasfoto", mode: useAI ? "ai" : "bg_only" });
    try {
      let base = source;
      if (useAI) {
        setPhase("ai");
        const out = await generate({ mode: "pasfoto", outfitId, backgroundId: bgId, image: source });
        if (!out) throw new Error("AI gagal memproses foto. Coba lagi, atau matikan mode Studio AI.");
        base = out;
      }
      setPhase("cutout");
      const cut = await remove(base);
      setCutout(cut);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setPhase("ready");
      trackEvent("generate_success", { tool: "pasfoto", mode: useAI ? "ai" : "bg_only", outfit: outfitId });
    } catch (err) {
      setError((err as Error).message || "Terjadi kesalahan.");
      setPhase("error");
      trackEvent("generate_error", { tool: "pasfoto", mode: useAI ? "ai" : "bg_only" });
    }
  };

  const exportPhoto = async (kind: "single" | "sheet") => {
    if (!composite || !area) return;
    setExporting(kind);
    try {
      const photo = await cropToSize(composite, area, size, bg.hex);
      const name = `pasfoto-${size.id}-${bg.id}`;
      trackEvent("download", { tool: "pasfoto", size: size.id, background: bg.id, kind });
      if (kind === "single") downloadCanvas(photo, `${name}.jpg`);
      else downloadCanvas(buildPrintSheet(photo, size), `${name}-lembar-4R.jpg`);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
      {/* Controls */}
      <div className="space-y-8">
        <section>
          <Label step={1} hint="Wajah menghadap depan">
            Unggah foto
          </Label>
          <FileDropzone
            preview={source}
            onFile={onFile}
            checking={checking}
            externalError={uploadError}
            hint="Foto setengah badan dengan cahaya cukup"
            aspect="aspect-[4/3] sm:aspect-[16/10]"
          />
        </section>

        <section>
          <Label step={2}>Mode</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            <OptionChip
              selected={useAI}
              onClick={() => setUseAI(true)}
              leading={<Wand2 className="size-5 shrink-0" />}
              title="Studio AI"
              subtitle="Ganti baju & cahaya studio"
              className="py-3"
            />
            <OptionChip
              selected={!useAI}
              onClick={() => setUseAI(false)}
              leading={<ScanFace className="size-5 shrink-0" />}
              title="Hapus latar saja"
              subtitle="Wajah & baju 100% asli"
              className="py-3"
            />
          </div>
        </section>

        {useAI && (
          <section className="animate-fade-up">
            <Label step={3}>Pakaian</Label>
            <div className="flex flex-wrap gap-2">
              {OUTFITS.map((o) => (
                <OptionChip key={o.id} title={o.label} selected={o.id === outfitId} onClick={() => setOutfitId(o.id)} />
              ))}
            </div>
          </section>
        )}

        <section>
          <Label step={useAI ? 4 : 3} hint="Bisa diganti setelah diproses">
            Warna latar
          </Label>
          <div className="flex flex-wrap gap-5">
            {BACKGROUND_COLORS.map((c) => (
              <ColorSwatch key={c.id} color={c} selected={c.id === bgId} onClick={() => setBgId(c.id)} />
            ))}
          </div>
        </section>

        <section>
          <Label step={useAI ? 5 : 4} hint="Ukuran cetak 300 dpi">
            Ukuran
          </Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PHOTO_SIZES.map((s) => (
              <OptionChip
                key={s.id}
                title={s.id === "square" ? s.label : `${s.label} cm`}
                subtitle={s.note}
                selected={s.id === sizeId}
                onClick={() => setSizeId(s.id)}
              />
            ))}
          </div>
        </section>

        <div className="space-y-3">
          <Button
            size="lg"
            fullWidth
            onClick={process}
            disabled={!source || checking}
            loading={busy}
            icon={<Wand2 className="size-5" />}
          >
            {busy ? "Memproses…" : phase === "ready" ? "Proses ulang" : "Buat pasfoto"}
          </Button>
          <Alert tone="info">
            Penghapusan latar berjalan langsung di browser. Pertama kali dipakai, model (~40 MB) diunduh sekali lalu
            disimpan di cache.
          </Alert>
        </div>
      </div>

      {/* Result */}
      <div ref={resultRef} className="scroll-mt-24 space-y-4 lg:sticky lg:top-24 lg:self-start">
        <Label hint={phase === "ready" ? "Geser & zoom untuk merapikan posisi" : undefined}>Hasil</Label>

        {phase === "ai" && <ProcessingState messages={AI_MESSAGES} className="aspect-[4/5]" />}
        {phase === "cutout" && (
          <ProcessingState
            messages={[
              progress > 0 && progress < 100 ? `Mengunduh model… ${progress}%` : "Memisahkan subjek dari latar…",
              "Merapikan tepi rambut…",
            ]}
            className="aspect-[4/5]"
          />
        )}

        {phase === "ready" && composite && (
          <div className="animate-fade-up space-y-4">
            <div className="checkerboard relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Cropper
                image={composite}
                crop={crop}
                zoom={zoom}
                aspect={size.widthCm / size.heightCm}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_: Area, px: Area) => setArea(px)}
                showGrid
                objectFit="contain"
                style={{ cropAreaStyle: { border: "3px solid #fff", color: "rgba(23,20,31,0.55)" } }}
              />
            </div>
            <div className="flex items-center gap-3">
              <ZoomIn className="size-4 text-ink-muted" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                aria-label="Zoom"
                className="w-full accent-[var(--color-accent)]"
              />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-card px-4 py-3 text-sm">
              <span className="flex items-center gap-2">
                <span className="size-4 rounded border border-line" style={{ backgroundColor: bg.hex }} />
                <span className="font-semibold">{size.id === "square" ? size.label : `${size.label} cm`}</span>
                <span className="text-ink-muted">· latar {bg.label.toLowerCase()}</span>
              </span>
              <span className="text-ink-muted">300 dpi</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                variant="dark"
                icon={<Download className="size-4" />}
                loading={exporting === "single"}
                onClick={() => exportPhoto("single")}
              >
                Unduh pasfoto
              </Button>
              <Button
                variant="secondary"
                icon={<Printer className="size-4" />}
                loading={exporting === "sheet"}
                onClick={() => exportPhoto("sheet")}
              >
                Lembar cetak 4R
              </Button>
            </div>
          </div>
        )}

        {(phase === "idle" || phase === "error") && (
          <div
            className={cn(
              "bg-grain flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-line px-6 text-center",
            )}
          >
            <div
              className="relative flex h-40 w-32 items-end justify-center overflow-hidden rounded-lg border-4 border-white shadow-md"
              style={{ backgroundColor: bg.hex }}
            >
              <span className="absolute top-7 size-14 rounded-full bg-[#e9c4a2]" />
              <span className="h-14 w-28 rounded-t-[48px] bg-ink" />
            </div>
            <p className="max-w-xs text-sm text-ink-muted">
              Atur pilihannya, lalu tekan <strong className="text-ink">Buat pasfoto</strong>.
            </p>
          </div>
        )}

        {phase === "error" && error && (
          <Alert>
            {error}
            {useAI && (
              <button
                type="button"
                onClick={() => setUseAI(false)}
                className="mt-1 flex items-center gap-1 font-semibold underline underline-offset-4"
              >
                <RotateCcw className="size-3.5" /> Coba mode hapus latar saja
              </button>
            )}
          </Alert>
        )}
      </div>
    </div>
  );
}
