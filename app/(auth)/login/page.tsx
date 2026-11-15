import Link from "next/link";
import { Suspense } from "react";
import { ShieldCheck } from "reicon-react";
import BrandLogo from "@/components/shared/brand-logo";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col px-5 py-10 sm:px-6 sm:py-16">
      <div className="m-auto w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="flex justify-center" aria-label="Prime Axus home">
            <BrandLogo variant="wordmark" className="h-6" />
          </Link>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to manage your shop and orders
          </p>
        </div>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-border bg-muted/60 px-4 py-3">
          <ShieldCheck
            size={15}
            className="mt-0.5 shrink-0 text-muted-foreground"
          />
          <p className="text-xs leading-5 text-muted-foreground">
            <span className="font-medium text-foreground">
              Admin access only.
            </span>{" "}
            This sign-in is reserved for the store owner and staff. Customers
            don&apos;t need an account to shop.
          </p>
        </div>
      </div>
    </main>
  );
}
