import type { Metadata } from "next";
import ShippingPage from "@/features/legal/shipping-page";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Prime Axus shipping costs, processing times and delivery windows.",
  alternates: { canonical: "/shipping-policy" },
};

export default function Page() {
  return <ShippingPage />;
}
