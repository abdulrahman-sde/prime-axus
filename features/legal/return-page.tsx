import Link from "next/link";
import LegalPage from "./legal-page";
import {
  BUSINESS_NAME,
  REFUND_TIME,
  RETURN_RESPONSE_TIME,
  RETURN_WINDOW_DAYS,
} from "@/constants/policies";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/constants/contact";

export default function ReturnPage() {
  return (
    <LegalPage
      title="Return & Refund Policy"
      intro={`We want you to be happy with your purchase from ${BUSINESS_NAME}. If you are not, here is how returns work.`}
    >
      <section>
        <h2>Return window</h2>
        <p>
          You may return most items within {RETURN_WINDOW_DAYS} days of
          delivery for a refund, as long as the item is unused, in its original
          condition and in its original packaging.
        </p>
      </section>
      <section>
        <h2>How to start a return</h2>
        <ul>
          <li>
            Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or
            use our <Link href="/contact">contact form</Link> with your order
            number and the reason for the return.
          </li>
          <li>
            We will reply within {RETURN_RESPONSE_TIME} with return
            instructions and the return address.
          </li>
          <li>Pack the item securely and send it back as instructed.</li>
        </ul>
      </section>
      <section>
        <h2>Return shipping</h2>
        <p>
          If the item arrived damaged, defective or was not what you ordered,
          we pay for return shipping. For other returns, the customer pays for
          return shipping.
        </p>
      </section>
      <section>
        <h2>Refunds</h2>
        <p>
          After we receive and inspect your return, we will email you the
          result. Approved refunds are issued within {REFUND_TIME}, to the
          original payment method.
        </p>
      </section>
      <section>
        <h2>Items we cannot accept back</h2>
        <ul>
          <li>Used, damaged-by-customer or incomplete items.</li>
          <li>
            Opened pet food, consumables and hygiene products, for health and
            safety reasons, unless the item is defective.
          </li>
        </ul>
      </section>
      <section>
        <h2>Exchanges</h2>
        <p>
          To exchange an item, return it as above and place a new order for the
          replacement.
        </p>
      </section>
      <section>
        <h2>Questions</h2>
        <p>
          Contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>{" "}
          or {CONTACT_PHONE_DISPLAY}.
        </p>
      </section>
    </LegalPage>
  );
}
