import Head from "next/head";
import { useState } from "react";

const AdminHomework = () => {
  const [pw, setPw] = useState("");
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");

  const load = async (e) => {
    e.preventDefault();
    setErr("");
    const r = await fetch("/api/homework", { headers: { "x-admin-password": pw } });
    const data = await r.json();
    if (r.ok) setRows(data);
    else setErr(data.error || "Error");
  };

  return (
    <div className="h-full bg-primary/30 py-36 overflow-y-auto">
      <Head><meta name="robots" content="noindex,nofollow" /></Head>
      <div className="container mx-auto max-w-[1000px] relative z-10">
        <h2 className="h2">Homework submissions<span className="text-accent">.</span></h2>
        {!rows && (
          <form onSubmit={load} className="flex gap-x-3 mt-6">
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Admin password"
              className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-accent" />
            <button className="px-4 py-2 rounded-lg bg-accent text-white text-sm">Open</button>
            {err && <span className="text-red-300 text-sm self-center">{err}</span>}
          </form>
        )}
        {rows && (
          <div className="mt-6 flex flex-col gap-y-3">
            {rows.length === 0 && <p className="text-white/60">No submissions yet.</p>}
            {rows.map((r) => (
              <div key={r.id} className="border border-white/10 rounded-xl bg-white/5 p-4 text-sm">
                <div className="text-accent">{r.student_name} <span className="text-white/40">· {r.course_id} / {r.lesson_id} · {new Date(r.created_at).toLocaleString()}</span></div>
                <p className="mt-2 whitespace-pre-wrap">{r.answer}</p>
                {r.link && <a href={r.link} target="_blank" rel="noreferrer" className="text-accent underline break-all">{r.link}</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomework;
