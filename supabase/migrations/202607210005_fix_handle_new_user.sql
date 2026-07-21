-- Fix handle_new_user: remove admin_count query causing 500 on signup
-- Use NOT EXISTS instead of SELECT COUNT(*) to avoid potential race/deadlock

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    case
      when not exists (select 1 from public.profiles where role = 'admin' and deleted_at is null)
      then 'admin'
      else 'customer'
    end
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name),
        deleted_at = null,
        updated_at = now();

  return new;
end;
$$;
