import "server-only";
import { BACKGROUND_COLORS, OUTFITS } from "@/constants";
import type { AnimeStyleId, OutfitId } from "@/types";

// Style prompts describe ONLY the rendering technique (line, colour, shading, background).
// They never name objects: image models tend to draw whatever item a prompt mentions,
// even inside "do not add X", so props like eyewear or headbands are never written here.
const ANIME_PROMPTS: Record<AnimeStyleId, string> = {
  "ninja-shonen":
    "Redraw this photo in a 2000s ninja shonen anime style: bold clean black lineart, flat two-tone cel shading, vibrant orange, navy and teal colour palette, expressive anime eyes, simple painted village or forest background.",
  "watercolor-studio":
    "Redraw this photo in the style of a hand-painted Japanese animated film still: soft watercolour and gouache textures, warm pastel palette, gentle natural lighting, rounded friendly features, painted countryside background with fluffy clouds.",
  "saiyan-action":
    "Redraw this photo in a 1990s action shonen anime style: sharp angular features, thick confident outlines, high-contrast cel shading, dramatic lighting, rocky landscape background.",
  "shoujo-sparkle":
    "Redraw this photo in a romantic shoujo anime style: large sparkling eyes with highlights, delicate fine lineart, soft pink and lavender palette, soft bokeh background.",
  "cyber-anime":
    "Redraw this photo in a cyberpunk anime style: sleek detailed lineart, neon magenta and cyan rim lighting, futuristic night city background with rain reflections.",
  chibi:
    "Redraw this photo as a cute chibi anime figure: oversized head, small body, big round shiny eyes, simple soft shading, plain pastel background.",
};

const SHARED_ANIME_RULES =
  "Only change the art style. Keep everything about the person exactly as it is in the photo: the same face, the same hairstyle and hair colour, the same skin tone, the same expression, the same clothing, and only the items that are actually visible in the photo. The person's face and head must look exactly as bare or as covered as in the original. Same pose and framing. A single finished illustration, no text, no watermark.";

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
    "The person must stay exactly the same person: identical face shape, features, skin tone, age and hairstyle, with the head and face exactly as bare or as covered as in the original photo. Only items already visible in the photo may appear. Do not beautify or change identity.",
    "Front-facing, looking straight at the camera, head and shoulders centred, neutral friendly expression with mouth closed, eyes open.",
    `${OUTFIT_PROMPTS[outfit.id]}`,
    `Soft even studio lighting with no harsh shadows. Plain solid flat background in colour ${bg.hex} (${bg.label}), no gradient, no props.`,
    "Photorealistic, sharp focus, natural skin texture, no text or watermark.",
  ].join(" ");
}
