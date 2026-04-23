-- Homestead Academy — initial schema
-- Run in Supabase SQL editor, or via `supabase db push`.

-- =============================================================
-- Extensions
-- =============================================================
create extension if not exists "uuid-ossp";

-- =============================================================
-- households
-- One row per signed-up family. Each auth user owns exactly one.
-- =============================================================
create table if not exists public.households (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null unique references auth.users(id) on delete cascade,
  name          text not null default 'Our Household',
  verse         text default 'Train up a child in the way he should go — Proverbs 22:6',
  region_id     text not null default 'US',
  streak_days   int  not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists households_user_id_idx on public.households(user_id);

-- =============================================================
-- students
-- =============================================================
create table if not exists public.students (
  id            uuid primary key default uuid_generate_v4(),
  household_id  uuid not null references public.households(id) on delete cascade,
  name          text not null,
  age           int,
  grade         text,
  grade_level   int,
  avatar        text,
  color         text,
  birth_year    int,
  start_date    date,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists students_household_id_idx on public.students(household_id);

-- =============================================================
-- grades
-- One row per recorded score. Ordered by created_at for trend/avg.
-- =============================================================
create table if not exists public.grades (
  id            uuid primary key default uuid_generate_v4(),
  household_id  uuid not null references public.households(id) on delete cascade,
  student_id    uuid not null references public.students(id) on delete cascade,
  subject       text not null,
  score         numeric not null check (score >= 0 and score <= 100),
  created_at    timestamptz not null default now()
);

create index if not exists grades_student_subject_idx
  on public.grades(student_id, subject, created_at desc);
create index if not exists grades_household_id_idx on public.grades(household_id);

-- =============================================================
-- attendance
-- =============================================================
create table if not exists public.attendance (
  id            uuid primary key default uuid_generate_v4(),
  household_id  uuid not null references public.households(id) on delete cascade,
  student_id    uuid not null references public.students(id) on delete cascade,
  date          date not null,
  status        text not null check (status in ('present','absent','half','holiday')),
  note          text,
  created_at    timestamptz not null default now(),
  unique (student_id, date)
);

create index if not exists attendance_household_id_idx on public.attendance(household_id);

-- =============================================================
-- lesson_completions
-- =============================================================
create table if not exists public.lesson_completions (
  id            uuid primary key default uuid_generate_v4(),
  household_id  uuid not null references public.households(id) on delete cascade,
  student_id    uuid not null references public.students(id) on delete cascade,
  lesson_id     text not null,
  subject       text,
  score         numeric check (score >= 0 and score <= 100),
  completed_at  timestamptz not null default now(),
  unique (student_id, lesson_id)
);

create index if not exists lesson_completions_student_idx
  on public.lesson_completions(student_id, completed_at desc);
create index if not exists lesson_completions_household_id_idx
  on public.lesson_completions(household_id);

-- =============================================================
-- updated_at trigger
-- =============================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists households_touch_updated_at on public.households;
create trigger households_touch_updated_at
  before update on public.households
  for each row execute function public.touch_updated_at();

drop trigger if exists students_touch_updated_at on public.students;
create trigger students_touch_updated_at
  before update on public.students
  for each row execute function public.touch_updated_at();
