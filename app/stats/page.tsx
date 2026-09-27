import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { links as linkDefs } from "@/lib/links";

export const dynamic = "force-dynamic";
export const metadata = { title: "Stats · dp", robots: { index: false } };

type ClickRow = { link: string | null; n: number };
type DayRow = { d: string; n: number };
type RecentRow = { type: string; link: string | null; country: string | null; created_at: string };

async function getData() {
  const totals = await db.execute<{ views: number; clicks: number }>(sql`
    select
      count(*) filter (where type = 'view')::int  as views,
      count(*) filter (where type = 'click')::int as clicks
    from events
  `);

  const byLink = await db.execute<ClickRow>(sql`
    select link, count(*)::int as n
    from events
    where type = 'click'
    group by link
    order by n desc
  `);

  const byDay = await db.execute<DayRow>(sql`
    select to_char(date_trunc('day', created_at at time zone 'America/Argentina/Cordoba'), 'YYYY-MM-DD') as d,
           count(*) filter (where type = 'view')::int as n
    from events
    where created_at > now() - interval '14 days'
    group by 1
    order by 1
  `);

  const recent = await db.execute<RecentRow>(sql`
    select type, link, country,
           to_char(created_at at time zone 'America/Argentina/Cordoba', 'DD/MM HH24:MI') as created_at
    from events
    order by created_at desc
    limit 12
  `);

  const t = totals.rows[0];
  return {
    views: Number(t?.views ?? 0),
    clicks: Number(t?.clicks ?? 0),
    byLink: byLink.rows,
    byDay: byDay.rows,
    recent: recent.rows,
  };
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/70 p-5">
      <div className="text-xs uppercase tracking-widest text-muted">{label}</div>
      <div className="mt-2 font-sans text-3xl font-bold text-fg">{value}</div>
    </div>
  );
}

export default async function StatsPage() {
  const { views, clicks, byLink, byDay, recent } = await getData();
  const ctr = views > 0 ? ((clicks / views) * 100).toFixed(1) : "0.0";
  const maxClicks = Math.max(1, ...byLink.map((r) => r.n));
  const maxDay = Math.max(1, ...byDay.map((r) => r.n));

  return (
    <>
    <div className="bg-glow" />
    <div className="bg-grid" />
    <main className="relative z-10 mx-auto w-full max-w-2xl px-5 py-14">
      <header className="mb-8">
        <h1 className="font-sans text-2xl font-bold tracking-tight text-fg">
          <span className="text-accent">&gt;</span> stats
        </h1>
        <p className="mt-1 text-sm text-muted">Métricas de dylanpe-links · zona horaria Córdoba</p>
      </header>

      <section className="grid grid-cols-3 gap-3">
        <Kpi label="Visitas" value={views.toLocaleString("es-AR")} />
        <Kpi label="Clicks" value={clicks.toLocaleString("es-AR")} />
        <Kpi label="CTR" value={`${ctr}%`} />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xs uppercase tracking-widest text-muted">Clicks por link</h2>
        <div className="flex flex-col gap-2.5">
          {byLink.length === 0 && <p className="text-sm text-muted">Sin clicks todavía.</p>}
          {byLink.map((r) => (
            <div key={r.link ?? "?"} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-sm text-fg">{r.link ?? "—"}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-card">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${(r.n / maxClicks) * 100}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-sm tabular-nums text-muted">{r.n}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xs uppercase tracking-widest text-muted">Visitas · últimos 14 días</h2>
        <div className="flex h-32 items-end gap-1.5">
          {byDay.length === 0 && <p className="text-sm text-muted">Sin datos aún.</p>}
          {byDay.map((r) => (
            <div key={r.d} className="group flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t bg-accent/70 transition-colors group-hover:bg-accent"
                  style={{ height: `${(r.n / maxDay) * 100}%` }}
                  title={`${r.d}: ${r.n}`}
                />
              </div>
              <span className="text-[9px] text-muted">{r.d.slice(8)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xs uppercase tracking-widest text-muted">Actividad reciente</h2>
        <div className="overflow-hidden rounded-xl border border-border">
          {recent.length === 0 && <p className="p-4 text-sm text-muted">Nada por ahora.</p>}
          {recent.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 text-sm last:border-0"
            >
              <span className={r.type === "click" ? "text-accent" : "text-muted"}>
                {r.type === "click" ? `click → ${r.link}` : "visita"}
              </span>
              <span className="text-xs text-muted">
                {r.country ? `${r.country} · ` : ""}
                {r.created_at}
              </span>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-10 text-center text-[11px] text-muted/60">
        {linkDefs.length} links monitoreados
      </footer>
    </main>
    </>
  );
}
