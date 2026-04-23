-- Homestead Academy — Row Level Security
-- Every row is scoped to a household, and each household belongs to one auth user.

alter table public.households         enable row level security;
alter table public.students           enable row level security;
alter table public.grades             enable row level security;
alter table public.attendance         enable row level security;
alter table public.lesson_completions enable row level security;

-- -------------------------------------------------------------
-- Helper: does the current auth user own this household_id?
-- -------------------------------------------------------------
create or replace function public.is_household_member(hid uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.households h
    where h.id = hid and h.user_id = auth.uid()
  );
$$;

-- -------------------------------------------------------------
-- households
-- -------------------------------------------------------------
drop policy if exists "households_select_own" on public.households;
create policy "households_select_own" on public.households
  for select using (user_id = auth.uid());

drop policy if exists "households_insert_own" on public.households;
create policy "households_insert_own" on public.households
  for insert with check (user_id = auth.uid());

drop policy if exists "households_update_own" on public.households;
create policy "households_update_own" on public.households
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "households_delete_own" on public.households;
create policy "households_delete_own" on public.households
  for delete using (user_id = auth.uid());

-- -------------------------------------------------------------
-- students / grades / attendance / lesson_completions
-- All scoped by household membership.
-- -------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array['students','grades','attendance','lesson_completions']
  loop
    execute format('drop policy if exists "%1$s_select_own" on public.%1$s;', t);
    execute format('create policy "%1$s_select_own" on public.%1$s
      for select using (public.is_household_member(household_id));', t);

    execute format('drop policy if exists "%1$s_insert_own" on public.%1$s;', t);
    execute format('create policy "%1$s_insert_own" on public.%1$s
      for insert with check (public.is_household_member(household_id));', t);

    execute format('drop policy if exists "%1$s_update_own" on public.%1$s;', t);
    execute format('create policy "%1$s_update_own" on public.%1$s
      for update using (public.is_household_member(household_id))
      with check (public.is_household_member(household_id));', t);

    execute format('drop policy if exists "%1$s_delete_own" on public.%1$s;', t);
    execute format('create policy "%1$s_delete_own" on public.%1$s
      for delete using (public.is_household_member(household_id));', t);
  end loop;
end
$$;
