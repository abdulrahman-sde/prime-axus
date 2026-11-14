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
            <svg width="64" height="64" viewBox="0 0 64 64">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#4F8EF7" />
                  <stop offset="1" stopColor="#1E40AF" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="16" fill="url(#g)" />
              <path d="M23 47V17H34.5A9.5 9.5 0 0 1 34.5 36H23" fill="none" stroke="#fff" strokeWidth="6.5" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx="43.5" cy="46" r="3.6" fill="#A9CBFF" />
            </svg>
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
