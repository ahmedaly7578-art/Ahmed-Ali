import crypto from "crypto";

import { sb } from "./supabase";

export const clientHash = (req) => {
  // Vercel sets these headers itself (a client cannot spoof them).
  const ip =
    String(req.headers["x-vercel-forwarded-for"] || "").split(",")[0].trim() ||
    String(req.headers["x-real-ip"] || "").trim() ||
    String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  const salt = process.env.IP_SALT || process.env.SUPABASE_SERVICE_KEY || "";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
};

// Count rows in `table` since `minutes` ago, optionally for one ip hash.
export const countRecent = async (table, minutes, ipHash) => {
  const since = new Date(Date.now() - minutes * 60000).toISOString();
  const ipFilter = ipHash ? `&ip_hash=eq.${ipHash}` : "";
  const r = await sb(`${table}?select=id&created_at=gte.${encodeURIComponent(since)}${ipFilter}&limit=1000`);
  if (!r.ok) throw new Error("count failed");
  return (await r.json()).length;
};

export const authAdmin = async (req, res) => {
  // Returns true when the request carries the right admin password; otherwise answers and returns false.
  const crypto = await import("crypto");
  const pass = process.env.ADMIN_PASSWORD;
  const given = req.headers["x-admin-password"] || "";
  const ip = clientHash(req);
  try {
    if ((await countRecent("admin_attempts", 15, ip)) >= 10 || (await countRecent("admin_attempts", 60)) >= 50) {
      res.status(429).json({ error: "Too many attempts. Try again later." });
      return false;
    }
  } catch {
    res.status(502).json({ error: "Storage error" });
    return false;
  }
  const a = crypto.createHash("sha256").update(String(given)).digest();
  const b = crypto.createHash("sha256").update(String(pass || "")).digest();
  if (!pass || !given || !crypto.timingSafeEqual(a, b)) {
    await sb("admin_attempts", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ ip_hash: ip }) });
    await new Promise((r) => setTimeout(r, 600));
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
};
