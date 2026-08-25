"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/constants/contact";

const linkClass =
  "text-left text-sm text-muted-foreground transition-all hover:text-foreground hover:underline";

function PolicyDialog({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger render={<button className={linkClass} />}>
        {label}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function FooterSupportLinks() {
  return (
    <>
      <Link href="/contact" className={linkClass}>
        Help Center
      </Link>

      <PolicyDialog
        label="Shipping & Delivery"
        title="Shipping Information"
        description="How orders are processed and delivered."
      >
        <p>
          Orders are processed Monday to Saturday and dispatched as quickly as
          possible.
        </p>
        <p>
          Delivery time varies by city, usually within{" "}
          <span className="font-medium text-foreground">
            2 to 5 business days
          </span>
          .
        </p>
        <p>
          For urgent inquiries, call us at{" "}
          <a
            href={CONTACT_PHONE_HREF}
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            {CONTACT_PHONE_DISPLAY}
          </a>
          .
        </p>
      </PolicyDialog>

      <PolicyDialog
        label="Returns & Exchanges"
        title="Returns Policy"
        description="How returns and exchanges work."
      >
        <p>
          We offer a{" "}
          <span className="font-medium text-foreground">
            7-day return window
          </span>{" "}
          for eligible items in original condition.
        </p>
        <p>
          To request a return, contact us with your order number at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          . Returns are reviewed within 24 hours.
        </p>
      </PolicyDialog>

      <Link href="/contact" className={linkClass}>
        Contact Us
      </Link>
    </>
  );
}
