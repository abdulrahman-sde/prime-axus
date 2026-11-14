import { cn } from "@/lib/utils";

// Prime Axus logo: a layered "A" (also an axis) built from three translucent
// rounded strokes. Inline SVG so it scales cleanly and follows light/dark
// mode through the theme colors. Edit here to update the logo everywhere.
function Glyph() {
  return (
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className="text-primary"
    >
      <path d="M12 35H36" strokeOpacity=".4" strokeWidth="8" />
      <path d="M8 40L24 8" strokeOpacity=".6" strokeWidth="9" />
      <path d="M24 8L40 40" strokeWidth="9" />
    </g>
  );
}

export default function BrandLogo({
  variant = "wordmark",
  className,
}: {
  variant?: "mark" | "wordmark";
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        role="img"
        aria-label="Prime Axus"
        className={cn("h-8 w-auto", className)}
      >
        <Glyph />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 196 48"
      role="img"
      aria-label="Prime Axus"
      className={cn("h-8 w-auto text-foreground", className)}
    >
      <Glyph />
      <text
        x="56"
        y="34"
        fill="currentColor"
        fontSize="29"
        fontWeight="650"
        textLength="138"
        lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        Prime Axus
      </text>
    </svg>
  );
}
