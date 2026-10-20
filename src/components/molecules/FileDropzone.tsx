"use client";

import { ImagePlus, Loader2, RefreshCw } from "lucide-react";
import { useCallback, useId, useRef, useState } from "react";
import { MAX_UPLOAD_MB } from "@/constants";
import { cn } from "@/lib/cn";

interface FileDropzoneProps {
  preview?: string | null;
  onFile: (file: File) => void;
  hint?: string;
  className?: string;
  aspect?: string;
  /** Error coming from validation outside the dropzone (e.g. no face detected) */
  externalError?: string | null;
  /** Shows a checking overlay while the photo is being validated */
  checking?: boolean;
}

export function FileDropzone({
  preview,
  onFile,
  hint,
  className,
  aspect = "aspect-[4/5]",
  externalError,
  checking,
}: FileDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) return setError("File harus berupa gambar (JPG, PNG, WEBP).");
      if (file.size > MAX_UPLOAD_MB * 1024 * 1024) return setError(`Ukuran maksimal ${MAX_UPLOAD_MB} MB.`);
      setError(null);
      onFile(file);
    },
    [onFile],
  );

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "group relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-colors",
          aspect,
          dragging ? "border-accent bg-accent-soft" : "border-line bg-card hover:border-ink/40",
        )}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Foto yang diunggah" className="absolute inset-0 size-full object-cover" />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition group-hover:bg-ink">
              <RefreshCw className="size-3.5" /> Ganti foto
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform group-hover:scale-110">
              <ImagePlus className="size-7" />
            </span>
            <span className="font-semibold text-ink">Tarik & lepas foto di sini</span>
            <span className="text-sm text-ink-muted">
              atau <span className="font-semibold text-accent underline underline-offset-4">pilih dari perangkat</span>
            </span>
            {hint && <span className="text-xs text-ink-muted">{hint}</span>}
          </div>
        )}
        {checking && (
          <span className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-paper/85 text-sm font-semibold text-ink backdrop-blur-sm">
            <Loader2 className="size-6 animate-spin text-accent" />
            Memeriksa foto…
          </span>
        )}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {(error || externalError) && (
        <p role="alert" className="mt-2 text-sm font-medium text-danger">
          {error || externalError}
        </p>
      )}
    </div>
  );
}
