import type { Metadata } from "next";
import ContactPage from "@/features/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about an order, a product, or a return? Email info@primeaxus.com or call +1 (307) 430-1403.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return <ContactPage />;
}
