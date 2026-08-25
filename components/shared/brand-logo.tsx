import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGOS = {
  mark: {
    src: "/landing/logo.png",
    width: 453,
    height: 420,
  },
  wordmark: {
    src: "/landing/logo-text.png",
    width: 687,
    height: 115,
  },
} as const;

export default function BrandLogo({
  variant = "wordmark",
  className,
}: {
  variant?: keyof typeof LOGOS;
  className?: string;
}) {
  const logo = LOGOS[variant];

  return (
    <Image
      src={logo.src}
      alt="Prime Axus"
      width={logo.width}
      height={logo.height}
      className={cn("h-7 w-auto", className)}
    />
  );
}
