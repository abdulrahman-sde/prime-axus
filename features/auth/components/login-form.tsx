"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, EyeClosed, EyeOpen, Lock } from "reicon-react";
import { TextureButton } from "@/components/ui/texture-button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const next = searchParams.get("next") ?? "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      setError(error.message ?? "Invalid email or password");
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4"
      data-slot="login-form"
    >
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground"
        >
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

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>
        <div className="relative">
          <Lock
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 pl-10 pr-10 text-base"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? <EyeClosed size={16} /> : <EyeOpen size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <TextureButton
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
        {!loading && <ArrowRight size={16} />}
      </TextureButton>
    </form>
  );
}
