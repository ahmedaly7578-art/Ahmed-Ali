import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { RxArrowTopRight } from "react-icons/rx";
import { useRouter } from "next/router";

/* ── animated number counter ── */
const Counter = ({ target, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1600;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
};

/* ── reveal on scroll ── */
const Reveal = ({ children, delay = 0, dir = "up", className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: dir === "up" ? 28 : 0,
        x: dir === "left" ? 28 : dir === "right" ? -28 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const MetaRow = ({ label, value, bold = false }) => (
  <div style={{ marginBottom: 6, fontSize: 14, lineHeight: 1.6 }}>
    <span style={{ color: "rgba(255,255,255,0.5)" }}>{label}: </span>
    <span style={{ color: "#fff", fontWeight: bold ? 700 : 500 }}>{value}</span>
  </div>
);

const SectionHeading = ({ children }) => (
  <h2 style={{
    fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
    fontWeight: 800,
    marginBottom: 18,
    letterSpacing: "-0.02em",
    color: "#fff",
  }}>
    {children}
  </h2>
);

export default function CaseStudyPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0e0b1f",
      color: "#fff",
      fontFamily: "'Sora', 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-15%", left: "-8%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)",
          filter: "blur(70px)",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", right: "-10%",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "56px 32px 120px" }}>

        {/* back */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          onClick={() => router.push("/work")}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "none",
            color: "rgba(255,255,255,0.4)", fontSize: 13,
            cursor: "pointer", marginBottom: 44, padding: 0,
          }}
        >
          <RxArrowTopRight style={{ transform: "rotate(180deg)" }} />
          Back to Work
        </motion.button>

        {/* ── TITLE ── */}
        <Reveal delay={0.05}>
          <h1 style={{
            fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)",
            fontWeight: 900,
            margin: "0 0 36px",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}>
            Case Study:{" "}
            <span style={{
              background: "linear-gradient(90deg,#a78bfa,#e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              [Bags and Shoes ]
            </span>
          </h1>
        </Reveal>

        {/* ── MAIN TWO-COLUMN: meta left / image right ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.35fr",
          gap: 56,
          alignItems: "start",
          marginBottom: 72,
        }}>
          {/* LEFT */}
          <div>
            <Reveal delay={0.1}>
              <div style={{ marginBottom: 20 }}>
                <MetaRow label="Marketing  Objectives" value="ConversionCampaign" />
                <MetaRow label="Industry" value="E-commerce" bold />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ marginBottom: 20 }}>
                <MetaRow label="Platform" value="Snapchat" bold />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ marginBottom: 28 }}>
                <MetaRow label="Country" value="Saudi Arabia" bold />
              </div>
            </Reveal>

            {/* stats list */}
            {[
              {
                label: "Total Purchases",
                node: <><Counter target={2437} /> Orders</>,
              },
              {
                label: "CPP (Cost Per Purchase)",
                node: <>12.6 $</>,
              },
              {
                label: "Sales",
                node: <>734,974 SAR</>,
              },
              {
                label: "A.O.V",
                node: <>300 SAR</>,
              },
              {
                label: "ROAS",
                node: <>6.36</>,
                big: true,
                accent: true,
              },
              {
                label: "Total Spend",
                node: <><Counter target={30782} prefix="$" /></>,
                big: true,
              },
            ].map((item, i) => (
              <Reveal key={i} delay={0.22 + i * 0.07}>
                <div style={{ marginBottom: 12, lineHeight: 1.5 }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
                    {item.label}:{" "}
                  </span>
                  <span style={{
                    fontSize: item.big ? 24 : 15,
                    fontWeight: item.big ? 900 : 600,
                    color: item.accent ? "#a78bfa" : "#fff",
                    letterSpacing: item.big ? "-0.02em" : 0,
                  }}>
                    {item.node}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* RIGHT — screenshot */}
          <Reveal delay={0.18} dir="left">
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(167,139,250,0.22)",
                boxShadow: "0 12px 60px rgba(124,58,237,0.2), 0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src="/case.png"
                alt="Snapchat Ads Manager Dashboard"
                style={{ width: "100%", display: "block" }}
              />
            </motion.div>
          </Reveal>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 64 }} />

        {/* ── CHALLENGE ── */}
        <section style={{ marginBottom: 72 }}>
          <Reveal delay={0.05}>
            <div style={{
              display: "inline-block",
              fontSize: 11, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#a78bfa", marginBottom: 10,
            }}>
              01 — Challenge
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading>The Challenge</SectionHeading>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ color: "rgba(255,255,255,0.58)", lineHeight: 1.8, maxWidth: 680, marginBottom: 28, fontSize: 14.5 }}>
              A fast-growing fashion brand selling bags and shoes in Saudi Arabia was struggling with high
              cost-per-purchase and untapped Snapchat audience potential. Their campaigns lacked retargeting
              depth, event tracking, and platform-native creatives — resulting in weak ROAS and unsustainable
              acquisition costs.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              { label: "Starting ROAS", value: "1.8x" },
              { label: "CPP Before", value: "$45" },
              { label: "Conversion Rate", value: "1.2%" },
            ].map((m, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div style={{
                  background: "rgba(167,139,250,0.07)",
                  border: "1px solid rgba(167,139,250,0.14)",
                  borderRadius: 10, padding: "18px 22px",
                }}>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{m.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── STRATEGY ── */}
        <section style={{ marginBottom: 72 }}>
          <Reveal delay={0.05}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 10 }}>
              02 — Strategy
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading>Our Strategy</SectionHeading>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { n: "01", title: "Platform-Native Creative", desc: "Snapchat-first vertical UGC-style videos that felt organic — boosting thumb-stop rate by 3x." },
              { n: "02", title: "Pixel & Event Architecture", desc: "Rebuilt Snap Pixel with server-side events for PURCHASE, ADD_CART, VIEW_CONTENT for smarter optimization." },
              { n: "03", title: "Audience Segmentation", desc: "Layered lookalikes on high-intent retargeting pools segmented by recency and category." },
              { n: "04", title: "Bid & Budget Optimization", desc: "Shifted to Target Cost bidding with aggressive scaling on winners — dropping CPP from $45 → $12.6." },
            ].map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.07}>
                <motion.div
                  whileHover={{ y: -3 }}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 10, padding: "22px",
                    cursor: "default",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                >
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: "rgba(167,139,250,0.14)", color: "#a78bfa",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, marginBottom: 12,
                  }}>
                    {p.n}
                  </div>
                  <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 14.5, color: "#fff" }}>{p.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.48)", fontSize: 13, lineHeight: 1.7 }}>{p.desc}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section style={{ marginBottom: 72 }}>
          <Reveal delay={0.05}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 10, textAlign: "center" }}>
              03 — Results
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading><span style={{ display: "block", textAlign: "center" }}>The Results</span></SectionHeading>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {[
              { label: "ROAS", display: "6.36x", change: "+253%" },
              { label: "Total Orders", target: 2437, suffix: "", change: "Purchases" },
              { label: "Total Sales", display: "734,974 SAR", change: "Revenue" },
              { label: "Total Spend", target: 30782, prefix: "$", change: "Ad Spend" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  background: "linear-gradient(135deg,rgba(124,58,237,0.18),rgba(124,58,237,0.04))",
                  border: "1px solid rgba(124,58,237,0.28)",
                  borderRadius: 12, padding: "22px 14px",
                  textAlign: "center", position: "relative", overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: 60, height: 2, borderRadius: "0 0 4px 4px",
                  background: "linear-gradient(90deg,transparent,#7c3aed,transparent)",
                }} />
                <div style={{
                  fontSize: "clamp(1.3rem,2vw,1.75rem)", fontWeight: 900,
                  background: "linear-gradient(135deg,#a78bfa,#e879f9)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  marginBottom: 6, letterSpacing: "-0.02em",
                }}>
                  {m.display ?? <Counter target={m.target} prefix={m.prefix ?? ""} suffix={m.suffix ?? ""} />}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: "#4ade80", fontWeight: 600 }}>{m.change}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <Reveal delay={0.05}>
          <div style={{
            background: "rgba(167,139,250,0.06)",
            border: "1px solid rgba(167,139,250,0.14)",
            borderRadius: 16, padding: "44px 52px",
            maxWidth: 740, margin: "0 auto 72px",
          }}>
            <div style={{ fontSize: 56, color: "rgba(167,139,250,0.2)", lineHeight: 1, marginBottom: 4, fontFamily: "Georgia,serif" }}>"</div>
            <p style={{ fontSize: 17, fontStyle: "italic", color: "rgba(255,255,255,0.82)", lineHeight: 1.75, marginBottom: 22 }}>
              The Snapchat results blew us away. We scaled from struggling campaigns to 6x ROAS — and we're still growing month over month.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(167,139,250,0.18)", color: "#a78bfa",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700,
              }}>BM</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Brand Manager</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Bags &amp; Shoes — Saudi Arabia</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── CTA ── */}
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <h3 style={{
              fontSize: "clamp(1.4rem,2.8vw,2rem)",
              fontWeight: 800, marginBottom: 24, letterSpacing: "-0.02em",
            }}>
              Ready to achieve similar results?
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(124,58,237,0.55)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                border: "none", borderRadius: 999,
                padding: "13px 34px", color: "#fff",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 0 24px rgba(124,58,237,0.35)",
              }}
            >
              Let's Talk
              <RxArrowTopRight style={{ fontSize: 16 }} />
            </motion.button>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
