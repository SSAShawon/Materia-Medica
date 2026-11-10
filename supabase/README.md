# Supabase setup

This directory contains the reviewable database layer for Materia Medica.

```
supabase/
├── migrations/
│   ├── 20261110000100_initial_schema.sql   # tables, indexes, triggers, auth profile
│   └── 20261110000200_rls_policies.sql     # RLS policies + table privileges
└── seed/
    └── medicines.sql                       # generated, idempotent 7-medicine upsert
```

## 1. Create or choose a Supabase project

The project needs a free or paid Supabase project. Do not reuse a project that
belongs to another application unless you are sure its `public` schema is free.

From the project dashboard collect:

- Project URL: `https://<project-ref>.supabase.co`
- Publishable key (`sb_publishable_...`) or the legacy `anon` key
- Secret key (`sb_secret_...`) or the legacy `service_role` key — **server only**

## 2. Apply the migrations

Use either the Supabase CLI:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

or paste the two migration files into the Supabase SQL editor **in filename
order**. The second file depends on the first.

The migrations are safe to re-run in a fresh project. They create:

| Table | Purpose | Public read |
| --- | --- | --- |
| `profiles` | Student/admin profile linked to `auth.users` | no |
| `medicines` | Library index + full `Medicine` JSONB | published only |
| `symptoms` | Symptom reference | published only |
| `study_notes` | Study notes | published only |
| `questions` | Question bank metadata | yes |
| `quizzes` | Quiz definitions + JSONB questions | published only |
| `bookmarks` | Per-user library bookmarks | owner only |
| `saved_questions` | Per-user saved questions | owner only |
| `quiz_attempts` | Per-user quiz history | owner only |

`is_published` is also used on `symptoms`, `study_notes` and `quizzes` so drafts
cannot leak; the source specification only required it for medicines.

The detailed medicine record is stored in `medicines.content` (JSONB) and
follows `types/medicine.ts`. There is deliberately no table per symptom section.

## 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-or-anon-key>
SUPABASE_SECRET_KEY=<secret-key>   # only needed for seeding, never NEXT_PUBLIC
```

`.env*` is gitignored (except `.env.example`). Never commit real keys.

## 4. Seed all seven medicines

```bash
npm run db:seed
```

The script:

1. validates the seven JSON files, stable IDs and unique slugs;
2. upserts on `medicines.id` (`onConflict: "id"`), so repeated runs do not
   duplicate rows;
3. reads the rows back through the **public** client, verifying that RLS and the
   public select policy allow all seven published medicines.

If you prefer SQL, `supabase/seed/medicines.sql` is generated from the same JSON
and can be pasted into the SQL editor. It contains the same upsert plus a
verification block. Regenerate it after editing any medicine:

```bash
npm run db:generate
```

The local JSON library remains the offline fallback and is never deleted. The
original `arsenicum-album.json` was preserved unchanged and is included in the
seed exactly as it exists in the repository.

## 5. Auth configuration

In Supabase → Authentication → URL Configuration:

- **Site URL**: `https://materia-medica-ten.vercel.app` (or your domain)
- **Redirect URLs**:
  - `http://localhost:3000/auth/callback`
  - `https://materia-medica-ten.vercel.app/auth/callback`
  - any Vercel preview URLs you use, for example
    `https://*-ssashawons-projects.vercel.app/auth/callback`

Email confirmation is enabled by default. The signup flow handles both cases:

- confirmation required → user is told to check email, then `/auth/callback`
  exchanges the code;
- confirmation disabled → the user is signed in immediately.

## 6. Promote an administrator

New accounts are always `student`. Promote an existing account from the SQL
editor (a trusted server context):

```sql
update public.profiles
set role = 'admin'
where email = 'owner@example.com';
```

Users cannot promote themselves: a database trigger rejects any role change made
through the API by a non-admin, and forces `student` on self-insert.

## 7. Security model

- RLS is enabled on every table.
- Anonymous users can select only published content (and the question bank).
- Only `public.is_admin()` (a `security definer` function reading
  `profiles.role`) can write educational content.
- Students can select/insert/update/delete only their own bookmarks, saved
  questions and quiz attempts.
- Students can select and update only their own profile; role and id changes are
  guarded by a trigger.
- The service/secret key is used only by `scripts/seed-medicines.mjs`, never by
  the Next.js app or the browser.
- Storage is not enabled: no current feature requires file uploads.

## 8. Verification

Run after seeding:

```bash
npm run build
npm run db:seed
```

Then open `/materia-medica`. The public library should show all seven medicines
and the home page count should read 7. If the library is empty, check that:

1. both migrations ran without error;
2. the seed used a secret/service-role key;
3. the `medicines` rows have `is_published = true`;
4. `NEXT_PUBLIC_SUPABASE_URL` and the public key are present in the deployment.

The project was verified locally against PostgreSQL 17 semantics (migrations,
seed idempotency, RLS grants, admin visibility, self-promotion guard and
bookmark ownership). It has not been applied to a live Supabase project in this
workspace; see the final report.
