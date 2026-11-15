import type { Metadata } from "next";
import AboutPage from "@/features/legal/about-page";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Prime Axus is an online store for home, kitchen, office and pet essentials, based in Austin, Texas.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
