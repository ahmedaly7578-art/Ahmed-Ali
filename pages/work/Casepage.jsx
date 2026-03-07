import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { useRouter } from "next/router";

/* ─────────────────────────────────────────────
   Animated Counter
───────────────────────────────────────────── */
const Counter = ({ target, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1800;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   Scroll Reveal
───────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, dir = "up" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: dir === "up" ? 24 : 0,
        x: dir === "left" ? 24 : dir === "right" ? -24 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Shared styles
───────────────────────────────────────────── */
const S = {
  // meta row: "Label: Value"
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0 6px",
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 1.5,
  },
  metaLabel: { color: "rgba(255,255,255,0.5)", fontWeight: 400 },
  metaValue: { color: "#fff", fontWeight: 700 },

  // stat row (bigger values)
  statRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0 6px",
    marginBottom: 14,
    fontSize: 16,
    lineHeight: 1.5,
    alignItems: "baseline",
  },
  statLabel: { color: "rgba(255,255,255,0.5)", fontWeight: 400 },
  statValue: { color: "#fff", fontWeight: 800, fontSize: 18 },
  statValueAccent: {
    fontWeight: 900,
    fontSize: 32,
    letterSpacing: "-0.02em",
    background: "linear-gradient(135deg,#a78bfa,#e879f9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  statValueBig: { color: "#fff", fontWeight: 900, fontSize: 26, letterSpacing: "-0.02em" },
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function CaseStudyPage() {
  const router = useRouter();

  return (
    <>
      {/* ── responsive styles injected ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');

        .cs-page * { box-sizing: border-box; }

        .cs-page {
          min-height: 100vh;
          background-color: #0e0b1f;
          color: #fff;
          font-family: 'Sora', 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* glow orbs */
        .cs-glow1 {
          position: fixed; top: -12%; left: -6%;
          width: 520px; height: 520px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%);
          filter: blur(72px); pointer-events: none; z-index: 0;
        }
        .cs-glow2 {
          position: fixed; bottom: 5%; right: -8%;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%);
          filter: blur(88px); pointer-events: none; z-index: 0;
        }

        .cs-inner {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          /* 100px top = typical navbar height (70-80px) + breathing room */
          padding: 100px 40px 140px;
        }

        /* back button */
        .cs-back {
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none;
          color: rgba(255,255,255,0.38);
          font-size: 13px; cursor: pointer; padding: 0;
          margin-bottom: 32px;
          font-family: 'Sora', sans-serif;
          transition: color 0.2s;
        }
        .cs-back:hover { color: #a78bfa; }

        /* title */
        .cs-title {
          font-size: clamp(1.9rem, 4.5vw, 3.4rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0 0 48px;
        }
        .cs-title-accent {
          background: linear-gradient(90deg,#a78bfa,#e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* two-col layout */
        .cs-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 64px;
          align-items: start;
          margin-bottom: 72px;
        }

        /* screenshot */
        .cs-screenshot {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(167,139,250,0.22);
          box-shadow: 0 12px 56px rgba(124,58,237,0.2), 0 2px 10px rgba(0,0,0,0.5);
        }
        .cs-screenshot img { width: 100%; display: block; }

        /* divider */
        .cs-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0 0 60px;
        }

        /* tag */
        .cs-tag {
          display: inline-block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #a78bfa; margin-bottom: 10px;
        }

        /* section heading */
        .cs-sh {
          font-size: clamp(1.3rem, 2.5vw, 2.1rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
          color: #fff;
        }

        /* challenge metrics */
        .cs-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 64px;
        }
        .cs-metric-card {
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.14);
          border-radius: 10px;
          padding: 18px 20px;
        }
        .cs-metric-label {
          color: rgba(255,255,255,0.4);
          font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.08em; margin-bottom: 6px;
        }
        .cs-metric-val {
          font-size: 28px; font-weight: 900; color: #fff;
        }

        /* strategy grid */
        .cs-strategy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 64px;
        }
        .cs-strategy-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 22px;
          transition: border-color 0.3s, transform 0.2s;
          cursor: default;
        }
        .cs-strategy-card:hover {
          border-color: rgba(167,139,250,0.4);
          transform: translateY(-3px);
        }
        .cs-strategy-num {
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(167,139,250,0.14); color: #a78bfa;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; margin-bottom: 12px;
        }
        .cs-strategy-title { font-weight: 700; font-size: 14px; color: #fff; margin-bottom: 8px; }
        .cs-strategy-desc { color: rgba(255,255,255,0.48); font-size: 13px; line-height: 1.7; }

        /* results grid */
        .cs-results-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 12px;
          margin-bottom: 64px;
        }
        .cs-result-card {
          background: linear-gradient(135deg,rgba(124,58,237,0.18),rgba(124,58,237,0.04));
          border: 1px solid rgba(124,58,237,0.28);
          border-radius: 12px; padding: 22px 12px;
          text-align: center; position: relative; overflow: hidden;
        }
        .cs-result-topline {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 56px; height: 2px; border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg,transparent,#7c3aed,transparent);
        }
        .cs-result-val {
          font-size: clamp(1.2rem,2vw,1.7rem); font-weight: 900;
          background: linear-gradient(135deg,#a78bfa,#e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 6px; letter-spacing: -0.02em;
        }
        .cs-result-label { font-size: 12px; color: rgba(255,255,255,0.55); margin-bottom: 4px; }
        .cs-result-change { font-size: 11px; color: #4ade80; font-weight: 600; }

        /* testimonial */
        .cs-testimonial {
          background: rgba(167,139,250,0.06);
          border: 1px solid rgba(167,139,250,0.14);
          border-radius: 16px; padding: 44px 52px;
          max-width: 720px; margin: 0 auto 64px;
        }
        .cs-quote-mark { font-size: 56px; color: rgba(167,139,250,0.2); line-height: 1; font-family: Georgia,serif; margin-bottom: 4px; }
        .cs-quote-text { font-size: 17px; font-style: italic; color: rgba(255,255,255,0.82); line-height: 1.75; margin-bottom: 22px; }
        .cs-quote-author { display: flex; align-items: center; gap: 12px; }
        .cs-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(167,139,250,0.18); color: #a78bfa;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
        }
        .cs-author-name { font-weight: 600; font-size: 13px; }
        .cs-author-role { color: rgba(255,255,255,0.4); font-size: 12px; }

        /* cta */
        .cs-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,#7c3aed,#a855f7);
          border: none; border-radius: 999px;
          padding: 13px 34px; color: #fff;
          font-size: 14px; font-weight: 700;
          cursor: pointer; font-family: 'Sora', sans-serif;
          box-shadow: 0 0 24px rgba(124,58,237,0.35);
          transition: box-shadow 0.3s, transform 0.2s;
        }
        .cs-cta-btn:hover {
          box-shadow: 0 0 44px rgba(124,58,237,0.55);
          transform: scale(1.04);
        }

        /* ── RESPONSIVE ── */

        /* tablet */
        @media (max-width: 900px) {
          .cs-inner { padding: 90px 28px 100px; }
          .cs-hero-grid { grid-template-columns: 1fr 1.3fr; gap: 36px; }
        }

        /* mobile */
        @media (max-width: 768px) {
          /* Key fix: push content below navbar (navbar ~72px) + extra breathing room */
          .cs-inner { padding: 88px 20px 80px; }
          .cs-back { margin-bottom: 20px; }
          .cs-title { margin-bottom: 28px; font-size: clamp(1.6rem, 7vw, 2.2rem); }

          /* stack vertically: screenshot first, meta below */
          .cs-hero-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 48px;
          }
          .cs-hero-left { order: 2; }
          .cs-hero-right { order: 1; }

          .cs-metrics { grid-template-columns: 1fr 1fr; gap: 10px; }
          .cs-strategy-grid { grid-template-columns: 1fr; gap: 10px; }
          .cs-results-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .cs-testimonial { padding: 26px 22px; margin-bottom: 48px; }
          .cs-quote-text { font-size: 15px; }
          .cs-sh { font-size: 1.35rem; }
          .cs-divider { margin: 0 0 40px; }
        }

        @media (max-width: 480px) {
          .cs-inner { padding: 84px 16px 72px; }
          .cs-metrics { grid-template-columns: 1fr; }
          .cs-results-grid { grid-template-columns: 1fr 1fr; }
          .cs-metric-val { font-size: 22px; }
        }
      `}</style>

      <div className="cs-page">
        <div className="cs-glow1" />
        <div className="cs-glow2" />

        <div className="cs-inner">

          {/* ── back button — sits below navbar naturally ── */}
          <button className="cs-back" onClick={() => router.push("/work")}>
            <RxArrowTopRight style={{ transform: "rotate(180deg)" }} />
            Back to Work
          </button>

          {/* ── TITLE ── */}
          <Reveal delay={0.05}>
            <h1 className="cs-title">
              Case Study:{" "}
              <span className="cs-title-accent">[Bags and Shoes ]</span>
            </h1>
          </Reveal>

          {/* ── HERO GRID: meta left / screenshot right ── */}
          <div className="cs-hero-grid">

            {/* LEFT — meta + stats */}
            <div className="cs-hero-left">
              <Reveal delay={0.1}>
                <div style={S.metaRow}>
                  <span style={S.metaLabel}>Marketing Objectives:</span>
                  <span style={S.metaValue}>ConversionCampaign</span>
                </div>
                <div style={S.metaRow}>
                  <span style={S.metaLabel}>Industry:</span>
                  <span style={S.metaValue}>E-commerce</span>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div style={{ height: 10 }} />
                <div style={S.metaRow}>
                  <span style={S.metaLabel}>Platform:</span>
                  <span style={S.metaValue}>Snapchat</span>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div style={{ height: 10 }} />
                <div style={S.metaRow}>
                  <span style={S.metaLabel}>Country:</span>
                  <span style={S.metaValue}>Saudi Arabia</span>
                </div>
              </Reveal>

              <div style={{ height: 20 }} />

              {/* stats */}
              {[
                { label: "Total Purchases:", node: <Counter target={2437} />, suffix: " Orders", size: "normal" },
                { label: "CPP (Cost Per Purchase):", node: "12.6 $", size: "normal" },
                { label: "Sales:", node: "734,974 SAR", size: "normal" },
                { label: "A.O.V:", node: "300 SAR", size: "normal" },
                { label: "ROAS:", node: "6.36", size: "accent" },
                { label: "Total Spend:", node: <Counter target={30782} prefix="$" />, size: "big" },
              ].map((item, i) => (
                <Reveal key={i} delay={0.22 + i * 0.07}>
                  <div style={{
                    ...S.statRow,
                    marginBottom: item.size === "accent" || item.size === "big" ? 18 : 12,
                  }}>
                    <span style={S.statLabel}>{item.label}</span>
                    <span style={
                      item.size === "accent" ? S.statValueAccent :
                      item.size === "big" ? S.statValueBig :
                      S.statValue
                    }>
                      {item.node}
                      {item.suffix && <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{item.suffix}</span>}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* RIGHT — screenshot */}
            <div className="cs-hero-right">
              <Reveal delay={0.2} dir="left">
                <motion.div
                  className="cs-screenshot"
                  whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
                >
                  <img src="/case.png" alt="Snapchat Ads Manager Dashboard" />
                </motion.div>
              </Reveal>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="cs-divider" />

          {/* ── CHALLENGE ── */}
          <section style={{ marginBottom: 64 }}>
            <Reveal delay={0.05}>
              <div className="cs-tag">01 — Challenge</div>
              <h2 className="cs-sh">The Challenge</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.58)", lineHeight: 1.8, maxWidth: 680, marginBottom: 28, fontSize: 14.5 }}>
                A fast-growing fashion brand selling bags and shoes in Saudi Arabia was struggling with high
                cost-per-purchase and an untapped Snapchat audience. Their campaigns lacked retargeting depth,
                server-side event tracking, and platform-native creatives — resulting in weak ROAS and
                unsustainable acquisition costs.
              </p>
            </Reveal>
            <div className="cs-metrics">
              {[
                { label: "Starting ROAS", value: "1.8x" },
                { label: "CPP Before", value: "$45" },
                { label: "Conv. Rate", value: "1.2%" },
              ].map((m, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div className="cs-metric-card">
                    <div className="cs-metric-label">{m.label}</div>
                    <div className="cs-metric-val">{m.value}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── STRATEGY ── */}
          <section style={{ marginBottom: 64 }}>
            <Reveal delay={0.05}>
              <div className="cs-tag">02 — Strategy</div>
              <h2 className="cs-sh">Our Strategy</h2>
            </Reveal>
            <div className="cs-strategy-grid">
              {[
                { n: "01", title: "Platform-Native Creative", desc: "Snapchat-first vertical UGC-style videos that felt organic in the feed — boosting thumb-stop rate by 3x." },
                { n: "02", title: "Pixel & Event Architecture", desc: "Rebuilt Snap Pixel with server-side events for PURCHASE, ADD_CART, VIEW_CONTENT for smarter optimization." },
                { n: "03", title: "Audience Segmentation", desc: "Layered lookalikes on high-intent retargeting pools segmented by recency and product category." },
                { n: "04", title: "Bid & Budget Optimization", desc: "Shifted to Target Cost bidding with aggressive scaling on winning ad sets — dropping CPP from $45 → $12.6." },
              ].map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.07}>
                  <div className="cs-strategy-card">
                    <div className="cs-strategy-num">{p.n}</div>
                    <div className="cs-strategy-title">{p.title}</div>
                    <div className="cs-strategy-desc">{p.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── RESULTS ── */}
          <section style={{ marginBottom: 64 }}>
            <Reveal delay={0.05}>
              <div className="cs-tag" style={{ display: "block", textAlign: "center" }}>03 — Results</div>
              <h2 className="cs-sh" style={{ textAlign: "center" }}>The Results</h2>
            </Reveal>
            <div className="cs-results-grid">
              {[
                { label: "ROAS", display: "6.36x", change: "+253%" },
                { label: "Total Orders", target: 2437, change: "Purchases" },
                { label: "Total Sales", display: "734,974 SAR", change: "Revenue" },
                { label: "Total Spend", target: 30782, prefix: "$", change: "Ad Spend" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  className="cs-result-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="cs-result-topline" />
                  <div className="cs-result-val">
                    {m.display ?? <Counter target={m.target} prefix={m.prefix ?? ""} />}
                  </div>
                  <div className="cs-result-label">{m.label}</div>
                  <div className="cs-result-change">{m.change}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── TESTIMONIAL ── */}
          <Reveal delay={0.05}>
            <div className="cs-testimonial">
              <div className="cs-quote-mark">"</div>
              <p className="cs-quote-text">
                The Snapchat results blew us away. We scaled from struggling campaigns to 6x ROAS —
                and we're still growing month over month.
              </p>
              <div className="cs-quote-author">
                <div className="cs-avatar">BM</div>
                <div>
                  <div className="cs-author-name">Brand Manager</div>
                  <div className="cs-author-role">Bags &amp; Shoes — Saudi Arabia</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── CTA ── */}
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <h3 style={{
                fontSize: "clamp(1.3rem,2.8vw,2rem)",
                fontWeight: 800, marginBottom: 24, letterSpacing: "-0.02em",
              }}>
                Ready to achieve similar results?
              </h3>
              <button className="cs-cta-btn" onClick={() => router.push("/contact")}>
                Let's Talk
                <RxArrowTopRight style={{ fontSize: 16 }} />
              </button>
            </div>
          </Reveal>

        </div>
      </div>
    </>
  );
}
