import LegalPage from "./legal-page";
import {
  BUSINESS_ADDRESS,
  BUSINESS_LEGAL_NAME,
  BUSINESS_NAME,
} from "@/constants/policies";
import { CONTACT_EMAIL } from "@/constants/contact";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`${BUSINESS_NAME} ("we", "us"), operated by ${BUSINESS_LEGAL_NAME}, respects your privacy. This policy explains what personal information we collect when you use primeaxus.com, how we use it and the choices you have.`}
    >
      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Order details:</strong> your name, email address, delivery
            address and the items you order.
          </li>
          <li>
            <strong>Contact messages:</strong> information you send through our
            contact form or by email.
          </li>
          <li>
            <strong>Technical data:</strong> basic information such as browser
            type and pages visited, collected through standard server logs.
          </li>
        </ul>
        <p>
          We do not store payment card numbers. Payments are handled by a
          third-party payment provider such as PayPal, which processes your
          payment details under its own privacy policy.
        </p>
      </section>
      <section>
        <h2>How we use your information</h2>
        <ul>
          <li>To process, ship and support your orders.</li>
          <li>To reply to your questions and handle returns.</li>
          <li>To keep the site secure and prevent fraud.</li>
          <li>To meet legal and tax obligations.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>
      <section>
        <h2>Who we share it with</h2>
        <p>
          We share information only with service providers who help us run the
          store, such as hosting, database, image hosting, form handling and
          delivery carriers, and only as needed to provide those services. We
          may also disclose information when the law requires it.
        </p>
      </section>
      <section>
        <h2>Cookies</h2>
        <p>
          We use only essential cookies and local storage, for example to keep
          your shopping cart and to sign in staff. We do not use advertising
          cookies.
        </p>
      </section>
      <section>
        <h2>Data retention and security</h2>
        <p>
          We keep order records for as long as needed for accounting, tax and
          legal purposes. We use reasonable technical measures to protect your
          information, but no system is completely secure.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct or delete your personal
          information, subject to legal record-keeping requirements. Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. California
          residents may have additional rights under the CCPA, and we will
          honor valid requests.
        </p>
      </section>
      <section>
        <h2>Children</h2>
        <p>
          Our store is not directed at children under 13 and we do not
          knowingly collect their information.
        </p>
      </section>
      <section>
        <h2>Changes and contact</h2>
        <p>
          We may update this policy and will change the date above when we do.
          Questions? Contact {BUSINESS_LEGAL_NAME}, {BUSINESS_ADDRESS}, at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
