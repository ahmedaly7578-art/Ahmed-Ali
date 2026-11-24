-- Run once in the Supabase SQL editor. Lesson questions with replies.
create table if not exists lesson_questions (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  course_id text not null,
  lesson_id text not null,
  student_name text not null,
  question text not null,
  ip_hash text,
  reply text,
  replied_at timestamptz,
  hidden boolean not null default false
);
create index if not exists lq_ip_time on lesson_questions (ip_hash, created_at);
create index if not exists lq_lesson on lesson_questions (course_id, lesson_id);
alter table lesson_questions enable row level security;
grant all on lesson_questions to service_role;
grant usage, select on all sequences in schema public to service_role;

-- Optional course sections: a lesson can carry a section title; lessons with the same title are grouped.
alter table lessons add column if not exists section text;
