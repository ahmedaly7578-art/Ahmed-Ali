-- Run once in the Supabase SQL editor.
create table if not exists lessons (
  course_id text not null,
  id text not null,
  title text not null,
  video_url text,
  ppt_url text,
  homework text,
  position int not null default 0,
  published boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (course_id, id)
);
create table if not exists homework_submissions (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  course_id text not null,
  lesson_id text not null,
  student_name text not null,
  answer text not null,
  link text,
  ip_hash text,
  reviewed boolean not null default false,
  feedback text,
  reviewed_at timestamptz
);
create table if not exists admin_attempts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  ip_hash text not null
);
create index if not exists hs_ip_time on homework_submissions (ip_hash, created_at);
create index if not exists aa_ip_time on admin_attempts (ip_hash, created_at);
-- Row level security on with no policies: the public (anon) key can do nothing.
-- Only the server-side service key used by the API routes can read/write.
alter table lessons enable row level security;
alter table homework_submissions enable row level security;
alter table admin_attempts enable row level security;
grant all on lessons, homework_submissions, admin_attempts to service_role;
grant usage, select on all sequences in schema public to service_role;
