// Toast — port of the error-toast and network-toast designs from
// screens/states.jsx. Both share the same row layout (icon + title +
// optional message [+ optional action]) but differ in the surface colour
// and border. Positioned absolutely by the caller.

import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radii } from '../../lib/theme';
import { Body } from '../typography';

export type ToastVariant = 'error' | 'network';

export type ToastAction = {
  label: string;
  onPress: () => void;
};

export type ToastProps = {
  variant: ToastVariant;
  icon: ReactNode;
  title: string;
  message?: string;
  action?: ToastAction;
};

export function Toast({ variant, icon, title, message, action }: ToastProps) {
  return (
    <View style={[styles.row, variant === 'error' ? styles.error : styles.network]}>
      <View style={styles.iconWrap}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Body size={14} weight={500}>
          {title}
        </Body>
        {message ? (
          <Body size={12.5} color={colors.text2} style={{ marginTop: 2 }}>
            {message}
          </Body>
        ) : null}
      </View>
      {action ? (
        <Pressable onPress={action.onPress} style={styles.actionBtn} accessibilityRole="button">
          <Body size={12} weight={500}>
            {action.label}
          </Body>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    // RN-platform-difference: web uses `0 12px 40px rgba(0,0,0,0.4)`; the
    // closest on iOS is shadowColor/shadowOffset/shadowRadius which we set
    // here as a softer equivalent.
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
  },
  error: {
    backgroundColor: '#1A0E0C',
    borderColor: 'rgba(224,122,107,0.35)',
  },
  network: {
    backgroundColor: '#0F1212',
    borderColor: colors.hairline2,
  },
  iconWrap: {
    marginTop: 2,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.hairline2,
    alignSelf: 'center',
  },
});
