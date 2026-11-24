import { courses, getCourseById } from "../data/courses";
import { sb, sbConfigured } from "./supabase";

const fromRow = (r) => ({
  id: r.id,
  title: r.title,
  videoUrl: r.video_url || "",
  pptUrl: r.ppt_url || "",
  homework: r.homework || "",
  position: r.position,
  approved: Boolean(r.published),
});

// Static lessons from data/courses.js (all unapproved by default) overlaid with the lessons table.
// A database row replaces a static lesson with the same id, or adds a new one.
// Unpublished database-only lessons are returned only when includeDrafts is true (admin).
export const getLessons = async (courseId, includeDrafts = false) => {
  const course = getCourseById(courseId);
  if (!course) return null;
  const base = course.lessons.map((l, i) => ({ ...l, position: i * 10 }));
  if (!sbConfigured()) return base;
  const r = await sb(`lessons?select=*&course_id=eq.${encodeURIComponent(courseId)}&order=position.asc`);
  if (!r.ok) return base;
  const rows = (await r.json()).map(fromRow);
  const byId = new Map(base.map((l) => [l.id, l]));
  rows.forEach((row) => {
    const existing = byId.get(row.id);
    if (existing) byId.set(row.id, { ...existing, ...row });
    else if (row.approved || includeDrafts) byId.set(row.id, row);
  });
  return [...byId.values()].sort((a, b) => a.position - b.position);
};

export const courseIds = () => courses.map((c) => c.id);
