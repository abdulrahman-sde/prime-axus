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
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiPjx0aXRsZT5QcmltZSBBeHVzPC90aXRsZT48ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJpYiIgeDE9IjYiIHkxPSIwIiB4Mj0iNDIiIHkyPSI0OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzREOERGRiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFCM0ZEMSIvPjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0iaWgiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSI0OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIuMjgiLz48c3RvcCBvZmZzZXQ9Ii41NSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjExLjUiIGZpbGw9InVybCgjaWIpIi8+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iMTEuNSIgZmlsbD0idXJsKCNpaCkiLz4KPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQgMjQuNSkgc2NhbGUoLjY2KSB0cmFuc2xhdGUoLTI0IC0yNCkiPjxwYXRoIGQ9Ik0yMS45MSA1LjUxUTI0LjAwIDQuMzIgMjYuMDkgNS41MUwzOC40NyAxMi41NlE0MC41NiAxMy43NSAzOC40NyAxNC45NEwyNi4wOSAyMS45OVEyNC4wMCAyMy4xOCAyMS45MSAyMS45OUw5LjUzIDE0Ljk0UTcuNDQgMTMuNzUgOS41MyAxMi41NloiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41NSIvPjxwYXRoIGQ9Ik02LjcyIDE3LjM4UTYuNzIgMTQuOTggOC44MSAxNi4xN0wyMS4xOSAyMy4yMlEyMy4yOCAyNC40MSAyMy4yOCAyNi44MUwyMy4yOCA0MC44N1EyMy4yOCA0My4yNyAyMS4xOSA0Mi4wOEw4LjgxIDM1LjAzUTYuNzIgMzMuODQgNi43MiAzMS40NFoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC44Ii8+PHBhdGggZD0iTTI0LjcyIDI2LjgxUTI0LjcyIDI0LjQxIDI2LjgxIDIzLjIyTDM5LjE5IDE2LjE3UTQxLjI4IDE0Ljk4IDQxLjI4IDE3LjM4TDQxLjI4IDMxLjQ0UTQxLjI4IDMzLjg0IDM5LjE5IDM1LjAzTDI2LjgxIDQyLjA4UTI0LjcyIDQzLjI3IDI0LjcyIDQwLjg3WiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPgo=" width="64" height="64" alt="" />
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
