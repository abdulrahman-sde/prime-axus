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
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiPjx0aXRsZT5QcmltZSBBeHVzPC90aXRsZT48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMiIgZmlsbD0iIzI1NjNFQiIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0IDI0KSBzY2FsZSguNjIpIHRyYW5zbGF0ZSgtMjQgLTI0KSI+PHBhdGggZD0iTTIxLjkxIDUuNTFRMjQuMDAgNC4zMiAyNi4wOSA1LjUxTDM4LjQ3IDEyLjU2UTQwLjU2IDEzLjc1IDM4LjQ3IDE0Ljk0TDI2LjA5IDIxLjk5UTI0LjAwIDIzLjE4IDIxLjkxIDIxLjk5TDkuNTMgMTQuOTRRNy40NCAxMy43NSA5LjUzIDEyLjU2WiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjU1Ii8+PHBhdGggZD0iTTYuNzIgMTcuMzhRNi43MiAxNC45OCA4LjgxIDE2LjE3TDIxLjE5IDIzLjIyUTIzLjI4IDI0LjQxIDIzLjI4IDI2LjgxTDIzLjI4IDQwLjg3UTIzLjI4IDQzLjI3IDIxLjE5IDQyLjA4TDguODEgMzUuMDNRNi43MiAzMy44NCA2LjcyIDMxLjQ0WiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjc4Ii8+PHBhdGggZD0iTTI0LjcyIDI2LjgxUTI0LjcyIDI0LjQxIDI2LjgxIDIzLjIyTDM5LjE5IDE2LjE3UTQxLjI4IDE0Ljk4IDQxLjI4IDE3LjM4TDQxLjI4IDMxLjQ0UTQxLjI4IDMzLjg0IDM5LjE5IDM1LjAzTDI2LjgxIDQyLjA4UTI0LjcyIDQzLjI3IDI0LjcyIDQwLjg3WiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPgo=" width="64" height="64" alt="" />
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
