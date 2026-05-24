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

  const onDragStart = (clientX) => { setDragging(true); setStartX(clientX); setDragDelta(0); };
  const onDragMove = (clientX) => { if (!dragging) return; setDragDelta(clientX - startX); };
  const onDragEnd = () => {
    if (dragDelta < -50) next();
    else if (dragDelta > 50) prev();
    setDragging(false); setDragDelta(0);
  };

  return (
    <div
      className="cs4-slider"
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onMouseLeave={() => { if (dragging) onDragEnd(); }}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
    >
      <div
        className="cs4-slider-track"
        style={{
          transform: `translateX(calc(-${current * 100}% + ${dragging ? dragDelta : 0}px))`,
          transition: dragging ? "none" : "transform 0.48s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {images.map((src, i) => (
          <div className="cs4-slide" key={i}>
            <img src={src} alt={`Screenshot ${i + 1}`} draggable={false} />
          </div>
        ))}
      </div>
      <button className="cs4-arrow cs4-arrow--left" onClick={prev}>
        <RxArrowTopRight style={{ transform: "rotate(225deg)", fontSize: 18 }} />
      </button>
      <button className="cs4-arrow cs4-arrow--right" onClick={next}>
        <RxArrowTopRight style={{ fontSize: 18 }} />
      </button>
      <div className="cs4-dots">
        {images.map((_, i) => (
          <button key={i} className={`cs4-dot${i === current ? " cs4-dot--active" : ""}`} onClick={() => setCurrent(i)} />
        ))}
      </div>
      <div className="cs4-slide-counter">{current + 1} / {total}</div>
    </div>
  );
};

export default function CaseStudyPage4() {
  const router = useRouter();
  const sliderImages = ["/case4-1.png"];

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/work");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');

        .cs4 * { box-sizing: border-box; margin: 0; padding: 0; }

        .cs4 {
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

        .cs4-g1, .cs4-g2 {
          position: fixed; border-radius: 50%;
          pointer-events: none; z-index: 0;
        }
        .cs4-g1 {
          top: -10%; left: -5%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%);
          filter: blur(70px);
        }
        .cs4-g2 {
          bottom: 5%; right: -8%; width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 70%);
          filter: blur(85px);
        }

        .cs4-wrap {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 120px 40px 140px;
        }

        /* ── back ── */
        .cs4-back {
          display: inline-flex; align-items: center; gap: 7px;
          background: none; border: none;
          color: rgba(255,255,255,0.4);
          font-size: 13px; font-family: 'Sora', sans-serif; font-weight: 500;
          cursor: pointer; padding: 8px 0; margin-bottom: 36px;
          transition: color 0.2s; position: relative; z-index: 50;
        }
        .cs4-back:hover { color: #a78bfa; }

        /* ── title ── */
        .cs4-title {
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 900; letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 48px; color: #fff;
        }
        .cs4-title span {
          background: linear-gradient(90deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── BIG hero number ── */
        .cs4-hero-number {
          margin-bottom: 64px;
          padding: 44px 48px;
          background: linear-gradient(135deg, rgba(124,58,237,0.14), rgba(124,58,237,0.04));
          border: 1px solid rgba(124,58,237,0.28);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .cs4-hero-number::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #7c3aed, #e879f9, transparent);
        }
        .cs4-hn-main { flex: 1; min-width: 220px; }
        .cs4-hn-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(167,139,250,0.7); margin-bottom: 6px;
        }
        .cs4-hn-val {
          font-size: clamp(2.8rem, 6vw, 4.8rem);
          font-weight: 900; letter-spacing: -0.04em;
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1;
        }
        .cs4-hn-sub { color: rgba(255,255,255,0.4); font-size: 13px; margin-top: 8px; }
        .cs4-hn-pills { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
        .cs4-pill {
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px; padding: 8px 16px;
          font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.75);
        }
        .cs4-pill-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
        }

        /* ── meta + stats grid ── */
        .cs4-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          margin-bottom: 72px;
          align-items: start;
        }

        .cs4-meta { margin-bottom: 10px; font-size: 15.5px; line-height: 1.6; }
        .cs4-meta-lbl { color: rgba(255,255,255,0.44); font-weight: 400; }
        .cs4-meta-val { color: #fff; font-weight: 700; margin-left: 4px; }

        /* stat cards inline */
        .cs4-stats-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .cs4-scard {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 18px 16px;
          transition: border-color 0.2s;
        }
        .cs4-scard:hover { border-color: rgba(167,139,250,0.3); }
        .cs4-scard-lbl { color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 7px; }
        .cs4-scard-val { font-size: 22px; font-weight: 900; color: #fff; letter-spacing: -0.02em; }
        .cs4-scard-val--accent {
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── divider ── */
        .cs4-divider { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 64px; }

        /* ── section ── */
        .cs4-tag {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: #a78bfa; margin-bottom: 10px;
        }
        .cs4-sh {
          font-size: clamp(1.3rem, 2.4vw, 2rem);
          font-weight: 800; letter-spacing: -0.025em; color: #fff; margin-bottom: 20px;
        }

        /* ── challenge metrics ── */
        .cs4-metrics {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 14px; margin-top: 28px; margin-bottom: 64px;
        }
        .cs4-mc {
          background: rgba(167,139,250,0.07);
          border: 1px solid rgba(167,139,250,0.14);
          border-radius: 10px; padding: 18px 20px;
        }
        .cs4-mc-lbl { color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 7px; }
        .cs4-mc-val { font-size: 26px; font-weight: 900; color: #fff; }

        /* ── strategy ── */
        .cs4-strategy {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 14px; margin-bottom: 64px;
        }
        .cs4-sc {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 22px;
          transition: border-color 0.25s, transform 0.2s;
        }
        .cs4-sc:hover { border-color: rgba(167,139,250,0.4); transform: translateY(-3px); }
        .cs4-sc-num {
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(167,139,250,0.14); color: #a78bfa;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; margin-bottom: 12px;
        }
        .cs4-sc-title { font-weight: 700; font-size: 14.5px; color: #fff; margin-bottom: 8px; }
        .cs4-sc-desc { color: rgba(255,255,255,0.48); font-size: 13px; line-height: 1.7; }

        /* ── results ── */
        .cs4-results {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 13px; margin-bottom: 64px;
        }
        .cs4-rc {
          background: linear-gradient(135deg, rgba(124,58,237,0.18), rgba(124,58,237,0.04));
          border: 1px solid rgba(124,58,237,0.28);
          border-radius: 12px; padding: 22px 12px;
          text-align: center; position: relative; overflow: hidden;
        }
        .cs4-rc-line {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 52px; height: 2px; border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, transparent, #7c3aed, transparent);
        }
        .cs4-rc-val {
          font-size: clamp(1.2rem, 2vw, 1.75rem); font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 6px; letter-spacing: -0.02em;
        }
        .cs4-rc-lbl { font-size: 12px; color: rgba(255,255,255,0.55); margin-bottom: 4px; }
        .cs4-rc-change { font-size: 11px; color: #4ade80; font-weight: 600; }

        /* ── CTA ── */
        .cs4-cta { text-align: center; }
        .cs4-cta-h { font-size: clamp(1.3rem, 2.6vw, 1.9rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 24px; color: #fff; }
        .cs4-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 999px;
          padding: 13px 34px; color: #fff;
          font-size: 14px; font-weight: 700; font-family: 'Sora', sans-serif;
          cursor: pointer;
          box-shadow: 0 0 24px rgba(124,58,237,0.35);
          transition: box-shadow 0.25s, transform 0.2s;
        }
        .cs4-btn:hover { box-shadow: 0 0 44px rgba(124,58,237,0.55); transform: scale(1.04); }


        /* ── slider ── */
        .cs4-slider {
          position: relative; border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(167,139,250,0.22);
          box-shadow: 0 14px 60px rgba(124,58,237,0.22), 0 2px 12px rgba(0,0,0,0.5);
          user-select: none; cursor: grab; touch-action: pan-y;
          height: 360px; background: rgba(14,11,31,0.6);
          margin-bottom: 64px;
        }
        .cs4-slider:active { cursor: grabbing; }
        .cs4-slider-track { display: flex; width: 100%; height: 100%; }
        .cs4-slide { min-width: 100%; flex-shrink: 0; height: 100%; overflow: hidden; }
        .cs4-slide img { width: 100%; height: 100%; display: block; pointer-events: none; object-fit: cover; object-position: top; }
        .cs4-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(14,11,31,0.72); border: 1px solid rgba(167,139,250,0.28);
          color: #a78bfa; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s; z-index: 10;
        }
        .cs4-arrow:hover { background: rgba(124,58,237,0.4); }
        .cs4-arrow--left { left: 12px; }
        .cs4-arrow--right { right: 12px; }
        .cs4-dots { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 10; }
        .cs4-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.25); border: none; cursor: pointer; transition: background 0.2s, transform 0.2s; padding: 0; }
        .cs4-dot--active { background: #a78bfa; transform: scale(1.3); }
        .cs4-slide-counter { position: absolute; top: 12px; right: 12px; background: rgba(14,11,31,0.7); border: 1px solid rgba(167,139,250,0.22); border-radius: 999px; padding: 3px 10px; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.6); z-index: 10; font-family: 'Sora', sans-serif; }

        /* ════ RESPONSIVE ════ */
        @media (max-width: 960px) {
          .cs4-wrap { padding: 130px 28px 100px; }
          .cs4-top { grid-template-columns: 1fr; gap: 32px; }
          .cs4-hero-number { padding: 32px 28px; }
        }
        @media (max-width: 720px) {
          .cs4-wrap { padding: 140px 18px 160px; }
          .cs4-title { font-size: clamp(1.65rem, 7vw, 2.2rem); margin-bottom: 32px; }
          .cs4-hero-number { flex-direction: column; align-items: flex-start; gap: 20px; margin-bottom: 40px; }
          .cs4-hn-val { font-size: clamp(2.2rem, 11vw, 3.2rem); }
          .cs4-metrics { grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 48px; }
          .cs4-strategy { grid-template-columns: 1fr; gap: 10px; margin-bottom: 48px; }
          .cs4-results { grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 48px; }
          .cs4-stats-grid { grid-template-columns: 1fr 1fr; }
          .cs4-slider { height: 220px; }
          .cs4-g1 { width: 280px; height: 280px; }
          .cs4-g2 { width: 220px; height: 220px; }
        }
        @media (max-width: 420px) {
          .cs4-wrap { padding: 140px 14px 160px; }
          .cs4-metrics { grid-template-columns: 1fr; }
          .cs4-stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cs4">
        <div className="cs4-g1" />
        <div className="cs4-g2" />

        <div className="cs4-wrap">

          {/* back */}
          <Reveal delay={0}>
            <button className="cs4-back" onClick={handleBack}>
              <RxArrowTopRight style={{ transform: "rotate(180deg)", fontSize: 15 }} />
              Back to Work
            </button>
          </Reveal>

          {/* title */}
          <Reveal delay={0.06}>
            <h1 className="cs4-title">
              Case Study: <span>[Medical Fashion]</span>
            </h1>
          </Reveal>

          {/* ── BIG hero number ── */}
          <Reveal delay={0.1}>
            <div className="cs4-hero-number">
              <div className="cs4-hn-main">
                <div className="cs4-hn-label">Total Revenue — May 2026</div>
                <div className="cs4-hn-val">
                  SAR <Counter target={1257910} />
                </div>
                <div className="cs4-hn-sub">May 1 – May 24, 2026 &nbsp;·&nbsp; 2,644 Orders &nbsp;·&nbsp; ROAS 12x</div>
              </div>
              <div className="cs4-hn-pills">
                <div className="cs4-pill">
                  <span className="cs4-pill-dot" style={{ background: "#69C9D0" }} />
                  TikTok
                </div>
                <div className="cs4-pill">
                  <span className="cs4-pill-dot" style={{ background: "#FFFC00" }} />
                  Snapchat
                </div>
                <div className="cs4-pill">
                  <span className="cs4-pill-dot" style={{ background: "#E1306C" }} />
                  Instagram
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── dashboard screenshot ── */}
          <Reveal delay={0.15} dir="up">
            <ImageSlider images={sliderImages} />
          </Reveal>

          {/* ── meta + stat cards ── */}
          <div className="cs4-top">
            <Reveal delay={0.12}>
              <div>
                <p className="cs4-meta"><span className="cs4-meta-lbl">Marketing Objectives:</span><span className="cs4-meta-val">Full-Funnel Conversions</span></p>
                <p className="cs4-meta"><span className="cs4-meta-lbl">Industry:</span><span className="cs4-meta-val">Medical Fashion / E-commerce</span></p>
                <p className="cs4-meta"><span className="cs4-meta-lbl">Platforms:</span><span className="cs4-meta-val">TikTok · Snapchat · Instagram</span></p>
                <p className="cs4-meta"><span className="cs4-meta-lbl">Country:</span><span className="cs4-meta-val">Saudi Arabia</span></p>
                <p className="cs4-meta"><span className="cs4-meta-lbl">Period:</span><span className="cs4-meta-val">May 1 – May 24, 2026</span></p>
              </div>
            </Reveal>

            <div className="cs4-stats-grid">
              {[
                { lbl: "Total Revenue", val: "SAR 1.25M", accent: true },
                { lbl: "ROAS", val: "12x", accent: true },
                { lbl: "Total Orders", val: "2,644" },
                { lbl: "Net Sales", val: "SAR 1.003M" },
              ].map((s, i) => (
                <Reveal key={i} delay={0.14 + i * 0.06}>
                  <div className="cs4-scard">
                    <div className="cs4-scard-lbl">{s.lbl}</div>
                    <div className={`cs4-scard-val${s.accent ? " cs4-scard-val--accent" : ""}`}>{s.val}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="cs4-divider" />

          {/* ── challenge ── */}
          <section style={{ marginBottom: 64 }}>
            <Reveal delay={0.05}>
              <div className="cs4-tag">01 — Challenge</div>
              <h2 className="cs4-sh">The Challenge</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.58)", lineHeight: 1.8, maxWidth: 700, fontSize: 15 }}>
                A Saudi medical fashion brand — scrubs, uniforms, and clinical apparel — with a solid product
                and zero paid social presence. The brand had strong word-of-mouth but was completely invisible
                on the platforms where their audience actually spends time: TikTok, Snapchat, and Instagram.
                The challenge wasn't the product. It was building a paid growth engine from scratch across
                three platforms simultaneously — and making the numbers work from day one.
              </p>
            </Reveal>
            <div className="cs4-metrics">
              {[
                { lbl: "Paid Social Before", val: "Zero" },
                { lbl: "Target ROAS", val: "5x+" },
                { lbl: "Platforms Live", val: "3" },
              ].map((m, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div className="cs4-mc">
                    <div className="cs4-mc-lbl">{m.lbl}</div>
                    <div className="cs4-mc-val">{m.val}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── strategy ── */}
          <section style={{ marginBottom: 64 }}>
            <Reveal>
              <div className="cs4-tag">02 — Strategy</div>
              <h2 className="cs4-sh">Our Strategy</h2>
            </Reveal>
            <div className="cs4-strategy">
              {[
                {
                  n: "01", t: "Platform-Native Creative per Channel",
                  d: "Each platform got its own creative format. TikTok got raw, authentic UGC-style content showing the product in real clinical settings. Snapchat got fast-cut vertical ads optimized for swipe-up. Instagram got polished product visuals for a higher-AOV audience."
                },
                {
                  n: "02", t: "Simultaneous Multi-Platform Launch",
                  d: "Instead of testing one platform at a time, we launched all three simultaneously with controlled budgets — letting the data tell us where the best CPP was fastest, then doubling down within week one."
                },
                {
                  n: "03", t: "Medical Niche Audience Targeting",
                  d: "Built hyper-specific audience segments around healthcare workers, medical students, and hospital staff across all three platforms — cutting out irrelevant traffic and driving purchase intent from day one."
                },
                {
                  n: "04", t: "Conversion Funnel Optimization",
                  d: "Set up full pixel tracking and server-side events across all platforms. Ran aggressive retargeting on add-to-cart and checkout abandoners — keeping CPP low and ROAS consistently above target at 12x."
                },
              ].map((p, i) => (
                <Reveal key={i} delay={0.08 + i * 0.07}>
                  <div className="cs4-sc">
                    <div className="cs4-sc-num">{p.n}</div>
                    <div className="cs4-sc-title">{p.t}</div>
                    <div className="cs4-sc-desc">{p.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── results ── */}
          <section style={{ marginBottom: 64 }}>
            <Reveal>
              <div className="cs4-tag" style={{ display: "block", textAlign: "center" }}>03 — Results</div>
              <h2 className="cs4-sh" style={{ textAlign: "center" }}>The Results</h2>
            </Reveal>
            <div className="cs4-results">
              {[
                { lbl: "Total Revenue",  display: "SAR 1.25M", change: "In 24 Days" },
                { lbl: "ROAS",           display: "12x",       change: "↑ 2.4x Target" },
                { lbl: "Total Orders",   target: 2644,         change: "Conversions" },
                { lbl: "Net Sales",      display: "SAR 1M+",   change: "After All Costs" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  className="cs4-rc"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.5 }}
                >
                  <div className="cs4-rc-line" />
                  <div className="cs4-rc-val">
                    {m.display ?? <Counter target={m.target} />}
                  </div>
                  <div className="cs4-rc-lbl">{m.lbl}</div>
                  <div className="cs4-rc-change">{m.change}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <Reveal>
            <div className="cs4-cta">
              <h3 className="cs4-cta-h">SAR 1.25M in 24 days. Your brand next?</h3>
              <button className="cs4-btn" onClick={() => router.push("/contact")}>
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
