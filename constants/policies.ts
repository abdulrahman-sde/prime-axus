// Single source of truth for business policies. Update here and every page,
// footer and checkout message stays consistent.
export const BUSINESS_NAME = "Prime Axus";
export const BUSINESS_LOCATION = "Austin, Texas, USA";
// Fill these in once you have them; they appear in the footer, About and Terms.
// Payment processors expect the legal entity and address to match your records.
export const BUSINESS_LEGAL_NAME = "Prime Axis Trading LLC";
export const BUSINESS_ADDRESS = "5900 Balcones Drive, STE 100, Austin, TX 78731, USA";
export const POLICY_LAST_UPDATED = "November 14, 2026";

// Orders are paid online only. Checkout turns on automatically once the
// PayPal client id is configured (NEXT_PUBLIC_PAYPAL_CLIENT_ID).
export const CHECKOUT_ENABLED = Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);

export const SHIPPING_FLAT_RATE = 0; // free standard shipping on every order
export const SHIPPING_PROCESSING = "1–2 business days";
export const SHIPPING_TRANSIT = "5–7 business days";
export const SHIPPING_REGION = "United States";

export const RETURN_WINDOW_DAYS = 30;
export const RETURN_RESPONSE_TIME = "2 business days";
export const REFUND_TIME = "5–10 business days";
