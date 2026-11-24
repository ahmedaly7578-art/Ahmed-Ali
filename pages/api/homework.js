import crypto from "crypto";

import { getCourseById } from "../../data/courses";
import { clientHash, countRecent } from "../../lib/guard";
import { sb, sbConfigured } from "../../lib/supabase";

export const config = { api: { bodyParser: { sizeLimit: "30kb" } } };

const isAdmin = (req) => {
  const pass = process.env.ADMIN_PASSWORD;
  const given = req.headers["x-admin-password"] || "";
  if (!pass || !given) return false;
  const a = crypto.createHash("sha256").update(String(given)).digest();
  const b = crypto.createHash("sha256").update(pass).digest();
  return crypto.timingSafeEqual(a, b);
};

export default async function handler(req, res) {
  if (!sbConfigured()) return res.status(503).json({ error: "Homework storage is not set up yet." });

  if (req.method === "GET") {
    const ip = clientHash(req);
    try {
      if ((await countRecent("admin_attempts", 15, ip)) >= 10 || (await countRecent("admin_attempts", 60)) >= 50)
        return res.status(429).json({ error: "Too many attempts. Try again later." });
    } catch {
      return res.status(502).json({ error: "Storage error" });
    }
    if (!isAdmin(req)) {
      await sb("admin_attempts", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ ip_hash: ip }) });
      await new Promise((r) => setTimeout(r, 600));
      return res.status(401).json({ error: "Unauthorized" });
    }
    const r = await sb("homework_submissions?select=*&order=created_at.desc&limit=500");
    if (!r.ok) return res.status(502).json({ error: "Storage error" });
    return res.status(200).json(await r.json());
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { courseId, lessonId, name, answer, link, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot: bots fill this
  const course = getCourseById(courseId);
  const lesson = course && course.lessons.find((l) => l.id === lessonId);
  if (!lesson || !lesson.approved) return res.status(400).json({ error: "This lesson is not open for submissions." });

  const n = String(name || "").trim();
  const a = String(answer || "").trim();
  const l = String(link || "").trim();
  if (!n || n.length > 100) return res.status(400).json({ error: "Enter your name (up to 100 characters)." });
  if (!a || a.length > 5000) return res.status(400).json({ error: "Enter your answer (up to 5000 characters)." });
  if (l && !/^https?:\/\/\S{3,500}$/.test(l)) return res.status(400).json({ error: "The link must start with http:// or https://" });

  const ip = clientHash(req);
  try {
    if ((await countRecent("homework_submissions", 10, ip)) >= 5 || (await countRecent("homework_submissions", 60)) >= 300)
      return res.status(429).json({ error: "Too many submissions. Try again later." });
  } catch {
    return res.status(502).json({ error: "Could not save. Try again." });
  }

  const r = await sb("homework_submissions", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ course_id: courseId, lesson_id: lessonId, student_name: n, answer: a, link: l || null, ip_hash: ip }),
  });
  if (!r.ok) return res.status(502).json({ error: "Could not save. Try again." });
  return res.status(200).json({ ok: true });
}
