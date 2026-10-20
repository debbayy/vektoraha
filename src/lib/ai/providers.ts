import "server-only";

export class AIConfigError extends Error {}

interface ParsedImage {
  mimeType: string;
  base64: string;
}

export function parseDataUrl(dataUrl: string): ParsedImage {
  const match = /^data:(image\/(?:png|jpeg|jpg|webp));base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error("Format gambar tidak valid. Gunakan PNG, JPG, atau WEBP.");
  return { mimeType: match[1], base64: match[2] };
}

async function generateWithGemini(prompt: string, image: ParsedImage): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AIConfigError("GEMINI_API_KEY belum di-set di environment.");
  const model = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              { inline_data: { mime_type: image.mimeType, data: image.base64 } },
            ],
          },
        ],
        generationConfig: { responseModalities: ["IMAGE"] },
      }),
    },
  );

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(json?.error?.message ?? `Gemini error (${res.status})`);
  }

  type Part = { inlineData?: { mimeType: string; data: string }; inline_data?: { mime_type: string; data: string } };
  const parts: Part[] = json?.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    if (part.inline_data?.data) return `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`;
  }
  throw new Error("AI tidak mengembalikan gambar. Coba foto lain atau ulangi sebentar lagi.");
}

async function generateWithOpenAI(prompt: string, image: ParsedImage): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new AIConfigError("OPENAI_API_KEY belum di-set di environment.");
  const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";

  const bytes = Buffer.from(image.base64, "base64");
  const ext = image.mimeType.split("/")[1] ?? "png";
  const form = new FormData();
  form.append("model", model);
  form.append("prompt", prompt);
  form.append("image", new Blob([bytes], { type: image.mimeType }), `input.${ext}`);
  form.append("size", "auto");

  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: form,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) throw new Error(json?.error?.message ?? `OpenAI error (${res.status})`);

  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) throw new Error("AI tidak mengembalikan gambar.");
  return `data:image/png;base64,${b64}`;
}

/**
 * Cloudflare Workers AI — FLUX.2 [klein] 4B. Free plan includes 10,000 neurons/day
 * (roughly 80–90 edits at ~1 MP). Reference images must be smaller than 512×512.
 */
async function generateWithCloudflare(prompt: string, image: ParsedImage): Promise<string> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !token) {
    throw new AIConfigError("CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN belum di-set di environment.");
  }
  const model = process.env.CLOUDFLARE_IMAGE_MODEL || "@cf/black-forest-labs/flux-2-klein-4b";

  const sharp = (await import("sharp")).default;
  const input = sharp(Buffer.from(image.base64, "base64")).rotate();
  const meta = await input.metadata();
  const srcW = meta.width ?? 1024;
  const srcH = meta.height ?? 1024;

  // Reference image: longest side 511 px (model requires < 512).
  const reference = await input.clone().resize(511, 511, { fit: "inside" }).jpeg({ quality: 92 }).toBuffer();

  // Output keeps the source aspect ratio, longest side 1024, multiples of 16.
  const scale = 1024 / Math.max(srcW, srcH);
  const snap = (v: number) => Math.min(1920, Math.max(256, Math.round((v * scale) / 16) * 16));

  const form = new FormData();
  form.append("prompt", `Edit image 0. ${prompt}`);
  form.append("input_image_0", new Blob([new Uint8Array(reference)], { type: "image/jpeg" }), "input.jpg");
  form.append("width", String(snap(srcW)));
  form.append("height", String(snap(srcH)));

  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || json?.success === false) {
    const msg = json?.errors?.[0]?.message ?? `Cloudflare error (${res.status})`;
    if (res.status === 429 || /neuron|quota|limit/i.test(msg)) {
      throw new Error("Kuota gratis harian AI sudah habis. Coba lagi besok (reset jam 07.00 WIB).");
    }
    throw new Error(msg);
  }

  const b64: string | undefined = json?.result?.image ?? json?.image;
  if (!b64) throw new Error("AI tidak mengembalikan gambar.");
  return b64.startsWith("data:") ? b64 : `data:image/jpeg;base64,${b64}`;
}

function resolveProvider() {
  const explicit = process.env.AI_PROVIDER?.toLowerCase();
  if (explicit) return explicit;
  if (process.env.CLOUDFLARE_API_TOKEN) return "cloudflare";
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.OPENAI_API_KEY) return "openai";
  return "cloudflare";
}

export async function generateImage(prompt: string, dataUrl: string): Promise<string> {
  const image = parseDataUrl(dataUrl);
  const provider = resolveProvider();
  if (provider === "openai") return generateWithOpenAI(prompt, image);
  if (provider === "gemini") return generateWithGemini(prompt, image);
  return generateWithCloudflare(prompt, image);
}
