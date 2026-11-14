import type { Metadata } from "next";
import PrivacyPage from "@/features/legal/privacy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Prime Axus collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <PrivacyPage />;
}
