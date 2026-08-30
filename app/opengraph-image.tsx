import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0b0d 0%, #171717 100%)",
          color: "#f5f5f4",
          fontFamily: "Arial, sans-serif",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: "#f5f5f4",
                color: "#0b0b0d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              P
            </div>
            <div style={{ fontSize: 28, letterSpacing: 2 }}>PRIME AXUS</div>
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            Curated essentials for home, office, and pets.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#d6d3d1" }}>
            Quality picks, fair prices, fast delivery.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
