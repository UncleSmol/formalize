-- Auto-promote the first user to admin
-- If no admin exists yet, the new user becomes admin

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_count integer;
begin
  select count(*) into admin_count
  from public.profiles
  where role = 'admin' and deleted_at is null;

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    case when admin_count = 0 then 'admin' else 'customer' end
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name),
        deleted_at = null,
        updated_at = now();

  return new;
end;
$$;
