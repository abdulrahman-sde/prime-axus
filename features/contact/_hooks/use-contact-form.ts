"use client";

import { useState } from "react";
import { CONTACT_FORM_ENDPOINT } from "@/constants/contact";

export type ContactFormStatus = "idle" | "sending" | "success" | "error";

export function useContactForm() {
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  async function submit(values: {
    name: string;
    email: string;
    message: string;
  }) {
    setStatus("sending");

    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("message", values.message);

    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(
          payload?.errors?.[0]?.message ?? "Something went wrong",
        );
      }

      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }

  function reset() {
    setStatus("idle");
  }

  return { status, submit, reset };
}
