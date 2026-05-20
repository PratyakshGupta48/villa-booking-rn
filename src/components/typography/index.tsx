// Typography primitives — the four web utility classes (.serif, .caps,
// body, .tnum) translated into RN <Text> wrappers. Every screen text goes
// through one of these so font, size, colour, and letter-spacing stay
// consistent with lib/tokens.css.

import { type ReactNode } from 'react';
import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { colors, fonts, letterSpacing } from '../../lib/theme';

type SerifWeight = 400 | 500 | 600;
type SansWeight = 400 | 500 | 600 | 700;
type MonoWeight = 400 | 500;

const sansFont = (weight: SansWeight): string => {
  if (weight === 700) return fonts.sansBold;
  if (weight === 600) return fonts.sansSemibold;
  if (weight === 500) return fonts.sansMedium;
  return fonts.sans;
};

const serifFont = (weight: SerifWeight, italic: boolean): string => {
  if (italic) return weight === 500 ? fonts.serifItalicMedium : fonts.serifItalic;
  if (weight === 600) return fonts.serifSemibold;
  if (weight === 500) return fonts.serifMedium;
  return fonts.serif;
};

const monoFont = (weight: MonoWeight): string => (weight === 500 ? fonts.monoMedium : fonts.mono);

const tnumStyle: TextStyle = { fontVariant: ['tabular-nums'] };

// --- Serif (Fraunces) ---

export type SerifProps = TextProps & {
  children?: ReactNode;
  size?: number;
  color?: string;
  weight?: SerifWeight;
  italic?: boolean;
  tnum?: boolean;
};

export function Serif({
  size = 22,
  color = colors.text,
  weight = 400,
  italic = false,
  tnum = false,
  style,
  children,
  ...rest
}: SerifProps) {
  const fontFamily = serifFont(weight, italic);
  const ls = italic ? letterSpacing.serifItalic(size) : letterSpacing.serif(size);
  return (
    <Text
      style={[{ fontFamily, fontSize: size, color, letterSpacing: ls }, tnum && tnumStyle, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}

// --- Caps (Inter, uppercase, generous tracking) ---

export type CapsProps = TextProps & {
  children?: ReactNode;
  size?: number;
  color?: string;
  weight?: 500 | 600;
  tnum?: boolean;
};

export function Caps({
  size = 11,
  color = colors.text2,
  weight = 500,
  tnum = false,
  style,
  children,
  ...rest
}: CapsProps) {
  const fontFamily = weight === 600 ? fonts.sansSemibold : fonts.sansMedium;
  return (
    <Text
      style={[
        {
          fontFamily,
          fontSize: size,
          color,
          letterSpacing: letterSpacing.caps(size),
          textTransform: 'uppercase',
        },
        tnum && tnumStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

// --- Body (Inter) ---

export type BodyProps = TextProps & {
  children?: ReactNode;
  size?: number;
  color?: string;
  weight?: SansWeight;
  tnum?: boolean;
};

export function Body({
  size = 14,
  color = colors.text,
  weight = 400,
  tnum = false,
  style,
  children,
  ...rest
}: BodyProps) {
  return (
    <Text
      style={[
        {
          fontFamily: sansFont(weight),
          fontSize: size,
          color,
          letterSpacing: letterSpacing.body(size),
        },
        tnum && tnumStyle,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}

// --- Tnum convenience: Body with tabular numerics on by default. ---

export type TnumProps = Omit<BodyProps, 'tnum'>;

export function Tnum(props: TnumProps) {
  return <Body tnum {...props} />;
}

// --- Mono (JetBrains Mono) — for booking refs and the like. ---

export type MonoProps = TextProps & {
  children?: ReactNode;
  size?: number;
  color?: string;
  weight?: MonoWeight;
};

export function Mono({
  size = 12,
  color = colors.text,
  weight = 400,
  style,
  children,
  ...rest
}: MonoProps) {
  return (
    <Text style={[{ fontFamily: monoFont(weight), fontSize: size, color }, style]} {...rest}>
      {children}
    </Text>
  );
}

// Re-exported tnum style for cases that need to apply it to ad-hoc text.
export const styles = StyleSheet.create({ tnum: tnumStyle });
