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
      className="cs5-slider"
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onMouseLeave={() => { if (dragging) onDragEnd(); }}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
      onTouchEnd={onDragEnd}
    >
      <div
        className="cs5-slider-track"
        style={{
          transform: `translateX(calc(-${current * 100}% + ${dragging ? dragDelta : 0}px))`,
          transition: dragging ? "none" : "transform 0.48s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {images.map((src, i) => (
          <div className="cs5-slide" key={i}>
            <img src={src} alt={`Screenshot ${i + 1}`} draggable={false} />
          </div>
        ))}
      </div>
      {total > 1 && <>
        <button className="cs5-arrow cs5-arrow--left" onClick={prev}>
          <RxArrowTopRight style={{ transform: "rotate(225deg)", fontSize: 18 }} />
        </button>
        <button className="cs5-arrow cs5-arrow--right" onClick={next}>
          <RxArrowTopRight style={{ fontSize: 18 }} />
        </button>
        <div className="cs5-dots">
          {images.map((_, i) => (
            <button key={i} className={`cs5-dot${i === current ? " cs5-dot--active" : ""}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
      </>}
      <div className="cs5-slide-counter">{current + 1} / {total}</div>
    </div>
  );
};

export default function CaseStudyPage5() {
  const router = useRouter();
  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/work");
  };

  const sliderImages = ["/case5-1.png"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');

        .cs5 * { box-sizing: border-box; margin: 0; padding: 0; }

        .cs5 {
          width: 100%; min-height: 100vh; max-height: 100vh;
          background-color: #0e0b1f; color: #fff;
          font-family: 'Sora', 'Segoe UI', sans-serif;
          position: relative; overflow-y: auto; overflow-x: hidden;
        }

        .cs5-g1, .cs5-g2 {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
        }
        .cs5-g1 {
          top: -10%; left: -5%; width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%);
          filter: blur(70px);
        }
        .cs5-g2 {
          bottom: 5%; right: -8%; width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 70%);
          filter: blur(85px);
        }

        .cs5-wrap {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 120px 40px 140px;
        }

        /* back */
        .cs5-back {
          display: inline-flex; align-items: center; gap: 7px;
          background: none; border: none; color: rgba(255,255,255,0.4);
          font-size: 13px; font-family: 'Sora', sans-serif; font-weight: 500;
          cursor: pointer; padding: 8px 0; margin-bottom: 36px;
          transition: color 0.2s; position: relative; z-index: 50;
        }
        .cs5-back:hover { color: #a78bfa; }

        /* title */
        .cs5-title {
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 900; letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: 48px; color: #fff;
        }
        .cs5-title span {
          background: linear-gradient(90deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* hero grid */
        .cs5-hero {
          display: grid; grid-template-columns: 1fr 1.65fr;
          gap: 60px; align-items: start; margin-bottom: 72px;
        }

        /* meta */
        .cs5-meta { margin-bottom: 8px; font-size: 15.5px; line-height: 1.6; }
        .cs5-meta-lbl { color: rgba(255,255,255,0.48); font-weight: 400; }
        .cs5-meta-val { color: #fff; font-weight: 700; margin-left: 4px; }
        .cs5-gap { height: 14px; }

        /* stats */
        .cs5-stat { display: flex; align-items: baseline; gap: 5px; margin-bottom: 13px; flex-wrap: wrap; }
        .cs5-stat-lbl { color: rgba(255,255,255,0.48); font-size: 15px; font-weight: 400; }
        .cs5-stat-val { color: #fff; font-size: 17px; font-weight: 800; }
        .cs5-stat-val--accent {
          font-size: 33px; font-weight: 900; letter-spacing: -0.025em;
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .cs5-stat-val--big { font-size: 27px; font-weight: 900; letter-spacing: -0.02em; color: #fff; }

        /* slider */
        .cs5-slider {
          position: relative; border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(167,139,250,0.22);
          box-shadow: 0 14px 60px rgba(124,58,237,0.22), 0 2px 12px rgba(0,0,0,0.5);
          user-select: none; cursor: grab; touch-action: pan-y;
          height: 340px; background: rgba(14,11,31,0.6);
        }
        .cs5-slider:active { cursor: grabbing; }
        .cs5-slider-track { display: flex; width: 100%; height: 100%; }
        .cs5-slide { min-width: 100%; flex-shrink: 0; height: 100%; overflow: hidden; }
        .cs5-slide img { width: 100%; height: 100%; display: block; pointer-events: none; object-fit: cover; object-position: top; }
        .cs5-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(14,11,31,0.72); border: 1px solid rgba(167,139,250,0.28);
          color: #a78bfa; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s; z-index: 10;
        }
        .cs5-arrow:hover { background: rgba(124,58,237,0.4); }
        .cs5-arrow--left { left: 12px; }
        .cs5-arrow--right { right: 12px; }
        .cs5-dots { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 10; }
        .cs5-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.25); border: none; cursor: pointer; transition: background 0.2s, transform 0.2s; padding: 0; }
        .cs5-dot--active { background: #a78bfa; transform: scale(1.3); }
        .cs5-slide-counter {
          position: absolute; top: 12px; right: 12px;
          background: rgba(14,11,31,0.7); border: 1px solid rgba(167,139,250,0.22);
          border-radius: 999px; padding: 3px 10px; font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.6); z-index: 10; font-family: 'Sora', sans-serif;
        }

        /* divider */
        .cs5-divider { height: 1px; background: rgba(255,255,255,0.06); margin-bottom: 64px; }

        /* section */
        .cs5-tag {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase; color: #a78bfa; margin-bottom: 10px;
        }
        .cs5-sh {
          font-size: clamp(1.3rem, 2.4vw, 2rem);
          font-weight: 800; letter-spacing: -0.025em; color: #fff; margin-bottom: 20px;
        }

        /* challenge metrics */
        .cs5-metrics {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 14px; margin-top: 28px; margin-bottom: 64px;
        }
        .cs5-mc {
          background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.14);
          border-radius: 10px; padding: 18px 20px;
        }
        .cs5-mc-lbl { color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 7px; }
        .cs5-mc-val { font-size: 26px; font-weight: 900; color: #fff; }

        /* strategy */
        .cs5-strategy { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 64px; }
        .cs5-sc {
          background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 22px; transition: border-color 0.25s, transform 0.2s;
        }
        .cs5-sc:hover { border-color: rgba(167,139,250,0.4); transform: translateY(-3px); }
        .cs5-sc-num {
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(167,139,250,0.14); color: #a78bfa;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; margin-bottom: 12px;
        }
        .cs5-sc-title { font-weight: 700; font-size: 14.5px; color: #fff; margin-bottom: 8px; }
        .cs5-sc-desc { color: rgba(255,255,255,0.48); font-size: 13px; line-height: 1.7; }

        /* results */
        .cs5-results { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; margin-bottom: 64px; }
        .cs5-rc {
          background: linear-gradient(135deg, rgba(124,58,237,0.18), rgba(124,58,237,0.04));
          border: 1px solid rgba(124,58,237,0.28); border-radius: 12px;
          padding: 22px 12px; text-align: center; position: relative; overflow: hidden;
        }
        .cs5-rc-line {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 52px; height: 2px; border-radius: 0 0 4px 4px;
          background: linear-gradient(90deg, transparent, #7c3aed, transparent);
        }
        .cs5-rc-val {
          font-size: clamp(1.2rem, 2vw, 1.75rem); font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 6px; letter-spacing: -0.02em;
        }
        .cs5-rc-lbl { font-size: 12px; color: rgba(255,255,255,0.55); margin-bottom: 4px; }
        .cs5-rc-change { font-size: 11px; color: #4ade80; font-weight: 600; }

        /* CTA */
        .cs5-cta { text-align: center; }
        .cs5-cta-h { font-size: clamp(1.3rem, 2.6vw, 1.9rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 24px; color: #fff; }
        .cs5-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 999px; padding: 13px 34px; color: #fff;
          font-size: 14px; font-weight: 700; font-family: 'Sora', sans-serif;
          cursor: pointer; box-shadow: 0 0 24px rgba(124,58,237,0.35);
          transition: box-shadow 0.25s, transform 0.2s;
        }
        .cs5-btn:hover { box-shadow: 0 0 44px rgba(124,58,237,0.55); transform: scale(1.04); }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .cs5-wrap { padding: 130px 28px 100px; }
          .cs5-hero { grid-template-columns: 1fr 1.3fr; gap: 36px; }
        }
        @media (max-width: 720px) {
          .cs5-wrap { padding: 140px 18px 160px; }
          .cs5-hero { grid-template-columns: 1fr; gap: 22px; margin-bottom: 48px; }
          .cs5-hero-left { order: 2; }
          .cs5-hero-right { order: 1; }
          .cs5-title { font-size: clamp(1.65rem, 7vw, 2.2rem); margin-bottom: 32px; }
          .cs5-metrics { grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 48px; }
          .cs5-strategy { grid-template-columns: 1fr; gap: 10px; margin-bottom: 48px; }
          .cs5-results { grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 48px; }
          .cs5-slider { height: 220px; }
          .cs5-g1 { width: 280px; height: 280px; }
          .cs5-g2 { width: 220px; height: 220px; }
        }
        @media (max-width: 420px) {
          .cs5-wrap { padding: 140px 14px 160px; }
          .cs5-metrics { grid-template-columns: 1fr; }
          .cs5-stat-val--accent { font-size: 26px; }
          .cs5-stat-val--big { font-size: 22px; }
        }
      `}</style>

      <div className="cs5">
        <div className="cs5-g1" />
        <div className="cs5-g2" />

        <div className="cs5-wrap">

          {/* back */}
          <Reveal delay={0}>
            <button className="cs5-back" onClick={handleBack}>
              <RxArrowTopRight style={{ transform: "rotate(180deg)", fontSize: 15 }} />
              Back to Work
            </button>
          </Reveal>

          {/* title */}
          <Reveal delay={0.06}>
            <h1 className="cs5-title">
              Case Study: <span>[Coffee & Gourmet]</span>
            </h1>
          </Reveal>

          {/* hero grid */}
          <div className="cs5-hero">

            {/* LEFT */}
            <div className="cs5-hero-left">
              <Reveal delay={0.1}>
                <p className="cs5-meta"><span className="cs5-meta-lbl">Marketing Objectives:</span><span className="cs5-meta-val">Conversion Campaign</span></p>
                <p className="cs5-meta"><span className="cs5-meta-lbl">Industry:</span><span className="cs5-meta-val">E-commerce / Gourmet Food</span></p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="cs5-gap" />
                <p className="cs5-meta"><span className="cs5-meta-lbl">Platform:</span><span className="cs5-meta-val">TikTok</span></p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="cs5-gap" />
                <p className="cs5-meta"><span className="cs5-meta-lbl">Country:</span><span className="cs5-meta-val">Saudi Arabia</span></p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="cs5-gap" />
                <p className="cs5-meta"><span className="cs5-meta-lbl">Period:</span><span className="cs5-meta-val">May 2026</span></p>
              </Reveal>

              <div style={{ height: 22 }} />

              {[
                { lbl: "Total Revenue:",  val: "SAR 139,853",         cls: "" },
                { lbl: "ROAS:",            val: "34x",                  cls: "--accent" },
                { lbl: "Total Orders:",   val: <Counter target={1001} suffix=" Orders" />, cls: "" },
                { lbl: "Store Visits:",   val: <Counter target={37824} suffix=" Visits" />, cls: "" },
                { lbl: "Platform:",       val: "TikTok Ads",           cls: "" },
              ].map((item, i) => (
                <Reveal key={i} delay={0.24 + i * 0.06}>
                  <div className="cs5-stat" style={{ marginBottom: item.cls ? 18 : 12 }}>
                    <span className="cs5-stat-lbl">{item.lbl}</span>
                    <span className={`cs5-stat-val${item.cls}`}>{item.val}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* RIGHT — slider */}
            <div className="cs5-hero-right">
              <Reveal delay={0.18} dir="left">
                <ImageSlider images={sliderImages} />
              </Reveal>
            </div>

          </div>

          {/* divider */}
          <div className="cs5-divider" />

          {/* challenge */}
          <section style={{ marginBottom: 64 }}>
            <Reveal delay={0.05}>
              <div className="cs5-tag">01 — Challenge</div>
              <h2 className="cs5-sh">The Challenge</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "rgba(255,255,255,0.58)", lineHeight: 1.8, maxWidth: 700, fontSize: 15 }}>
                A premium Saudi gourmet brand — specialty roasted coffee, fresh-roasted nuts, and luxury
                chocolate under one roof — sitting on an exceptional product with almost no paid social presence.
                The brand had everything: quality, story, and differentiation. What it didn't have was a TikTok
                strategy that could turn scroll-stoppers into buyers. The challenge was building one from scratch
                and making it profitable fast in one of the most competitive food categories in Saudi.
              </p>
            </Reveal>
            <div className="cs5-metrics">
              {[
                { lbl: "Paid TikTok Before", val: "Zero" },
                { lbl: "Market", val: "Highly Competitive" },
                { lbl: "Product Categories", val: "3" },
              ].map((m, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div className="cs5-mc">
                    <div className="cs5-mc-lbl">{m.lbl}</div>
                    <div className="cs5-mc-val">{m.val}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* strategy */}
          <section style={{ marginBottom: 64 }}>
            <Reveal>
              <div className="cs5-tag">02 — Strategy</div>
              <h2 className="cs5-sh">Our Strategy</h2>
            </Reveal>
            <div className="cs5-strategy">
              {[
                {
                  n: "01", t: "TikTok-First Content Strategy",
                  d: "Built a content framework that felt native to TikTok — not ads, but craveable moments. Coffee roasting close-ups, nut textures, chocolate breaks — content designed to make people stop, watch, and want to buy."
                },
                {
                  n: "02", t: "Appetite-Driven Creative Testing",
                  d: "Ran rapid creative testing across all three product lines — coffee, nuts, and chocolate — to find which hooks converted fastest. Doubled down on winning formats within the first week of data."
                },
                {
                  n: "03", t: "Saudi Gourmet Audience Targeting",
                  d: "Built precise audience segments around specialty food lovers, gift buyers, and premium lifestyle consumers in Saudi Arabia — cutting broad traffic and driving high-intent visitors straight to product pages."
                },
                {
                  n: "04", t: "Funnel Optimization & Retargeting",
                  d: "Set up full TikTok Pixel with server-side events. Retargeted video viewers and product page visitors with direct-response creatives — keeping the purchase journey short and conversion rates high across 1,001 orders."
                },
              ].map((p, i) => (
                <Reveal key={i} delay={0.08 + i * 0.07}>
                  <div className="cs5-sc">
                    <div className="cs5-sc-num">{p.n}</div>
                    <div className="cs5-sc-title">{p.t}</div>
                    <div className="cs5-sc-desc">{p.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* results */}
          <section style={{ marginBottom: 64 }}>
            <Reveal>
              <div className="cs5-tag" style={{ display: "block", textAlign: "center" }}>03 — Results</div>
              <h2 className="cs5-sh" style={{ textAlign: "center" }}>The Results</h2>
            </Reveal>
            <div className="cs5-results">
              {[
                { lbl: "Total Revenue",  display: "SAR 139K",  change: "May 2026" },
                { lbl: "Total Orders",   target: 1001,         change: "Conversions" },
                { lbl: "Store Visits",   target: 37824,        change: "Organic + Paid" },
                { lbl: "ROAS",           display: "34x",       change: "Return on Ad Spend" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  className="cs5-rc"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.5 }}
                >
                  <div className="cs5-rc-line" />
                  <div className="cs5-rc-val">
                    {m.display ?? <Counter target={m.target} />}
                  </div>
                  <div className="cs5-rc-lbl">{m.lbl}</div>
                  <div className="cs5-rc-change">{m.change}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <Reveal>
            <div className="cs5-cta">
              <h3 className="cs5-cta-h">1,001 orders. One platform. Your brand next?</h3>
              <button className="cs5-btn" onClick={() => router.push("/contact")}>
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
