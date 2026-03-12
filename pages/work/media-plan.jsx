import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxArrowTopRight } from "react-icons/rx";

/* ─────────────────────────────────────────
   Benchmark data per platform (realistic)
───────────────────────────────────────────*/
const BENCHMARKS = {
  // Realistic MENA/Saudi Arabia benchmarks based on real campaign data
  Snapchat: { ctr: 0.0080, cpc: 0.18, cr: 0.0035, cpm: 1.44, color: "#FFFC00", icon: "👻" },
  TikTok:   { ctr: 0.0100, cpc: 0.22, cr: 0.0030, cpm: 2.20, color: "#69C9D0", icon: "🎵" },
  Google:   { ctr: 0.0350, cpc: 0.55, cr: 0.0200, cpm: 19.25,color: "#4285F4", icon: "🔍" },
  Meta:     { ctr: 0.0120, cpc: 0.40, cr: 0.0120, cpm: 4.80, color: "#1877F2", icon: "📘" },
  Pinterest:{ ctr: 0.0050, cpc: 0.35, cr: 0.0060, cpm: 1.75, color: "#E60023", icon: "📌" },
};

function calcPlatform(platform, investment, aov) {
  const b = BENCHMARKS[platform];
  const impressions = Math.round(investment / b.cpm * 1000);
  const clicks      = Math.round(impressions * b.ctr);
  const orders      = Math.round(clicks * b.cr);
  const sales       = orders * aov;
  const cpc         = clicks > 0 ? investment / clicks : 0;
  const cps         = orders > 0 ? investment / orders : 0;
  const roas        = investment > 0 ? sales / investment : 0;
  return {
    platform,
    investment: investment.toFixed(2),
    pct:        0,
    impressions,
    clicks,
    ctr:        (b.ctr * 100).toFixed(2),
    cpc:        cpc.toFixed(2),
    cpm:        b.cpm.toFixed(2),
    cr:         (b.cr * 100).toFixed(2),
    orders,
    sales:      sales.toFixed(0),
    cps:        cps.toFixed(2),
    roas:       roas.toFixed(2),
  };
}

const fmt = (n) => Number(n).toLocaleString();

/* ── Donut Chart (pure SVG, no library needed) ── */
const DonutChart = ({ data }) => {
  const size = 220;
  const cx = size / 2, cy = size / 2;
  const r = 80, inner = 50;
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return null;

  let angle = -90; // start from top
  const slices = data.map(d => {
    const pct   = d.value / total;
    const sweep = pct * 360;
    const start = angle;
    angle += sweep;
    return { ...d, pct, sweep, start };
  });

  const polar = (deg, radius) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };

  const arc = (s) => {
    const [x1, y1] = polar(s.start, r);
    const [x2, y2] = polar(s.start + s.sweep, r);
    const [ix1, iy1] = polar(s.start, inner);
    const [ix2, iy2] = polar(s.start + s.sweep, inner);
    const large = s.sweep > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1} Z`;
  };

  const [hovered, setHovered] = React.useState(null);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
      <svg width={size} height={size} style={{ flexShrink: 0 }}>
        {slices.map((s, i) => (
          <path
            key={i}
            d={arc(s)}
            fill={s.color}
            opacity={hovered === null || hovered === i ? 1 : 0.4}
            style={{ cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        {/* center label */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Sora, sans-serif">
          {hovered !== null ? slices[hovered].label : "Revenue"}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="Sora, sans-serif">
          {hovered !== null ? `${(slices[hovered].pct * 100).toFixed(1)}%` : "Split"}
        </text>
      </svg>

      {/* legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {slices.map((s, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", opacity: hovered === null || hovered === i ? 1 : 0.4, transition: "opacity 0.2s" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{s.label}</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginLeft: 4 }}>{(s.pct * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────────*/
export default function MediaPlanGenerator() {
  const [step, setStep]         = useState("form"); // form | result
  const [loading, setLoading]   = useState(false);
  const resultRef               = useRef(null);

  // form state
  const [clientName, setClientName]   = useState("");
  const [budget, setBudget]           = useState("");
  const [aov, setAov]                 = useState("");
  const [industry, setIndustry]       = useState("E-commerce");
  const [country, setCountry]         = useState("Saudi Arabia");
  const [platforms, setPlatforms]     = useState(["Snapchat", "TikTok", "Google"]);
  const [splits, setSplits]           = useState({ Snapchat: 40, TikTok: 30, Google: 30 });

  // result state
  const [plan, setPlan] = useState(null);

  const allPlatforms = Object.keys(BENCHMARKS);

  const togglePlatform = (p) => {
    setPlatforms(prev => {
      const next = prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p];
      // reset splits evenly
      const even = next.length > 0 ? Math.floor(100 / next.length) : 0;
      const newSplits = {};
      next.forEach((pl, i) => {
        newSplits[pl] = i === next.length - 1 ? 100 - even * (next.length - 1) : even;
      });
      setSplits(newSplits);
      return next;
    });
  };

  const updateSplit = (p, val) => {
    setSplits(prev => ({ ...prev, [p]: Number(val) }));
  };

  const totalSplit = platforms.reduce((s, p) => s + (splits[p] || 0), 0);

  const handleGenerate = async () => {
    if (!clientName || !budget || !aov || platforms.length === 0) return;
    if (totalSplit !== 100) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const b = parseFloat(budget);
    const a = parseFloat(aov);
    const rows = platforms.map(p => {
      const inv = b * (splits[p] / 100);
      const row = calcPlatform(p, inv, a);
      row.pct = splits[p];
      return row;
    });

    const totalInv    = rows.reduce((s, r) => s + parseFloat(r.investment), 0);
    const totalOrders = rows.reduce((s, r) => s + r.orders, 0);
    const totalSales  = rows.reduce((s, r) => s + parseFloat(r.sales), 0);
    const totalROAS   = totalInv > 0 ? (totalSales / totalInv).toFixed(2) : 0;
    const totalImpr   = rows.reduce((s, r) => s + r.impressions, 0);
    const totalClicks = rows.reduce((s, r) => s + r.clicks, 0);

    setPlan({
      clientName, budget: b, aov: a, industry, country,
      rows, totalInv, totalOrders, totalSales, totalROAS, totalImpr, totalClicks,
      date: new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long" }),
    });
    setLoading(false);
    setStep("result");
  };

  const handlePrint = () => window.print();

  /* ── STYLES ── */
  const S = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&display=swap');

    .mp * { box-sizing: border-box; margin: 0; padding: 0; }

    .mp {
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

    .mp-glow1 {
      position: fixed; top: -10%; left: -5%;
      width: 500px; height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%);
      filter: blur(70px); pointer-events: none; z-index: 0;
    }
    .mp-glow2 {
      position: fixed; bottom: 5%; right: -8%;
      width: 380px; height: 380px; border-radius: 50%;
      background: radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%);
      filter: blur(85px); pointer-events: none; z-index: 0;
    }

    .mp-wrap {
      position: relative; z-index: 1;
      max-width: 1100px; margin: 0 auto;
      padding: 120px 40px 140px;
    }

    /* ── form ── */
    .mp-title {
      font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 900; letter-spacing: -0.03em;
      margin-bottom: 8px;
    }
    .mp-title span {
      background: linear-gradient(90deg,#a78bfa,#e879f9);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .mp-sub { color: rgba(255,255,255,0.45); font-size: 15px; margin-bottom: 48px; }

    .mp-form-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 16px; margin-bottom: 32px;
    }
    .mp-field { display: flex; flex-direction: column; gap: 8px; }
    .mp-label { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; }
    .mp-input {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px; padding: 12px 16px;
      color: #fff; font-size: 15px; font-family: 'Sora', sans-serif;
      outline: none; transition: border-color 0.2s;
    }
    .mp-input:focus { border-color: rgba(167,139,250,0.5); }
    .mp-input::placeholder { color: rgba(255,255,255,0.2); }

    .mp-section-title { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px; }

    /* platform toggle */
    .mp-platforms { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 32px; }
    .mp-ptag {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 9px 18px; border-radius: 999px; font-size: 13px; font-weight: 600;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.03);
      cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.5);
    }
    .mp-ptag.active {
      background: rgba(167,139,250,0.15);
      border-color: rgba(167,139,250,0.4);
      color: #fff;
    }

    /* splits */
    .mp-splits { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
    .mp-split-row { display: flex; align-items: center; gap: 14px; }
    .mp-split-label { width: 90px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); flex-shrink: 0; }
    .mp-split-input {
      width: 70px; background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
      padding: 8px 12px; color: #fff; font-size: 14px;
      font-family: 'Sora', sans-serif; outline: none;
    }
    .mp-split-bar { flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
    .mp-split-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg,#7c3aed,#a855f7); transition: width 0.3s; }
    .mp-split-pct { font-size: 13px; color: rgba(255,255,255,0.4); width: 36px; text-align: right; }
    .mp-split-warning { font-size: 12px; color: #f87171; margin-top: 4px; }
    .mp-split-ok { font-size: 12px; color: #4ade80; margin-top: 4px; }

    /* generate btn */
    .mp-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg,#7c3aed,#a855f7);
      border: none; border-radius: 999px;
      padding: 14px 36px; color: #fff;
      font-size: 15px; font-weight: 700;
      font-family: 'Sora', sans-serif; cursor: pointer;
      box-shadow: 0 0 24px rgba(124,58,237,0.35);
      transition: all 0.2s;
    }
    .mp-btn:hover { box-shadow: 0 0 44px rgba(124,58,237,0.55); transform: scale(1.03); }
    .mp-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .mp-back-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: none; border: 1px solid rgba(255,255,255,0.12);
      border-radius: 999px; padding: 10px 22px;
      color: rgba(255,255,255,0.5); font-size: 13px;
      font-family: 'Sora', sans-serif; cursor: pointer;
      transition: all 0.2s; margin-right: 12px;
    }
    .mp-back-btn:hover { border-color: rgba(167,139,250,0.4); color: #a78bfa; }

    /* ── result ── */
    .mp-result-header { margin-bottom: 40px; }
    .mp-result-client { font-size: clamp(1.6rem,3.5vw,2.6rem); font-weight: 900; letter-spacing: -0.025em; margin-bottom: 6px; }
    .mp-result-client span { background: linear-gradient(90deg,#a78bfa,#e879f9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .mp-result-meta { color: rgba(255,255,255,0.45); font-size: 14px; display: flex; flex-wrap: wrap; gap: 16px; }
    .mp-result-meta span::before { content: '·'; margin-right: 8px; color: rgba(255,255,255,0.2); }
    .mp-result-meta span:first-child::before { display: none; }

    /* summary cards */
    .mp-summary { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 48px; }
    .mp-scard {
      background: linear-gradient(135deg,rgba(124,58,237,0.18),rgba(124,58,237,0.04));
      border: 1px solid rgba(124,58,237,0.28); border-radius: 12px;
      padding: 22px 16px; text-align: center; position: relative; overflow: hidden;
    }
    .mp-scard-line {
      position: absolute; top: 0; left: 50%; transform: translateX(-50%);
      width: 52px; height: 2px;
      background: linear-gradient(90deg,transparent,#7c3aed,transparent);
    }
    .mp-scard-val {
      font-size: clamp(1.1rem,2vw,1.6rem); font-weight: 900;
      background: linear-gradient(135deg,#a78bfa,#e879f9);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 6px; letter-spacing: -0.02em;
    }
    .mp-scard-lbl { font-size: 12px; color: rgba(255,255,255,0.5); }

    /* table */
    .mp-table-wrap {
      border-radius: 14px; overflow: hidden;
      border: 1px solid rgba(255,255,255,0.07);
      margin-bottom: 48px;
    }
    .mp-table { width: 100%; border-collapse: collapse; }
    .mp-table th {
      background: rgba(124,58,237,0.12);
      color: rgba(255,255,255,0.5); font-size: 11px;
      text-transform: uppercase; letter-spacing: 0.1em;
      padding: 14px 16px; text-align: left; font-weight: 600;
    }
    .mp-table td { padding: 14px 16px; font-size: 14px; border-top: 1px solid rgba(255,255,255,0.05); }
    .mp-table tr:hover td { background: rgba(255,255,255,0.02); }
    .mp-table .mp-platform-cell { display: flex; align-items: center; gap: 8px; font-weight: 700; }
    .mp-table .mp-total-row td { background: rgba(124,58,237,0.08); font-weight: 700; color: #fff; border-top: 1px solid rgba(124,58,237,0.25); }
    .mp-roas-badge {
      display: inline-block; padding: 3px 10px; border-radius: 999px;
      font-size: 12px; font-weight: 700;
      background: rgba(74,222,128,0.15); color: #4ade80;
    }

    /* platform breakdown */
    .mp-breakdown { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 48px; }
    .mp-bcard {
      background: rgba(255,255,255,0.025);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px; padding: 22px;
      transition: border-color 0.2s;
    }
    .mp-bcard:hover { border-color: rgba(167,139,250,0.3); }
    .mp-bcard-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .mp-bcard-icon { font-size: 20px; }
    .mp-bcard-name { font-weight: 800; font-size: 16px; }
    .mp-bcard-pct { margin-left: auto; font-size: 12px; color: rgba(255,255,255,0.4); }
    .mp-bcard-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; font-size: 13px; }
    .mp-bcard-lbl { color: rgba(255,255,255,0.45); }
    .mp-bcard-val { font-weight: 700; color: #fff; }
    .mp-bcard-roas { font-size: 28px; font-weight: 900; background: linear-gradient(135deg,#a78bfa,#e879f9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-top: 12px; }

    /* print */
    .mp-actions { display: flex; align-items: center; margin-bottom: 40px; flex-wrap: wrap; gap: 12px; }
    .mp-print-btn {
      display: inline-flex; align-items: center; gap: 7px;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
      border-radius: 999px; padding: 10px 22px;
      color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 600;
      font-family: 'Sora', sans-serif; cursor: pointer; transition: all 0.2s;
    }
    .mp-print-btn:hover { border-color: rgba(167,139,250,0.4); color: #a78bfa; }

    @media print {
      .mp-actions, .mp-glow1, .mp-glow2 { display: none !important; }
      .mp { background: #fff !important; color: #000 !important; }
      .mp-scard, .mp-bcard { border: 1px solid #ddd !important; background: #f9f9f9 !important; }
      .mp-table th { background: #f0f0f0 !important; color: #333 !important; }
    }

    /* responsive */
    @media (max-width: 768px) {
      .mp-wrap { padding: 100px 18px 120px; }
      .mp-form-grid { grid-template-columns: 1fr; }
      .mp-summary { grid-template-columns: 1fr 1fr; }
      .mp-breakdown { grid-template-columns: 1fr; }
      .mp-table-wrap { overflow-x: auto; }
      .mp-table { min-width: 700px; }
    }
    @media (max-width: 480px) {
      .mp-summary { grid-template-columns: 1fr 1fr; }
    }
  `;

  return (
    <>
      <style>{S}</style>
      <div className="mp">
        <div className="mp-glow1" /><div className="mp-glow2" />
        <div className="mp-wrap">

          {/* ── FORM ── */}
          <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div key="form" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }}>

              <h1 className="mp-title">Media Plan <span>Generator</span></h1>
              <p className="mp-sub">أدخل بيانات الـ client وأنا هولد الـ media plan كاملة</p>

              {/* basic info */}
              <div className="mp-form-grid">
                <div className="mp-field">
                  <label className="mp-label">Client Name</label>
                  <input className="mp-input" placeholder="e.g. Fashion Store" value={clientName} onChange={e => setClientName(e.target.value)} />
                </div>
                <div className="mp-field">
                  <label className="mp-label">Industry</label>
                  <input className="mp-input" placeholder="e.g. E-commerce" value={industry} onChange={e => setIndustry(e.target.value)} />
                </div>
                <div className="mp-field">
                  <label className="mp-label">Total Budget ($)</label>
                  <input className="mp-input" type="number" placeholder="e.g. 5000" value={budget} onChange={e => setBudget(e.target.value)} />
                </div>
                <div className="mp-field">
                  <label className="mp-label">Avg. Order Value (AOV) ($)</label>
                  <input className="mp-input" type="number" placeholder="e.g. 300" value={aov} onChange={e => setAov(e.target.value)} />
                </div>
                <div className="mp-field">
                  <label className="mp-label">Country</label>
                  <input className="mp-input" placeholder="e.g. Saudi Arabia" value={country} onChange={e => setCountry(e.target.value)} />
                </div>
              </div>

              {/* platforms */}
              <p className="mp-section-title">Select Platforms</p>
              <div className="mp-platforms">
                {allPlatforms.map(p => (
                  <div key={p} className={`mp-ptag ${platforms.includes(p) ? "active" : ""}`} onClick={() => togglePlatform(p)}>
                    <span>{BENCHMARKS[p].icon}</span>{p}
                  </div>
                ))}
              </div>

              {/* budget split */}
              {platforms.length > 0 && (
                <>
                  <p className="mp-section-title">Budget Split % — Total: {totalSplit}%</p>
                  {totalSplit !== 100
                    ? <p className="mp-split-warning">⚠ Total must equal 100% (currently {totalSplit}%)</p>
                    : <p className="mp-split-ok">✓ Budget split is valid</p>
                  }
                  <div className="mp-splits" style={{ marginTop: 14 }}>
                    {platforms.map(p => (
                      <div key={p} className="mp-split-row">
                        <span className="mp-split-label">{BENCHMARKS[p].icon} {p}</span>
                        <input
                          className="mp-split-input"
                          type="number" min="0" max="100"
                          value={splits[p] || 0}
                          onChange={e => updateSplit(p, e.target.value)}
                        />
                        <div className="mp-split-bar">
                          <div className="mp-split-fill" style={{ width: `${splits[p] || 0}%` }} />
                        </div>
                        <span className="mp-split-pct">{splits[p] || 0}%</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <button
                className="mp-btn"
                onClick={handleGenerate}
                disabled={loading || !clientName || !budget || !aov || platforms.length === 0 || totalSplit !== 100}
              >
                {loading ? "Generating..." : "Generate Media Plan"}
                <RxArrowTopRight style={{ fontSize: 16 }} />
              </button>

            </motion.div>
          )}

          {/* ── RESULT ── */}
          {step === "result" && plan && (
            <motion.div key="result" ref={resultRef} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}>

              {/* actions */}
              <div className="mp-actions">
                <button className="mp-back-btn" onClick={() => setStep("form")}>
                  ← Edit Plan
                </button>
                <button className="mp-print-btn" onClick={handlePrint}>
                  🖨 Save as PDF
                </button>
              </div>

              {/* header */}
              <div className="mp-result-header">
                <div className="mp-result-client">
                  Media Plan: <span>[{plan.clientName}]</span>
                </div>
                <div className="mp-result-meta">
                  <span>{plan.date}</span>
                  <span>{plan.industry}</span>
                  <span>{plan.country}</span>
                  <span>Budget: ${fmt(plan.budget)}</span>
                  <span>AOV: ${fmt(plan.aov)}</span>
                </div>
              </div>

              {/* summary cards */}
              <div className="mp-summary">
                {[
                  { lbl: "Total Budget",    val: `$${fmt(plan.totalInv.toFixed(0))}` },
                  { lbl: "Expected Orders", val: fmt(plan.totalOrders) },
                  { lbl: "Expected Sales",  val: `$${fmt(plan.totalSales.toFixed(0))}` },
                  { lbl: "Overall ROAS",    val: `${plan.totalROAS}x` },
                ].map((c, i) => (
                  <motion.div key={i} className="mp-scard" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.08 }}>
                    <div className="mp-scard-line" />
                    <div className="mp-scard-val">{c.val}</div>
                    <div className="mp-scard-lbl">{c.lbl}</div>
                  </motion.div>
                ))}
              </div>

              {/* table */}
              <div className="mp-table-wrap">
                <table className="mp-table">
                  <thead>
                    <tr>
                      <th>Platform</th>
                      <th>Investment</th>
                      <th>% Budget</th>
                      <th>Impressions</th>
                      <th>Clicks</th>
                      <th>CTR</th>
                      <th>CPC</th>
                      <th>CR</th>
                      <th>Orders</th>
                      <th>Sales</th>
                      <th>CPS</th>
                      <th>ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.rows.map((r, i) => (
                      <tr key={i}>
                        <td>
                          <div className="mp-platform-cell">
                            <span>{BENCHMARKS[r.platform].icon}</span>
                            {r.platform}
                          </div>
                        </td>
                        <td>${fmt(r.investment)}</td>
                        <td>{r.pct}%</td>
                        <td>{fmt(r.impressions)}</td>
                        <td>{fmt(r.clicks)}</td>
                        <td>{r.ctr}%</td>
                        <td>${r.cpc}</td>
                        <td>{r.cr}%</td>
                        <td>{fmt(r.orders)}</td>
                        <td>${fmt(r.sales)}</td>
                        <td>${r.cps}</td>
                        <td><span className="mp-roas-badge">{r.roas}x</span></td>
                      </tr>
                    ))}
                    <tr className="mp-total-row">
                      <td>Total</td>
                      <td>${fmt(plan.totalInv.toFixed(0))}</td>
                      <td>100%</td>
                      <td>{fmt(plan.totalImpr)}</td>
                      <td>{fmt(plan.totalClicks)}</td>
                      <td>—</td><td>—</td><td>—</td>
                      <td>{fmt(plan.totalOrders)}</td>
                      <td>${fmt(plan.totalSales.toFixed(0))}</td>
                      <td>—</td>
                      <td><span className="mp-roas-badge">{plan.totalROAS}x</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── Revenue Chart ── */}
              <p className="mp-section-title" style={{ marginBottom: 20 }}>Expected Revenue per Platform</p>
              <div style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14, padding: "28px 32px",
                marginBottom: 48,
              }}>
                <DonutChart
                  data={plan.rows.map(r => ({
                    label: r.platform,
                    value: parseFloat(r.sales),
                    color: BENCHMARKS[r.platform].color,
                  }))}
                />
              </div>

              {/* platform breakdown cards */}
              <p className="mp-section-title">Platform Breakdown</p>
              <div className="mp-breakdown">
                {plan.rows.map((r, i) => (
                  <motion.div key={i} className="mp-bcard" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.1 }}>
                    <div className="mp-bcard-header">
                      <span className="mp-bcard-icon">{BENCHMARKS[r.platform].icon}</span>
                      <span className="mp-bcard-name">{r.platform}</span>
                      <span className="mp-bcard-pct">{r.pct}% of budget</span>
                    </div>
                    {[
                      ["Investment",   `$${fmt(r.investment)}`],
                      ["Impressions",  fmt(r.impressions)],
                      ["Clicks",       fmt(r.clicks)],
                      ["Orders",       fmt(r.orders)],
                      ["Sales",        `$${fmt(r.sales)}`],
                      ["CPS",          `$${r.cps}`],
                    ].map(([l, v]) => (
                      <div key={l} className="mp-bcard-row">
                        <span className="mp-bcard-lbl">{l}</span>
                        <span className="mp-bcard-val">{v}</span>
                      </div>
                    ))}
                    <div className="mp-bcard-roas">{r.roas}x ROAS</div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}
