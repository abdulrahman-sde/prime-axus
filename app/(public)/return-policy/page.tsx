import type { Metadata } from "next";
import ReturnPage from "@/features/legal/return-page";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "How to return an item to Prime Axus and how refunds work.",
  alternates: { canonical: "/return-policy" },
};

export default function Page() {
  return <ReturnPage />;
}
