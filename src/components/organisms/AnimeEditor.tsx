"use client";

import { Download, RotateCcw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Label } from "@/components/atoms";
import { Alert, FileDropzone, StyleCard } from "@/components/molecules";
import { ANIME_STYLES } from "@/constants";
import { useGenerate } from "@/hooks/useGenerate";
import { downloadDataUrl, fileToDataUrl } from "@/lib/image";
import type { AnimeStyleId } from "@/types";
import { ResultPanel } from "./ResultPanel";

const LOADING_MESSAGES = [
  "Menyiapkan kuas digital…",
  "Membuat sketsa garis wajah…",
  "Mewarnai dengan cel-shading…",
  "Menambahkan detail latar…",
  "Sentuhan akhir sebentar lagi…",
];

export function AnimeEditor() {
  const [source, setSource] = useState<string | null>(null);
  const [styleId, setStyleId] = useState<AnimeStyleId>("ninja-shonen");
  const [reading, setReading] = useState(false);
  const { status, result, error, generate, reset, isLoading } = useGenerate();
  const resultRef = useRef<HTMLDivElement>(null);

  const onFile = useCallback(
    async (file: File) => {
      setReading(true);
      reset();
      try {
        setSource(await fileToDataUrl(file));
      } finally {
        setReading(false);
      }
    },
    [reset],
  );

  const onGenerate = async () => {
    if (!source) return;
    if (window.innerWidth < 1024) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    await generate({ mode: "anime", styleId, image: source });
  };

  useEffect(() => {
    if (status === "success") resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [status]);

  const style = ANIME_STYLES.find((s) => s.id === styleId)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
      {/* Controls */}
      <div className="space-y-8">
        <section>
          <Label step={1} hint="JPG / PNG, maks 10 MB">
            Unggah foto
          </Label>
          <FileDropzone
            preview={source}
            onFile={onFile}
            hint="Wajah terlihat jelas hasilnya paling bagus"
            aspect="aspect-[4/3] sm:aspect-[16/10]"
          />
        </section>

        <section>
          <Label step={2} hint={style.inspiration}>
            Pilih gaya
          </Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ANIME_STYLES.map((s) => (
              <StyleCard key={s.id} style={s} compact selected={s.id === styleId} onSelect={() => setStyleId(s.id)} />
            ))}
          </div>
        </section>

        <div className="space-y-3">
          <Button
            size="lg"
            fullWidth
            onClick={onGenerate}
            disabled={!source || reading}
            loading={isLoading}
            icon={<Sparkles className="size-5" />}
          >
            {isLoading ? "Sedang menggambar…" : `Ubah ke ${style.name}`}
          </Button>
          <Alert tone="info">
            Gunakan foto milikmu sendiri atau yang sudah diizinkan. Hasil AI bisa sedikit berbeda tiap kali dibuat.
          </Alert>
        </div>
      </div>

      {/* Result */}
      <div ref={resultRef} className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
        <Label hint={status === "success" ? "Geser untuk membandingkan" : undefined}>Hasil</Label>
        <ResultPanel
          status={status}
          before={source}
          after={result}
          error={error}
          loadingMessages={LOADING_MESSAGES}
          emptyText="Hasil ilustrasi akan muncul di sini setelah kamu memilih foto dan gaya."
          actions={
            status === "success" && result ? (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="dark"
                  icon={<Download className="size-4" />}
                  onClick={() => downloadDataUrl(result, `vektoraha-${styleId}.png`)}
                >
                  Unduh
                </Button>
                <Button variant="secondary" icon={<RotateCcw className="size-4" />} onClick={onGenerate}>
                  Buat ulang
                </Button>
              </div>
            ) : null
          }
        />
      </div>
    </div>
  );
}
