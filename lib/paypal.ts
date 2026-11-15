// Minimal PayPal REST client (server only). Set PAYPAL_ENV=live for production;
// anything else uses the sandbox. Credentials come from environment variables.
const BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function accessToken(): Promise<string> {
  const id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new Error("PayPal is not configured");
  const res = await fetch(`${BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Could not reach PayPal");
  return (await res.json()).access_token as string;
}

async function call<T>(
  path: string,
  method: "GET" | "POST",
  json?: unknown,
): Promise<T> {
  const token = await accessToken();
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: json !== undefined ? JSON.stringify(json) : undefined,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`PayPal request failed (${res.status})`);
  return (await res.json()) as T;
}

export async function createPaypalOrder(total: string, description: string) {
  const order = await call<{ id: string }>("/v2/checkout/orders", "POST", {
    intent: "CAPTURE",
    purchase_units: [
      {
        description: description.slice(0, 120),
        amount: { currency_code: "USD", value: total },
      },
    ],
    application_context: {
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
    },
  });
  return order.id;
}

type PaypalOrder = {
  status: string;
  purchase_units: {
    amount: { value: string; currency_code: string };
    payments?: { captures?: { amount: { value: string }; status: string }[] };
  }[];
};

export const getPaypalOrder = (id: string) =>
  call<PaypalOrder>(`/v2/checkout/orders/${encodeURIComponent(id)}`, "GET");

export const capturePaypalOrderById = (id: string) =>
  call<PaypalOrder>(
    `/v2/checkout/orders/${encodeURIComponent(id)}/capture`,
    "POST",
  );
