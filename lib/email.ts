// Best-effort transactional email through Resend's REST API. Does nothing unless
// RESEND_API_KEY and EMAIL_FROM are set, and never blocks or fails an order.
export async function sendEmail(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text }),
    });
  } catch {
    // ignore: email must never break checkout
  }
}
