import type { Metadata } from "next";
import Link from "next/link";

import { signUp } from "@/app/actions/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Create an account — Materia Medica",
};

interface SignupPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { error } = await searchParams;
  const configured = isSupabaseConfigured();

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-0 border border-border bg-white lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="bg-forest-950 p-10 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-400">
            Create an Account
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Build a study record as you learn.
          </h1>

          <p className="mt-5 text-sm leading-7 text-white/60">
            A student account keeps your personal study tools together. It
            does not change the educational nature of the library.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-white/55">
            <li>→ Your own bookmarks</li>
            <li>→ Saved exam questions</li>
            <li>→ Private quiz history</li>
          </ul>

          <p className="mt-10 border-t border-white/10 pt-5 text-xs leading-6 text-white/35">
            New accounts receive the student role. Administrative access is
            granted only by the project owner through the database.
          </p>
        </aside>

        <section className="p-8 sm:p-12">
          <h2 className="text-2xl font-semibold text-forest-950">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-text-secondary">
            Use at least 8 characters for your password.
          </p>

          {!configured && (
            <div className="mt-6 border-l-4 border-gold-500 bg-sage-100 p-4 text-sm leading-6 text-text-secondary">
              Authentication is not configured. Add{" "}
              <code className="text-forest-950">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
              and{" "}
              <code className="text-forest-950">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </code>{" "}
              to enable accounts.
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mt-6 border-l-4 border-rose-400 bg-rose-300/15 p-4 text-sm leading-6 text-text-primary"
            >
              {error}
            </div>
          )}

          <form action={signUp} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="text-xs uppercase tracking-[0.12em] text-text-secondary"
              >
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                className="mt-2 w-full border border-border bg-ivory-50 px-4 py-3 text-sm text-forest-950 outline-none transition focus:border-forest-800"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.12em] text-text-secondary"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-2 w-full border border-border bg-ivory-50 px-4 py-3 text-sm text-forest-950 outline-none transition focus:border-forest-800"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.12em] text-text-secondary"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="mt-2 w-full border border-border bg-ivory-50 px-4 py-3 text-sm text-forest-950 outline-none transition focus:border-forest-800"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-forest-950 bg-forest-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-forest-900"
            >
              Create account
            </button>
          </form>

          <p className="mt-8 text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-forest-800 underline decoration-gold-500 underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
