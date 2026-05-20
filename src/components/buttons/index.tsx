// Buttons — direct ports of the .cta-gold and .cta-ghost classes from
// lib/tokens.css. Both are 50h pills with the same horizontal padding;
// GoldButton fills with the warm-gold accent and uses the dark gold-on-bg
// text colour, GhostButton is transparent with a hairline border.

import { type ReactNode } from 'react';
import { Pressable, type PressableProps, StyleSheet, Text, type ViewStyle } from 'react-native';

import { colors, fonts, heights, letterSpacing, padding, radii } from '../../lib/theme';

type CommonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
} & Omit<PressableProps, 'children' | 'style'>;

export type GoldButtonProps = CommonProps & {
  disabled?: boolean;
};

export function GoldButton({
  children,
  fullWidth = false,
  disabled = false,
  style,
  ...rest
}: GoldButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={[
        styles.cta,
        styles.gold,
        fullWidth && styles.full,
        disabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.label, styles.goldLabel, disabled && styles.disabledLabel]}>
        {children}
      </Text>
    </Pressable>
  );
}

export type GhostButtonProps = CommonProps;

export function GhostButton({ children, fullWidth = false, style, ...rest }: GhostButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.cta, styles.ghost, fullWidth && styles.full, style]}
      {...rest}
    >
      <Text style={[styles.label, styles.ghostLabel]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cta: {
    height: heights.cta,
    paddingHorizontal: padding.ctaHorizontal,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  gold: { backgroundColor: colors.gold },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.hairline2,
  },
  full: { width: '100%' },
  disabled: { backgroundColor: colors.goldDisabledBg },
  label: {
    fontSize: 15,
    letterSpacing: letterSpacing.body(15),
  },
  goldLabel: {
    fontFamily: fonts.sansSemibold,
    color: colors.goldButtonText,
  },
  ghostLabel: {
    fontFamily: fonts.sansMedium,
    color: colors.text,
  },
  disabledLabel: { color: colors.goldDisabledText },
});
