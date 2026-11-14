import { cn } from "@/lib/utils";

// Prime Axus logo as inline SVG: scales cleanly and follows light/dark mode
// (wordmark uses currentColor). Edit once here to update everywhere.
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
        viewBox="0 0 64 64"
        role="img"
        aria-label="Prime Axus"
        className={cn("h-7 w-auto", className)}
      >
         <defs><linearGradient id="mk" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#4F8EF7"/><stop offset="1" stop-color="#1E40AF"/></linearGradient></defs> <rect width="64" height="64" rx="16" fill="url(#mk)"/> <path d="M23 47V17H34.5A9.5 9.5 0 0 1 34.5 36H23" fill="none" stroke="#fff" stroke-width="6.5" stroke-linejoin="round" stroke-linecap="round"/> <circle cx="43.5" cy="46" r="3.6" fill="#A9CBFF"/>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 351.1 64"
      role="img"
      aria-label="Prime Axus"
      className={cn("h-7 w-auto text-foreground", className)}
    >
       <defs><linearGradient id="wm" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="#4F8EF7"/><stop offset="1" stop-color="#1E40AF"/></linearGradient></defs> <rect width="64" height="64" rx="16" fill="url(#wm)"/> <path d="M23 47V17H34.5A9.5 9.5 0 0 1 34.5 36H23" fill="none" stroke="#fff" stroke-width="6.5" stroke-linejoin="round" stroke-linecap="round"/> <circle cx="43.5" cy="46" r="3.6" fill="#A9CBFF"/>
      <g transform="translate(82 13.40) scale(0.62)">
        <clipPath id="tc"><rect x="-10" y="0" width="454" height="60"/></clipPath><g clip-path="url(#tc)" fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="miter" stroke-miterlimit="4" stroke-linecap="butt"><path transform="translate(0 0)" d="M4 0V60M4 4H19A13 13 0 0 1 19 30H4"/><path transform="translate(47 0)" d="M4 0V60M4 4H19A13 13 0 0 1 19 30H4M16 30L32 62"/><path transform="translate(94 0)" d="M4 0V60"/><path transform="translate(113 0)" d="M4 60V4L22 34L40 4V60"/><path transform="translate(168 0)" d="M4 0V60M4 4H32M4 56H32M4 30H27"/><path transform="translate(243 0)" d="M0 62L20 2L40 62M9 40H31"/><path transform="translate(298 0)" d="M1 -2L35 62M35 -2L1 62"/><path transform="translate(348 0)" d="M4 0V40A16 16 0 0 0 36 40V0"/><path transform="translate(399 0)" d="M31 14C31 8 26 4 18 4C10 4 5 8 5 15C5 22 11 26 18 30C25 34 31 38 31 45C31 52 26 56 18 56C10 56 5 52 5 46"/></g>
      </g>
    </svg>
  );
}
