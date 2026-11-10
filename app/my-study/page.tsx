import type { Metadata } from "next";
import Link from "next/link";

import { signOut } from "@/app/actions/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "My Study — Materia Medica",
};

// Authentication state is request-specific, so this page must not be cached.
export const dynamic = "force-dynamic";

interface BookmarkRow {
  id: string;
  item_type: string;
  item_id: string;
  created_at: string;
}

interface ProfileRow {
  full_name: string | null;
  email: string | null;
  role: string | null;
}

export default async function MyStudyPage() {
  const configured = isSupabaseConfigured();

  let user: { id: string; email?: string } | null = null;
  let profile: ProfileRow | null = null;
  let bookmarks: BookmarkRow[] = [];
  let bookmarkCount = 0;
  let savedQuestionCount = 0;
  let quizAttemptCount = 0;
  let tablesAvailable = true;
  let loadError: string | null = null;

  if (configured) {
    try {
      const supabase = await createClient();
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      user = currentUser;

      if (currentUser) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, email, role")
          .eq("id", currentUser.id)
          .maybeSingle();

        if (profileError) {
          loadError = profileError.message;
        } else {
          profile = profileData as ProfileRow | null;
        }

        const {
          data: bookmarkData,
          error: bookmarkError,
          count: bookmarkTotal,
        } = await supabase
          .from("bookmarks")
          .select("id, item_type, item_id, created_at", { count: "exact" })
          .order("created_at", { ascending: false })
          .limit(20);

        if (bookmarkError) {
          tablesAvailable = false;
          loadError = bookmarkError.message;
        } else {
          bookmarks = (bookmarkData ?? []) as BookmarkRow[];
          bookmarkCount = bookmarkTotal ?? bookmarks.length;
        }

        const { count: savedCount } = await supabase
          .from("saved_questions")
          .select("*", { count: "exact", head: true });

        const { count: attemptCount } = await supabase
          .from("quiz_attempts")
          .select("*", { count: "exact", head: true });

        savedQuestionCount = savedCount ?? 0;
        quizAttemptCount = attemptCount ?? 0;
      }
    } catch (error) {
      loadError =
        error instanceof Error ? error.message : "Could not load your account.";
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-500">
          My Study
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-forest-950 sm:text-5xl">
          Your study desk
        </h1>

        {!configured && (
          <section className="mt-10 border border-border bg-white p-8">
            <h2 className="text-xl font-semibold text-forest-950">
              Accounts are not configured yet
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
              The study library works without an account. To activate student
              accounts, set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, apply the Supabase
              migrations, and redeploy.
            </p>

            <Link
              href="/materia-medica"
              className="mt-6 inline-flex border border-forest-950 px-5 py-3 text-sm font-medium text-forest-950 transition-colors hover:bg-forest-950 hover:text-white"
            >
              Browse the library
            </Link>
          </section>
        )}

        {configured && !user && (
          <section className="mt-10 border border-border bg-white p-8">
            <h2 className="text-xl font-semibold text-forest-950">
              Sign in to keep your study tools
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
              Bookmarks, saved questions and quiz history are stored against
              your account. You can keep reading the library without signing
              in.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="border border-forest-950 bg-forest-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-forest-900"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="border border-forest-950 px-5 py-3 text-sm font-medium text-forest-950 transition-colors hover:bg-forest-950 hover:text-white"
              >
                Create an account
              </Link>
            </div>
          </section>
        )}

        {configured && user && (
          <div className="mt-10 space-y-8">
            <section className="flex flex-col justify-between gap-6 border border-border bg-white p-8 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-text-secondary">
                  Signed in as
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-forest-950">
                  {profile?.full_name || "Student"}
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  {profile?.email ?? user.email}
                </p>
                <p className="mt-3 inline-flex bg-sage-100 px-3 py-1 text-xs text-forest-900">
                  Role: {profile?.role ?? "student"}
                </p>
              </div>

              <form action={signOut}>
                <button
                  type="submit"
                  className="border border-border px-5 py-2.5 text-sm font-medium text-forest-950 transition-colors hover:border-forest-800"
                >
                  Sign out
                </button>
              </form>
            </section>

            {loadError && (
              <div className="border-l-4 border-rose-400 bg-rose-300/15 p-5 text-sm leading-6 text-text-primary">
                <p className="font-semibold">Some study data could not load.</p>
                <p className="mt-1 text-text-secondary">{loadError}</p>
                {!tablesAvailable && (
                  <p className="mt-2 text-text-secondary">
                    Apply the migrations in{" "}
                    <code>supabase/migrations</code> to create the study
                    tables.
                  </p>
                )}
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="border border-border bg-white p-6">
                <p className="text-xs uppercase tracking-[0.15em] text-text-secondary">
                  Bookmarks
                </p>
                <p className="mt-3 text-4xl font-semibold text-forest-950">
                  {bookmarkCount}
                </p>
              </div>

              <div className="border border-border bg-white p-6">
                <p className="text-xs uppercase tracking-[0.15em] text-text-secondary">
                  Saved questions
                </p>
                <p className="mt-3 text-4xl font-semibold text-forest-950">
                  {savedQuestionCount}
                </p>
              </div>

              <div className="border border-border bg-white p-6">
                <p className="text-xs uppercase tracking-[0.15em] text-text-secondary">
                  Quiz attempts
                </p>
                <p className="mt-3 text-4xl font-semibold text-forest-950">
                  {quizAttemptCount}
                </p>
              </div>
            </div>

            <section className="border border-border bg-white p-8">
              <h2 className="text-xl font-semibold text-forest-950">
                Recent bookmarks
              </h2>

              {bookmarks.length > 0 ? (
                <ul className="mt-5 divide-y divide-border">
                  {bookmarks.map((bookmark) => (
                    <li
                      key={bookmark.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-4"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-gold-500">
                          {bookmark.item_type.replaceAll("_", " ")}
                        </p>
                        <p className="mt-1 text-sm text-forest-950">
                          {bookmark.item_id}
                        </p>
                      </div>

                      {bookmark.item_type === "medicine" && (
                        <Link
                          href={`/materia-medica/${bookmark.item_id}`}
                          className="text-sm font-medium text-forest-800 hover:text-gold-500"
                        >
                          Open remedy →
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-7 text-text-secondary">
                  No bookmarks yet. Bookmarking controls will appear as the
                  study tools are built out; the table and security policies
                  are ready for them.
                </p>
              )}
            </section>

            <p className="text-xs leading-6 text-text-secondary">
              Quiz history and saved-question detail will appear here once the
              question bank and quiz experience are connected. No placeholder
              results are shown.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
