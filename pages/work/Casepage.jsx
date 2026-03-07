import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { useRouter } from "next/router";

/* ── Animated Counter ── */
const Counter = ({ target, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1800, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
};

/* ── Scroll Reveal ── */
const Reveal = ({ children, delay = 0, dir = "up" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: dir === "up" ? 22 : 0, x: dir === "left" ? 22 : dir === "right" ? -22 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default function CaseStudyPage() {
  const router = useRouter();
  // back: use router.back() so it goes to previous page in history
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/work");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');

        /* ── reset inside page ── */
        .cs * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── page wrapper ── */
        .cs {
          width: 100%;
          min-height: 100vh;
          max-height: 100vh;
          background-color: #0e0b1f;
          color: #fff;
          font-family: 'Sora', 'Segoe UI', sans-serif;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* ── ambient glows (fixed, pointer-events none) ── */
        .cs-g1, .cs-g2 {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .cs-g1 {
          top: -10%; left: -5%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%);
          filter: blur(70px);
        }
        .cs-g2 {
          bottom: 5%; right: -8%;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 70%);
          filter: blur(85px);
        }

        /* ── content wrapper ── */
        .cs-wrap {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 120px 40px 140px;
        }

        /* ── back button ── */
        .cs-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.4);
          font-size: 13px;
          font-family: 'Sora', sans-serif;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          margin-bottom: 36px;
          transition: color 0.2s;
          text-decoration: none;
        }
        .cs-back:hover { color: #a78bfa; }
        .cs-back svg { flex-shrink: 0; }

        /* ── page title ── */
        .cs-title {
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 48px;
          color: #fff;
        }
        .cs-title span {
          background: linear-gradient(90deg, #a78bfa, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── hero two-column grid ── */
        .cs-hero {
          display: grid;
          grid-template-columns: 1fr 1.65fr;
          gap: 60px;
          align-items: start;
          margin-bottom: 72px;
        }

        /* ── meta rows ── */
        .cs-meta { margin-bottom: 8px; font-size: 15.5px; line-height: 1.6; }
        .cs-meta-lbl { color: rgba(255,255,255,0.48); font-weight: 400; }
        .cs-meta-val { color: #fff; font-weight: 700; margin-left: 4px; }

        .cs-gap { height: 14px; }

        /* ── stat rows ── */
        .cs-stat { display: flex; align-items: baseline; gap: 5px; margin-bottom: 13px; flex-wrap: wrap; }
        .cs-stat-lbl { color: rgba(255,255,255,0.48); font-size: 15px; font-weight: 400; }
        .cs-stat-val { color: #fff; font-size: 17px; font-weight: 800; }
        .cs-stat-val--accent {
          font-size: 33px;
          font-weight: 900;
          letter-spacing: -0.025em;
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cs-stat-val--big { font-size: 27px; font-weight: 900; letter-spacing: -0.02em; color: #fff; }

        /* ── screenshot ── */
        .cs-img-wrap {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(167,139,250,0.22);
          box-shadow: 0 14px 60px rgba(124,58,237,0.22), 0 2px 12px rgba(0,0,0,0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cs-img-wrap:hover {
          transform: scale(1.012);
          box-shadow: 0 20px 80px rgba(124,58,237,0.32), 0 2px 12px rgba(0,0,0,0.5);
        }
        .cs-img-wrap img { width: 100%; display: block; }

        /* ── divider ── */
        .cs-divider { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 64px; }

        /* ── section tag + heading ── */
        .cs-tag {
          display: inline-block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: #a78bfa; margin-bottom: 10px;
        }
        .cs-sh {
          font-size: clamp(1.3rem, 2.4vw, 2rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #fff;
          margin-bottom: 20px;
        }

        /* ── challenge metric cards ── */
        .cs-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 28px;
          margin-bottom: 64px;
        }
        .cs-mc {
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.14);
          border-radius: 10px;
          padding: 18px 20px;
        }
        .cs-mc-lbl { color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 7px; }
        .cs-mc-val { font-size: 28px; font-weight: 900; color: #fff; }

        /* ── strategy grid ── */
        .cs-strategy {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 64px;
        }
        .cs-sc {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 22px;
          transition: border-color 0.25s, transform 0.2s;
          cursor: default;
        }
        .cs-sc:hover { border-color: rgba(167,139,250,0.4); transform: translateY(-3px); }
        .cs-sc-num {
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(167,139,250,0.14); color: #a78bfa;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; margin-bottom: 12px;
        }
        .cs-sc-title { font-weight: 700; font-size: 14.5px; color: #fff; margin-bottom: 8px; }
        .cs-sc-desc { color: rgba(255,255,255,0.48); font-size: 13px; line-height: 1.7; }

        /* ── results grid ── */
        .cs-results {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 13px;
          margin-bottom: 64px;
        }
        .cs-rc {
          background: linear-gradient(135deg, rgba(124,58,237,0.18), rgba(124,58,237,0.04));
          border: 1px solid rgba(124,58,237,0.28);
          border-radius: 12px;
          padding: 22px 12px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cs-rc-line {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 52px; height: 2px; border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, transparent, #7c3aed, transparent);
        }
        .cs-rc-val {
          font-size: clamp(1.2rem, 2vw, 1.75rem); font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px; letter-spacing: -0.02em;
        }
        .cs-rc-lbl { font-size: 12px; color: rgba(255,255,255,0.55); margin-bottom: 4px; }
        .cs-rc-change { font-size: 11px; color: #4ade80; font-weight: 600; }

        /* ── testimonial ── */
        .cs-testi {
          background: rgba(167,139,250,0.06);
          border: 1px solid rgba(167,139,250,0.14);
          border-radius: 16px;
          padding: 44px 52px;
          max-width: 720px;
          margin: 0 auto 64px;
        }
        .cs-quote { font-size: 54px; color: rgba(167,139,250,0.2); line-height: 1; font-family: Georgia, serif; margin-bottom: 6px; }
        .cs-testi-text { font-size: 17px; font-style: italic; color: rgba(255,255,255,0.82); line-height: 1.75; margin-bottom: 22px; }
        .cs-testi-author { display: flex; align-items: center; gap: 13px; }
        .cs-avatar { width: 40px; height: 40px; border-radius: 50%; background: rgba(167,139,250,0.18); color: #a78bfa; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
        .cs-author-name { font-weight: 600; font-size: 13px; color: #fff; }
        .cs-author-role { color: rgba(255,255,255,0.4); font-size: 12px; }

        /* ── CTA button ── */
        .cs-cta { text-align: center; }
        .cs-cta-h { font-size: clamp(1.3rem, 2.6vw, 1.9rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 24px; color: #fff; }
        .cs-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 999px;
          padding: 13px 34px; color: #fff;
          font-size: 14px; font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          box-shadow: 0 0 24px rgba(124,58,237,0.35);
          transition: box-shadow 0.25s, transform 0.2s;
        }
        .cs-btn:hover { box-shadow: 0 0 44px rgba(124,58,237,0.55); transform: scale(1.04); }

        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */

        /* tablet */
        @media (max-width: 960px) {
          .cs-wrap { padding: 130px 28px 100px; }
          .cs-hero { grid-template-columns: 1fr 1.3fr; gap: 36px; }
        }

        /* mobile */
        @media (max-width: 720px) {
          .cs-wrap { padding: 140px 18px 80px; }
          .cs-back { margin-bottom: 22px; }

          /* stack: image first, meta second */
          .cs-hero {
            grid-template-columns: 1fr;
            gap: 22px;
            margin-bottom: 48px;
          }
          .cs-hero-left { order: 2; }
          .cs-hero-right { order: 1; }

          .cs-title { font-size: clamp(1.65rem, 7vw, 2.2rem); margin-bottom: 32px; }
          .cs-metrics { grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 48px; }
          .cs-strategy { grid-template-columns: 1fr; gap: 10px; margin-bottom: 48px; }
          .cs-results { grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 48px; }
          .cs-testi { padding: 26px 20px; }
          .cs-testi-text { font-size: 15px; }
          .cs-divider { margin-bottom: 44px; }
          .cs-g1 { width: 280px; height: 280px; }
          .cs-g2 { width: 220px; height: 220px; }
        }

        /* small phone */
        @media (max-width: 420px) {
          .cs-wrap { padding: 140px 14px 64px; }
          .cs-metrics { grid-template-columns: 1fr; }
          .cs-mc-val { font-size: 22px; }
          .cs-stat-val--accent { font-size: 26px; }
          .cs-stat-val--big { font-size: 22px; }
        }
      `}</style>

      <div className="cs">
        <div className="cs-g1" />
        <div className="cs-g2" />

        <div className="cs-wrap">

          {/* ── back button ── */}
          <Reveal delay={0}>
            <button className="cs-back" onClick={handleBack}>
              <RxArrowTopRight style={{ transform: "rotate(180deg)", fontSize: 15 }} />
              Back to Work
            </button>
          </Reveal>

          {/* ── title ── */}
          <Reveal delay={0.06}>
            <h1 className="cs-title">
              Case Study: <span>[Bags and Shoes ]</span>
            </h1>
          </Reveal>

          {/* ── hero grid ── */}
          <div className="cs-hero">

            {/* LEFT — meta + stats */}
            <div className="cs-hero-left">
              <Reveal delay={0.1}>
                <p className="cs-meta"><span className="cs-meta-lbl">Marketing Objectives:</span><span className="cs-meta-val">ConversionCampaign</span></p>
                <p className="cs-meta"><span className="cs-meta-lbl">Industry:</span><span className="cs-meta-val">E-commerce</span></p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="cs-gap" />
                <p className="cs-meta"><span className="cs-meta-lbl">Platform:</span><span className="cs-meta-val">Snapchat</span></p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="cs-gap" />
                <p className="cs-meta"><span className="cs-meta-lbl">Country:</span><span className="cs-meta-val">Saudi Arabia</span></p>
              </Reveal>

              <div style={{ height: 22 }} />

              {[
                { lbl: "Total Purchases:", val: <><Counter target={2437} /> Orders</>, cls: "" },
                { lbl: "CPP (Cost Per Purchase):", val: "12.6 $", cls: "" },
                { lbl: "Sales:", val: "734,974 SAR", cls: "" },
                { lbl: "A.O.V:", val: "300 SAR", cls: "" },
                { lbl: "ROAS:", val: "6.36", cls: "--accent" },
                { lbl: "Total Spend:", val: <Counter target={30782} prefix="$" />, cls: "--big" },
              ].map((item, i) => (
                <Reveal key={i} delay={0.22 + i * 0.06}>
                  <div className="cs-stat" style={{ marginBottom: item.cls ? 18 : 12 }}>
                    <span className="cs-stat-lbl">{item.lbl}</span>
                    <span className={`cs-stat-val${item.cls}`}>{item.val}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* RIGHT — screenshot */}
            <div className="cs-hero-right">
              <Reveal delay={0.18} dir="left">
                <div className="cs-img-wrap">
                  <img src="/case.png" alt="Snapchat Ads Manager Dashboard" />
                </div>
              </Reveal>
            </div>

          </div>{/* end hero grid */}

          {/* ── divider ── */}
          <div className="cs-divider" />

          {/* ── challenge ── */}
          <section style={{ marginBottom: 64 }}>
            <Reveal delay={0.05}>
              <div className="cs-tag">01 — Challenge</div>
              <h2 className="cs-sh">The Challenge</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.58)", lineHeight: 1.8, maxWidth: 680, fontSize: 15, marginBottom: 0 }}>
                A fast-growing fashion brand selling bags and shoes in Saudi Arabia was struggling with high
                cost-per-purchase and an untapped Snapchat audience. Their campaigns lacked retargeting depth,
                server-side event tracking, and platform-native creatives — resulting in weak ROAS and
                unsustainable acquisition costs.
              </p>
            </Reveal>
            <div className="cs-metrics">
              {[
                { lbl: "Starting ROAS", val: "1.8x" },
                { lbl: "CPP Before", val: "$45" },
                { lbl: "Conv. Rate", val: "1.2%" },
              ].map((m, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div className="cs-mc">
                    <div className="cs-mc-lbl">{m.lbl}</div>
                    <div className="cs-mc-val">{m.val}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── strategy ── */}
          <section style={{ marginBottom: 64 }}>
            <Reveal>
              <div className="cs-tag">02 — Strategy</div>
              <h2 className="cs-sh">Our Strategy</h2>
            </Reveal>
            <div className="cs-strategy">
              {[
                { n: "01", t: "Platform-Native Creative", d: "Snapchat-first vertical UGC-style videos that felt organic in the feed — boosting thumb-stop rate by 3x." },
                { n: "02", t: "Pixel & Event Architecture", d: "Rebuilt Snap Pixel with server-side events for PURCHASE, ADD_CART, VIEW_CONTENT for smarter optimization." },
                { n: "03", t: "Audience Segmentation", d: "Layered lookalikes on high-intent retargeting pools segmented by recency and product category." },
                { n: "04", t: "Bid & Budget Optimization", d: "Shifted to Target Cost bidding with aggressive scaling on winning ad sets — dropping CPP from $45 → $12.6." },
              ].map((p, i) => (
                <Reveal key={i} delay={0.08 + i * 0.07}>
                  <div className="cs-sc">
                    <div className="cs-sc-num">{p.n}</div>
                    <div className="cs-sc-title">{p.t}</div>
                    <div className="cs-sc-desc">{p.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── results ── */}
          <section style={{ marginBottom: 64 }}>
            <Reveal>
              <div className="cs-tag" style={{ display: "block", textAlign: "center" }}>03 — Results</div>
              <h2 className="cs-sh" style={{ textAlign: "center" }}>The Results</h2>
            </Reveal>
            <div className="cs-results">
              {[
                { lbl: "ROAS",        display: "6.36x",        change: "+253%" },
                { lbl: "Total Orders",target: 2437,            change: "Purchases" },
                { lbl: "Total Sales", display: "734,974 SAR",  change: "Revenue" },
                { lbl: "Total Spend", target: 30782, pfx: "$", change: "Ad Spend" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  className="cs-rc"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.5 }}
                >
                  <div className="cs-rc-line" />
                  <div className="cs-rc-val">
                    {m.display ?? <Counter target={m.target} prefix={m.pfx ?? ""} />}
                  </div>
                  <div className="cs-rc-lbl">{m.lbl}</div>
                  <div className="cs-rc-change">{m.change}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── testimonial ── */}
          <Reveal delay={0.05}>
            <div className="cs-testi">
              <div className="cs-quote">"</div>
              <p className="cs-testi-text">
                The Snapchat results blew us away. We scaled from struggling campaigns to 6x ROAS —
                and we're still growing month over month.
              </p>
              <div className="cs-testi-author">
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
            <div className="cs-cta">
              <h3 className="cs-cta-h">Ready to achieve similar results?</h3>
              <button className="cs-btn" onClick={() => router.push("/contact")}>
                Let's Talk
                <RxArrowTopRight style={{ fontSize: 16 }} />
              </button>
            </div>
          </Reveal>

        </div>{/* end cs-wrap */}
      </div>{/* end cs */}
    </>
  );
}
