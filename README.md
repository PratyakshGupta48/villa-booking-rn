# villa-booking-rn

![Expo](https://img.shields.io/badge/expo-SDK%2054-000000)
![React Native](https://img.shields.io/badge/react--native-0.81-61DAFB)
![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6)
![License: MIT](https://img.shields.io/badge/license-MIT-green)

A pixel-perfect villa-rental booking flow in React Native + Expo — a proposal
implementation for FlyMeOut's 2026 villa-rentals expansion. Built by translating
a Claude Design (claude.ai/design) handoff bundle screen-by-screen into the
exact stack FlyMeOut's job posting names: Expo, TypeScript, TanStack Query,
Zustand, Firebase, Stripe + Apple Pay.

> **Status — early development.** Screens are being translated one at a time
> against the source JSX and the reference PNG screenshots from the design
> bundle.

## Stack

| Layer         | Choice                                        |
| ------------- | --------------------------------------------- |
| Runtime       | Expo SDK 54 (managed)                         |
| Language      | TypeScript strict                             |
| Routing       | Expo Router (file-based)                      |
| Client state  | Zustand                                       |
| Server state  | TanStack Query                                |
| Backend       | Firebase (Firestore + Anonymous Auth)         |
| Payments      | `@stripe/stripe-react-native` + Apple Pay     |
| Fonts         | `expo-font` — Fraunces, Inter, JetBrains Mono |
| SVG           | `react-native-svg`                            |
| Blur          | `expo-blur`                                   |
| Gradients     | `expo-linear-gradient`                        |
| Bottom sheets | `@gorhom/bottom-sheet`                        |
| Animation     | `react-native-reanimated` v3                  |

## Development

```sh
npm install
npx expo start              # then 'i' for iOS simulator
npm run typecheck           # tsc --noEmit (strict)
npm run lint                # eslint
npm run format              # prettier --write .
```

## License

MIT — see [LICENSE](LICENSE).
