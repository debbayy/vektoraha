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

export async function generateImage(prompt: string, dataUrl: string): Promise<string> {
  const image = parseDataUrl(dataUrl);
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  if (provider === "openai") return generateWithOpenAI(prompt, image);
  return generateWithGemini(prompt, image);
}
