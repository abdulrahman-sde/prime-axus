import Image from "next/image";
import { cn } from "@/lib/utils";

// Real logo files live in /public/brand (SVG with outlined text, so no font
// dependency). A light and a dark version are swapped with the theme.
const LOGOS = {
  wordmark: { light: "/brand/logo.svg", dark: "/brand/logo-dark.svg", width: 217, height: 48 },
  mark: { light: "/brand/mark.svg", dark: "/brand/mark-dark.svg", width: 48, height: 48 },
} as const;

export default function BrandLogo({
  variant = "wordmark",
  className,
}: {
  variant?: keyof typeof LOGOS;
  className?: string;
}) {
  const logo = LOGOS[variant];
  const base = cn("h-8 w-auto", className);

  return (
    <>
      <Image
        src={logo.light}
        alt="Prime Axus"
        width={logo.width}
        height={logo.height}
        priority
        className={cn(base, "dark:hidden")}
      />
      <Image
        src={logo.dark}
        alt=""
        aria-hidden
        width={logo.width}
        height={logo.height}
        className={cn(base, "hidden dark:block")}
      />
    </>
  );
}
