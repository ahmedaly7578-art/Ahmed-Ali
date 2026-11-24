import Head from "next/head";
import { useState } from "react";

const field = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-accent";
const btn = "px-4 py-2 rounded-lg text-sm bg-accent text-white disabled:opacity-50";
const btn2 = "px-4 py-2 rounded-lg text-sm border border-white/20 hover:border-accent";

const blank = (courseId) => ({ courseId, id: "", title: "", videoUrl: "", pptUrl: "", homework: "", section: "", position: 0, published: false, isNew: true });

const Admin = () => {
  const [pw, setPw] = useState("");
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("lessons");
  const [msg, setMsg] = useState("");
  const [edit, setEdit] = useState(null);
  const [fb, setFb] = useState({});
  const [qr, setQr] = useState({});

  const call = async (body, password = pw) => {
    const r = await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-password": password }, body: JSON.stringify(body) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(d.error || "Error");
    return d;
  };
  const reload = async (password) => setData(await call({ action: "list" }, password));

  const login = async (e) => {
    e.preventDefault();
    setMsg("");
    try { await reload(pw); } catch (err) { setMsg(err.message); }
  };

  const saveLesson = async (lesson, published) => {
    setMsg("");
    try {
      await call({ action: "saveLesson", ...lesson, published });
      setMsg(published ? "Saved and published." : "Saved as draft (not visible to students).");
      setEdit(null);
      await reload();
    } catch (err) { setMsg(err.message); }
  };

  const review = async (s, reviewed) => {
    setMsg("");
    try {
      const feedback = fb[s.id] !== undefined ? fb[s.id] : s.feedback || "";
      await call({ action: "review", id: s.id, feedback, reviewed });
      setMsg("Review saved.");
      await reload();
    } catch (err) { setMsg(err.message); }
  };

  const replyQ = async (q, hidden) => {
    setMsg("");
    try {
      const reply = qr[q.id] !== undefined ? qr[q.id] : q.reply || "";
      await call({ action: "replyQuestion", id: q.id, reply, hidden });
      setMsg(reply.trim() ? (hidden ? "Reply saved (hidden from students)." : "Reply saved. Students can now see this question and answer.") : "Reply cleared. The question is hidden from students.");
      await reload();
    } catch (err) { setMsg(err.message); }
  };

  const delQ = async (q) => {
    if (!window.confirm("Delete this question?")) return;
    try { await call({ action: "deleteQuestion", id: q.id }); await reload(); } catch (err) { setMsg(err.message); }
  };

  const del = async (s) => {
    if (!window.confirm("Delete this submission?")) return;
    try { await call({ action: "deleteSubmission", id: s.id }); await reload(); } catch (err) { setMsg(err.message); }
  };

  const delLesson = async (courseId, id) => {
    if (!window.confirm("Delete this lesson from the database?")) return;
    try { await call({ action: "deleteLesson", courseId, id }); await reload(); } catch (err) { setMsg(err.message); }
  };

  return (
    <div className="course-shell flex flex-col bg-primary/30">
      <div className="shrink-0 h-[190px] lg:h-[110px]" />
      <div className="flex-1 min-h-0 course-scroll overflow-y-auto overflow-x-hidden relative">
      <Head><title>Admin</title><meta name="robots" content="noindex,nofollow" /></Head>
      <div className="container mx-auto max-w-[900px] relative z-10 pb-16">
        <h2 className="h2">Course admin<span className="text-accent">.</span></h2>
        {!data && (
          <form onSubmit={login} className="flex gap-x-3 mt-6">
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Admin password" className={field} />
            <button className={btn}>Open</button>
          </form>
        )}
        {msg && <p className="mt-4 text-sm text-accent">{msg}</p>}

        {data && (
          <>
            <div className="flex gap-x-3 mt-6">
              <button onClick={() => setTab("lessons")} className={tab === "lessons" ? btn : btn2}>Lessons</button>
              <button onClick={() => setTab("homework")} className={tab === "homework" ? btn : btn2}>
                Homework ({data.submissions.filter((s) => !s.reviewed).length} new)
              </button>
              <button onClick={() => setTab("questions")} className={tab === "questions" ? btn : btn2}>
                Questions ({(data.questions || []).filter((q) => !q.reply).length} new)
              </button>
            </div>

            {tab === "lessons" && !edit && Object.entries(data.lessons).map(([courseId, lessons]) => (
              <div key={courseId} className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg">{courseId}</h3>
                  <button className={btn} onClick={() => setEdit(blank(courseId))}>Add lesson</button>
                </div>
                <div className="flex flex-col gap-y-2">
                  {lessons.map((l) => (
                    <div key={l.id} className="border border-white/10 rounded-xl bg-white/5 p-4 text-sm flex items-center justify-between gap-x-3">
                      <div>
                        <div>{l.title}{l.section ? <span className="text-white/40"> · {l.section}</span> : null}</div>
                        <div className={l.approved ? "text-green-400" : "text-white/40"}>{l.approved ? "Published" : "Not published"}{l.videoUrl ? " · has video" : " · no video"}</div>
                      </div>
                      <div className="flex gap-x-2">
                        <button className={btn2} onClick={() => setEdit({ courseId, ...l, published: l.approved })}>Edit</button>
                        <button className={btn2} onClick={() => delLesson(courseId, l.id)}>Reset</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {tab === "lessons" && edit && (
              <div className="mt-6 flex flex-col gap-y-3">
                <h3 className="text-lg">{edit.isNew ? "New lesson" : "Edit lesson"}</h3>
                {edit.isNew && <input className={field} placeholder="Lesson id (letters, numbers, dashes), e.g. lesson-4" value={edit.id} onChange={(e) => setEdit({ ...edit, id: e.target.value })} />}
                <input className={field} placeholder="Title" value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
                <input className={field} placeholder="Video link (YouTube link or .mp4 link)" value={edit.videoUrl} onChange={(e) => setEdit({ ...edit, videoUrl: e.target.value })} />
                <input className={field} placeholder="Slides link (optional)" value={edit.pptUrl} onChange={(e) => setEdit({ ...edit, pptUrl: e.target.value })} />
                <input className={field} list="section-names" placeholder="Section title (optional), e.g. Part 1: Fundamentals" value={edit.section || ""} onChange={(e) => setEdit({ ...edit, section: e.target.value })} />
                <datalist id="section-names">
                  {[...new Set(Object.values(data.lessons).flat().map((l) => l.section).filter(Boolean))].map((s) => <option key={s} value={s} />)}
                </datalist>
                <textarea className={field} rows={4} placeholder="Homework text" value={edit.homework} onChange={(e) => setEdit({ ...edit, homework: e.target.value })} />
                <input className={field} type="number" placeholder="Order (smaller first)" value={edit.position} onChange={(e) => setEdit({ ...edit, position: e.target.value })} />
                <div className="flex gap-x-3">
                  <button className={btn2} onClick={() => saveLesson(edit, false)}>Save as draft</button>
                  <button className={btn} onClick={() => saveLesson(edit, true)}>Save and publish</button>
                  <button className={btn2} onClick={() => setEdit(null)}>Cancel</button>
                </div>
                <p className="text-xs text-white/50">A lesson is visible to students only after you press "Save and publish".</p>
              </div>
            )}

            {tab === "questions" && (
              <div className="mt-6 flex flex-col gap-y-3">
                {(data.questions || []).length === 0 && <p className="text-white/60">No questions yet.</p>}
                {(data.questions || []).map((q) => (
                  <div key={q.id} className="border border-white/10 rounded-xl bg-white/5 p-4 text-sm">
                    <div className="text-accent">
                      {q.student_name} <span className="text-white/40">· {q.course_id} / {q.lesson_id} · {new Date(q.created_at).toLocaleString()}</span>
                      <span className={`ml-2 ${q.reply && !q.hidden ? "text-green-400" : "text-yellow-300"}`}>{q.reply ? (q.hidden ? "Hidden" : "Answered, visible") : "New, not visible"}</span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap">{q.question}</p>
                    <textarea className={`${field} mt-3`} rows={3} placeholder="Your answer (students see it under the lesson after you save)"
                      value={qr[q.id] !== undefined ? qr[q.id] : q.reply || ""} onChange={(e) => setQr({ ...qr, [q.id]: e.target.value })} />
                    <div className="flex gap-x-2 mt-2 flex-wrap gap-y-2">
                      <button className={btn} onClick={() => replyQ(q, false)}>Save answer and show</button>
                      {q.reply && <button className={btn2} onClick={() => replyQ(q, true)}>Save and hide</button>}
                      <button className={btn2} onClick={() => delQ(q)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "homework" && (
              <div className="mt-6 flex flex-col gap-y-3">
                {data.submissions.length === 0 && <p className="text-white/60">No submissions yet.</p>}
                {data.submissions.map((s) => (
                  <div key={s.id} className="border border-white/10 rounded-xl bg-white/5 p-4 text-sm">
                    <div className="text-accent">
                      {s.student_name} <span className="text-white/40">· {s.course_id} / {s.lesson_id} · {new Date(s.created_at).toLocaleString()}</span>
                      <span className={`ml-2 ${s.reviewed ? "text-green-400" : "text-yellow-300"}`}>{s.reviewed ? "Reviewed" : "New"}</span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap">{s.answer}</p>
                    {s.link && <a href={s.link} target="_blank" rel="noreferrer" className="text-accent underline break-all">{s.link}</a>}
                    <textarea className={`${field} mt-3`} rows={3} placeholder="Your feedback (private, only you see it here)"
                      value={fb[s.id] !== undefined ? fb[s.id] : s.feedback || ""} onChange={(e) => setFb({ ...fb, [s.id]: e.target.value })} />
                    <div className="flex gap-x-2 mt-2">
                      <button className={btn} onClick={() => review(s, true)}>Save and mark reviewed</button>
                      {s.reviewed && <button className={btn2} onClick={() => review(s, false)}>Mark as new</button>}
                      <button className={btn2} onClick={() => del(s)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
      </div>
  );
};

export default Admin;
