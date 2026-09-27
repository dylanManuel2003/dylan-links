# dylan-links — todo

## Linktree (hecho)
- [x] App Next 16 + TS + Tailwind v4 + motion, estética del portfolio
- [x] 5 links (Scalo reemplaza Zero Uno), avatar, favicon isotipo dp
- [x] Deploy Vercel personal → https://dylanpe-links.vercel.app

## Analytics + Boot animation (hecho)
- [x] Neon Postgres (proyecto dylan-links) + Drizzle, tabla events
- [x] /api/track (view/click) con geo país, sin PII
- [x] Track de pageview (1x por sesión) + click por link
- [x] Dashboard /stats (KPIs, clicks por link, serie 14d, reciente)
- [x] Protección /stats con Basic Auth (proxy.ts)
- [x] BootSequence cyberpunk (glitch dp, terminal, grid neón, progreso, skip)
- [x] Env vars en Vercel (DATABASE_URL, STATS_USER, STATS_PASSWORD)
- [x] Deploy + verificación por contenido en prod + limpieza de datos de prueba

## Resultado
- Sitio: https://dylanpe-links.vercel.app
- Stats: https://dylanpe-links.vercel.app/stats (Basic Auth)
- Repo: https://github.com/dylanManuel2003/dylan-links
- Neon project: dylan-links (tiny-dawn-61226323), tabla events
- Auto-deploy en cada push a main.
