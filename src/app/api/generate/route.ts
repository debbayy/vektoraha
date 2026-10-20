import { NextResponse } from "next/server";
import { ANIME_STYLES, BACKGROUND_COLORS, OUTFITS } from "@/constants";
import { buildAnimePrompt, buildPasfotoPrompt } from "@/lib/ai/prompts";
import { AIConfigError, generateImage } from "@/lib/ai/providers";
import type { GenerateRequest, GenerateResponse } from "@/types";

export const maxDuration = 60;

const MAX_BASE64_LENGTH = 6 * 1024 * 1024; // ~4.5 MB binary

export async function POST(req: Request) {
  let body: GenerateRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<GenerateResponse>({ error: "Request tidak valid." }, { status: 400 });
  }

  if (typeof body?.image !== "string" || body.image.length > MAX_BASE64_LENGTH) {
    return NextResponse.json<GenerateResponse>(
      { error: "Gambar kosong atau terlalu besar." },
      { status: 400 },
    );
  }

  let prompt: string;
  if (body.mode === "anime") {
    if (!ANIME_STYLES.some((s) => s.id === body.styleId)) {
      return NextResponse.json<GenerateResponse>({ error: "Gaya tidak dikenal." }, { status: 400 });
    }
    prompt = buildAnimePrompt(body.styleId);
  } else if (body.mode === "pasfoto") {
    if (
      !OUTFITS.some((o) => o.id === body.outfitId) ||
      !BACKGROUND_COLORS.some((b) => b.id === body.backgroundId)
    ) {
      return NextResponse.json<GenerateResponse>({ error: "Opsi tidak dikenal." }, { status: 400 });
    }
    prompt = buildPasfotoPrompt(body.outfitId, body.backgroundId);
  } else {
    return NextResponse.json<GenerateResponse>({ error: "Mode tidak dikenal." }, { status: 400 });
  }

  try {
    const image = await generateImage(prompt, body.image);
    return NextResponse.json<GenerateResponse>({ image });
  } catch (err) {
    const status = err instanceof AIConfigError ? 503 : 502;
    const message = err instanceof Error ? err.message : "Terjadi kesalahan pada AI.";
    console.error("[generate]", message);
    return NextResponse.json<GenerateResponse>({ error: message }, { status });
  }
}
