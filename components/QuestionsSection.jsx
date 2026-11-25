import { useEffect, useState } from "react";

const QuestionsSection = ({ courseId, lessonId }) => {
  const [list, setList] = useState([]);
  const [state, setState] = useState({ status: "idle", msg: "" });

  useEffect(() => {
    let alive = true;
    setList([]);
    fetch(`/api/questions?course=${encodeURIComponent(courseId)}&lesson=${encodeURIComponent(lessonId)}`)
      .then((r) => (r.ok ? r.json() : { questions: [] }))
      .then((d) => alive && setList(d.questions || []))
      .catch(() => {});
    return () => { alive = false; };
  }, [courseId, lessonId]);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const f = new FormData(form);
    setState({ status: "sending", msg: "" });
    try {
      const r = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId, name: f.get("name"), question: f.get("question"), website: f.get("website") }),
      });
      const data = await r.json();
      if (r.ok) { form.reset(); setState({ status: "ok", msg: "Question received. It will appear here after it is answered." }); }
      else setState({ status: "error", msg: data.error || "Something went wrong." });
    } catch {
      setState({ status: "error", msg: "Network error. Try again." });
    }
  };

  const field = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-accent";
  return (
    <div>
      <div className="text-sm text-white/70 mb-2">Questions about this lesson</div>
      {list.length > 0 && (
        <div className="flex flex-col gap-y-3 mb-4">
          {list.map((q) => (
            <div key={q.id} className="border border-white/10 rounded-xl bg-white/5 p-4 text-sm">
              <div className="text-white/50">{q.student_name} asked:</div>
              <p className="mt-1 whitespace-pre-wrap">{q.question}</p>
              <div className="text-accent mt-3">Answer</div>
              <p className="mt-1 whitespace-pre-wrap text-white/80">{q.reply}</p>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={submit} className="flex flex-col gap-y-3">
        <input name="name" placeholder="Your name" maxLength={100} required className={field} />
        <textarea name="question" placeholder="Your question" rows={3} maxLength={2000} required className={field} />
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="flex items-center gap-x-3 flex-wrap gap-y-2">
          <button disabled={state.status === "sending"} className="px-4 py-2 rounded-lg bg-accent text-white text-sm disabled:opacity-50">
            {state.status === "sending" ? "Sending..." : "Ask question"}
          </button>
          {state.msg && <span className={`text-sm ${state.status === "ok" ? "text-green-400" : "text-red-300"}`}>{state.msg}</span>}
        </div>
      </form>
    </div>
  );
};

export default QuestionsSection;
