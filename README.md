# VektorAha

Web edit foto bertenaga AI, dibangun dengan **Next.js 16 (App Router)**, **TypeScript**, dan **Tailwind CSS v4**.

## Fitur

- **Gaya Anime** (`/anime`) — ubah foto jadi ilustrasi anime dengan 6 gaya: Ninja Shonen (terinspirasi Naruto), Watercolor Studio (terinspirasi Ghibli), Saiyan Action (terinspirasi Dragon Ball), Shoujo Sparkle, Cyber Anime, Chibi. Ada slider sebelum/sesudah dan tombol unduh.
- **Pasfoto Studio** (`/pasfoto`)
  - Mode *Studio AI*: ganti baju (kemeja putih, jas, blazer, batik), cahaya studio, latar polos.
  - Mode *Hapus latar saja*: wajah & baju 100% asli, latar dihapus langsung di browser (`@imgly/background-removal`).
  - Warna latar merah / biru / putih / abu (bisa diganti tanpa proses ulang).
  - Ukuran 2×3, 3×4, 4×6, 3,5×4,5 (paspor/visa), 1:1 — ekspor 300 dpi.
  - Crop & zoom, unduh satuan atau **lembar cetak 4R**.
- Skeleton loading per halaman (`loading.tsx`) dan saat AI memproses.
- Responsive (mobile menu, layout editor 1 kolom di HP, 2 kolom di desktop).

## Struktur (Atomic Design)

```
src/
├─ app/                 # routes + loading.tsx (skeleton) + api/generate
├─ components/
│  ├─ atoms/            # Button, Badge, Skeleton, Spinner, Heading, Label, Logo, Container
│  ├─ molecules/        # FileDropzone, StyleCard, OptionChip, ColorSwatch, CompareSlider, ...
│  ├─ organisms/        # Navbar, Footer, Hero, AnimeEditor, PasfotoEditor, ResultPanel, ...
│  └─ templates/        # MainTemplate, EditorTemplate, EditorSkeleton, LandingSkeleton
├─ constants/           # daftar gaya, ukuran, warna, outfit
├─ hooks/               # useGenerate, useBackgroundRemoval
├─ lib/                 # image utils (crop, 300dpi, print sheet), AI provider & prompt
└─ types/
```

## Menjalankan

```bash
cp .env.example .env.local   # isi GEMINI_API_KEY (atau OPENAI_API_KEY + AI_PROVIDER=openai)
npm install
npm run dev
```

Prompt AI ada di server (`src/lib/ai/prompts.ts`), jadi client hanya mengirim ID gaya — API tidak bisa dipakai untuk prompt bebas.

## Deploy ke Vercel

Import repo di Vercel, tambahkan env `GEMINI_API_KEY` (dan `AI_PROVIDER` bila perlu), lalu deploy.

> Catatan: gaya di aplikasi ini hanya *terinspirasi* karya populer dan tidak berafiliasi dengan pemegang hak cipta. Prompt sengaja mendeskripsikan ciri visual, bukan meniru karakter tertentu.
# vektoraha
