import type { AnimeStyle, BackgroundColor, Outfit, PhotoSize } from "@/types";

export const APP_NAME = "VektorAha";

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/anime", label: "Gaya Anime" },
  { href: "/pasfoto", label: "Pasfoto Studio" },
] as const;

export const ANIME_STYLES: AnimeStyle[] = [
  {
    id: "ninja-shonen",
    name: "Ninja Shonen",
    inspiration: "Terinspirasi Naruto",
    description: "Garis tegas, cel-shading cerah, nuansa oranye & biru khas anime ninja.",
    gradient: "from-orange-400 via-amber-300 to-sky-400",
    emoji: "🍥",
  },
  {
    id: "watercolor-studio",
    name: "Watercolor Studio",
    inspiration: "Terinspirasi Studio Ghibli",
    description: "Lukisan cat air lembut, warna pastel hangat, suasana film animasi klasik.",
    gradient: "from-emerald-300 via-lime-200 to-sky-300",
    emoji: "🌿",
  },
  {
    id: "saiyan-action",
    name: "Saiyan Action",
    inspiration: "Terinspirasi Dragon Ball",
    description: "Anime aksi era 90-an: rahang tajam, outline tebal, aura energi menyala.",
    gradient: "from-yellow-300 via-orange-400 to-red-500",
    emoji: "⚡",
  },
  {
    id: "shoujo-sparkle",
    name: "Shoujo Sparkle",
    inspiration: "Gaya anime romantis",
    description: "Mata berbinar, rambut halus, latar bunga dan kilau lembut.",
    gradient: "from-pink-300 via-rose-200 to-violet-300",
    emoji: "🌸",
  },
  {
    id: "cyber-anime",
    name: "Cyber Anime",
    inspiration: "Gaya cyberpunk",
    description: "Lampu neon, kota futuristik, kontras ungu dan cyan yang dramatis.",
    gradient: "from-fuchsia-500 via-violet-500 to-cyan-400",
    emoji: "🌃",
  },
  {
    id: "chibi",
    name: "Chibi",
    inspiration: "Gaya super-deformed",
    description: "Kepala besar, badan mungil, ekspresi imut dan lucu.",
    gradient: "from-sky-200 via-indigo-200 to-pink-200",
    emoji: "🧸",
  },
];

export const OUTFITS: Outfit[] = [
  { id: "original", label: "Pakaian asli" },
  { id: "white-shirt", label: "Kemeja putih" },
  { id: "black-suit", label: "Jas hitam" },
  { id: "navy-blazer", label: "Blazer navy" },
  { id: "batik", label: "Batik formal" },
];

export const BACKGROUND_COLORS: BackgroundColor[] = [
  { id: "red", label: "Merah", hex: "#D7191C" },
  { id: "blue", label: "Biru", hex: "#1C4E9C" },
  { id: "white", label: "Putih", hex: "#FFFFFF" },
  { id: "gray", label: "Abu studio", hex: "#C9CDD2" },
];

export const PHOTO_SIZES: PhotoSize[] = [
  { id: "2x3", label: "2 × 3", widthCm: 2, heightCm: 3, note: "Ijazah, kartu pelajar" },
  { id: "3x4", label: "3 × 4", widthCm: 3, heightCm: 4, note: "Lamaran kerja, KTP" },
  { id: "4x6", label: "4 × 6", widthCm: 4, heightCm: 6, note: "Ijazah, SKCK, berkas resmi" },
  { id: "visa", label: "3,5 × 4,5", widthCm: 3.5, heightCm: 4.5, note: "Paspor & visa" },
  { id: "square", label: "1 : 1", widthCm: 5, heightCm: 5, note: "LinkedIn, profil kerja" },
];

/** Print resolution used for exporting pasfoto */
export const PRINT_DPI = 300;

/** 4R photo paper (10.2 × 15.2 cm) for the print-sheet export */
export const PRINT_SHEET = { widthCm: 10.2, heightCm: 15.2, gapCm: 0.2, marginCm: 0.4 };

export const MAX_UPLOAD_MB = 10;
