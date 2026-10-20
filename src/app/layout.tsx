import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MainTemplate } from "@/components/templates";
import "./globals.css";

// Self-hosted variable fonts (no runtime request to Google Fonts).
const display = localFont({
  src: "../fonts/bricolage-grotesque.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

const body = localFont({
  src: "../fonts/plus-jakarta-sans.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VektorAha — Edit foto jadi anime & pasfoto studio",
    template: "%s · VektorAha",
  },
  description:
    "Ubah foto jadi karakter anime atau pasfoto studio profesional untuk lamaran kerja. Latar merah/biru, ukuran 2×3, 3×4, 4×6.",
};

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>
        <MainTemplate>{children}</MainTemplate>
      </body>
    </html>
  );
}
