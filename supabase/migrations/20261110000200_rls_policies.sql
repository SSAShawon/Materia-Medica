-- Materia Medica — Row Level Security
-- Principles:
--   * Published educational content is publicly readable.
--   * Draft/unpublished content and all content writes are admin-only.
--   * Students can touch only their own profile, bookmarks, saved questions
--     and quiz attempts.
--   * Roles come from public.profiles, never from client-supplied data.

-- ---------------------------------------------------------------------------
-- Enable RLS
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.medicines enable row level security;
alter table public.symptoms enable row level security;
alter table public.study_notes enable row level security;
alter table public.questions enable row level security;
alter table public.quizzes enable row level security;
alter table public.bookmarks enable row level security;
alter table public.saved_questions enable row level security;
alter table public.quiz_attempts enable row level security;

-- ---------------------------------------------------------------------------
-- Table privileges (RLS still filters every row)
-- ---------------------------------------------------------------------------

revoke all on public.profiles from anon;
revoke all on public.medicines from anon;
revoke all on public.symptoms from anon;
revoke all on public.study_notes from anon;
revoke all on public.questions from anon;
revoke all on public.quizzes from anon;
revoke all on public.bookmarks from anon;
revoke all on public.saved_questions from anon;
revoke all on public.quiz_attempts from anon;

grant usage on schema public to anon, authenticated;

grant select on public.medicines, public.symptoms, public.study_notes,
  public.questions, public.quizzes to anon, authenticated;

grant select, insert, update, delete on public.medicines, public.symptoms,
  public.study_notes, public.questions, public.quizzes to authenticated;

grant select, insert, update on public.profiles to authenticated;

grant select, insert, update, delete on public.bookmarks,
  public.saved_questions, public.quiz_attempts to authenticated;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

drop policy if exists "Profiles are visible to their owner or admins" on public.profiles;
create policy "Profiles are visible to their owner or admins"
  on public.profiles
  for select
  to authenticated
  using (
    id = (select auth.uid())
    or (select public.is_admin())
  );

drop policy if exists "Users can create only their own profile" on public.profiles;
create policy "Users can create only their own profile"
  on public.profiles
  for insert
  to authenticated
  with check (id = (select auth.uid()));

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (
    id = (select auth.uid())
    or (select public.is_admin())
  )
  with check (
    id = (select auth.uid())
    or (select public.is_admin())
  );

drop policy if exists "Admins can delete profiles" on public.profiles;
create policy "Admins can delete profiles"
  on public.profiles
  for delete
  to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- medicines
-- ---------------------------------------------------------------------------

drop policy if exists "Published medicines are publicly readable" on public.medicines;
create policy "Published medicines are publicly readable"
  on public.medicines
  for select
  to anon, authenticated
  using (
    is_published
    or (select public.is_admin())
  );

drop policy if exists "Admins can insert medicines" on public.medicines;
create policy "Admins can insert medicines"
  on public.medicines
  for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update medicines" on public.medicines;
create policy "Admins can update medicines"
  on public.medicines
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete medicines" on public.medicines;
create policy "Admins can delete medicines"
  on public.medicines
  for delete
  to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- symptoms
-- ---------------------------------------------------------------------------

drop policy if exists "Published symptoms are publicly readable" on public.symptoms;
create policy "Published symptoms are publicly readable"
  on public.symptoms
  for select
  to anon, authenticated
  using (is_published or (select public.is_admin()));

drop policy if exists "Admins can insert symptoms" on public.symptoms;
create policy "Admins can insert symptoms"
  on public.symptoms
  for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update symptoms" on public.symptoms;
create policy "Admins can update symptoms"
  on public.symptoms
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete symptoms" on public.symptoms;
create policy "Admins can delete symptoms"
  on public.symptoms
  for delete
  to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- study_notes
-- ---------------------------------------------------------------------------

drop policy if exists "Published study notes are publicly readable" on public.study_notes;
create policy "Published study notes are publicly readable"
  on public.study_notes
  for select
  to anon, authenticated
  using (is_published or (select public.is_admin()));

drop policy if exists "Admins can insert study notes" on public.study_notes;
create policy "Admins can insert study notes"
  on public.study_notes
  for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update study notes" on public.study_notes;
create policy "Admins can update study notes"
  on public.study_notes
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete study notes" on public.study_notes;
create policy "Admins can delete study notes"
  on public.study_notes
  for delete
  to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- questions
-- ---------------------------------------------------------------------------

drop policy if exists "Question bank is publicly readable" on public.questions;
create policy "Question bank is publicly readable"
  on public.questions
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can insert questions" on public.questions;
create policy "Admins can insert questions"
  on public.questions
  for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update questions" on public.questions;
create policy "Admins can update questions"
  on public.questions
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete questions" on public.questions;
create policy "Admins can delete questions"
  on public.questions
  for delete
  to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- quizzes
-- ---------------------------------------------------------------------------

drop policy if exists "Published quizzes are publicly readable" on public.quizzes;
create policy "Published quizzes are publicly readable"
  on public.quizzes
  for select
  to anon, authenticated
  using (is_published or (select public.is_admin()));

drop policy if exists "Admins can insert quizzes" on public.quizzes;
create policy "Admins can insert quizzes"
  on public.quizzes
  for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can update quizzes" on public.quizzes;
create policy "Admins can update quizzes"
  on public.quizzes
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete quizzes" on public.quizzes;
create policy "Admins can delete quizzes"
  on public.quizzes
  for delete
  to authenticated
  using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- bookmarks
-- ---------------------------------------------------------------------------

drop policy if exists "Users manage their own bookmarks" on public.bookmarks;
create policy "Users manage their own bookmarks"
  on public.bookmarks
  for all
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ---------------------------------------------------------------------------
-- saved_questions
-- ---------------------------------------------------------------------------

drop policy if exists "Users manage their own saved questions" on public.saved_questions;
create policy "Users manage their own saved questions"
  on public.saved_questions
  for all
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- ---------------------------------------------------------------------------
-- quiz_attempts
-- ---------------------------------------------------------------------------

drop policy if exists "Users manage their own quiz attempts" on public.quiz_attempts;
create policy "Users manage their own quiz attempts"
  on public.quiz_attempts
  for all
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
