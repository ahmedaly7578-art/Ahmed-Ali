import crypto from "crypto";

import { sb } from "./supabase";

export const clientHash = (req) => {
  // Netlify sets x-nf-client-connection-ip itself; fall back to the first forwarded address.
  const ip =
    req.headers["x-nf-client-connection-ip"] ||
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
