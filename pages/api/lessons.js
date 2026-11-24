import { getLessons } from "../../lib/lessonsStore";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const lessons = await getLessons(String(req.query.course || ""));
  if (!lessons) return res.status(404).json({ error: "Course not found" });
  // Unapproved lessons expose only their title; the video, slides and homework are hidden until published.
  const safe = lessons.map((l) =>
    l.approved
      ? { id: l.id, title: l.title, approved: true, videoUrl: l.videoUrl, pptUrl: l.pptUrl, homework: l.homework }
      : { id: l.id, title: l.title, approved: false, videoUrl: "", pptUrl: "", homework: "" }
  );
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ lessons: safe });
}
