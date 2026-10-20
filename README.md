# VektorAha

AI-powered photo editing web app built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## Features

### Anime Style (`/anime`)

Turn a photo into an anime illustration in one of 6 styles:

| Style | Inspired by |
| --- | --- |
| Ninja Shonen | Naruto |
| Watercolor Studio | Ghibli |
| Saiyan Action | Dragon Ball |
| Shoujo Sparkle | — |
| Cyber Anime | — |
| Chibi | — |

Includes a before/after comparison slider and a download button.

### Passport Photo Studio (`/pasfoto`)

- **Studio AI mode**: change clothing (white shirt, suit, blazer, batik), apply studio lighting, plain background.
- **Background removal only**: your face and clothes stay 100% original; the background is removed directly in the browser (`@imgly/background-removal`).
- **Background colors**: red, blue, white, or gray. Switch colors without reprocessing.
- **Sizes**: 2×3, 3×4, 4×6, 3.5×4.5 (passport/visa), and 1:1, exported at 300 dpi.
- **Crop & zoom**, download a single photo or a **4R print sheet**.

### General

- Skeleton loading for each page (`loading.tsx`) and while the AI is processing.
- Responsive layout: mobile menu, single-column editor on phones, two columns on desktop.

## Project Structure (Atomic Design)

```
src/
├─ app/                 # routes + loading.tsx (skeleton) + api/generate
├─ components/
│  ├─ atoms/            # Button, Badge, Skeleton, Spinner, Heading, Label, Logo, Container
│  ├─ molecules/        # FileDropzone, StyleCard, OptionChip, ColorSwatch, CompareSlider, ...
│  ├─ organisms/        # Navbar, Footer, Hero, AnimeEditor, PasfotoEditor, ResultPanel, ...
│  └─ templates/        # MainTemplate, EditorTemplate, EditorSkeleton, LandingSkeleton
├─ constants/           # styles, sizes, colors, outfits
├─ hooks/               # useGenerate, useBackgroundRemoval
├─ lib/                 # image utils (crop, 300 dpi, print sheet), AI provider & prompts
└─ types/
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` in the project root (see [Environment Variables](#environment-variables)):

   ```bash
   GEMINI_API_KEY=your-key
   ```

3. Start the dev server and open <http://localhost:3000>:

   ```bash
   npm run dev
   ```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Lint with ESLint |

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `AI_PROVIDER` | No | AI provider to use (`gemini` or `openai`) |
| `GEMINI_API_KEY` | If using Gemini | Google Gemini API key |
| `GEMINI_IMAGE_MODEL` | No | Override the Gemini image model |
| `OPENAI_API_KEY` | If using OpenAI | OpenAI API key (also set `AI_PROVIDER=openai`) |
| `OPENAI_IMAGE_MODEL` | No | Override the OpenAI image model |

AI prompts live on the server (`src/lib/ai/prompts.ts`), so the client only sends a style ID. The API cannot be used for free-form prompts.

## Deploy to Vercel

Import the repo in Vercel, add the `GEMINI_API_KEY` env variable (and `AI_PROVIDER` if needed), then deploy.

## Disclaimer

The styles in this app are only *inspired by* popular works and are not affiliated with any copyright holder. Prompts deliberately describe visual traits rather than imitating specific characters.
