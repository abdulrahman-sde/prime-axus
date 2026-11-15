import Link from "next/link";
import LegalPage from "./legal-page";
import {
  BUSINESS_ADDRESS,
  BUSINESS_LEGAL_NAME,
  BUSINESS_LOCATION,
  BUSINESS_NAME,
  RETURN_WINDOW_DAYS,
  SHIPPING_FLAT_RATE,
  SHIPPING_TRANSIT,
} from "@/constants/policies";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/constants/contact";

export default function AboutPage() {
  return (
    <LegalPage
      title="About Prime Axus"
      intro={`${BUSINESS_NAME} is an online store for everyday home, kitchen, office and pet essentials, based in ${BUSINESS_LOCATION}.`}
      showDate={false}
    >
      <section>
        <h2>What we do</h2>
        <p>
          We pick practical products for the places people spend their days:
          the kitchen, the desk and the pet corner of the house. Our aim is
          simple: a small, well-chosen catalog, clear prices, and honest
          product information.
        </p>
      </section>
      <section>
        <h2>How we work</h2>
        <ul>
          <li>
            <strong>Clear pricing.</strong> The price you see, plus{" "}
            {SHIPPING_FLAT_RATE === 0
              ? "free standard shipping"
              : `$${SHIPPING_FLAT_RATE} shipping`}
            , is what you pay.
          </li>
          <li>
            <strong>Reliable delivery.</strong> Orders ship within 1–2 business
            days and usually arrive in {SHIPPING_TRANSIT}. See our{" "}
            <Link href="/shipping-policy">Shipping Policy</Link>.
          </li>
          <li>
            <strong>Easy returns.</strong> A {RETURN_WINDOW_DAYS}-day return
            window. See our <Link href="/return-policy">Return Policy</Link>.
          </li>
          <li>
            <strong>Real support.</strong> Real people answer your email and
            phone calls.
          </li>
        </ul>
      </section>
      <section>
        <h2>Who is behind the store</h2>
        <p>
          {BUSINESS_NAME} is operated by {BUSINESS_LEGAL_NAME || BUSINESS_NAME},
          a Texas limited liability company. {BUSINESS_ADDRESS || BUSINESS_LOCATION}
        </p>
      </section>
      <section>
        <h2>Contact us</h2>
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or call{" "}
          {CONTACT_PHONE_DISPLAY}, Monday to Saturday. You can also use our{" "}
          <Link href="/contact">contact form</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
