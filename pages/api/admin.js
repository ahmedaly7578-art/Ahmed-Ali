import { courseIds, getLessons } from "../../lib/lessonsStore";
import { authAdmin } from "../../lib/guard";
import { sb, sbConfigured } from "../../lib/supabase";

export const config = { api: { bodyParser: { sizeLimit: "30kb" } } };

const httpUrl = (v) => /^https?:\/\/\S{3,500}$/.test(v);

// Turn a normal YouTube link into its embed form; leave other https links (e.g. .mp4) as they are.
const normalizeVideo = (raw) => {
  const v = String(raw || "").trim();
  if (!v) return "";
  const m = v.match(/^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  return httpUrl(v) ? v : null;
};

const clean = (v, max) => String(v || "").trim().slice(0, max);

export default async function handler(req, res) {
  if (!sbConfigured()) return res.status(503).json({ error: "Storage is not set up yet." });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!(await authAdmin(req, res))) return;

  const b = req.body || {};
  try {
    if (b.action === "list") {
      const out = {};
      for (const id of courseIds()) out[id] = await getLessons(id, true);
      const r = await sb("homework_submissions?select=id,created_at,course_id,lesson_id,student_name,answer,link,reviewed,feedback,reviewed_at&order=created_at.desc&limit=500");
      if (!r.ok) return res.status(502).json({ error: "Storage error" });
      return res.status(200).json({ lessons: out, submissions: await r.json() });
    }

    if (b.action === "saveLesson") {
      if (!courseIds().includes(b.courseId)) return res.status(400).json({ error: "Unknown course." });
      const id = clean(b.id, 60).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
      const title = clean(b.title, 200);
      if (!id || !title) return res.status(400).json({ error: "Lesson id and title are required." });
      const video = normalizeVideo(b.videoUrl);
      if (video === null) return res.status(400).json({ error: "Video link must start with http:// or https://" });
      const ppt = clean(b.pptUrl, 500);
      if (ppt && !httpUrl(ppt)) return res.status(400).json({ error: "Slides link must start with http:// or https://" });
      const row = {
        course_id: b.courseId, id, title, video_url: video || null, ppt_url: ppt || null,
        homework: clean(b.homework, 3000) || null, position: Number.isFinite(+b.position) ? Math.trunc(+b.position) : 0,
        published: b.published === true, updated_at: new Date().toISOString(),
      };
      const r = await sb("lessons?on_conflict=course_id,id", {
        method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(row),
      });
      if (!r.ok) return res.status(502).json({ error: "Could not save the lesson." });
      return res.status(200).json({ ok: true, id });
    }

    if (b.action === "deleteLesson") {
      const r = await sb(`lessons?course_id=eq.${encodeURIComponent(b.courseId)}&id=eq.${encodeURIComponent(b.id)}`, { method: "DELETE" });
      return r.ok ? res.status(200).json({ ok: true }) : res.status(502).json({ error: "Could not delete." });
    }

    if (b.action === "review") {
      const sid = parseInt(b.id, 10);
      if (!sid) return res.status(400).json({ error: "Bad submission id." });
      const reviewed = b.reviewed === true;
      const r = await sb(`homework_submissions?id=eq.${sid}`, {
        method: "PATCH", headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ feedback: clean(b.feedback, 5000) || null, reviewed, reviewed_at: reviewed ? new Date().toISOString() : null }),
      });
      return r.ok ? res.status(200).json({ ok: true }) : res.status(502).json({ error: "Could not save the review." });
    }

    if (b.action === "deleteSubmission") {
      const sid = parseInt(b.id, 10);
      if (!sid) return res.status(400).json({ error: "Bad submission id." });
      const r = await sb(`homework_submissions?id=eq.${sid}`, { method: "DELETE" });
      return r.ok ? res.status(200).json({ ok: true }) : res.status(502).json({ error: "Could not delete." });
    }
  } catch {
    return res.status(502).json({ error: "Storage error" });
  }
  return res.status(400).json({ error: "Unknown action." });
}
