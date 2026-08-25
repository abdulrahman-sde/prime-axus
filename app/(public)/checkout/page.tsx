import type { Metadata } from "next";
import CheckoutPage from "@/features/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
