import { PRINT_DPI, PRINT_SHEET } from "@/constants";
import type { PhotoSize } from "@/types";

export interface PixelArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Gagal memuat gambar"));
    img.src = src;
  });
}

/** Reads a file and downscales it so the longest side is at most `maxSide` px. */
export async function fileToDataUrl(file: File, maxSide = 1536, quality = 0.9): Promise<string> {
  const raw = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });

  const img = await loadImage(raw);
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return raw;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

export function cmToPx(cm: number, dpi = PRINT_DPI) {
  return Math.round((cm / 2.54) * dpi);
}

/** Paints a (possibly transparent) cut-out over a solid colour. */
export async function compositeOnColor(src: string, hex: string): Promise<string> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = hex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL("image/png");
}

/** Crops `src` to `area` and resizes to the exact print size of `size`. */
export async function cropToSize(
  src: string,
  area: PixelArea,
  size: PhotoSize,
  fill = "#FFFFFF",
): Promise<HTMLCanvasElement> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = cmToPx(size.widthCm);
  canvas.height = cmToPx(size.heightCm);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/** Tiles a single photo onto a 4R sheet ready for printing. */
export function buildPrintSheet(photo: HTMLCanvasElement, size: PhotoSize): HTMLCanvasElement {
  const sheet = document.createElement("canvas");
  sheet.width = cmToPx(PRINT_SHEET.widthCm);
  sheet.height = cmToPx(PRINT_SHEET.heightCm);
  const ctx = sheet.getContext("2d")!;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, sheet.width, sheet.height);

  const margin = cmToPx(PRINT_SHEET.marginCm);
  const gap = cmToPx(PRINT_SHEET.gapCm);
  const w = cmToPx(size.widthCm);
  const h = cmToPx(size.heightCm);
  const cols = Math.max(1, Math.floor((sheet.width - margin * 2 + gap) / (w + gap)));
  const rows = Math.max(1, Math.floor((sheet.height - margin * 2 + gap) / (h + gap)));
  const offsetX = (sheet.width - (cols * w + (cols - 1) * gap)) / 2;
  const offsetY = (sheet.height - (rows * h + (rows - 1) * gap)) / 2;

  ctx.strokeStyle = "#E5E7EB";
  ctx.lineWidth = 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = offsetX + c * (w + gap);
      const y = offsetY + r * (h + gap);
      ctx.drawImage(photo, x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    }
  }
  return sheet;
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string, type = "image/jpeg") {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL(type, 0.95);
  link.click();
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
