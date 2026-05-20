// Avatar — port of the <Avatar> primitive from common.jsx. Renders the
// first character of a name inside a circle, with a small warm palette
// keyed by initial so familiar hosts ("Eden L.", "Zach L.") always render
// the same colours.

import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '../../lib/theme';

export type AvatarProps = {
  name: string;
  size?: number;
};

type Palette = readonly [bg: string, fg: string];

const PALETTES: Record<string, Palette> = {
  E: ['#2E2A22', '#D4B27A'],
  H: ['#2A2528', '#C9A2A2'],
  Z: ['#22282A', '#A4B9C2'],
  S: ['#2A2A23', '#C8B98E'],
  M: ['#2A2522', '#C7997A'],
};

const DEFAULT_PALETTE: Palette = ['#2A2622', '#C9B894'];

export function Avatar({ name, size = 32 }: AvatarProps) {
  const initial = (name.trim() || '?').charAt(0).toUpperCase();
  const [bg, fg] = PALETTES[initial] ?? DEFAULT_PALETTE;
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
        },
      ]}
    >
      <Text
        style={[
          styles.initial,
          {
            color: fg,
            fontSize: size * 0.42,
          },
        ]}
      >
        {initial}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    // RN-platform-difference: web uses `box-shadow: inset 0 0 0 1px
    // rgba(255,255,255,0.05)`; RN has no inset shadow, so a hairline border
    // gives the same edge highlight.
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  initial: {
    fontFamily: fonts.serifItalic,
    includeFontPadding: false,
  },
});
