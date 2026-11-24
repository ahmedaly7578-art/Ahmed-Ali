-- Run once in the Supabase SQL editor.
create table if not exists homework_submissions (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  course_id text not null,
  lesson_id text not null,
  student_name text not null,
  answer text not null,
  link text,
  ip_hash text
);
create table if not exists admin_attempts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  ip_hash text not null
);
create index if not exists hs_ip_time on homework_submissions (ip_hash, created_at);
create index if not exists aa_ip_time on admin_attempts (ip_hash, created_at);
-- Row level security on with no policies: the public (anon) key can do nothing.
-- Only the server-side service key used by the API route can read/write.
alter table homework_submissions enable row level security;
alter table admin_attempts enable row level security;
