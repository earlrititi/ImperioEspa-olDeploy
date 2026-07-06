grant usage on schema public to anon, authenticated, service_role;

grant select, update on public.profiles to authenticated;
grant select on public.subscriptions to authenticated;

grant all on public.profiles to service_role;
grant all on public.subscriptions to service_role;
grant usage, select on all sequences in schema public to service_role;
