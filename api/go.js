// Tracked redirect: /go/<slug>?from=<post-slug>  ->  logs a click, then 302s to the target.
// Targets are fixed here; the slug is never used to build a URL.
const TARGETS = {
  starlink: "https://starlink.com?referral=RC-DF-16756788-13819-16",
};
const SUPABASE_URL = "https://ftjdmvdyeetiubmziwav.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0amRtdmR5ZWV0aXVibXppd2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NDYxNDcsImV4cCI6MjA3MDUyMjE0N30.FxpqvXDjsPIjD6k2toPLUCYrhprjv9sGYFc9Y2Znmgw";
const BOT = /bot|crawl|spider|slurp|preview|fetch|monitor|headless|python|curl|wget|facebookexternalhit|embedly|whatsapp|telegram|discord|slack/i;

export default async function handler(req, res) {
  const slug = String(req.query.slug || "").toLowerCase();
  const target = TARGETS[slug];
  if (!target) {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  const ua = String(req.headers["user-agent"] || "");
  const from = String(req.query.from || "").replace(/[^a-z0-9-]/gi, "").slice(0, 120);
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 1500);
    await fetch(`${SUPABASE_URL}/rest/v1/rpc/log_link_click`, {
      method: "POST",
      signal: ctl.signal,
      headers: { "Content-Type": "application/json", apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
      body: JSON.stringify({
        p_slug: slug,
        p_post_slug: from || null,
        p_referrer: String(req.headers["referer"] || ""),
        p_user_agent: ua,
        p_country: String(req.headers["x-vercel-ip-country"] || ""),
        p_is_bot: BOT.test(ua) || ua === "",
      }),
    });
    clearTimeout(t);
  } catch (_) {
    /* never block the redirect on logging */
  }
  res.statusCode = 302;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Location", target);
  res.end();
}
