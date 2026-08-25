import type { Metadata } from "next";
import ContactPage from "@/features/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us | PrimeAxis",
  description:
    "Questions about an order, a product, or a return? Email info@primeaxus.com or call +1 (307) 430-1403.",
};

export default function Contact() {
  return <ContactPage />;
}
