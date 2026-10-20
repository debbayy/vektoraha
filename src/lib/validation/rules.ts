/** Thresholds shared by the browser check and the server check (0–255 luminance scale). */
export const QUALITY_RULES = {
  /** Average brightness below this = photo too dark / black */
  minMean: 35,
  /** Average brightness above this = photo blown out / white */
  maxMean: 235,
  /** Brightness spread below this = flat, single-colour image with no content */
  minStdDev: 18,
  /** Shortest side in pixels */
  minSide: 200,
} as const;

export interface ImageStats {
  width: number;
  height: number;
  mean: number;
  stdDev: number;
}

/** Returns an Indonesian error message, or null when the image looks like a real photo. */
export function checkImageStats({ width, height, mean, stdDev }: ImageStats): string | null {
  if (Math.min(width, height) < QUALITY_RULES.minSide) {
    return `Resolusi foto terlalu kecil. Minimal ${QUALITY_RULES.minSide} px di sisi terpendek.`;
  }
  if (mean < QUALITY_RULES.minMean) {
    return "Foto terlalu gelap atau hitam. Gunakan foto dengan cahaya yang cukup.";
  }
  if (mean > QUALITY_RULES.maxMean) {
    return "Foto terlalu terang atau putih polos. Gunakan foto dengan pencahayaan normal.";
  }
  if (stdDev < QUALITY_RULES.minStdDev) {
    return "Foto terlihat kosong atau hanya satu warna. Unggah foto asli yang berisi wajah.";
  }
  return null;
}
