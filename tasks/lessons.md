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
