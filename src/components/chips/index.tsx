// Chip — port of the .chip class. 38h pill with a hairline border, a very
// faint warm fill, an optional leading icon, and a sans-medium label.

import { type ReactNode } from 'react';
import { Pressable, type PressableProps, StyleSheet, Text, type ViewStyle } from 'react-native';

import { colors, fonts, heights, letterSpacing, padding, radii } from '../../lib/theme';

export type ChipProps = {
  children: ReactNode;
  icon?: ReactNode;
  style?: ViewStyle;
} & Omit<PressableProps, 'children' | 'style'>;

export function Chip({ children, icon, style, ...rest }: ChipProps) {
  return (
    <Pressable accessibilityRole="button" style={[styles.chip, style]} {...rest}>
      {icon}
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: heights.chip,
    paddingHorizontal: padding.chipHorizontal,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.hairline2,
    backgroundColor: 'rgba(245,244,239,0.02)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  label: {
    fontFamily: fonts.sansMedium,
    color: colors.text,
    fontSize: 13,
    letterSpacing: letterSpacing.body(13),
  },
});
