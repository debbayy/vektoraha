export type AnimeStyleId =
  | "ninja-shonen"
  | "watercolor-studio"
  | "saiyan-action"
  | "shoujo-sparkle"
  | "cyber-anime"
  | "chibi";

export interface AnimeStyle {
  id: AnimeStyleId;
  name: string;
  inspiration: string;
  description: string;
  /** Tailwind gradient classes used for the card thumbnail */
  gradient: string;
  emoji: string;
}

export type OutfitId = "original" | "white-shirt" | "black-suit" | "navy-blazer" | "batik";

export interface Outfit {
  id: OutfitId;
  label: string;
}

export interface PhotoSize {
  id: string;
  label: string;
  /** width in centimetres */
  widthCm: number;
  /** height in centimetres */
  heightCm: number;
  note: string;
}

export interface BackgroundColor {
  id: string;
  label: string;
  hex: string;
}

export type GenerateRequest =
  | { mode: "anime"; styleId: AnimeStyleId; image: string }
  | { mode: "pasfoto"; outfitId: OutfitId; backgroundId: string; image: string };

export interface GenerateResponse {
  image?: string;
  error?: string;
}
