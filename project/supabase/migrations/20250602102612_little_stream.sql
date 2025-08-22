-- Enable Row Level Security
alter table public.patients enable row level security;
alter table public.health_data enable row level security;

-- Create patients table
create table public.patients (
    id uuid references auth.users on delete cascade not null primary key,
    name text not null,
    email text not null unique,
    age integer not null check (age > 0),
    diagnosis text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create health_data table
create table public.health_data (
    id uuid default gen_random_uuid() primary key,
    patient_id uuid references public.patients(id) on delete cascade not null,
    heart_rate integer not null check (heart_rate > 0),
    temperature decimal(4,1) not null check (temperature > 30 and temperature < 45),
    flex_request text,
    fall_status boolean default false,
    recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster queries
create index health_data_patient_id_idx on public.health_data(patient_id);
create index health_data_recorded_at_idx on public.health_data(recorded_at desc);

-- Helper function to check if a user is an admin
create or replace function public.is_admin(user_email text)
returns boolean as $$
begin
  return user_email = current_setting('app.admin_email', true);
exception
  when others then
    return false;
end;
$$ language plpgsql security definer;

-- RLS Policies for patients table
create policy "Admins can do everything"
on public.patients
as permissive
for all
to authenticated
using (is_admin(auth.jwt()->>'email'))
with check (is_admin(auth.jwt()->>'email'));

create policy "Patients can view own profile"
on public.patients
as permissive
for select
to authenticated
using (id = auth.uid());

-- RLS Policies for health_data table
create policy "Admins can view all health data"
on public.health_data
as permissive
for select
to authenticated
using (is_admin(auth.jwt()->>'email'));

create policy "Admins can insert health data"
on public.health_data
as permissive
for insert
to authenticated
with check (is_admin(auth.jwt()->>'email'));

create policy "Patients can view own health data"
on public.health_data
as permissive
for select
to authenticated
using (patient_id = auth.uid());

-- Enable realtime for health_data table
alter publication supabase_realtime add table health_data;

-- Create function to handle new health data notifications
create or replace function notify_health_data_update()
returns trigger as $$
begin
  perform pg_notify(
    'health_data_update',
    json_build_object(
      'patient_id', NEW.patient_id,
      'heart_rate', NEW.heart_rate,
      'temperature', NEW.temperature,
      'flex_request', NEW.flex_request,
      'fall_status', NEW.fall_status,
      'recorded_at', NEW.recorded_at
    )::text
  );
  return NEW;
end;
$$ language plpgsql;

-- Create trigger for health data notifications
create trigger health_data_notify
after insert on public.health_data
for each row
execute function notify_health_data_update();

-- Function to get patient's latest health data
create or replace function get_latest_health_data(p_patient_id uuid)
returns table (
    heart_rate integer,
    temperature decimal(4,1),
    flex_request text,
    fall_status boolean,
    recorded_at timestamp with time zone
) as $$
begin
    return query
    select h.heart_rate, h.temperature, h.flex_request, h.fall_status, h.recorded_at
    from health_data h
    where h.patient_id = p_patient_id
    order by h.recorded_at desc
    limit 1;
end;
$$ language plpgsql security definer;