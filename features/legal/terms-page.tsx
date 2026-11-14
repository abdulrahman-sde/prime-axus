import Link from "next/link";
import LegalPage from "./legal-page";
import { BUSINESS_LOCATION, BUSINESS_NAME } from "@/constants/policies";
import { CONTACT_EMAIL } from "@/constants/contact";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={`These terms apply to your use of primeaxus.com and any purchase from ${BUSINESS_NAME}. By placing an order you agree to them.`}
    >
      <section>
        <h2>Who we are</h2>
        <p>
          {BUSINESS_NAME} is an online store based in {BUSINESS_LOCATION}. You
          can reach us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
      <section>
        <h2>Orders and acceptance</h2>
        <p>
          Placing an order is an offer to buy. We accept it when we confirm
          dispatch. We may cancel or refuse an order, for example because of
          stock errors, pricing errors or suspected fraud, and will refund any
          payment already made.
        </p>
      </section>
      <section>
        <h2>Prices and payment</h2>
        <p>
          Prices are in US dollars and are shown at checkout together with
          shipping. Payment is taken online at checkout through our payment
          provider. We aim for
          accurate product information and prices, but errors can occur.
        </p>
      </section>
      <section>
        <h2>Shipping and returns</h2>
        <p>
          Delivery is covered by our <Link href="/shipping-policy">Shipping
          Policy</Link> and returns and refunds by our{" "}
          <Link href="/return-policy">Return &amp; Refund Policy</Link>. Both
          form part of these terms.
        </p>
      </section>
      <section>
        <h2>Products</h2>
        <p>
          We try to describe and photograph products accurately. Colors can
          vary by screen. Product names and brands belong to their owners, and
          we do not claim any affiliation with a brand unless we say so.
        </p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <p>
          You agree not to misuse the site, attempt to access restricted areas,
          interfere with its operation or place fraudulent orders.
        </p>
      </section>
      <section>
        <h2>Liability</h2>
        <p>
          To the fullest extent permitted by law, our liability for any claim
          relating to an order is limited to the amount you paid for that
          order. Nothing here limits rights you have under consumer law that
          cannot be waived.
        </p>
      </section>
      <section>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Texas, USA,
          without regard to conflict-of-law rules.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>
          We may update these terms and will change the date above when we do.
          The version in force when you place an order applies to that order.
        </p>
      </section>
    </LegalPage>
  );
}
