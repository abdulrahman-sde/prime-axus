import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)",
          color: "#0b0b0d",
          fontFamily: "Arial, sans-serif",
          padding: 64,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 30, letterSpacing: 4, fontWeight: 700 }}>PRIME AXUS</div>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05 }}>
            Home, Office & Pet Essentials
          </div>
          <div style={{ fontSize: 28, color: "#3f3f46" }}>
            Browse curated pieces designed for everyday life.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
