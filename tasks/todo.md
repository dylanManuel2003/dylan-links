# Linktree propio de Dylan — todo

- [x] Scaffold Next.js 16 + TS + Tailwind v4
- [x] Instalar motion (Framer Motion) + copiar avatar y logo Scalo
- [x] globals.css con paleta del portfolio + grid + keyframes
- [x] layout.tsx (fuentes Inter + mono, metadata/OG)
- [x] lib/links.ts (5 links, Scalo reemplaza Zero Uno)
- [x] components/icons.tsx (SVGs de marca)
- [x] components/Spotlight.tsx (glow que sigue el mouse)
- [x] components/LinkCard.tsx (card animada)
- [x] app/page.tsx (header + lista)
- [x] Probar local (pnpm dev) + build OK + screenshot verificado
- [x] Deploy: gh switch dylanManuel2003 + repo + push
- [x] Deploy Vercel personal → https://dylan-links-seven.vercel.app (READY, 200, sin SSO)

## Resultado
- Repo: https://github.com/dylanManuel2003/dylan-links
- Stack: Next.js 16.3.6 + TS + Tailwind v4 + motion (Framer Motion)
- 5 links verificados (Scalo → scalo.tech reemplaza Zero Uno). Build limpio.
- Deploy Vercel: el CLE no permite scope personal en modo no-interactivo.
  Dylan debe correr en su terminal:
      ! cd ~/Desktop/wk/personal/dylan-links && npx vercel --prod
  y elegir su Personal Account en el prompt de scope.
