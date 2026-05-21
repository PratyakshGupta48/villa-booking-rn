// State · Card declined — top toast + bottom retry sheet over a dimmed
// Review backdrop. Translated from screens/states.jsx ScreenErrorCardDeclined.

import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { GoldButton } from '../../src/components/buttons';
import { Alert, ApplePay, Chevron } from '../../src/components/icons';
import { Toast } from '../../src/components/toast/Toast';
import { Body } from '../../src/components/typography';
import { colors, radii } from '../../src/lib/theme';

const STATUS_BAR_PAD = 56;

export default function ErrorCardScreen() {
  return (
    <View style={styles.screen}>
      {/* Dimmed backdrop — actual Review screen lives in conversation history;
          here we just render a flat dark layer so the toast and sheet read. */}
      <View style={StyleSheet.absoluteFill} />

      {/* Top toast */}
      <View style={[styles.toastWrap, { top: 64 }]}>
        <Toast
          variant="error"
          icon={<Alert size={16} color={colors.error} />}
          title="Card declined"
          message="Try a different payment method."
        />
      </View>

      {/* Bottom sheet — failed payment + retry CTA */}
      <View style={styles.bottomSheet}>
        <View style={styles.failedRow}>
          <View style={styles.applePayPill}>
            <ApplePay width={28} color="#000" />
          </View>
          <View style={{ flex: 1 }}>
            <Body size={14} weight={500}>
              Apple Pay · •• 4421
            </Body>
            <Body size={12} color={colors.error} style={{ marginTop: 2 }}>
              Declined by your bank
            </Body>
          </View>
          <Chevron size={14} color={colors.text3} />
        </View>
        <GoldButton fullWidth style={styles.tryAgainBtn} onPress={() => router.back()}>
          Try a different method
        </GoldButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(10,10,10,0.85)',
    paddingTop: STATUS_BAR_PAD,
  },
  toastWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 26,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  failedRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: radii.card,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  applePayPill: {
    width: 44,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  tryAgainBtn: {
    marginTop: 14,
    height: 56,
  },
});
