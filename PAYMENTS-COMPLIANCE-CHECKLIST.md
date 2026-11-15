# Payments & Trust Checklist for Money-Handling Sites

A reusable checklist for any e-commerce site or SaaS that takes real money. Use it
**before** applying to Stripe, PayPal, Paddle, Lemon Squeezy, etc. Most rejections
and account freezes come from a handful of avoidable problems.

> Not legal advice. Have a lawyer review Terms, Privacy and refund language before
> you rely on them, especially for SaaS, subscriptions, or anything outside the US.

---

## 0. Why accounts get rejected or frozen

Processors run automated and manual risk review. They are looking for three things:

1. **Is this a real business?** (identity, address, policies, a working product)
2. **Does the site match the application?** (what you told them vs. what's live)
3. **Will customers dispute charges?** (misleading claims, unclear refunds, no support)

Anything that makes a site look like a throwaway shop gets flagged as fraud risk.

---

## 1. Top rejection triggers (fix these first)

| Trigger | Fix |
|---|---|
| Fake or unverifiable stats ("50K customers" on a new site) | Delete until true. Never hardcode numbers you can't prove. |
| Invented testimonials/reviews | Remove. Use real, attributable reviews only. Fake reviews are also illegal (FTC rules in the US). |
| Dead footer links (`href="#"`) | Every legal link must open a real, readable page. |
| Policies only in a popup/modal | Give each policy its own URL a reviewer can open. |
| Contradictory claims (30-day vs 7-day returns, "free" vs "$2" shipping) | One source of truth (a constants file). Check the whole site. |
| Placeholder text ("Lorem ipsum", "Generic / Unbranded", "Coming soon") | Remove or hide pages and products that aren't ready. |
| Selling brands you aren't authorized to sell | Only list products you can legitimately source. Trademarked brands raise counterfeit flags. |
| Claims you can't support ("100% secure", "24/7 support", "Free returns") | Say only what you actually do. |
| Business details don't match the application | Name, address, phone, website and bank account must all agree everywhere. |
| No way to contact you | Real email, phone and address on the site. Reply to messages. |
| Site is half-built or has no working purchase flow | Application should be reviewed against a finished, working site. |
| Prohibited or restricted products | Read the processor's prohibited-business list *before* building. |

---

## 2. Business identity (match everywhere)

- [ ] Legal business name (LLC/Corp/sole proprietor) shown on the site, in the footer, Terms and Privacy
- [ ] Physical address (a real one; PO boxes and virtual mailboxes get extra scrutiny)
- [ ] Business phone and support email on a **domain email** (`support@yourdomain.com`, not Gmail)
- [ ] Phone area code and address make sense together, or you can explain why not
- [ ] EIN/Tax ID (US) or equivalent, matching the bank account name
- [ ] Bank account in the business's name
- [ ] Domain age and ownership: a domain registered last week with no history is a flag; WHOIS privacy is fine, but keep ownership records
- [ ] Same name on: site, application, bank, tax ID, invoices, social profiles
- [ ] Working social profiles / presence for the brand (not required, but they help credibility)

---

## 3. Required pages and what each one must contain

Each of these needs its own URL, linked in the footer, written in plain language.

### 3.1 Privacy Policy
Required by law in many places (GDPR, CCPA/CPRA, and others) and by processors and ad platforms.

- [ ] Who you are (legal name, contact email, address)
- [ ] **What you collect:** name, email, address, order data, device/log data, cookies, analytics
- [ ] **Why you collect it** (to fulfill orders, support, security/fraud prevention, legal obligations, marketing only if you do it)
- [ ] **Who you share it with:** payment processor, hosting, email provider, shipping carriers, analytics. Name the categories
- [ ] Statement on whether you **sell or share** data (say no, if true)
- [ ] **Cookies and tracking:** what you use, and how to opt out. Add a consent banner if you serve EU/UK users or use non-essential cookies
- [ ] **Payment data:** state that card numbers are handled by the processor and never stored by you
- [ ] **Retention:** how long you keep data, and why
- [ ] **User rights:** access, correction, deletion, export, opt-out, and how to ask (email)
- [ ] **Children:** you don't knowingly collect data from under-13s (16 in some regions)
- [ ] **Security:** reasonable measures, with no absolute guarantees
- [ ] **International transfers** if data leaves the user's region
- [ ] **Changes** to the policy and a "last updated" date
- [ ] Region sections if relevant: California (CCPA), EU/UK (GDPR legal bases, DPO/contact, right to complain)

### 3.2 Terms of Service (Terms & Conditions)
The contract between you and the customer.

- [ ] Who you are and how to contact you
- [ ] What the site/service is and who may use it (age, region)
- [ ] **Orders:** an order is an offer; you can accept or cancel (stock errors, pricing errors, fraud)
- [ ] **Pricing and currency**, taxes, and when payment is taken
- [ ] **Payment methods** and any payment-processor terms that apply
- [ ] Links to Shipping and Return/Refund policies (incorporated by reference)
- [ ] **Accounts:** responsibility for credentials, right to suspend
- [ ] **Acceptable use:** no abuse, scraping, fraud, reverse engineering
- [ ] **Intellectual property:** you own the site content; the user keeps their own content
- [ ] **Disclaimers and limitation of liability** (capped to amount paid, within what the law allows)
- [ ] **Indemnification**, if appropriate
- [ ] **Termination** by either side
- [ ] **Governing law and venue** (state/country) and dispute process
- [ ] **Changes** to the terms and a "last updated" date
- [ ] **SaaS extras:** see section 4

### 3.3 Shipping / Delivery Policy (physical goods)
- [ ] Regions you ship to (and don't)
- [ ] Shipping cost (flat, free over X, calculated)
- [ ] **Processing time** (before it ships) and **transit time** (after it ships)
- [ ] Carriers used and whether tracking is provided
- [ ] What happens with delays, lost packages and damaged packages (who to contact, what proof you need)
- [ ] International: duties, taxes, customs, who pays
- [ ] Address errors and failed deliveries
- [ ] Pre-orders and backorders: say so on the product page

### 3.4 Return & Refund Policy
The most important one for dispute prevention. Be specific.

- [ ] **Return window** in days, counted from delivery
- [ ] **Condition** required (unused, original packaging)
- [ ] **How to start a return** (email, form, portal) and your response time
- [ ] **Return address** and who pays return shipping (and when you pay: defective, wrong item)
- [ ] **Refund timeline** (e.g. "within 5–10 business days") and the refund method
- [ ] **Non-returnable items** (consumables, hygiene, custom, digital, final sale)
- [ ] Exchanges
- [ ] Late or missing refunds: who to contact
- [ ] Consistent with the claims in your homepage, product pages and checkout

### 3.4b Refund policy for digital goods and SaaS
- [ ] State clearly whether refunds exist, the window, and the conditions
- [ ] Free trial: when billing starts and how to cancel before it does
- [ ] Subscription cancellation: effective at end of period? prorated? how to cancel
- [ ] Do not hide cancellation. "Hard to cancel" is a top chargeback and regulator issue

### 3.5 Contact page
- [ ] Email, phone, address, hours (only hours you keep)
- [ ] A working contact form or inbox that you actually answer
- [ ] Response-time promise you can keep

### 3.6 About page
- [ ] Who runs the business, what you sell, where you're based
- [ ] Real, verifiable information. No stock-photo "team" or invented founders

### 3.7 Other pages that help
- [ ] FAQ (shipping, returns, payments, support)
- [ ] Cookie policy / consent banner (if you use non-essential cookies, or serve EU/UK)
- [ ] Accessibility statement (nice to have)
- [ ] Sitemap page or `sitemap.xml`, plus `robots.txt` that doesn't block the policy pages

---

## 4. SaaS-specific requirements

- [ ] **Pricing page:** clear plans, currency, billing interval, what's included, taxes
- [ ] **Billing terms:** when you charge, renewals, failed payments, upgrades/downgrades, proration
- [ ] **Free trial terms:** length, what happens at the end, card required or not
- [ ] **Cancellation:** self-serve, easy to find, confirmation email, access until period end
- [ ] **Refund policy** (3.4b)
- [ ] **Acceptable Use Policy** (what users may not do with the service)
- [ ] **SLA / uptime** statement only if you can back it up
- [ ] **Data handling:** where data is stored, backups, export, and deletion on cancellation
- [ ] **Security page** (encryption in transit/at rest, access controls, incident contact)
- [ ] **DPA (Data Processing Addendum)** available on request for B2B and EU customers
- [ ] **Subprocessors list** (hosting, email, analytics, payments)
- [ ] **Support channel** and response times
- [ ] **Working product or demo** during review. A "coming soon" SaaS is the most common SaaS rejection
- [ ] Sales tax / VAT handling. Consider Merchant-of-Record services (Paddle, Lemon Squeezy, Stripe Tax) if you don't want to manage it
- [ ] **Subscription disclosures:** price, frequency and how to cancel must be clear *before* the user pays (required by law in many places, plus card-network rules)

---

## 5. Product and pricing pages

- [ ] Real product names. No "Generic", "Unbranded", "Test", or duplicate placeholders
- [ ] Accurate descriptions, photos you have rights to, correct specs
- [ ] Price, currency and shipping cost visible before checkout
- [ ] Stock status honest (don't show items you can't ship)
- [ ] No unverified claims: "best", "#1", "clinically proven", "100% safe", "guaranteed results"
- [ ] No fake urgency ("only 2 left!" timers that reset), no fake discounts (inflated "was" prices)
- [ ] Reviews and ratings come from real customers, or are not shown
- [ ] Health, pet, supplement or safety-related products have accurate claims and required labeling

---

## 6. Checkout and payment

- [ ] **HTTPS everywhere** (valid certificate, no mixed content)
- [ ] Use the processor's hosted fields / checkout, so card data never touches your server (keeps you at the simplest PCI level)
- [ ] **Never** log, store or email full card numbers or CVV
- [ ] Order total (items + shipping + tax) shown before payment, calculated **on the server**
- [ ] Prices, shipping and discounts computed **server-side**. Never trust the amount sent from the browser
- [ ] Validate quantities (positive integers, sane maximums), stock and input
- [ ] Order confirmation email with order number, items, total, policies link and support contact
- [ ] Billing descriptor on the customer's card statement should recognizably match your brand (reduces "I don't recognize this charge" disputes)
- [ ] Accepted payment methods and currency stated clearly
- [ ] Checkout works on mobile
- [ ] Test the full flow with a small real order before going live
- [ ] Webhooks: verify signatures, handle duplicates (idempotency), and update order status from the webhook, not only from the redirect
- [ ] Don't claim "secure payment" or show trust badges unless it's true and you're entitled to show them

---

## 7. Application / underwriting checklist

- [ ] Live site is finished and public (no password wall, no "under construction")
- [ ] Business description in the application **matches** what the site actually sells
- [ ] Expected monthly volume and average ticket are realistic, not inflated or tiny
- [ ] Business model and fulfillment explained honestly (dropshipping is allowed on many processors, but disclose it and show realistic shipping times)
- [ ] Supplier/fulfillment documentation available if asked (invoices, authorized reseller proof for branded goods)
- [ ] Personal ID, bank details, tax ID all match the legal entity
- [ ] Applying from a normal IP/country consistent with the business location, using the same email domain as the site
- [ ] Don't apply repeatedly with the same site after a rejection. Fix the causes, then apply once. Repeated denials count against you
- [ ] If rejected, ask for the **specific reason**, fix it, and keep records of the changes

---

## 8. After approval: avoid freezes and chargebacks

- [ ] Ship fast, send tracking, keep delivery promises
- [ ] Answer support within the time you advertise
- [ ] Refund promptly when someone is clearly right. A refund is cheaper than a chargeback
- [ ] Watch chargeback rate. Stay well under ~0.5–0.65%; card networks escalate past ~0.9–1%
- [ ] Don't suddenly change what you sell or your volume without telling the processor
- [ ] Don't run test purchases with your own cards repeatedly on the live account
- [ ] Keep records: order proof, delivery proof, customer communication, for dispute responses
- [ ] Keep the legal pages and contact details current
- [ ] Enable fraud tools (3D Secure/SCA, AVS and CVC checks, Radar or PayPal's equivalents)
- [ ] Don't hold large balances unattended. Pay out to the bank regularly
- [ ] Keep two-factor authentication on the processor account and the bank

---

## 9. Security basics for money software

These are the issues that actually sink real apps. Check them on every project.

- [ ] **Authentication on every server action and API route**, not just on the pages that call them. Page-level route guards do not protect server actions or APIs
- [ ] **Authorization:** check the user's role/ownership for every read and write
- [ ] **Public sign-up closed** for admin or internal systems; never default new users to an admin role
- [ ] Validate all input on the server (zod or similar). Treat every client value as untrusted
- [ ] Prices, totals, discounts, shipping and stock decided on the server
- [ ] Rate limit login, contact forms, checkout and any expensive endpoint
- [ ] Secrets only in environment variables; never in the repo (especially a **public** repo)
- [ ] Rotate any secret that was ever exposed, committed or pasted anywhere
- [ ] `.env` files git-ignored; mark production secrets Sensitive in the host, **and keep a copy in a password manager** (hosts can't show them again)
- [ ] Don't commit `node_modules` or build artifacts
- [ ] Webhook signature verification; replay protection
- [ ] Dependencies updated; run `npm audit` periodically
- [ ] Backups of the database, and a restore you've actually tested
- [ ] Separate dev, staging and production databases. Don't develop against production data
- [ ] Error tracking and logging that doesn't log secrets or personal data
- [ ] HTTP security headers and a sensible CORS policy
- [ ] Admin pages `noindex` and disallowed in `robots.txt`

---

## 10. Legal and tax basics (US-centric; adjust per country)

- [ ] Business entity formed (an LLC separates personal and business liability)
- [ ] EIN obtained; business bank account opened
- [ ] **Sales tax:** know where you have nexus (economic nexus thresholds by state). Collect and remit where required, or use a tax tool/MoR
- [ ] Register for a seller's permit/resale certificate if your state requires it
- [ ] **Consumer rules:** FTC rules on advertising, reviews, "Made in USA" claims, and the Mail/Internet Order Merchandise Rule (ship as promised or notify and offer a refund)
- [ ] **Subscriptions:** state auto-renewal laws and the FTC "click to cancel" direction. Make cancellation as easy as signup
- [ ] **EU/UK customers:** GDPR, cookie consent, 14-day withdrawal right for distance sales, VAT
- [ ] **CAN-SPAM / marketing email:** unsubscribe link, physical address, honest subject lines. Get consent where required
- [ ] Trademarks and copyright: only use images, names and logos you have rights to
- [ ] Industry rules (health, supplements, food, kids' products, alcohol, financial services) may need licenses or extra labeling

---

## 11. Pre-launch quick check (run through before applying)

1. [ ] Open every footer link. None go to `#` or a 404
2. [ ] Privacy, Terms, Shipping and Refund pages each have a real URL and real content
3. [ ] No fake numbers, testimonials, badges or "coming soon" sections
4. [ ] Policies agree with each other, with the homepage, and with checkout
5. [ ] Legal name, address, email and phone are on the site and match the application and bank
6. [ ] Every product is real, correctly named, correctly priced, and legitimately sourced
7. [ ] Checkout works end to end (a real small order), and the confirmation email arrives
8. [ ] Totals are calculated server-side
9. [ ] All server actions and APIs require auth where they should; admin sign-up is closed
10. [ ] HTTPS valid; secrets not in the repo; `.env` ignored
11. [ ] Support inbox monitored; contact form delivers
12. [ ] You can describe the business in two honest sentences that match the site

---

## 12. Reusable setup for a new project

- Put business facts in **one constants file** (`constants/policies.ts`): legal name, location, shipping rate and times, return window, refund time, "last updated" date. Pages, footer, checkout and marketing text all read from it, so they can't contradict each other
- Build the four legal pages from shared components on day one, even before launch
- Add a `requireAdmin()` helper and call it at the top of every admin server action
- Keep a `PAYMENTS-COMPLIANCE-CHECKLIST.md` (this file) in each project and tick it off before applying
- Store production secrets in a password manager at creation time

---

*Keep this file generic. Copy it into new projects and delete the sections that don't apply.*
