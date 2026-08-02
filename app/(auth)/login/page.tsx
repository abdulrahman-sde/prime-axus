import Link from "next/link";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col px-5 py-xl sm:px-lg sm:py-2xl">
      <div className="m-auto w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="text-2xl font-semibold text-primary">
            LuxeFrame
          </Link>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to manage your shop and orders
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
