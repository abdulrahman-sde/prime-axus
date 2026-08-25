"use client";

import { useState } from "react";
import { ArrowRight, Check } from "reicon-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TextureButton } from "@/components/ui/texture-button";
import { useContactForm } from "../_hooks/use-contact-form";

export default function ContactForm() {
  const { status, submit, reset } = useContactForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const ok = await submit({ name, email, message });

    if (ok) {
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent — we'll get back to you soon.");
    } else {
      toast.error("Couldn't send your message. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-8 text-center shadow-xs sm:p-10">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-tertiary/10">
          <Check size={18} className="text-tertiary" />
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">
            Message sent
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Thanks for reaching out — we&apos;ll reply within one business
            day.
          </p>
        </div>
        <TextureButton variant="secondary" size="sm" onClick={reset}>
          Send another message
        </TextureButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-8"
      data-slot="contact-form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <Input
            id="name"
            type="text"
            required
            placeholder="Jane Cooper"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 px-3.5 text-base"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 px-3.5 text-base"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <Textarea
          id="message"
          required
          rows={6}
          placeholder="How can we help?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="px-3.5 py-3 text-base"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive" role="alert">
          Something went wrong while sending. Please try again.
        </p>
      )}

      <TextureButton
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        {status !== "sending" && <ArrowRight size={16} />}
      </TextureButton>

      <p className="text-xs leading-5 text-muted-foreground">
        We&apos;ll get back to you within one business day.
      </p>
    </form>
  );
}
