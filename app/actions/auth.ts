"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function getRequestOrigin(): Promise<string> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";

  if (host) {
    return `${protocol}://${host}`;
  }

  return process.env.NEXT_PUBLIC_SITE_URL ?? "";
}

function safeRedirectPath(value: string): string {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  return "/my-study";
}

function requireConfiguration(returnTo: string) {
  if (!isSupabaseConfigured()) {
    redirect(
      `${returnTo}?error=${encodeURIComponent(
        "Supabase is not configured yet. Add the project URL and public key to the environment.",
      )}`,
    );
  }
}

export async function signIn(formData: FormData) {
  requireConfiguration("/login");

  const email = readField(formData, "email");
  const password = readField(formData, "password");
  const redirectTo = safeRedirectPath(readField(formData, "redirectTo"));

  if (!email || !password) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Enter both your email address and password.",
      )}`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signUp(formData: FormData) {
  requireConfiguration("/signup");

  const email = readField(formData, "email");
  const password = readField(formData, "password");
  const fullName = readField(formData, "fullName");

  if (!email || !password) {
    redirect(
      `/signup?error=${encodeURIComponent(
        "Enter an email address and a password.",
      )}`,
    );
  }

  if (password.length < 8) {
    redirect(
      `/signup?error=${encodeURIComponent(
        "Use a password of at least 8 characters.",
      )}`,
    );
  }

  const origin = await getRequestOrigin();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName || null },
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (!data.session) {
    redirect(
      `/login?message=${encodeURIComponent(
        "Account created. Check your email to confirm your address, then sign in.",
      )}`,
    );
  }

  revalidatePath("/", "layout");
  redirect("/my-study");
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/");
}
