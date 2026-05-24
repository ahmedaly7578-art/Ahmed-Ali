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

/* ── Image Slider ── */
const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const total = images.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Touch / mouse drag
  const onDragStart = (clientX) => { setDragging(true); setStartX(clientX); setDragDelta(0); };
  const onDragMove = (clientX) => { if (!dragging) return; setDragDelta(clientX - startX); };
  const onDragEnd = () => {
    if (dragDelta < -50) next();
    else if (dragDelta > 50) prev();
    setDragging(false);
    setDragDelta(0);
  };

  return (
    <div
      className="cs-slider"
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onMouseLeave={() => { if (dragging) onDragEnd(); }}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
    >
      {/* Slides */}
      <div
        className="cs-slider-track"
        style={{
          transform: `translateX(calc(-${current * 100}% + ${dragging ? dragDelta : 0}px))`,
          transition: dragging ? "none" : "transform 0.48s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {images.map((src, i) => (
          <div className="cs-slide" key={i}>
            <img src={src} alt={`Screenshot ${i + 1}`} draggable={false} />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button className="cs-arrow cs-arrow--left" onClick={prev} aria-label="Previous">
        <RxArrowTopRight style={{ transform: "rotate(225deg)", fontSize: 18 }} />
      </button>
      <button className="cs-arrow cs-arrow--right" onClick={next} aria-label="Next">
        <RxArrowTopRight style={{ fontSize: 18 }} />
      </button>

      {/* Dots */}
      <div className="cs-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`cs-dot${i === current ? " cs-dot--active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter badge */}
      <div className="cs-slide-counter">{current + 1} / {total}</div>
    </div>
  );
};

export default function CaseStudyPage3() {
  const router = useRouter();
  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/work");
  };

  const sliderImages = ["/case3-1.jpeg", "/case3-2.png", "/case3-3.png", "/case3-4.png"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');

        .cs * { box-sizing: border-box; margin: 0; padding: 0; }

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

        .cs-wrap {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 120px 40px 140px;
        }

        /* ── back ── */
        .cs-back {
          display: inline-flex; align-items: center; gap: 7px;
          background: none; border: none;
          color: rgba(255,255,255,0.4);
          font-size: 13px; font-family: 'Sora', sans-serif; font-weight: 500;
          cursor: pointer; padding: 8px 0; margin-bottom: 36px;
          transition: color 0.2s; text-decoration: none;
          position: relative; z-index: 50;
        }
        .cs-back:hover { color: #a78bfa; }

        /* ── title ── */
        .cs-title {
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 900; letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 48px; color: #fff;
        }
        .cs-title span {
          background: linear-gradient(90deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── hero grid ── */
        .cs-hero {
          display: grid;
          grid-template-columns: 1fr 1.65fr;
          gap: 60px; align-items: start; margin-bottom: 72px;
        }

        /* ── meta ── */
        .cs-meta { margin-bottom: 8px; font-size: 15.5px; line-height: 1.6; }
        .cs-meta-lbl { color: rgba(255,255,255,0.48); font-weight: 400; }
        .cs-meta-val { color: #fff; font-weight: 700; margin-left: 4px; }
        .cs-gap { height: 14px; }

        /* ── stats ── */
        .cs-stat { display: flex; align-items: baseline; gap: 5px; margin-bottom: 13px; flex-wrap: wrap; }
        .cs-stat-lbl { color: rgba(255,255,255,0.48); font-size: 15px; font-weight: 400; }
        .cs-stat-val { color: #fff; font-size: 17px; font-weight: 800; }
        .cs-stat-val--accent {
          font-size: 33px; font-weight: 900; letter-spacing: -0.025em;
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .cs-stat-val--big { font-size: 27px; font-weight: 900; letter-spacing: -0.02em; color: #fff; }

        /* ══════════════════════════
           IMAGE SLIDER
        ══════════════════════════ */
        .cs-slider {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(167,139,250,0.22);
          box-shadow: 0 14px 60px rgba(124,58,237,0.22), 0 2px 12px rgba(0,0,0,0.5);
          user-select: none;
          cursor: grab;
          touch-action: pan-y;
          height: 340px;
          background: rgba(14,11,31,0.6);
        }
        .cs-slider:active { cursor: grabbing; }

        .cs-slider-track {
          display: flex;
          width: 100%;
          height: 100%;
        }
        .cs-slide {
          min-width: 100%;
          flex-shrink: 0;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .cs-slide img {
          width: 100%;
          height: 100%;
          display: block;
          pointer-events: none;
          object-fit: cover;
          object-position: top;
        }

        @media (max-width: 720px) {
          .cs-slider { height: 220px; }
        }

        /* arrows */
        .cs-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(14,11,31,0.72);
          border: 1px solid rgba(167,139,250,0.28);
          color: #a78bfa; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s, border-color 0.2s;
          z-index: 10;
        }
        .cs-arrow:hover { background: rgba(124,58,237,0.4); border-color: rgba(167,139,250,0.6); }
        .cs-arrow--left { left: 12px; }
        .cs-arrow--right { right: 12px; }

        /* dots */
        .cs-dots {
          position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 6px; z-index: 10;
        }
        .cs-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.25); border: none; cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          padding: 0;
        }
        .cs-dot--active { background: #a78bfa; transform: scale(1.3); }

        /* counter badge */
        .cs-slide-counter {
          position: absolute; top: 12px; right: 12px;
          background: rgba(14,11,31,0.7);
          border: 1px solid rgba(167,139,250,0.22);
          border-radius: 999px;
          padding: 3px 10px; font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.6); z-index: 10;
          font-family: 'Sora', sans-serif;
        }

        /* ── divider ── */
        .cs-divider { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 64px; }

        /* ── section labels ── */
        .cs-tag {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: #a78bfa; margin-bottom: 10px;
        }
        .cs-sh {
          font-size: clamp(1.3rem, 2.4vw, 2rem);
          font-weight: 800; letter-spacing: -0.025em; color: #fff; margin-bottom: 20px;
        }

        /* ── metric cards ── */
        .cs-metrics {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 14px; margin-top: 28px; margin-bottom: 64px;
        }
        .cs-mc {
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.14);
          border-radius: 10px; padding: 18px 20px;
        }
        .cs-mc-lbl { color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 7px; }
        .cs-mc-val { font-size: 28px; font-weight: 900; color: #fff; }

        /* ── strategy ── */
        .cs-strategy {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 14px; margin-bottom: 64px;
        }
        .cs-sc {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 22px;
          transition: border-color 0.25s, transform 0.2s; cursor: default;
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

        /* ── results ── */
        .cs-results {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 13px; margin-bottom: 64px;
        }
        .cs-rc {
          background: linear-gradient(135deg, rgba(124,58,237,0.18), rgba(124,58,237,0.04));
          border: 1px solid rgba(124,58,237,0.28);
          border-radius: 12px; padding: 22px 12px;
          text-align: center; position: relative; overflow: hidden;
        }
        .cs-rc-line {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 52px; height: 2px; border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, transparent, #7c3aed, transparent);
        }
        .cs-rc-val {
          font-size: clamp(1.2rem, 2vw, 1.75rem); font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 6px; letter-spacing: -0.02em;
        }
        .cs-rc-lbl { font-size: 12px; color: rgba(255,255,255,0.55); margin-bottom: 4px; }
        .cs-rc-change { font-size: 11px; color: #4ade80; font-weight: 600; }

        /* ── CTA ── */
        .cs-cta { text-align: center; }
        .cs-cta-h { font-size: clamp(1.3rem, 2.6vw, 1.9rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 24px; color: #fff; }
        .cs-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 999px;
          padding: 13px 34px; color: #fff;
          font-size: 14px; font-weight: 700; font-family: 'Sora', sans-serif;
          cursor: pointer;
          box-shadow: 0 0 24px rgba(124,58,237,0.35);
          transition: box-shadow 0.25s, transform 0.2s;
        }
        .cs-btn:hover { box-shadow: 0 0 44px rgba(124,58,237,0.55); transform: scale(1.04); }

        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */
        @media (max-width: 960px) {
          .cs-wrap { padding: 130px 28px 100px; }
          .cs-hero { grid-template-columns: 1fr 1.3fr; gap: 36px; }
        }

        @media (max-width: 720px) {
          .cs-wrap { padding: 140px 18px 160px; }
          .cs-back { margin-bottom: 22px; }
          .cs-hero { grid-template-columns: 1fr; gap: 22px; margin-bottom: 48px; }
          .cs-hero-left { order: 2; }
          .cs-hero-right { order: 1; }
          .cs-title { font-size: clamp(1.65rem, 7vw, 2.2rem); margin-bottom: 32px; }
          .cs-metrics { grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 48px; }
          .cs-strategy { grid-template-columns: 1fr; gap: 10px; margin-bottom: 48px; }
          .cs-results { grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 48px; }
          .cs-divider { margin-bottom: 44px; }
          .cs-g1 { width: 280px; height: 280px; }
          .cs-g2 { width: 220px; height: 220px; }
          .cs-arrow { width: 30px; height: 30px; }
        }

        @media (max-width: 420px) {
          .cs-wrap { padding: 140px 14px 160px; }
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

          {/* ── back ── */}
          <Reveal delay={0}>
            <button className="cs-back" onClick={handleBack}>
              <RxArrowTopRight style={{ transform: "rotate(180deg)", fontSize: 15 }} />
              Back to Work
            </button>
          </Reveal>

          {/* ── title ── */}
          <Reveal delay={0.06}>
            <h1 className="cs-title">
              Case Study: <span>[Home Furniture]</span>
            </h1>
          </Reveal>

          {/* ── hero grid ── */}
          <div className="cs-hero">

            {/* LEFT — meta + stats */}
            <div className="cs-hero-left">
              <Reveal delay={0.1}>
                <p className="cs-meta"><span className="cs-meta-lbl">Marketing Objectives:</span><span className="cs-meta-val">Conversion Campaign</span></p>
                <p className="cs-meta"><span className="cs-meta-lbl">Industry:</span><span className="cs-meta-val">E-commerce</span></p>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="cs-gap" />
                <p className="cs-meta"><span className="cs-meta-lbl">Platform:</span><span className="cs-meta-val">Snapchat & Google Ads</span></p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="cs-gap" />
                <p className="cs-meta"><span className="cs-meta-lbl">Country:</span><span className="cs-meta-val">Saudi Arabia</span></p>
              </Reveal>

              <div style={{ height: 22 }} />

              {[
                { lbl: "Total Purchases (Snapchat):", val: <><Counter target={93} /> Orders</>, cls: "" },
                { lbl: "CPP (Snapchat):", val: "$20.91", cls: "" },
                { lbl: "Total Revenue (Snapchat):", val: "$48,158", cls: "" },
                { lbl: "Total Sales (Google):", val: "SAR 510K", cls: "" },
                { lbl: "ROAS (Google):", val: "98.2x", cls: "--accent" },
                { lbl: "Total Clicks (Google):", val: "20.8K Clicks", cls: "--big" },
              ].map((item, i) => (
                <Reveal key={i} delay={0.22 + i * 0.06}>
                  <div className="cs-stat" style={{ marginBottom: item.cls ? 18 : 12 }}>
                    <span className="cs-stat-lbl">{item.lbl}</span>
                    <span className={`cs-stat-val${item.cls}`}>{item.val}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* RIGHT — slider */}
            <div className="cs-hero-right">
              <Reveal delay={0.18} dir="left">
                <ImageSlider images={sliderImages} />
              </Reveal>
            </div>

          </div>

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
                A Saudi home furniture brand — selling beds, sofas, and home decor — was running Snapchat and Google campaigns
                with no clear structure or optimization. Budgets were scattered, audiences were broad, and there was zero
                cross-platform synergy. ROAS was low, CPP was way above target, and the brand was leaving massive
                revenue on the table despite strong organic demand in the Saudi market.
              </p>
            </Reveal>
            <div className="cs-metrics">
              {[
                { lbl: "Starting ROAS", val: "~3x" },
                { lbl: "CPP Before", val: "$46+" },
                { lbl: "Total Orders", val: "123+" },
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
                { n: "01", t: "Google Shopping & Search Structure", d: "Rebuilt the campaign architecture with product-level bidding, separating brand vs. non-brand terms and optimizing Smart Shopping feeds for Saudi inventory." },
                { n: "02", t: "Meta Conversion Funnel", d: "Built a full-funnel Meta setup: awareness through broad creatives → retargeting warm audiences → conversion-optimized ad sets for high-AOV furniture items." },
                { n: "03", t: "Audience Layering & Lookalikes", d: "Built high-intent lookalikes from past purchasers segmented by product category (beds, sofas, decor), then layered them over interest-based audiences for precise targeting." },
                { n: "04", t: "Creative & Offer Optimization", d: "Developed product-focused creatives highlighting key purchase triggers — installment options, fast delivery, and quality — which drove CTR up and CPP down from $46 → $19.88." },
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
                { lbl: "ROAS (Google)",      display: "98.2x",     change: "Actual ROAS" },
                { lbl: "Sales (Google)",     display: "SAR 510K",  change: "Total Revenue" },
                { lbl: "Revenue (Snapchat)", display: "$48,158",   change: "Total Value" },
                { lbl: "Purchases (Snap)",   display: "93 Orders", change: "Conversions" },
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
                    {m.display ?? <Counter target={m.target} />}
                  </div>
                  <div className="cs-rc-lbl">{m.lbl}</div>
                  <div className="cs-rc-change">{m.change}</div>
                </motion.div>
              ))}
            </div>
          </section>

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

        </div>
      </div>
    </>
  );
}
