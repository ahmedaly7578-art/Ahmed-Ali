import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { RxArrowTopRight } from "react-icons/rx";

// ─── Fade variants ────────────────────────────────────────────────────────────
const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

// ─── Animated Counter ─────────────────────────────────────────────────────────
const Counter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = numeric;
    const duration = 1800;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(1)));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numeric]);

  return (
    <span ref={ref}>
      {value.startsWith("$") ? "$" : ""}
      {count % 1 === 0 ? Math.floor(count).toLocaleString() : count}
      {suffix}
    </span>
  );
};

// ─── Section wrapper with scroll reveal ──────────────────────────────────────
const Section = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeIn("up", delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const caseStudy = {
  title: "Bags & Shoes",
  subtitle: "From 1.8x to 6.36x ROAS — Scaling a Saudi Fashion Brand on Snapchat",
  industry: "E-commerce",
  platform: "Snapchat",
  country: "Saudi Arabia",
  duration: "Campaign Period",
  objective: "Conversion Campaign",
  services: ["Performance Ads", "Snapchat Ads", "Retargeting", "CRO"],

  challenge: {
    title: "The Challenge",
    description:
      "A fast-growing fashion brand selling bags and shoes in Saudi Arabia was struggling with high cost-per-purchase and an untapped Snapchat audience. Their existing campaigns lacked retargeting depth, precise event tracking, and creative strategy tailored for the platform — resulting in weak ROAS and unsustainable acquisition costs.",
    metrics: [
      { label: "Starting ROAS", value: "1.8x" },
      { label: "Avg. CPP", value: "$12.6" },
      { label: "Platform", value: "Snapchat" },
    ],
  },

  solution: {
    title: "Our Strategy",
    points: [
      {
        title: "Platform-Native Creative",
        description:
          "Produced Snapchat-first vertical video ads using UGC-style storytelling that felt organic in the feed — boosting thumb-stop rate by over 3x.",
      },
      {
        title: "Pixel & Event Architecture",
        description:
          "Rebuilt the Snap Pixel with server-side events for ADD_CART, PURCHASE, and VIEW_CONTENT — enabling smarter algorithmic optimization.",
      },
      {
        title: "Audience Segmentation",
        description:
          "Layered lookalikes on top of high-intent retargeting pools segmented by recency and product category for bags vs. shoes.",
      },
      {
        title: "Bid & Budget Optimization",
        description:
          "Shifted from manual CPM to Target Cost bidding with aggressive scaling windows on winning ad sets — reducing CPP from $45 to $12.6.",
      },
    ],
  },

  results: {
    title: "The Results",
    metrics: [
      { label: "ROAS", value: "6.36x", change: "+253%" },
      { label: "Total Orders", value: "2,437", change: "Purchases" },
      { label: "Total Sales", value: "734,974 SAR", change: "Revenue" },
      { label: "Total Spend", value: "$30,782", change: "Ad Spend" },
    ],
  },

  testimonial: {
    text: "The Snapchat results blew us away. We scaled from struggling campaigns to 6x ROAS — and we're still growing month over month.",
    author: "Brand Manager",
    role: "Bags & Shoes — Saudi Arabia",
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────
const CaseStudyPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0a1e 0%, #1a0f3a 40%, #0d1a2e 100%)",
        fontFamily: "'Sora', 'DM Sans', sans-serif",
      }}
    >
      {/* ── Ambient BG glows ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", filter: "blur(100px)" }}
        />
        <div
          className="absolute top-[50%] left-[50%] w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", filter: "blur(60px)", transform: "translate(-50%,-50%)" }}
        />
      </div>

      <div className="relative z-10">
        {/* ── Back Button ── */}
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          animate="show"
          className="container mx-auto px-6 pt-10"
        >
          <button
            className="flex items-center gap-2 text-white/50 hover:text-purple-400 transition-all text-sm group"
            onClick={() => window.history.back()}
          >
            <RxArrowTopRight className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </button>
        </motion.div>

        {/* ── HERO ── */}
        <motion.section
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-6 pt-16 pb-24"
        >
          {/* Tags */}
          <motion.div variants={fadeIn("up", 0.2)} initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-8">
            {caseStudy.services.map((s, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: "rgba(124,58,237,0.15)",
                  border: "1px solid rgba(124,58,237,0.4)",
                  color: "#a78bfa",
                }}
              >
                {s}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.div variants={fadeIn("up", 0.3)} initial="hidden" animate="show">
            <h1
              className="font-black leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.03em" }}
            >
              <span style={{ color: "#a78bfa" }}>Case Study:</span>
              <br />
              <span className="text-white">{caseStudy.title}</span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            className="text-lg text-white/60 max-w-2xl mb-12 leading-relaxed"
          >
            {caseStudy.subtitle}
          </motion.p>

          {/* Meta info bar */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-x-10 gap-y-4 text-sm pb-12"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              { label: "Marketing Objective", value: caseStudy.objective },
              { label: "Industry", value: caseStudy.industry },
              { label: "Platform", value: caseStudy.platform },
              { label: "Country", value: caseStudy.country },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-white/40 text-xs uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-white font-semibold">{item.value}</div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── HERO VISUAL — Dashboard mockup ── */}
        <Section className="container mx-auto px-6 mb-28">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(124,58,237,0.2)",
              boxShadow: "0 0 80px rgba(124,58,237,0.1)",
            }}
          >
            {/* Fake dashboard header */}
            <div
              className="px-6 py-4 flex items-center gap-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)" }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-4 text-white/30 text-xs">Snapchat Ads Manager — Campaign Dashboard</span>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
              {[
                { label: "Amount Spent", value: "$30,782.45" },
                { label: "Impressions", value: "3,903,822" },
                { label: "Conversion Rate", value: "0.38" },
                { label: "Purchases", value: "22,779" },
              ].map((s, i) => (
                <div key={i} className="px-6 py-5" style={{ background: "rgba(10,5,25,0.8)" }}>
                  <div className="text-white/40 text-xs mb-1">{s.label}</div>
                  <div className="text-white font-bold text-lg">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="p-6" style={{ background: "rgba(5,2,15,0.9)", minHeight: "220px" }}>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-8 h-0.5 bg-yellow-400" />
                  Purchase ROAS (return on ad spend)
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-8 h-0.5 bg-green-400" />
                  Paid Impressions
                </div>
              </div>

              {/* SVG chart */}
              <svg viewBox="0 0 900 160" className="w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="roasGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#facc15" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Impressions area */}
                <path
                  d="M0,120 C80,115 160,110 240,105 C320,100 380,108 440,95 C500,82 540,70 600,55 C660,40 720,30 780,20 C820,14 860,10 900,8 L900,160 L0,160 Z"
                  fill="url(#impGrad)"
                />
                <path
                  d="M0,120 C80,115 160,110 240,105 C320,100 380,108 440,95 C500,82 540,70 600,55 C660,40 720,30 780,20 C820,14 860,10 900,8"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2"
                  opacity="0.7"
                />
                {/* ROAS line */}
                <path
                  d="M0,140 C60,138 120,135 200,130 C280,125 320,120 380,118 C440,116 470,100 520,80 C570,60 620,40 680,25 C730,14 800,8 900,5"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="2.5"
                  opacity="0.9"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                  style={{ animation: "dash 2s ease forwards 0.5s" }}
                />
                <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
              </svg>
            </div>
          </div>
        </Section>

        {/* ── CHALLENGE ── */}
        <Section className="container mx-auto px-6 mb-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-4">01 — Challenge</div>
              <h2 className="font-black text-4xl md:text-5xl mb-6" style={{ letterSpacing: "-0.02em" }}>
                {caseStudy.challenge.title}
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">{caseStudy.challenge.description}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {caseStudy.challenge.metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="flex items-center justify-between px-7 py-5 rounded-xl"
                  style={{
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.2)",
                  }}
                >
                  <span className="text-white/60 text-sm">{m.label}</span>
                  <span className="font-black text-2xl text-white">{m.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SOLUTION ── */}
        <Section className="container mx-auto px-6 mb-28">
          <div className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-4">02 — Strategy</div>
          <h2 className="font-black text-4xl md:text-5xl mb-14" style={{ letterSpacing: "-0.02em" }}>
            {caseStudy.solution.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudy.solution.points.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-7 rounded-2xl cursor-default"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2">{p.title}</h3>
                    <p className="text-white/55 leading-relaxed text-sm">{p.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── RESULTS ── */}
        <Section className="container mx-auto px-6 mb-28">
          <div className="text-center mb-14">
            <div className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-4">03 — Results</div>
            <h2 className="font-black text-4xl md:text-5xl" style={{ letterSpacing: "-0.02em" }}>
              {caseStudy.results.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {caseStudy.results.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, type: "spring", stiffness: 120 }}
                className="relative p-7 rounded-2xl text-center overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.05) 100%)",
                  border: "1px solid rgba(124,58,237,0.35)",
                }}
              >
                {/* Glow dot */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-b-full"
                  style={{ background: "linear-gradient(90deg, transparent, #7c3aed, transparent)" }}
                />
                <div
                  className="font-black mb-1 text-transparent bg-clip-text"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    backgroundImage: "linear-gradient(135deg, #a78bfa, #e879f9)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.label === "ROAS" ? (
                    <><Counter value="6.36" />x</>
                  ) : m.label === "Total Orders" ? (
                    <Counter value="2437" />
                  ) : m.label === "Total Sales" ? (
                    <>734,974 <span style={{ fontSize: "0.6em" }}>SAR</span></>
                  ) : (
                    <>$<Counter value="30782" /></>
                  )}
                </div>
                <div className="text-white/70 text-sm font-medium mb-1">{m.label}</div>
                <div className="text-green-400 text-xs font-semibold">{m.change}</div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── KEY METRICS DETAIL ── */}
        <Section className="container mx-auto px-6 mb-28">
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 className="font-black text-2xl mb-8 text-white/80">Campaign Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Total Purchases", value: "2,437 Orders" },
                { label: "CPP (Cost Per Purchase)", value: "12.6 $" },
                { label: "Sales", value: "734,974 SAR" },
                { label: "A.O.V", value: "300 SAR" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-white/40 text-xs uppercase tracking-widest mb-2">{item.label}</div>
                  <div className="text-white font-bold text-xl">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── TESTIMONIAL ── */}
        <Section className="container mx-auto px-6 mb-28">
          <div
            className="max-w-4xl mx-auto rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{
              background: "rgba(124,58,237,0.07)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 0%, #7c3aed 0%, transparent 60%)",
              }}
            />
            <div
              className="text-8xl font-black text-purple-500/20 leading-none mb-4 select-none"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "
            </div>
            <p className="text-xl md:text-2xl text-white/85 italic leading-relaxed mb-8 relative z-10">
              {caseStudy.testimonial.text}
            </p>
            <div className="flex items-center justify-center gap-4 relative z-10">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm"
                style={{ background: "rgba(124,58,237,0.3)", color: "#a78bfa" }}
              >
                BM
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">{caseStudy.testimonial.author}</div>
                <div className="text-white/50 text-sm">{caseStudy.testimonial.role}</div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── CTA ── */}
        <Section className="container mx-auto px-6 pb-32 text-center">
          <h3
            className="font-black mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Ready to achieve{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #e879f9)" }}
            >
              similar results?
            </span>
          </h3>
          <p className="text-white/50 mb-10 text-lg">Let's build your next growth story.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 0 40px rgba(124,58,237,0.4)",
            }}
          >
            <span>Let's Talk</span>
            <RxArrowTopRight className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </Section>
      </div>
    </div>
  );
};

export default CaseStudyPage;
