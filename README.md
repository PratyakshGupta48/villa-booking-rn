# villa-booking-rn

![Expo](https://img.shields.io/badge/expo-SDK%2054-000000)
![React Native](https://img.shields.io/badge/react--native-0.81-61DAFB)
![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6)
![Tests](https://img.shields.io/badge/tests-20%2F20%20passing-2EA043)
![License: MIT](https://img.shields.io/badge/license-MIT-green)

A pixel-perfect villa-rental booking flow in React Native + Expo — a proposal
implementation for FlyMeOut's 2026 villa-rentals expansion. Built by translating
a Claude Design (claude.ai/design) handoff bundle screen-by-screen into the
exact stack FlyMeOut's job posting names: Expo, TypeScript, TanStack Query,
Zustand, Firebase, Stripe + Apple Pay.

## What's in the box

Eight production screens plus six design-state previews, all rendered against
the 18-screenshot reference set on the iPhone 15 simulator:

- **Discover** — sticky search header, 12-villa feed with grain-textured heroes.
- **Villa Detail** — gallery with dot indicator, floating glass top bar, amenities
  grid, inline mini-month, sticky book bar.
- **DateSheet** — transparent-modal bottom sheet with two stacked months, full
  range-selection state machine, booked-date masking, gold pill rendering on
  start/end with mid-range fill, guest stepper, live price preview.
- **Review** — line-itemed price summary, trip details, white Apple Pay pill
  payment row, sticky Reserve CTA.
- **Confirmation** — hero band, gold confirm mark with glow ring, stay-at-a-
  glance card with booking reference.
- **Trips** — segmented Upcoming / Past, featured-trip hero, past-trip cards.
- **Profile** — account header, settings rows, dev-only Design-states list.
- **Six design-state previews** at `/states/*` — loading-discover, loading-detail,
  empty-discover, error-card, error-network, error-dates.

Quality gates that ship green on every commit:

- `tsc --strict` — zero errors, zero `any`
- `eslint .` — zero warnings
- `jest` — 20/20 unit tests covering the pricing math and the date-range reducer

## Demo flow

```sh
npm install
npx expo start --clear
# press 'i' to open the iOS simulator
```

Discover → tap any villa → Check availability → tap a range across the two
months → Continue → Reserve → Confirmation → Trips (the booking appears under
Upcoming). The Profile tab's dev-only Design-states list links to each empty,
error, and loading variant.

## Stack

| Layer         | Choice                                                       |
| ------------- | ------------------------------------------------------------ |
| Runtime       | Expo SDK 54 (managed)                                        |
| Language      | TypeScript strict                                            |
| Routing       | Expo Router (file-based)                                     |
| Client state  | Zustand (draft booking, calendar range, guest count)         |
| Server state  | TanStack Query (installed, scoped for the Firebase wire-up)  |
| Backend       | Firebase Firestore + Anonymous Auth (scoped for the wire-up) |
| Payments      | `@stripe/stripe-react-native` + Apple Pay via `PlatformPay`  |
| Fonts         | `expo-font` — Fraunces, Inter, JetBrains Mono                |
| SVG           | `react-native-svg` (all 32 icons + grain noise filter)       |
| Blur          | `expo-blur` (glass top bar, tab bar, dimmed backdrop)        |
| Gradients     | `expo-linear-gradient`                                       |
| Bottom sheets | `@gorhom/bottom-sheet`                                       |
| Animation     | `react-native-reanimated` 4 + `react-native-worklets`        |
| Image         | `expo-image`                                                 |

## Project shape

```
villa-booking-rn/
├── app/                              # Expo Router routes
│   ├── _layout.tsx                   # fonts, splash, StripeProvider, QueryClient
│   ├── (tabs)/{index,trips,profile}.tsx
│   ├── villa/[id]/{index,book}.tsx   # detail + DateSheet (transparent modal)
│   ├── checkout/review.tsx
│   ├── confirmation/[id]/index.tsx
│   └── states/*.tsx                  # six loading/error/empty previews
├── src/
│   ├── lib/{theme,data,pricing}.ts   # tokens, sample villas, pricing math
│   ├── store/draftBooking.ts         # Zustand range-selection state machine
│   ├── components/                   # 14 primitive groups (typography, buttons,
│   │                                   chips, icons, photo, avatar, badges, nav,
│   │                                   calendar, stepper, hairlines, skeleton,
│   │                                   toast)
└── tests/                            # Jest — pricing + draft-booking reducer
```

## Pixel-fidelity methodology

Each screen is built by a 3-step loop:

1. Read the source `.jsx` at `~/Downloads/flymeout/project/villas/screens/`.
2. Translate into RN using `src/lib/theme.ts` tokens and the primitives under
   `src/components/`.
3. Cross-check against the matching PNG in `design_handoff_villas/screenshots/`
   on the iPhone 15 simulator.

Anywhere RN can't replicate a web treatment exactly (CSS mix-blend, inset
box-shadow, backdrop-filter saturate/brightness), the deviation is annotated in
place with a `// RN-platform-difference:` comment and the substitution is
explained. See [DESIGN.md](DESIGN.md) for the full catalogue.

## Commands

```sh
npm install
npx expo start --clear      # Metro + iOS simulator via 'i'
npm test                    # jest — 20 unit tests
npm run typecheck           # tsc --noEmit (strict)
npm run lint                # eslint
npm run format              # prettier --write .
```

## Roadmap

The next commit wires the real backend and payment sheet against the same
screens — no UI changes:

- `src/lib/firebase.ts` — anonymous-auth init on first mount.
- `src/features/bookings/createBooking.ts` — atomic Firestore transaction that
  reads availability, throws `BookingConflictError` on overlap, and writes the
  booking + the updated availability range in a single `runTransaction`.
- `src/features/bookings/useUpcomingBookings.ts` — real-time Firestore listener
  feeding the Trips Upcoming list.
- `src/features/villas/queries.ts` — TanStack Query hooks behind Discover and
  Detail, with the existing skeleton screens as suspense fallbacks.
- The Reserve CTA in `app/checkout/review.tsx` triggers the real Stripe Payment
  Sheet (sandbox); on success the atomic transaction creates the booking before
  navigating to Confirmation.

## License

MIT — see [LICENSE](LICENSE).
