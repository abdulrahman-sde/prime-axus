// Single source of truth for business policies. Update here and every page,
// footer and checkout message stays consistent.
export const BUSINESS_NAME = "Prime Axus";
export const BUSINESS_LOCATION = "Austin, Texas, USA";
export const POLICY_LAST_UPDATED = "November 14, 2026";

// Orders are paid online only. Keep false until a payment provider (PayPal)
// is connected; the server refuses to create orders while this is false.
export const CHECKOUT_ENABLED = false;

export const SHIPPING_FLAT_RATE = 0; // free standard shipping on every order
export const SHIPPING_PROCESSING = "1–2 business days";
export const SHIPPING_TRANSIT = "5–7 business days";
export const SHIPPING_REGION = "United States";

export const RETURN_WINDOW_DAYS = 30;
export const RETURN_RESPONSE_TIME = "2 business days";
export const REFUND_TIME = "5–10 business days";
