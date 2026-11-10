# 🩺 Materia Medica

<p align="center">
  <strong>A modern educational Materia Medica reference platform for Homeopathy and BHMS students.</strong>
</p>

<p align="center">
  <a href="https://materia-medica-ten.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Website-15A6E1?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/SSAShawon/Materia-Medica">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
</p>

---

## 📖 About The Project

**Materia Medica** is a modern educational web platform designed to provide a
structured and easy-to-navigate reference experience for **Homeopathy and BHMS
students**.

The library now contains **seven remedy profiles**, each following the same rich
TypeScript schema: basic information, drug picture, keynotes, mind, physical
generals, modalities, system-wise particulars, fever, relationships,
comparisons, quick revision and exam focus.

> **Educational use only.** The content organizes traditional Homeopathic
> Materia Medica for study and examination reference. It is not evidence-based
> medical advice, and it must not be used to delay or replace proper medical
> care.

---

## ✨ Features

- 📚 Seven structured remedy profiles
  - Arsenicum Album, Cinchona Officinalis, Cuprum Metallicum, Cephalandra Indica,
    Chamomilla, Crocus Sativus, Corallinum
- 🩺 Keynotes, guiding symptoms, mental and physical generals
- 🌡️ Modalities, causation, food and sleep, system-wise particulars
- 🔁 Remedy comparisons and relationships
- 🎓 Quick revision and examination-focused sections
- 🗂️ Supabase-ready library with JSONB medicine content
- 🔐 Supabase Authentication foundation (sign up, sign in, sign out, profile)
- 🛡️ Row Level Security policies for students and administrators
- 📱 Responsive editorial interface
- ⚡ Next.js App Router with server-side data fetching
- 🧩 Safe local JSON fallback when Supabase is not configured

---

## 🛠️ Technologies Used

### Frontend

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind" alt="Tech Stack" />
</p>

- **Next.js 16** (App Router, Proxy, Server Actions)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Geist** (self-hosted font package)

### Backend

- **Supabase PostgreSQL** with JSONB content
- **Supabase Auth** (email/password)
- **Row Level Security** and database triggers
- Official `@supabase/supabase-js` and `@supabase/ssr` clients

### Development Tools

- ESLint
- PostCSS
- npm
- Vercel

---

## 🏗️ Project Structure

```text
Materia-Medica/
│
├── app/
│   ├── materia-medica/           # Library + dynamic [slug] detail pages
│   ├── login/ signup/            # Account pages
│   ├── my-study/                 # Authenticated study desk
│   ├── auth/callback/            # Supabase email-link exchange
│   └── actions/auth.ts           # Sign in/up/out server actions
├── components/                   # Reusable UI (home, navbar, footer)
├── data/medicines/               # Seven medicine JSON records + notes
├── lib/
│   ├── medicines.ts              # Supabase-first data access with fallback
│   ├── medicines-local.ts        # Bundled local library
│   └── supabase/                 # Browser, server and public clients
├── scripts/
│   ├── generate-medicine-seed.mjs
│   └── seed-medicines.mjs
├── supabase/
│   ├── migrations/               # Schema + RLS SQL
│   └── seed/medicines.sql        # Generated idempotent seed
├── types/medicine.ts             # Shared Medicine interface
├── proxy.ts                      # Supabase session refresh
└── package.json
```

---

## 🚀 Local Development

```bash
npm install
npm run dev
```

The app works immediately without Supabase: `lib/medicines.ts` serves the
bundled JSON library and shows a small notice in the library page.

```bash
npm run build   # production build
npm run lint    # ESLint
```

### Environment variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-or-anon-key>

# Server-only, used by the seed script; never expose to the browser
SUPABASE_SECRET_KEY=<secret-key>
```

New Supabase projects use a publishable key (`sb_publishable_...`). The app also
accepts `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Legacy `anon` /
`service_role` keys continue to work through `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
`SUPABASE_SERVICE_ROLE_KEY`.

`.env*` files are gitignored except `.env.example`. No credentials are committed.

---

## 🗄️ Database and Seeding

Full instructions live in [`supabase/README.md`](supabase/README.md).

```bash
# after applying supabase/migrations/*.sql
npm run db:generate   # regenerate supabase/seed/medicines.sql from JSON
npm run db:seed       # idempotent upsert + public read-back verification
```

The seed uses stable IDs (`MED-001` … `MED-007`) and `onConflict: "id"`, so it can
be run repeatedly without duplicates. The original Arsenicum Album JSON is
preserved and seeded unchanged.

### Data flow

1. When Supabase credentials exist, the server queries published medicines from
   the database (RLS applies).
2. Without credentials, the bundled JSON library is used.
3. If the database is configured but a query fails, the library shows an empty
   state rather than silently exposing unpublished local content.

---

## 🔐 Authentication and Security

- Email/password sign up, sign in and sign out via Supabase Auth.
- Profiles are created automatically by a trigger; every new account is a
  `student`.
- A trigger blocks role self-promotion and profile-id changes.
- Students can manage only their own bookmarks, saved questions and quiz
  attempts.
- Only administrators can write educational content or see drafts.
- `NEXT_PUBLIC_*` keys are public; the secret/service-role key is used only in
  the local seed script.
- Auth session cookies are refreshed in `proxy.ts` using `@supabase/ssr`.

Admin promotion and auth redirect URL setup are documented in
[`supabase/README.md`](supabase/README.md).

---

## 📦 Vercel Deployment

The existing Vercel project `materia-medica` is linked to this repository's
`main` branch. Do **not** deploy until Supabase is configured:

1. Create/choose the Supabase project and apply the migrations.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the
   Vercel project (Production, Preview and Development).
3. Add the Supabase auth Site URL and redirect URLs.
4. Seed the medicines.
5. Deploy and verify `/materia-medica` shows seven remedies.

The `SUPABASE_SECRET_KEY` is **not** required by the deployed app; keep it out of
Vercel unless you deliberately run seeding there.

---

## ⚠️ Known limitations

- Supabase has not been provisioned in the development workspace, so the app
  currently runs on its JSON fallback and the database-backed path has only been
  verified against a local PostgreSQL-compatible engine. See the final report.
- Bookmarks/saved-question/quiz UI is a foundation: the schema, policies and
  "My Study" page exist, but there are no bookmark buttons or quiz experience
  yet.
- Pre-existing navigation links to `/symptoms`, `/study-notes`, `/exam-focus`,
  `/search` and `/question-bank` still point to pages that are not built. They
  were left untouched rather than filled with placeholder content.

---

## 📄 License

No license file is present in the repository. Content is provided for academic
and educational reference use.
