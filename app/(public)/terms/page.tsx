import type { Metadata } from "next";
import TermsPage from "@/features/legal/terms-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you shop at Prime Axus.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <TermsPage />;
}
