import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxArrowTopRight } from "react-icons/rx";

/* ── GROQ API KEY ── */
const GROQ_API_KEY = "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";

/* ── constants ── */
const PLATFORM_META = {
  Snapchat: { color: "#FFFC00", icon: "👻", bg: "rgba(255,252,0,0.08)" },
  TikTok:   { color: "#69C9D0", icon: "🎵", bg: "rgba(105,201,208,0.08)" },
  Google:   { color: "#4285F4", icon: "🔍", bg: "rgba(66,133,244,0.08)" },
  Meta:     { color: "#1877F2", icon: "📘", bg: "rgba(24,119,242,0.08)" },
  Pinterest:{ color: "#E60023", icon: "📌", bg: "rgba(230,0,35,0.08)" },
};
const ALL_PLATFORMS  = Object.keys(PLATFORM_META);
const OBJECTIVES     = ["Conversions / Sales", "Traffic", "Awareness / Reach", "Lead Generation"];
const PRODUCT_TYPES  = ["Fashion & Apparel", "Electronics", "Furniture & Home", "Food & Beverage", "Beauty & Skincare", "Sports & Fitness", "Jewelry", "Other"];
const fmt = (n) => Number(n).toLocaleString();

/* ══════════════════════════════════════════
   Donut Chart
══════════════════════════════════════════*/
const DonutChart = ({ data }) => {
  const [hovered, setHovered] = React.useState(null);
  const size = 200, cx = 100, cy = 100, r = 78, inner = 48;
  const total = data.reduce((s, d) => s + d.value, 0);
  if (!total) return null;
  let angle = -90;
  const slices = data.map(d => {
    const pct = d.value / total, sweep = pct * 360, start = angle;
    angle += sweep;
    return { ...d, pct, sweep, start };
  });
  const polar = (deg, radius) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };
  const arc = (s) => {
    const [x1,y1] = polar(s.start, r), [x2,y2] = polar(s.start+s.sweep, r);
    const [ix1,iy1] = polar(s.start, inner), [ix2,iy2] = polar(s.start+s.sweep, inner);
    const lg = s.sweep > 180 ? 1 : 0;
    return `M${x1} ${y1} A${r} ${r} 0 ${lg} 1 ${x2} ${y2} L${ix2} ${iy2} A${inner} ${inner} 0 ${lg} 0 ${ix1} ${iy1}Z`;
  };
  return (
    <div style={{ display:"flex", alignItems:"center", gap:32, flexWrap:"wrap" }}>
      <svg width={size} height={size} style={{ flexShrink:0 }}>
        {slices.map((s,i) => (
          <path key={i} d={arc(s)} fill={s.color}
            opacity={hovered===null||hovered===i?1:0.3}
            style={{ cursor:"pointer", transition:"opacity 0.2s", transformOrigin:"center",
              transform: hovered===i?"scale(1.04)":"scale(1)" }}
            onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)} />
        ))}
        <text x={cx} y={cy-10} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily="Sora,sans-serif">
          {hovered!==null ? slices[hovered].label : "Revenue"}
        </text>
        <text x={cx} y={cy+10} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontFamily="Sora,sans-serif">
          {hovered!==null ? `${(slices[hovered].pct*100).toFixed(1)}%` : "Split"}
        </text>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {slices.map((s,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer",
            opacity:hovered===null||hovered===i?1:0.4, transition:"opacity 0.2s" }}
            onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}>
            <div style={{ width:10, height:10, borderRadius:"50%", background:s.color, flexShrink:0 }}/>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.8)", fontWeight:600 }}>{s.label}</span>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>${fmt(Math.round(s.value))}</span>
            <span style={{ fontSize:12, color:s.color, fontWeight:700 }}>{(s.pct*100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   Performance Matrix
══════════════════════════════════════════*/
const thS = { background:"rgba(124,58,237,0.10)", color:"rgba(255,255,255,0.4)", fontSize:10,
  textTransform:"uppercase", letterSpacing:"0.1em", padding:"12px 14px", textAlign:"left", fontWeight:700, whiteSpace:"nowrap" };
const tdS = { padding:"12px 14px", fontSize:13, borderTop:"1px solid rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.82)" };

const PerformanceMatrix = ({ rows }) => {
  const metrics = [
    { key:"roas", label:"ROAS",         good: v => parseFloat(v) >= 4,   ok: v => parseFloat(v) >= 2   },
    { key:"ctr",  label:"CTR %",        good: v => parseFloat(v) >= 1,   ok: v => parseFloat(v) >= 0.5 },
    { key:"cr",   label:"Conv. Rate %", good: v => parseFloat(v) >= 1,   ok: v => parseFloat(v) >= 0.4 },
    { key:"cpm",  label:"CPM $",        good: v => parseFloat(v) <= 3,   ok: v => parseFloat(v) <= 8   },
    { key:"cpc",  label:"CPC $",        good: v => parseFloat(v) <= 0.5, ok: v => parseFloat(v) <= 1.5 },
  ];
  const getStatus = (metric, val) => {
    if (metric.good(val)) return { bg:"rgba(74,222,128,0.12)",  color:"#4ade80", label:"Excellent" };
    if (metric.ok(val))   return { bg:"rgba(251,191,36,0.12)",  color:"#fbbf24", label:"Good"      };
    return                       { bg:"rgba(248,113,113,0.12)", color:"#f87171", label:"Low"       };
  };
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", minWidth:620 }}>
        <thead>
          <tr>
            <th style={thS}>Platform</th>
            {metrics.map(m => <th key={m.key} style={thS}>{m.label}</th>)}
            <th style={thS}>Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const scores = metrics.map(m => getStatus(m, r[m.key]));
            const excellent = scores.filter(s => s.label === "Excellent").length;
            const score = Math.round((excellent / metrics.length) * 100);
            const barColor = score >= 80 ? "#4ade80" : score >= 50 ? "#fbbf24" : "#f87171";
            return (
              <tr key={i}>
                <td style={tdS}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, fontWeight:700 }}>
                    {PLATFORM_META[r.platform]?.icon} {r.platform}
                  </div>
                </td>
                {metrics.map((m, j) => {
                  const s = scores[j];
                  return (
                    <td key={m.key} style={tdS}>
                      <span style={{ background:s.bg, color:s.color, padding:"3px 10px",
                        borderRadius:999, fontSize:12, fontWeight:700 }}>
                        {r[m.key]}{m.key==="roas"?"x":""} — {s.label}
                      </span>
                    </td>
                  );
                })}
                <td style={tdS}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ flex:1, height:6, background:"rgba(255,255,255,0.06)", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ width:`${score}%`, height:"100%", borderRadius:3, background:barColor, transition:"width 0.6s" }}/>
                    </div>
                    <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.7)", width:32 }}>{score}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* ══════════════════════════════════════════
   Main
══════════════════════════════════════════*/
export default function MediaPlanGenerator() {
  const [step, setStep]       = useState("form");
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("Analyzing your inputs...");

  const [clientName, setClientName]   = useState("");
  const [budget, setBudget]           = useState("");
  const [aov, setAov]                 = useState("");
  const [industry, setIndustry]       = useState("E-commerce");
  const [country, setCountry]         = useState("Saudi Arabia");
  const [objective, setObjective]     = useState(OBJECTIVES[0]);
  const [productType, setProductType] = useState(PRODUCT_TYPES[0]);
  const [platforms, setPlatforms]     = useState(["Snapchat","TikTok","Google"]);
  const [splits, setSplits]           = useState({ Snapchat:40, TikTok:30, Google:30 });
  const [notes, setNotes]             = useState("");
  const [plan, setPlan]               = useState(null);
  const [aiText, setAiText]           = useState("");

  const totalSplit = platforms.reduce((s,p) => s+(splits[p]||0), 0);

  const togglePlatform = (p) => {
    setPlatforms(prev => {
      const next = prev.includes(p) ? prev.filter(x=>x!==p) : [...prev,p];
      const even = next.length ? Math.floor(100/next.length) : 0;
      const ns = {};
      next.forEach((pl,i) => { ns[pl] = i===next.length-1 ? 100-even*(next.length-1) : even; });
      setSplits(ns);
      return next;
    });
  };

  const handleGenerate = async () => {
    if (!clientName||!budget||!aov||!platforms.length||totalSplit!==100) return;
    setLoading(true);
    const msgs = ["Analyzing your inputs...", `Calculating benchmarks for ${country}...`, "AI is generating recommendations...", "Building your media plan..."];
    let mi = 0; setLoadMsg(msgs[0]);
    const interval = setInterval(() => { mi=(mi+1)%msgs.length; setLoadMsg(msgs[mi]); }, 1300);

    try {
      const prompt = `You are a senior performance marketing strategist specializing in MENA/GCC markets.
CRITICAL: Write ALL text fields in ENGLISH ONLY. No Arabic whatsoever.

Generate a media plan based on:
- Client: ${clientName}
- Industry: ${industry}
- Product Type: ${productType}
- Country: ${country}
- Objective: ${objective}
- Total Budget: $${budget}
- AOV: $${aov}
- Platforms: ${platforms.map(p=>`${p} (${splits[p]}%)`).join(", ")}
${notes ? `- Notes: ${notes}` : ""}

Return ONLY valid JSON (no markdown, no backticks, no explanation):
{
  "platforms": [{
    "platform": "Snapchat",
    "investment": 4000, "pct": 40,
    "impressions": 2500000, "clicks": 18000,
    "ctr": "0.72", "cpc": "0.22", "cpm": "1.60", "cr": "0.40",
    "orders": 72, "sales": 21600, "cps": "55.56", "roas": "5.40",
    "insight": "2-3 sentence strategic insight in English",
    "recommendation": "1 actionable recommendation in English",
    "audience": "Target audience in English",
    "bestFor": "What this platform excels at in English"
  }],
  "summary": {
    "totalInvestment": 10000, "totalImpressions": 5000000,
    "totalClicks": 35000, "totalOrders": 200,
    "totalSales": 60000, "totalROAS": "6.00",
    "overallStrategy": "3-4 sentence strategy in English",
    "topRecommendation": "Most important recommendation in English",
    "riskLevel": "Low",
    "expectedTimeToResults": "2-4 weeks"
  }
}
Benchmarks (MENA): Snapchat CPM $1.20-2.00 CTR 0.65-1% CR 0.30-0.55% | TikTok CPM $1.80-3.00 CTR 0.80-1.2% CR 0.25-0.45% | Google CPM $15-25 CTR 3-5% CR 1.5-3% | Meta CPM $3.50-6.00 CTR 0.9-1.4% CR 0.80-1.5%
Rules: sales=orders*AOV, ROAS=sales/investment. All numbers must be mathematically consistent.`;

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({ model:"llama-3.3-70b-versatile", max_tokens:1500, messages:[{ role:"user", content:prompt }] }),
      });
      const data   = await res.json();
      const raw    = data.choices?.[0]?.message?.content || "";
      const clean  = raw.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);

      setPlan({
        clientName, budget:parseFloat(budget), aov:parseFloat(aov),
        industry, country, objective, productType,
        rows: parsed.platforms,
        ...parsed.summary,
        date: new Date().toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"}),
      });
      setAiText(parsed.summary.overallStrategy || "");
      setStep("result");
    } catch(e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const S = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    .mp{width:100%;min-height:100vh;background:#0a0815;color:#fff;font-family:'Sora','Segoe UI',sans-serif;position:relative;overflow-y:auto;overflow-x:hidden;}
    .mp-glow1{position:fixed;top:-8%;left:-4%;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.16) 0%,transparent 70%);filter:blur(80px);pointer-events:none;z-index:0;}
    .mp-glow2{position:fixed;bottom:0;right:-6%;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(232,121,249,0.10) 0%,transparent 70%);filter:blur(90px);pointer-events:none;z-index:0;}
    .mp-wrap{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:120px 40px 160px;}
    .mp-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.35);border-radius:999px;padding:6px 14px;font-size:11px;font-weight:700;color:#a78bfa;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:18px;}
    .mp-title{font-size:clamp(2rem,4vw,3.2rem);font-weight:900;letter-spacing:-0.035em;margin-bottom:10px;line-height:1.1;}
    .mp-title span{background:linear-gradient(100deg,#a78bfa,#e879f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .mp-sub{color:rgba(255,255,255,0.4);font-size:15px;margin-bottom:52px;max-width:520px;line-height:1.6;}
    .mp-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent);margin:28px 0;}
    .mp-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px;}
    .mp-field{display:flex;flex-direction:column;gap:8px;}
    .mp-label{font-size:11px;font-weight:700;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.1em;}
    .mp-input,.mp-select,.mp-textarea{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.09);border-radius:10px;padding:12px 16px;color:#fff;font-size:14px;font-family:'Sora',sans-serif;outline:none;transition:border-color 0.2s,background 0.2s;width:100%;}
    .mp-input:focus,.mp-select:focus,.mp-textarea:focus{border-color:rgba(167,139,250,0.45);background:rgba(124,58,237,0.05);}
    .mp-input::placeholder,.mp-textarea::placeholder{color:rgba(255,255,255,0.18);}
    .mp-select option{background:#1a1030;color:#fff;}
    .mp-textarea{resize:vertical;min-height:80px;line-height:1.6;}
    .mp-sec-lbl{font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:14px;}
    .mp-platforms{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:32px;}
    .mp-ptag{display:inline-flex;align-items:center;gap:7px;padding:10px 20px;border-radius:999px;font-size:13px;font-weight:600;border:1px solid rgba(255,255,255,0.09);background:rgba(255,255,255,0.02);cursor:pointer;transition:all 0.2s;color:rgba(255,255,255,0.45);}
    .mp-ptag.on{background:rgba(167,139,250,0.14);border-color:rgba(167,139,250,0.4);color:#fff;}
    .mp-splits{display:flex;flex-direction:column;gap:12px;margin-top:14px;margin-bottom:32px;}
    .mp-srow{display:flex;align-items:center;gap:14px;}
    .mp-slbl{width:96px;font-size:13px;font-weight:600;color:rgba(255,255,255,0.65);flex-shrink:0;}
    .mp-snum{width:66px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px 10px;color:#fff;font-size:14px;font-family:'Sora',sans-serif;outline:none;text-align:center;}
    .mp-sbar{flex:1;height:5px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;}
    .mp-sfill{height:100%;border-radius:3px;background:linear-gradient(90deg,#7c3aed,#e879f9);transition:width 0.3s;}
    .mp-btn{display:inline-flex;align-items:center;gap:9px;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;border-radius:999px;padding:15px 40px;color:#fff;font-size:15px;font-weight:800;font-family:'Sora',sans-serif;cursor:pointer;box-shadow:0 0 28px rgba(124,58,237,0.4);transition:all 0.25s;}
    .mp-btn:hover{box-shadow:0 0 48px rgba(124,58,237,0.6);transform:translateY(-1px) scale(1.02);}
    .mp-btn:disabled{opacity:0.4;cursor:not-allowed;transform:none;box-shadow:none;}
    .mp-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:20px;text-align:center;}
    .mp-spinner{width:48px;height:48px;border:3px solid rgba(167,139,250,0.15);border-top:3px solid #a78bfa;border-radius:50%;animation:spin 0.9s linear infinite;}
    @keyframes spin{to{transform:rotate(360deg);}}
    .mp-res-title{font-size:clamp(1.7rem,3.5vw,2.8rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:8px;}
    .mp-res-title span{background:linear-gradient(100deg,#a78bfa,#e879f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .mp-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;margin-bottom:40px;}
    .mp-chip{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:999px;padding:5px 14px;font-size:12px;color:rgba(255,255,255,0.5);font-weight:500;}
    .mp-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px;}
    .mp-scard{background:linear-gradient(135deg,rgba(124,58,237,0.16),rgba(124,58,237,0.03));border:1px solid rgba(124,58,237,0.25);border-radius:14px;padding:24px 18px;text-align:center;position:relative;overflow:hidden;}
    .mp-scard::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:60px;height:2px;background:linear-gradient(90deg,transparent,#7c3aed,transparent);}
    .mp-scard-val{font-size:clamp(1.15rem,2vw,1.75rem);font-weight:900;letter-spacing:-0.025em;background:linear-gradient(135deg,#a78bfa,#e879f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:7px;}
    .mp-scard-lbl{font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.08em;}
    .mp-info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px;}
    .mp-info-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:18px 20px;}
    .mp-info-lbl{font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;}
    .mp-info-val{font-size:13px;font-weight:700;color:#fff;line-height:1.5;}
    .mp-ai-box{background:linear-gradient(135deg,rgba(124,58,237,0.09),rgba(232,121,249,0.05));border:1px solid rgba(167,139,250,0.18);border-radius:14px;padding:26px 30px;margin-bottom:28px;}
    .mp-ai-lbl{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;}
    .mp-ai-txt{font-size:14px;color:rgba(255,255,255,0.68);line-height:1.85;}
    .mp-table-wrap{border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);margin-bottom:44px;}
    .mp-tscroll{overflow-x:auto;}
    .mp-table{width:100%;border-collapse:collapse;min-width:820px;}
    .mp-table th{background:rgba(124,58,237,0.10);color:rgba(255,255,255,0.4);font-size:10px;text-transform:uppercase;letter-spacing:0.1em;padding:14px 16px;text-align:left;font-weight:700;white-space:nowrap;}
    .mp-table td{padding:14px 16px;font-size:13px;border-top:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.82);}
    .mp-table tr:hover td{background:rgba(255,255,255,0.016);}
    .mp-pcell{display:flex;align-items:center;gap:8px;font-weight:700;color:#fff;}
    .mp-tfoot td{background:rgba(124,58,237,0.07);font-weight:700;color:#fff;border-top:1px solid rgba(124,58,237,0.22);}
    .mp-rbadge{display:inline-block;padding:3px 11px;border-radius:999px;font-size:11px;font-weight:700;background:rgba(74,222,128,0.12);color:#4ade80;}
    .mp-chart-box{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:30px 32px;margin-bottom:44px;}
    .mp-matrix-box{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;margin-bottom:44px;}
    .mp-breakdown{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:44px;}
    .mp-bcard{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:24px;transition:border-color 0.2s,transform 0.2s;}
    .mp-bcard:hover{border-color:rgba(167,139,250,0.28);transform:translateY(-2px);}
    .mp-bhead{display:flex;align-items:center;gap:10px;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.06);}
    .mp-bicon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
    .mp-bname{font-weight:800;font-size:15px;}
    .mp-bpct{margin-left:auto;font-size:11px;color:rgba(255,255,255,0.32);font-weight:600;}
    .mp-brow{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:9px;font-size:13px;}
    .mp-blbl{color:rgba(255,255,255,0.38);}
    .mp-bval{font-weight:700;color:#fff;}
    .mp-broas{font-size:26px;font-weight:900;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);background:linear-gradient(135deg,#a78bfa,#e879f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
    .mp-binsight{font-size:12px;color:rgba(255,255,255,0.38);line-height:1.65;margin-top:8px;font-style:italic;}
    .mp-brec{font-size:12px;color:rgba(74,222,128,0.85);line-height:1.65;margin-top:6px;padding:8px 10px;background:rgba(74,222,128,0.06);border-radius:8px;border-left:2px solid #4ade80;}
    .mp-actions{display:flex;align-items:center;gap:12px;margin-bottom:40px;flex-wrap:wrap;}
    .mp-abtn{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:999px;padding:10px 22px;color:rgba(255,255,255,0.6);font-size:13px;font-weight:600;font-family:'Sora',sans-serif;cursor:pointer;transition:all 0.2s;}
    .mp-abtn:hover{border-color:rgba(167,139,250,0.4);color:#a78bfa;}
    .mp-print-btn{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#7c3aed,#a855f7);border:none;border-radius:999px;padding:10px 22px;color:#fff;font-size:13px;font-weight:700;font-family:'Sora',sans-serif;cursor:pointer;box-shadow:0 0 20px rgba(124,58,237,0.3);transition:all 0.2s;}
    .mp-print-btn:hover{box-shadow:0 0 32px rgba(124,58,237,0.55);}

    @media print {
      body,html{background:#fff!important;}
      .no-print{display:none!important;}
      .mp{background:#fff!important;color:#000!important;}
      .mp-glow1,.mp-glow2{display:none!important;}
      .mp-wrap{padding:20px!important;max-width:100%!important;}
      .mp-res-title{color:#1a0a2e!important;font-size:22px!important;}
      .mp-res-title span{-webkit-text-fill-color:#7c3aed!important;}
      .mp-chip{border-color:#ddd!important;color:#444!important;background:#f8f8f8!important;}
      .mp-scard{background:#f3f0ff!important;border-color:#c4b5fd!important;break-inside:avoid;}
      .mp-scard-val{-webkit-text-fill-color:#7c3aed!important;}
      .mp-scard-lbl{color:#666!important;}
      .mp-ai-box{background:#f8f6ff!important;border-color:#c4b5fd!important;break-inside:avoid;}
      .mp-ai-lbl{color:#7c3aed!important;}
      .mp-ai-txt{color:#333!important;}
      .mp-info-card{background:#f8f8f8!important;border-color:#ddd!important;}
      .mp-info-lbl{color:#888!important;}
      .mp-info-val{color:#111!important;}
      .mp-table th{background:#ede9fe!important;color:#555!important;}
      .mp-table td{color:#222!important;border-top-color:#eee!important;}
      .mp-tfoot td{background:#f3f0ff!important;color:#000!important;}
      .mp-rbadge{background:#dcfce7!important;color:#16a34a!important;}
      .mp-chart-box,.mp-matrix-box{background:#fff!important;border-color:#ddd!important;}
      .mp-bcard{background:#fafafa!important;border-color:#ddd!important;break-inside:avoid;}
      .mp-bname{color:#111!important;}
      .mp-blbl{color:#888!important;}
      .mp-bval{color:#111!important;}
      .mp-broas{-webkit-text-fill-color:#7c3aed!important;}
      .mp-binsight{color:#666!important;}
      .mp-brec{color:#15803d!important;background:#f0fdf4!important;border-color:#16a34a!important;}
      .mp-sec-lbl{color:#555!important;}
      @page{margin:1.5cm;}
    }
    @media(max-width:768px){
      .mp-wrap{padding:100px 18px 140px;}
      .mp-form-grid{grid-template-columns:1fr;}
      .mp-summary{grid-template-columns:1fr 1fr;}
      .mp-breakdown{grid-template-columns:1fr;}
      .mp-info-grid{grid-template-columns:1fr 1fr;}
    }
  `;

  return (
    <>
      <style>{S}</style>
      <div className="mp">
        <div className="mp-glow1 no-print"/><div className="mp-glow2 no-print"/>
        <div className="mp-wrap">
          <AnimatePresence mode="wait">

            {/* LOADING */}
            {loading && (
              <motion.div key="load" className="mp-loading"
                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <div className="mp-spinner"/>
                <p style={{fontSize:15,fontWeight:600,color:"rgba(255,255,255,0.8)"}}>{loadMsg}</p>
                <p style={{fontSize:12,color:"rgba(255,255,255,0.25)"}}>AI is analyzing your campaign...</p>
              </motion.div>
            )}

            {/* FORM */}
            {!loading && step==="form" && (
              <motion.div key="form" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{duration:0.4}}>
                <div className="mp-badge">✦ AI-Powered</div>
                <h1 className="mp-title">Media Plan <span>Generator</span></h1>
                <p className="mp-sub">Enter client details and AI will generate a full media plan based on MENA market benchmarks.</p>

                <div className="mp-form-grid">
                  {[
                    ["Client Name","text","e.g. Fashion Store KSA",clientName,setClientName],
                    ["Industry","text","e.g. E-commerce",industry,setIndustry],
                  ].map(([lbl,type,ph,val,set])=>(
                    <div key={lbl} className="mp-field">
                      <label className="mp-label">{lbl}</label>
                      <input className="mp-input" type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/>
                    </div>
                  ))}
                  <div className="mp-field">
                    <label className="mp-label">Product Type</label>
                    <select className="mp-select" value={productType} onChange={e=>setProductType(e.target.value)}>
                      {PRODUCT_TYPES.map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="mp-field">
                    <label className="mp-label">Campaign Objective</label>
                    <select className="mp-select" value={objective} onChange={e=>setObjective(e.target.value)}>
                      {OBJECTIVES.map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="mp-field">
                    <label className="mp-label">Total Budget ($)</label>
                    <input className="mp-input" type="number" placeholder="e.g. 10000" value={budget} onChange={e=>setBudget(e.target.value)}/>
                  </div>
                  <div className="mp-field">
                    <label className="mp-label">Avg. Order Value — AOV ($)</label>
                    <input className="mp-input" type="number" placeholder="e.g. 250" value={aov} onChange={e=>setAov(e.target.value)}/>
                  </div>
                  <div className="mp-field">
                    <label className="mp-label">Target Country</label>
                    <input className="mp-input" placeholder="e.g. Saudi Arabia" value={country} onChange={e=>setCountry(e.target.value)}/>
                  </div>
                </div>

                <div className="mp-divider"/>
                <p className="mp-sec-lbl">Select Platforms</p>
                <div className="mp-platforms">
                  {ALL_PLATFORMS.map(p=>(
                    <div key={p} className={`mp-ptag ${platforms.includes(p)?"on":""}`} onClick={()=>togglePlatform(p)}>
                      {PLATFORM_META[p].icon} {p}
                    </div>
                  ))}
                </div>

                {platforms.length>0 && (<>
                  <p className="mp-sec-lbl">
                    Budget Split — Total: {totalSplit}%&nbsp;
                    {totalSplit===100
                      ? <span style={{color:"#4ade80",fontSize:12}}>✓ Valid</span>
                      : <span style={{color:"#f87171",fontSize:12}}>⚠ Must equal 100%</span>}
                  </p>
                  <div className="mp-splits">
                    {platforms.map(p=>(
                      <div key={p} className="mp-srow">
                        <span className="mp-slbl">{PLATFORM_META[p].icon} {p}</span>
                        <input className="mp-snum" type="number" min="0" max="100"
                          value={splits[p]||0} onChange={e=>setSplits(prev=>({...prev,[p]:Number(e.target.value)}))}/>
                        <div className="mp-sbar"><div className="mp-sfill" style={{width:`${splits[p]||0}%`}}/></div>
                        <span style={{fontSize:12,color:"rgba(255,255,255,0.3)",width:34,textAlign:"right"}}>{splits[p]||0}%</span>
                      </div>
                    ))}
                  </div>
                </>)}

                <div className="mp-divider"/>
                <div className="mp-field" style={{marginBottom:36}}>
                  <label className="mp-label">Additional Notes (optional)</label>
                  <textarea className="mp-textarea"
                    placeholder="e.g. Ramadan campaign, past ROAS was 3x, target age 18-35 females..."
                    value={notes} onChange={e=>setNotes(e.target.value)}/>
                </div>
                <button className="mp-btn" onClick={handleGenerate}
                  disabled={!clientName||!budget||!aov||!platforms.length||totalSplit!==100}>
                  Generate with AI <RxArrowTopRight style={{fontSize:16}}/>
                </button>
              </motion.div>
            )}

            {/* RESULT */}
            {!loading && step==="result" && plan && (
              <motion.div key="result" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.4}}>

                <div className="mp-actions no-print">
                  <button className="mp-abtn" onClick={()=>setStep("form")}>← Edit Plan</button>
                  <button className="mp-print-btn" onClick={()=>window.print()}>🖨 Export PDF</button>
                </div>

                <div className="mp-res-title">Media Plan: <span>{plan.clientName}</span></div>
                <div className="mp-chips">
                  {[plan.date, plan.industry, plan.productType, plan.country, plan.objective,
                    `Budget: $${fmt(Math.round(plan.budget))}`, `AOV: $${fmt(Math.round(plan.aov))}`
                  ].map((v,i)=><span key={i} className="mp-chip">{v}</span>)}
                </div>

                {/* KPI Cards */}
                <div className="mp-summary">
                  {[
                    {lbl:"Total Budget",    val:`$${fmt(Math.round(plan.totalInvestment))}`},
                    {lbl:"Expected Orders", val:fmt(plan.totalOrders)},
                    {lbl:"Expected Sales",  val:`$${fmt(Math.round(plan.totalSales))}`},
                    {lbl:"Overall ROAS",    val:`${plan.totalROAS}x`},
                  ].map((c,i)=>(
                    <motion.div key={i} className="mp-scard" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
                      <div className="mp-scard-val">{c.val}</div>
                      <div className="mp-scard-lbl">{c.lbl}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Extra Info */}
                <div className="mp-info-grid">
                  <div className="mp-info-card">
                    <div className="mp-info-lbl">Risk Level</div>
                    <div className="mp-info-val">
                      {plan.riskLevel==="Low"?"🟢":plan.riskLevel==="Medium"?"🟡":"🔴"} {plan.riskLevel||"Medium"}
                    </div>
                  </div>
                  <div className="mp-info-card">
                    <div className="mp-info-lbl">Time to Results</div>
                    <div className="mp-info-val">⏱ {plan.expectedTimeToResults||"2-4 weeks"}</div>
                  </div>
                  <div className="mp-info-card">
                    <div className="mp-info-lbl">Top Recommendation</div>
                    <div className="mp-info-val">💡 {plan.topRecommendation||"—"}</div>
                  </div>
                </div>

                {/* AI Strategy */}
                {aiText && (
                  <div className="mp-ai-box">
                    <div className="mp-ai-lbl">✦ AI Strategy Analysis</div>
                    <p className="mp-ai-txt">{aiText}</p>
                  </div>
                )}

                {/* Table */}
                <p className="mp-sec-lbl" style={{marginBottom:14}}>Full Breakdown Table</p>
                <div className="mp-table-wrap">
                  <div className="mp-tscroll">
                    <table className="mp-table">
                      <thead>
                        <tr>{["Platform","Investment","% Budget","Impressions","Clicks","CTR","CPC","CPM","CR","Orders","Sales","CPS","ROAS"].map(h=><th key={h}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {plan.rows.map((r,i)=>(
                          <tr key={i}>
                            <td><div className="mp-pcell">{PLATFORM_META[r.platform]?.icon} {r.platform}</div></td>
                            <td>${fmt(Math.round(r.investment))}</td>
                            <td>{r.pct}%</td>
                            <td>{fmt(r.impressions)}</td>
                            <td>{fmt(r.clicks)}</td>
                            <td>{r.ctr}%</td>
                            <td>${r.cpc}</td>
                            <td>${r.cpm}</td>
                            <td>{r.cr}%</td>
                            <td>{fmt(r.orders)}</td>
                            <td>${fmt(Math.round(r.sales))}</td>
                            <td>${r.cps}</td>
                            <td><span className="mp-rbadge">{r.roas}x</span></td>
                          </tr>
                        ))}
                        <tr className="mp-tfoot">
                          <td>Total</td>
                          <td>${fmt(Math.round(plan.totalInvestment))}</td>
                          <td>100%</td>
                          <td>{fmt(plan.totalImpressions)}</td>
                          <td>{fmt(plan.totalClicks)}</td>
                          <td colSpan={4}>—</td>
                          <td>{fmt(plan.totalOrders)}</td>
                          <td>${fmt(Math.round(plan.totalSales))}</td>
                          <td>—</td>
                          <td><span className="mp-rbadge">{plan.totalROAS}x</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Performance Matrix */}
                <p className="mp-sec-lbl" style={{marginBottom:14}}>Performance Matrix</p>
                <div className="mp-matrix-box">
                  <PerformanceMatrix rows={plan.rows}/>
                </div>

                {/* Donut */}
                <p className="mp-sec-lbl" style={{marginBottom:18}}>Expected Revenue per Platform</p>
                <div className="mp-chart-box">
                  <DonutChart data={plan.rows.map(r=>({
                    label:r.platform, value:parseFloat(r.sales),
                    color:PLATFORM_META[r.platform]?.color||"#888",
                  }))}/>
                </div>

                {/* Platform Cards */}
                <p className="mp-sec-lbl" style={{marginBottom:14}}>Platform Breakdown</p>
                <div className="mp-breakdown">
                  {plan.rows.map((r,i)=>{
                    const m = PLATFORM_META[r.platform]||{};
                    return (
                      <motion.div key={i} className="mp-bcard" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*0.09}}>
                        <div className="mp-bhead">
                          <div className="mp-bicon" style={{background:m.bg||"rgba(255,255,255,0.05)"}}>{m.icon}</div>
                          <span className="mp-bname">{r.platform}</span>
                          <span className="mp-bpct">{r.pct}% of budget</span>
                        </div>
                        {[["Investment",`$${fmt(Math.round(r.investment))}`],["Impressions",fmt(r.impressions)],
                          ["Clicks",fmt(r.clicks)],["Orders",fmt(r.orders)],
                          ["Sales",`$${fmt(Math.round(r.sales))}`],["CPS",`$${r.cps}`]
                        ].map(([l,v])=>(
                          <div key={l} className="mp-brow">
                            <span className="mp-blbl">{l}</span>
                            <span className="mp-bval">{v}</span>
                          </div>
                        ))}
                        <div className="mp-broas">{r.roas}x ROAS</div>
                        {r.insight && <p className="mp-binsight">"{r.insight}"</p>}
                        {r.recommendation && <p className="mp-brec">💡 {r.recommendation}</p>}
                      </motion.div>
                    );
                  })}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
