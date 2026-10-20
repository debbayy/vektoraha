import { ImageResponse } from "next/og";

export const alt = "VektorAha — Pasfoto online & ubah foto jadi anime dengan AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tiles = [
  { label: "Ninja Shonen", from: "#fb923c", to: "#38bdf8", rotate: -6 },
  { label: "Pasfoto 3×4", from: "#1C4E9C", to: "#1C4E9C", rotate: 4 },
  { label: "Watercolor", from: "#6ee7b7", to: "#7dd3fc", rotate: -2 },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fbf8f3",
          padding: 64,
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "#17141f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ff5a36",
                fontSize: 40,
                fontWeight: 800,
              }}
            >
              V
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: "#17141f", display: "flex" }}>
              Vektor<span style={{ color: "#ff5a36" }}>Aha</span>
            </div>
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, color: "#17141f", lineHeight: 1.05, marginTop: 40 }}>
            Pasfoto online & foto jadi anime
          </div>
          <div style={{ fontSize: 28, color: "#4b4757", marginTop: 24, lineHeight: 1.4 }}>
            Latar merah/biru, ukuran 3×4 & 4×6 siap cetak. 6 gaya anime dengan AI. Gratis.
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 400, height: 460 }}>
          {tiles.map((t, i) => (
            <div
              key={t.label}
              style={{
                position: "absolute",
                left: i * 70,
                top: i * 60,
                width: 240,
                height: 300,
                borderRadius: 28,
                border: "4px solid #17141f",
                background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                boxShadow: "10px 10px 0 #17141f",
                transform: `rotate(${t.rotate}deg)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* simple portrait silhouette — avoids fetching emoji fonts at build time */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 84, height: 84, borderRadius: 999, background: "#f0c9a7", border: "4px solid #17141f" }} />
                <div
                  style={{
                    width: 150,
                    height: 70,
                    marginTop: 8,
                    borderTopLeftRadius: 80,
                    borderTopRightRadius: 80,
                    background: "#17141f",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 22,
                  fontWeight: 700,
                  background: "#ffffff",
                  color: "#17141f",
                  padding: "6px 16px",
                  borderRadius: 999,
                }}
              >
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
