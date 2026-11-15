import type { ReactNode } from "react";
import { POLICY_LAST_UPDATED } from "@/constants/policies";

export default function LegalPage({
  title,
  intro,
  children,
  showDate = true,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  showDate?: boolean;
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-medium tracking-tight text-foreground">
        {title}
      </h1>
      {showDate && (
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated {POLICY_LAST_UPDATED}
        </p>
      )}
      <p className="mt-6 text-base leading-7 text-foreground/90">{intro}</p>
      <div className="mt-8 space-y-8 text-sm leading-7 text-muted-foreground [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </main>
  );
}
