import { getLessons } from "../../lib/lessonsStore";
import { clientHash, countRecent } from "../../lib/guard";
import { sb, sbConfigured } from "../../lib/supabase";

export const config = { api: { bodyParser: { sizeLimit: "20kb" } } };

export default async function handler(req, res) {
  if (!sbConfigured()) return res.status(503).json({ error: "Questions are not set up yet." });

  // Public read: only questions that already have a reply and are not hidden.
  if (req.method === "GET") {
    const courseId = String(req.query.course || "");
    const lessonId = String(req.query.lesson || "");
    if (!courseId || !lessonId) return res.status(400).json({ error: "Missing lesson." });
    const r = await sb(
      `lesson_questions?select=id,created_at,student_name,question,reply,replied_at&course_id=eq.${encodeURIComponent(courseId)}&lesson_id=eq.${encodeURIComponent(lessonId)}&reply=not.is.null&hidden=eq.false&order=replied_at.asc&limit=100`
    );
    res.setHeader("Cache-Control", "no-store");
    if (!r.ok) return res.status(200).json({ questions: [] });
    return res.status(200).json({ questions: await r.json() });
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { courseId, lessonId, name, question, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot
  const lessons = (await getLessons(String(courseId || ""))) || [];
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson || !lesson.approved) return res.status(400).json({ error: "This lesson is not open for questions." });

  const n = String(name || "").trim();
  const q = String(question || "").trim();
  if (!n || n.length > 100) return res.status(400).json({ error: "Enter your name (up to 100 characters)." });
  if (!q || q.length > 2000) return res.status(400).json({ error: "Enter your question (up to 2000 characters)." });

  const ip = clientHash(req);
  try {
    if ((await countRecent("lesson_questions", 10, ip)) >= 3 || (await countRecent("lesson_questions", 60)) >= 200)
      return res.status(429).json({ error: "Too many questions. Try again later." });
  } catch {
    return res.status(502).json({ error: "Could not save. Try again." });
  }

  const r = await sb("lesson_questions", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ course_id: courseId, lesson_id: lessonId, student_name: n, question: q, ip_hash: ip }),
  });
  if (!r.ok) return res.status(502).json({ error: "Could not save. Try again." });
  return res.status(200).json({ ok: true });
}
