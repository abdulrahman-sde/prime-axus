import type { Metadata } from "next";
import "./globals.css";
import { Archivo, Inter, JetBrains_Mono, Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.primeaxus.com",
);

const SITE_TITLE = "Prime Axus";
const SITE_DESCRIPTION =
  "Prime Axus is a curated online marketplace for kitchen, office, and pet essentials — quality products, fair prices, and fast delivery.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${SITE_TITLE} — Curated Home, Office & Pet Essentials`,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_TITLE,
  keywords: [
    "Prime Axus",
    "online marketplace",
    "kitchen essentials",
    "office supplies",
    "pet supplies",
    "curated products",
    "online shopping",
  ],
  authors: [{ name: SITE_TITLE, url: siteUrl }],
  creator: SITE_TITLE,
  publisher: SITE_TITLE,
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_TITLE,
    title: `${SITE_TITLE} — Curated Home, Office & Pet Essentials`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/landing/logo-text.png",
        width: 2172,
        height: 724,
        alt: "Prime Axus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} — Curated Home, Office & Pet Essentials`,
    description: SITE_DESCRIPTION,
    images: ["/landing/logo-text.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "font-sans",
        archivo.variable,
        inter.variable,
        merriweather.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        {children}
        <Toaster richColors position="bottom-left" />
      </body>
    </html>
  );
}
