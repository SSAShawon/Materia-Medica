-- Materia Medica — initial schema
-- Run through the Supabase migration tooling (or the SQL editor) before seeding.
-- All educational content lives in `medicines` with the full Medicine record in
-- JSONB, so the schema can grow without a column per materia medica section.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Shared helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'student'
    constraint profiles_role_check check (role in ('student', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

-- Security-definer helper used by RLS. It is deliberately owned by the
-- migration role and reads profiles without invoking RLS recursively.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated, service_role;

-- Users must never be able to promote themselves. The trigger runs for API
-- writes (where auth.uid() is present) and allows trusted server-side SQL
-- (auth.uid() is null) to assign administrative roles.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    if new.role is null then
      new.role := 'student';
    end if;

    if new.role not in ('student', 'admin') then
      raise exception 'Invalid profile role' using errcode = '23514';
    end if;

    if auth.uid() is not null
       and new.role <> 'student'
       and not public.is_admin() then
      new.role := 'student';
    end if;

    return new;
  end if;

  if new.id is distinct from old.id then
    raise exception 'Profile id cannot be changed' using errcode = '42501';
  end if;

  if new.role is distinct from old.role
     and auth.uid() is not null
     and not public.is_admin() then
    raise exception 'Only administrators can change profile roles'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

revoke all on function public.protect_profile_role() from public;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role
  before insert or update on public.profiles
  for each row execute function public.protect_profile_role();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Create a profile automatically for every new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- medicines
-- ---------------------------------------------------------------------------

create table if not exists public.medicines (
  id text primary key,
  slug text not null unique,
  name text not null,
  common_name text,
  scientific_name text,
  abbreviation text,
  category text,
  content jsonb not null default '{}'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint medicines_id_format check (id ~ '^MED-[0-9]{3}$'),
  constraint medicines_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index if not exists medicines_published_idx
  on public.medicines (is_published)
  where is_published;
create index if not exists medicines_name_idx on public.medicines (name);

drop trigger if exists medicines_set_updated_at on public.medicines;
create trigger medicines_set_updated_at
  before update on public.medicines
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- symptoms
-- ---------------------------------------------------------------------------

create table if not exists public.symptoms (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text,
  description text,
  content jsonb not null default '{}'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists symptoms_category_idx on public.symptoms (category);
create index if not exists symptoms_published_idx
  on public.symptoms (is_published)
  where is_published;

drop trigger if exists symptoms_set_updated_at on public.symptoms;
create trigger symptoms_set_updated_at
  before update on public.symptoms
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- study_notes
-- ---------------------------------------------------------------------------

create table if not exists public.study_notes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text,
  content text not null default '',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists study_notes_category_idx on public.study_notes (category);
create index if not exists study_notes_published_idx
  on public.study_notes (is_published)
  where is_published;

drop trigger if exists study_notes_set_updated_at on public.study_notes;
create trigger study_notes_set_updated_at
  before update on public.study_notes
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- questions
-- ---------------------------------------------------------------------------

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  year integer check (year is null or (year between 1900 and 2100)),
  university text,
  subject text,
  paper text,
  type text,
  medicines text[] not null default '{}',
  topics text[] not null default '{}',
  difficulty text
    constraint questions_difficulty_check
    check (difficulty is null or difficulty in ('easy', 'medium', 'hard')),
  created_at timestamptz not null default now()
);

create index if not exists questions_year_idx on public.questions (year);
create index if not exists questions_university_idx on public.questions (university);
create index if not exists questions_medicines_idx on public.questions using gin (medicines);
create index if not exists questions_topics_idx on public.questions using gin (topics);

-- ---------------------------------------------------------------------------
-- quizzes
-- ---------------------------------------------------------------------------

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  questions jsonb not null default '[]'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists quizzes_category_idx on public.quizzes (category);
create index if not exists quizzes_published_idx
  on public.quizzes (is_published)
  where is_published;

-- ---------------------------------------------------------------------------
-- bookmarks
-- ---------------------------------------------------------------------------

create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  item_type text not null
    constraint bookmarks_item_type_check
    check (item_type in ('medicine', 'symptom', 'study_note', 'question', 'quiz')),
  item_id text not null,
  created_at timestamptz not null default now(),
  constraint bookmarks_unique_item unique (user_id, item_type, item_id)
);

create index if not exists bookmarks_user_idx on public.bookmarks (user_id);
create index if not exists bookmarks_item_idx
  on public.bookmarks (item_type, item_id);

-- ---------------------------------------------------------------------------
-- saved_questions
-- ---------------------------------------------------------------------------

create table if not exists public.saved_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id uuid not null references public.questions (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint saved_questions_unique unique (user_id, question_id)
);

create index if not exists saved_questions_user_idx
  on public.saved_questions (user_id);

-- ---------------------------------------------------------------------------
-- quiz_attempts
-- ---------------------------------------------------------------------------

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  score integer not null default 0 check (score >= 0),
  total_questions integer not null check (total_questions > 0),
  answers jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now(),
  constraint quiz_attempts_score_within_total check (score <= total_questions)
);

create index if not exists quiz_attempts_user_idx
  on public.quiz_attempts (user_id, completed_at desc);
create index if not exists quiz_attempts_quiz_idx on public.quiz_attempts (quiz_id);
