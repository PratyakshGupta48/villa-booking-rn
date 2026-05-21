# AGENTS.md

Working notes for anyone — human or agent — contributing to villa-booking-rn.

## What this is

A villa-rental booking flow in React Native + Expo, built pixel-perfectly by
translating a Claude Design (claude.ai/design) handoff bundle at
`/Users/pratyakshgupta/Downloads/flymeout/project/villas/` — the source JSX
files plus the reference PNG screenshots are the source of truth.

## Stack (locked — no substitutions)

Expo SDK 54 · TypeScript strict · Expo Router (file-based) · Zustand · TanStack
Query · Firebase (Firestore + Anonymous Auth) · `@stripe/stripe-react-native` +
Apple Pay · `expo-font` (Fraunces · Inter · JetBrains Mono) · `react-native-svg`
· `expo-blur` · `expo-linear-gradient` · `@gorhom/bottom-sheet` ·
`react-native-reanimated` v4 (with the `react-native-worklets` peer engine).

## Pixel-fidelity workflow (per screen)

1. Read the source `.jsx` at `~/Downloads/flymeout/project/villas/screens/<name>.jsx`.
2. Translate into RN using `src/lib/theme.ts` tokens and the primitives under
   `src/components/`.
3. Cross-check against `~/Downloads/flymeout/project/design_handoff_villas/screenshots/<NN>-<screen>.png`
   on the iPhone 15 simulator before marking the screen done. Any deviation is
   either fixed or annotated with a `// RN-platform-difference:` comment.

## Commands

```sh
npm install
npx expo start              # Metro + iOS simulator via 'i'
npm run typecheck           # tsc --noEmit (strict)
npm run lint                # eslint
npm run format              # prettier --write .
```

## Conventions

- Expo SDK 54 — read https://docs.expo.dev/versions/v54.0.0/ when any API feels
  uncertain.
- `tsc --strict` clean. No `any`.
- Web utility classes from `lib/tokens.css` become RN components with matching
  names (`.serif` → `<Serif>`, `.cta-gold` → `<GoldButton>`, etc.).
- Every commit keeps `main` green: typecheck + lint pass.
