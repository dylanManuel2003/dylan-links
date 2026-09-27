# Lessons

## Vercel CLI + cuenta personal en modo no-interactivo
- `npx vercel --prod --yes` sin TTY NO aplica scope por defecto y solo ofrece
  los teams; la cuenta personal no se puede pasar con `--scope <user>`
  ("You cannot set your Personal Account as the scope").
- Para deployar a la cuenta personal hay que correrlo en terminal interactiva
  (Dylan, con `!`), o usar el team. Contemplarlo antes de prometer deploy autónomo.

## gh multi-cuenta
- `gh` tenía activa techscalo; el repo personal va en dylanManuel2003.
  `gh auth switch --user dylanManuel2003` antes de `gh repo create`. Ambas ya
  estaban logueadas en keyring.

## motion/react tipos
- El `ease` en cubic-bezier debe ir como tupla `as const` (`[0.22,1,0.36,1] as const`),
  si no TS lo infiere `number[]` y rompe el type-check de `Variants`.

## Next 16 + Tailwind v4
- Tailwind v4 sin config: paleta como CSS vars + `@theme inline` mapeando
  `--color-*: hsl(var(--x))`. El body del portfolio usa fuente mono como base.

## Next 16: middleware → proxy
- La convención `middleware.ts` está deprecada; usar `proxy.ts` con export
  `proxy(req)`. Runtime SIEMPRE nodejs (no configurable, no edge). Ideal para
  Basic Auth de rutas privadas con `config.matcher`.

## Drizzle neon-http: db.execute
- `db.execute<T>(sql\`...\`)` con driver neon-http devuelve `{ rows: T[] }`,
  NO es iterable/array. Acceder por `.rows` (no `const [x] = await execute()`).

## Verificar animaciones en Chrome headless
- `--virtual-time-budget` NO avanza si hay animaciones CSS infinitas (grid/glitch):
  los `setTimeout` posteriores no disparan → el screenshot queda "congelado".
  Sirve para capturar frames del boot, pero para verificar el reveal final hace
  falta wall-clock real. Blindar el fin con un `setTimeout` duro + skip por input.
