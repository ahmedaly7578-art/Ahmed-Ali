import { useState } from "react";

const HomeworkForm = ({ courseId, lessonId }) => {
  const [state, setState] = useState({ status: "idle", msg: "" });

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    setState({ status: "sending", msg: "" });
    try {
      const r = await fetch("/api/homework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId, lessonId,
          name: f.get("name"), answer: f.get("answer"), link: f.get("link"), website: f.get("website"),
        }),
      });
      const data = await r.json();
      if (r.ok) { e.target.reset(); setState({ status: "ok", msg: "Submitted. Thank you." }); }
      else setState({ status: "error", msg: data.error || "Something went wrong." });
    } catch {
      setState({ status: "error", msg: "Network error. Try again." });
    }
  };

  const field = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none focus:border-accent";
  return (
    <form onSubmit={submit} className="flex flex-col gap-y-3">
      <input name="name" placeholder="Your name" maxLength={100} required className={field} />
      <textarea name="answer" placeholder="Your answer" rows={4} maxLength={5000} required className={field} />
      <input name="link" placeholder="Link to your file (Google Drive, optional)" className={field} />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex items-center gap-x-3">
        <button disabled={state.status === "sending"} className="px-4 py-2 rounded-lg bg-accent text-white text-sm disabled:opacity-50">
          {state.status === "sending" ? "Sending..." : "Submit homework"}
        </button>
        {state.msg && <span className={`text-sm ${state.status === "ok" ? "text-green-400" : "text-red-300"}`}>{state.msg}</span>}
      </div>
    </form>
  );
};

export default HomeworkForm;
