import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Click {
  id: string;
  slug: string;
  post_slug: string | null;
  referrer: string | null;
  country: string | null;
  is_bot: boolean;
  created_at: string;
}

const DAY = 86400000;

const LinkClicks = () => {
  const [clicks, setClicks] = useState<Click[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const since = new Date(Date.now() - 90 * DAY).toISOString();
      const { data, error } = await (supabase as any)
        .from("link_clicks")
        .select("id, slug, post_slug, referrer, country, is_bot, created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000);
      if (error) setError(error.message);
      else setClicks(data || []);
      setLoading(false);
    })();
  }, []);

  const stats = useMemo(() => {
    const now = Date.now();
    const human = clicks.filter((c) => !c.is_bot);
    const within = (d: number) => human.filter((c) => now - new Date(c.created_at).getTime() < d * DAY).length;
    const perPost: Record<string, number> = {};
    const perCountry: Record<string, number> = {};
    human.forEach((c) => {
      const k = c.post_slug || "(direct link)";
      perPost[k] = (perPost[k] || 0) + 1;
      const cc = c.country || "unknown";
      perCountry[cc] = (perCountry[cc] || 0) + 1;
    });
    const sort = (o: Record<string, number>) => Object.entries(o).sort((a, b) => b[1] - a[1]);
    return {
      today: within(1), week: within(7), month: within(30), total: human.length,
      bots: clicks.length - human.length,
      posts: sort(perPost), countries: sort(perCountry).slice(0, 10),
    };
  }, [clicks]);

  return (
    <AdminLayout title="Tracked Link Clicks">
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Clicks on <code>/go/starlink</code> (Starlink referral link). Bots and link previews are counted separately.
          Clicks are not sign-ups: referral results appear in your Starlink account.
        </p>
        {error && (
          <Card><CardContent className="pt-6 text-sm">
            Could not load clicks: {error}. If the <code>link_clicks</code> table does not exist yet, run
            <code> supabase/migrations/20261110_link_clicks.sql</code> in the Supabase SQL editor.
          </CardContent></Card>
        )}
        <div className="grid gap-4 md:grid-cols-4">
          {[["Today", stats.today], ["Last 7 days", stats.week], ["Last 30 days", stats.month], ["Last 90 days", stats.total]].map(([l, v]) => (
            <Card key={String(l)}>
              <CardHeader className="pb-2"><CardDescription>{l}</CardDescription></CardHeader>
              <CardContent><div className="text-3xl font-bold">{loading ? "…" : v}</div></CardContent>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Excluded as bots/previews (90 days): {stats.bots}</p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>By article</CardTitle><CardDescription>Which post sent the click (90 days)</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Article</TableHead><TableHead className="text-right">Clicks</TableHead></TableRow></TableHeader>
                <TableBody>
                  {stats.posts.length === 0 && <TableRow><TableCell colSpan={2} className="text-muted-foreground">No clicks yet.</TableCell></TableRow>}
                  {stats.posts.map(([k, v]) => (
                    <TableRow key={k}><TableCell className="font-medium break-all">{k}</TableCell><TableCell className="text-right">{v}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>By country</CardTitle><CardDescription>Top 10</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Country</TableHead><TableHead className="text-right">Clicks</TableHead></TableRow></TableHeader>
                <TableBody>
                  {stats.countries.map(([k, v]) => (
                    <TableRow key={k}><TableCell>{k}</TableCell><TableCell className="text-right">{v}</TableCell></TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Recent clicks</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>When</TableHead><TableHead>Article</TableHead><TableHead>Country</TableHead><TableHead>Referrer</TableHead><TableHead /></TableRow></TableHeader>
              <TableBody>
                {clicks.slice(0, 50).map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{new Date(c.created_at).toLocaleString()}</TableCell>
                    <TableCell className="break-all">{c.post_slug || "(direct)"}</TableCell>
                    <TableCell>{c.country || "-"}</TableCell>
                    <TableCell className="break-all max-w-[240px] truncate">{c.referrer || "-"}</TableCell>
                    <TableCell>{c.is_bot && <Badge variant="outline">bot</Badge>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default LinkClicks;
