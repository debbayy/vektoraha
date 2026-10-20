import "server-only";
import { BACKGROUND_COLORS, OUTFITS } from "@/constants";
import type { AnimeStyleId, OutfitId } from "@/types";

const ANIME_PROMPTS: Record<AnimeStyleId, string> = {
  "ninja-shonen":
    "Redraw this photo as a 2000s ninja shonen anime character: bold clean black lineart, flat cel shading with two tones, vibrant orange, navy and teal palette, expressive large eyes, dynamic spiky stylised hair, a forehead-protector style headband is optional, simple village or forest background.",
  "watercolor-studio":
    "Redraw this photo as a hand-painted Japanese animated film still: soft watercolour and gouache textures, warm pastel palette, gentle natural lighting, rounded friendly facial features, lush painted countryside or cosy town background with fluffy clouds.",
  "saiyan-action":
    "Redraw this photo as a 1990s action shonen anime character: sharp angular jaw and eyes, thick confident outlines, high-contrast cel shading, muscular heroic pose, golden energy aura with crackling sparks, rocky battlefield background.",
  "shoujo-sparkle":
    "Redraw this photo as a romantic shoujo anime character: large sparkling eyes with highlights, delicate fine lineart, soft pink and lavender palette, flowing hair, floating flower petals and bokeh sparkles in the background.",
  "cyber-anime":
    "Redraw this photo as a cyberpunk anime character: sleek detailed lineart, neon magenta and cyan rim lighting, futuristic city at night with glowing signs, rain reflections, cinematic composition.",
  chibi:
    "Redraw this photo as a cute chibi anime figure: oversized head, tiny body, big round shiny eyes, simple soft shading, pastel background with small decorative stars.",
};

const SHARED_ANIME_RULES =
  "Keep the same person recognisable: same hairstyle direction, hair colour, skin tone, facial expression, glasses and accessories. Keep the original pose and framing. Output a single finished illustration with no text, captions, watermarks or speech bubbles. Do not copy any existing named character.";

export function buildAnimePrompt(styleId: AnimeStyleId) {
  return `${ANIME_PROMPTS[styleId]} ${SHARED_ANIME_RULES}`;
}

const OUTFIT_PROMPTS: Record<OutfitId, string> = {
  original: "Keep their current clothing but make it look neat and pressed.",
  "white-shirt": "Dress them in a crisp, well-fitted white collared shirt.",
  "black-suit": "Dress them in a tailored black suit jacket over a white collared shirt.",
  "navy-blazer": "Dress them in a tailored navy blazer over a light collared shirt.",
  batik: "Dress them in a neat long-sleeved formal Indonesian batik shirt with a subtle pattern.",
};

export function buildPasfotoPrompt(outfitId: OutfitId, backgroundId: string) {
  const bg = BACKGROUND_COLORS.find((b) => b.id === backgroundId) ?? BACKGROUND_COLORS[0];
  const outfit = OUTFITS.find((o) => o.id === outfitId) ?? OUTFITS[0];
  return [
    "Turn this into a professional studio ID / job-application portrait photo.",
    "The person must stay exactly the same person: identical face shape, features, skin tone, age, hairstyle and any religious head covering. Do not beautify or change identity.",
    "Front-facing, looking straight at the camera, head and shoulders centred, neutral friendly expression with mouth closed, eyes open.",
    `${OUTFIT_PROMPTS[outfit.id]}`,
    `Soft even studio lighting with no harsh shadows. Plain solid flat background in colour ${bg.hex} (${bg.label}), no gradient, no props.`,
    "Photorealistic, sharp focus, natural skin texture, no text or watermark.",
  ].join(" ");
}
