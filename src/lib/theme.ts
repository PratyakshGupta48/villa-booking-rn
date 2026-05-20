// Design tokens — ported from
// /Users/pratyakshgupta/Downloads/flymeout/project/villas/lib/tokens.css.
//
// Names mirror the CSS custom properties (`--bg` → colors.bg, `--gold` →
// colors.gold). This module is the source of truth for visual fidelity; if a
// component needs a colour, a radius, or a font, it pulls it from here.

export const colors = {
  // Surfaces
  bg: '#0A0A0A',
  bgTrue: '#000000',
  bgElev1: '#141414',
  bgElev2: '#1C1C1C',
  bgSheet: '#0F0F0F',

  // Text
  text: '#F5F4EF',
  text2: '#B8B5AD',
  text3: '#6E6B66',
  text4: '#3A3936',

  // Accent — muted warm gold
  gold: '#D4B27A',
  goldSoft: '#C9A56A',
  goldOnBg: '#0A0A0A',
  goldButtonText: '#1B1409',
  goldDisabledBg: '#2A2722',
  goldDisabledText: '#5A554A',

  // Lines
  hairline: 'rgba(245,244,239,0.08)',
  hairline2: 'rgba(245,244,239,0.14)',

  // Status
  error: '#E07A6B',
  errorSoft: 'rgba(224,122,107,0.12)',
  success: '#93B89B',
} as const;

// Font family names match the IDs registered by expo-font / @expo-google-fonts.
export const fonts = {
  serif: 'Fraunces_400Regular',
  serifMedium: 'Fraunces_500Medium',
  serifSemibold: 'Fraunces_600SemiBold',
  serifItalic: 'Fraunces_400Regular_Italic',
  serifItalicMedium: 'Fraunces_500Medium_Italic',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemibold: 'Inter_600SemiBold',
  sansBold: 'Inter_700Bold',
  mono: 'JetBrainsMono_400Regular',
  monoMedium: 'JetBrainsMono_500Medium',
} as const;

export const radii = {
  pill: 999,
  card: 14,
  cardLg: 16,
  cardXl: 18,
  sheet: 28,
  calendarCell: 6,
  calendarPill: 10,
} as const;

export const heights = {
  cta: 50,
  ctaSticky: 56,
  chip: 38,
  stepperButton: 38,
  calendarCell: 44,
  statusBar: 56,
} as const;

export const padding = {
  ctaHorizontal: 22,
  chipHorizontal: 14,
  tabBarBottom: 26,
} as const;

// CSS uses em for letter-spacing; RN takes a px-equivalent number, so the
// right value depends on the current font size. These helpers do that math.
export const letterSpacing = {
  serif: (fontSize: number): number => -0.015 * fontSize,
  serifItalic: (fontSize: number): number => -0.005 * fontSize,
  body: (fontSize: number): number => -0.005 * fontSize,
  caps: (fontSize: number): number => 0.14 * fontSize,
};

export const timings = {
  pill: 300,
  shimmer: 1800,
} as const;
