import "server-only";
import { checkImageStats } from "./rules";

/** Server-side guard so blank / black / flat images never reach the AI, even if the client is bypassed. */
export async function validateImageOnServer(base64: string): Promise<string | null> {
  const sharp = (await import("sharp")).default;
  try {
    const buffer = Buffer.from(base64, "base64");
    const meta = await sharp(buffer).metadata();
    const { data } = await sharp(buffer)
      .rotate()
      .resize(64, 64, { fit: "fill" })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let sum = 0;
    let sumSq = 0;
    for (const v of data) {
      sum += v;
      sumSq += v * v;
    }
    const n = data.length;
    const mean = sum / n;
    const stdDev = Math.sqrt(Math.max(0, sumSq / n - mean * mean));
    return checkImageStats({ width: meta.width ?? 0, height: meta.height ?? 0, mean, stdDev });
  } catch {
    return "File gambar rusak atau tidak bisa dibaca.";
  }
}
