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
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiB2aWV3Qm94PSIwIDAgNDggNDgiIGZpbGw9Im5vbmUiPjx0aXRsZT5QcmltZSBBeHVzPC90aXRsZT48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMSIgZmlsbD0iIzI1NjNFQiIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDggOCkgc2NhbGUoMSkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEgMSkgc2NhbGUoLjYyNSkiPjxwYXRoIGQ9Ik0yMS45MSA1LjUxUTI0LjAwIDQuMzIgMjYuMDkgNS41MUwzOC40NyAxMi41NlE0MC41NiAxMy43NSAzOC40NyAxNC45NEwyNi4wOSAyMS45OVEyNC4wMCAyMy4xOCAyMS45MSAyMS45OUw5LjUzIDE0Ljk0UTcuNDQgMTMuNzUgOS41MyAxMi41NloiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC4zOCIvPjxwYXRoIGQ9Ik02LjcyIDE3LjM4UTYuNzIgMTQuOTggOC44MSAxNi4xN0wyMS4xOSAyMy4yMlEyMy4yOCAyNC40MSAyMy4yOCAyNi44MUwyMy4yOCA0MC44N1EyMy4yOCA0My4yNyAyMS4xOSA0Mi4wOEw4LjgxIDM1LjAzUTYuNzIgMzMuODQgNi43MiAzMS40NFoiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMC42OCIvPjxwYXRoIGQ9Ik0yNC43MiAyNi44MVEyNC43MiAyNC40MSAyNi44MSAyMy4yMkwzOS4xOSAxNi4xN1E0MS4yOCAxNC45OCA0MS4yOCAxNy4zOEw0MS4yOCAzMS40NFE0MS4yOCAzMy44NCAzOS4xOSAzNS4wM0wyNi44MSA0Mi4wOFEyNC43MiA0My4yNyAyNC43MiA0MC44N1oiIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iMSIvPjwvZz48L2c+PC9zdmc+Cg==" width="64" height="64" alt="" />
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
