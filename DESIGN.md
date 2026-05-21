# DESIGN.md

This file documents the visual-translation methodology behind villa-booking-rn
and catalogues every place the React Native build deviates from the source
web design, with the reason.

## Source

The design lives at `~/Downloads/flymeout/project/villas/`:

- `lib/tokens.css` — the design system (colors, typography scale, hairlines,
  shadows, gradients).
- `lib/common.jsx` — shared primitives (typography utility classes, buttons,
  chips, Photo, Avatar, the 32 inline SVG icons).
- `lib/data.jsx` — 12 sample villas + a sample BOOKING constant.
- `screens/*.jsx` — 9 screen files, each a self-contained React component.
- `design_handoff_villas/screenshots/*.png` — 18 reference screenshots
  (iPhone 15 frame), the visual source of truth.

## The translation loop

Every screen is built in three steps:

1. **Read the source.** Open the matching `screens/<name>.jsx` top-to-bottom.
2. **Translate to RN** using `src/lib/theme.ts` tokens and the primitives under
   `src/components/`. Web utility classes (`.serif`, `.caps`, `.chip`,
   `.cta-gold`) become RN components with parallel names (`<Serif>`, `<Caps>`,
   `<Chip>`, `<GoldButton>`).
3. **Cross-check** against the matching PNG on the iPhone 15 simulator. Any
   pixel deviation is either fixed or annotated with a
   `// RN-platform-difference:` comment before the screen is considered done.

`src/lib/theme.ts` ports `tokens.css` value-for-value. Colors use the same
names (`--bg` → `colors.bg`, `--gold` → `colors.gold`). Font sizes and weights
match the design's 9–52px scale. Letter-spacing is exposed as a helper because
the source uses `em` units and RN needs absolute pixel values — the helper
multiplies the em-value by the current `fontSize`.

## RN-platform-difference catalogue

Treatments the web design uses that RN can't replicate exactly. Each is
annotated in-source with a `// RN-platform-difference:` comment.

### Photo grain (every hero, card, and detail image)

The web design draws an SVG `feTurbulence` filter and composites it over the
image with `mix-blend-mode: overlay`. RN's `react-native-svg` supports
`feTurbulence` but does not implement `mix-blend-mode`. The RN substitution is
an absolute-positioned `<Svg>` over the image with `opacity: 0.18` and a
slightly lifted base saturation on the image itself, which reads visually
equivalent in side-by-side comparison against the screenshot.

### Image saturation + brightness

The source applies `filter: saturate(1.08) brightness(0.98)` to hero photos.
RN's `expo-image` does not expose CSS filters. The RN substitution lifts
saturation through a higher-quality source asset and applies a flat
`tintColor`-equivalent overlay only on the gallery's currently-active image.

### Glass blur (FloatingTopBar, TabBar, sheet handles)

The web design uses `backdrop-filter: blur(20px) saturate(140%)`. RN's
`expo-blur` `BlurView` reproduces the blur with `intensity={40}` and
`tint="dark"`, but does not expose a saturate multiplier. The acceptable read
is achieved by elevating the underlying background-color alpha from `0.45` to
`0.55`.

### Avatar edge shadow

The web design uses `box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06)` for a
faint inner ring on the colored-circle avatar. RN cannot draw inset shadows;
the RN substitution renders the inner ring as a sibling `View` with
`borderColor` matching the source rgba, positioned absolutely inside the
circle with one-pixel inset.

### ConfirmMark glow

The Confirmation screen's gold check has `box-shadow: 0 0 64px rgba(212,178,
122,0.45)` (an outset glow). RN cannot draw outset blurred shadows on
non-rectangular content. The RN substitution renders the glow as a larger
sibling `View` behind the mark with the same gold tint at `opacity: 0.32`,
heavily border-radiused, and `transform: scale(1.4)`, which produces an
indistinguishable read at the rendered size.

### Skeleton shimmer

The source uses a CSS `@keyframes` animation translating a linear-gradient
background-position. The RN equivalent runs in `react-native-reanimated` 4:
a `useSharedValue` drives `translateX` via `withRepeat(withTiming(…,
1800ms, easeInOut), -1, true)` against an embedded `<LinearGradient>` clipped
by an `overflow: 'hidden'` parent. Same visual cadence, native thread driven.

### Modal sheet presentation

The source uses a fixed-position div with `transform: translateY` to slide in
from the bottom. The RN equivalent is an Expo Router route declared with
`presentation: 'transparentModal'` and `animation: 'slide_from_bottom'` in
`app/_layout.tsx`, with the sheet body sized to `88%` of the screen and a
tap-to-dismiss `Pressable` over the dimmed backdrop.

### Calendar range pill rendering

The web calendar draws the gold start/end pills with absolute-positioned
elements and the mid-range fill with a background on the cell. The RN
equivalent draws individual corner radii on each cell (`borderTopLeftRadius`,
`borderTopRightRadius`, `borderBottomLeftRadius`, `borderBottomRightRadius`)
via a `cornerRadii(isStart, isEnd)` helper, with an absolute-positioned gold
pill on start/end cells and `rgba(212,178,122,0.14)` fill on in-range cells.
Booked dates are rendered with a muted text color and a thin strike line.

### Tab bar gradient fade

The source uses a `-webkit-mask-image: linear-gradient(to top, black 60%,
transparent)` on the tab bar's top edge. RN's masking APIs (`MaskedView`)
work but add a frame of jank on tab transitions. The RN substitution stacks
an `expo-linear-gradient` `LinearGradient` directly above the tab bar with
colors `['rgba(11,11,11,0)', 'rgba(11,11,11,0.85)']`, `pointerEvents="none"`,
which produces the same fade without the masking cost.

## Components — what maps to what

| Web utility / element      | RN component                               |
| -------------------------- | ------------------------------------------ |
| `.serif`, `.serif-italic`  | `<Serif>`                                  |
| `.caps`                    | `<Caps>`                                   |
| `.body`                    | `<Body>`                                   |
| `.tnum`                    | `<Tnum>` (`fontVariant: ['tabular-nums']`) |
| `.mono`                    | `<Mono>`                                   |
| `.cta-gold` button         | `<GoldButton>` (50h, gold, disabled state) |
| `.cta-ghost` button        | `<GhostButton>` (50h, hairline)            |
| `.chip`                    | `<Chip>` (38h, icon + label)               |
| hairline / hairline-strong | `<Hairline />` / `<Hairline strong />`     |
| `<img>` hero               | `<Photo>` (image + grain + filter)         |
| initial-in-circle          | `<Avatar>`                                 |
| `<svg>` 32 inline icons    | `src/components/icons/*` (one per icon)    |
| Number stepper             | `<NumberStepper>`                          |
| Skeleton block             | `<Sk>` (Reanimated shimmer)                |
| Toast (error / network)    | `<Toast>`                                  |
| Tab bar                    | `<CustomTabBar>` (BlurView + gradient)     |
| Calendar month             | `<SheetMonth>` (the keystone)              |

## Verifying fidelity

To compare any screen against its reference:

```sh
npx expo start --clear
# 'i' for iOS
```

The screenshots live at
`~/Downloads/flymeout/project/villas/design_handoff_villas/screenshots/`
in the same order as the screens map: `01-A-discover.png`, `02-B-detail.png`,
`03-C-dates.png`, `04-C-dates-empty.png`, `05-D-review.png`, `06-E-stripe.png`,
`07-E-processing.png`, `08-F-confirm.png`, `09-G-upcoming.png`,
`10-G-past.png`, `11-G-empty.png`, `12-H-profile.png`, `13-sk-discover.png`,
`14-sk-detail.png`, `15-empty-discover.png`, `16-err-card.png`,
`17-err-network.png`, `18-err-dates.png`.

The Profile tab's dev-only "Design states" list at the bottom links to the
six matching in-app routes for the loading/empty/error variants
(`13`–`18`) so they can be reviewed without code changes.
