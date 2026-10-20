"use client";

import { loadImage } from "@/lib/image";
import { checkImageStats } from "./rules";

/** Luminance mean / std-dev measured on a 64×64 thumbnail in the browser. */
export async function measureImage(src: string) {
  const img = await loadImage(src);
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  let sum = 0;
  let sumSq = 0;
  const n = size * size;
  for (let i = 0; i < data.length; i += 4) {
    const y = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    sum += y;
    sumSq += y * y;
  }
  const mean = sum / n;
  const stdDev = Math.sqrt(Math.max(0, sumSq / n - mean * mean));
  return { width: img.naturalWidth, height: img.naturalHeight, mean, stdDev };
}

export async function checkImageQuality(src: string): Promise<string | null> {
  return checkImageStats(await measureImage(src));
}

// ---------- Face detection (MediaPipe, runs fully in the browser) ----------

type Detector = { detect: (img: HTMLImageElement) => { detections: unknown[] } };
let detectorPromise: Promise<Detector | null> | null = null;

const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.1/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite";

function getDetector() {
  detectorPromise ??= (async () => {
    try {
      const { FaceDetector, FilesetResolver } = await import("@mediapipe/tasks-vision");
      const fileset = await FilesetResolver.forVisionTasks(WASM_URL);
      return (await FaceDetector.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: "IMAGE",
        minDetectionConfidence: 0.5,
      })) as unknown as Detector;
    } catch (err) {
      console.warn("[face-detector] gagal dimuat", err);
      detectorPromise = null; // allow retry next time
      return null;
    }
  })();
  return detectorPromise;
}

/** Number of faces found, or null if the detector could not be loaded. */
export async function countFaces(src: string): Promise<number | null> {
  const detector = await getDetector();
  if (!detector) return null;
  const img = await loadImage(src);
  return detector.detect(img).detections.length;
}

export interface ValidateOptions {
  /** "one" = exactly one face (pasfoto), "any" = at least one (anime) */
  faces: "one" | "any";
}

/** Full pre-upload validation. Returns an error message or null. */
export async function validatePhoto(src: string, { faces }: ValidateOptions): Promise<string | null> {
  const qualityError = await checkImageQuality(src);
  if (qualityError) return qualityError;

  const count = await countFaces(src);
  if (count === null) return null; // detector unavailable — server-side check still applies
  if (count === 0) return "Wajah tidak terdeteksi. Gunakan foto yang memperlihatkan wajah dengan jelas.";
  if (faces === "one" && count > 1) {
    return `Terdeteksi ${count} wajah. Pasfoto hanya boleh berisi satu orang.`;
  }
  return null;
}
