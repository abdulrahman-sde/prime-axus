import LegalPage from "./legal-page";
import {
  BUSINESS_NAME,
  SHIPPING_FLAT_RATE,
  SHIPPING_PROCESSING,
  SHIPPING_REGION,
  SHIPPING_TRANSIT,
} from "@/constants/policies";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/constants/contact";

export default function ShippingPage() {
  return (
    <LegalPage
      title="Shipping Policy"
      intro={`This policy explains how ${BUSINESS_NAME} processes and delivers orders.`}
    >
      <section>
        <h2>Where we ship</h2>
        <p>We currently ship to addresses within the {SHIPPING_REGION}.</p>
      </section>
      <section>
        <h2>Shipping cost</h2>
        <p>
          {SHIPPING_FLAT_RATE === 0
            ? "Standard shipping is free on every order."
            : `Standard shipping is a flat $${SHIPPING_FLAT_RATE} per order.`}{" "}
          The shipping cost is shown at checkout before you place your order.
        </p>
      </section>
      <section>
        <h2>Processing time</h2>
        <p>
          Orders are processed within {SHIPPING_PROCESSING} of being placed,
          Monday to Friday, excluding public holidays. Orders placed on a
          weekend or holiday are processed the next business day.
        </p>
      </section>
      <section>
        <h2>Delivery time</h2>
        <p>
          Once dispatched, standard delivery takes {SHIPPING_TRANSIT}. These
          are estimates, not guarantees. Delays can occur because of carrier
          issues, weather or peak seasons.
        </p>
      </section>
      <section>
        <h2>Order confirmation and tracking</h2>
        <p>
          You will receive an order confirmation at the email address you
          provide at checkout. If you have not received it, check your spam
          folder or contact us.
        </p>
      </section>
      <section>
        <h2>Payment</h2>
        <p>
          Orders are paid online at checkout through our payment provider. You
          are charged when you place the order, and we never store your card
          details.
        </p>
      </section>
      <section>
        <h2>Damaged, lost or incorrect orders</h2>
        <p>
          If your order arrives damaged, is missing items or does not arrive,
          email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or call{" "}
          {CONTACT_PHONE_DISPLAY} and we will make it right. Please include your
          order number and, for damage, a photo of the item and packaging.
        </p>
      </section>
    </LegalPage>
  );
}
