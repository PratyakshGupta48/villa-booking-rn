// State · Dates booked — centered modal explaining the conflict, plus two
// suggested-date rows. Translated from screens/states.jsx ScreenErrorDates.

import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { GoldButton } from '../../src/components/buttons';
import { Alert, Chevron } from '../../src/components/icons';
import { Body, Caps, Serif } from '../../src/components/typography';
import { colors, radii } from '../../src/lib/theme';

const ALTERNATIVES: [string, string][] = [
  ['Sep 14 – Sep 19', '5 nights · $6,610'],
  ['Sep 22 – Sep 27', '5 nights · $6,610'],
];

export default function ErrorDatesScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.modal}>
        <View style={styles.headRow}>
          <Alert size={18} color={colors.gold} />
          <Caps>Heads-up</Caps>
        </View>
        <Serif size={24} style={styles.headline}>
          Sorry, those dates just got booked.
        </Serif>
        <Body size={14} color={colors.text2} style={styles.copy}>
          Villa Aroma is unavailable Sep 8 – Sep 13. Try nearby dates, or browse other villas in
          Mykonos.
        </Body>

        <View style={styles.altList}>
          {ALTERNATIVES.map(([dates, price]) => (
            <Pressable key={dates} style={styles.altRow} accessibilityRole="button">
              <View>
                <Body size={14}>{dates}</Body>
                <Body size={12} color={colors.text3} style={{ marginTop: 2 }}>
                  {price}
                </Body>
              </View>
              <Chevron size={14} color={colors.text3} />
            </Pressable>
          ))}
        </View>

        <GoldButton fullWidth style={styles.ctaBtn} onPress={() => router.back()}>
          See other dates
        </GoldButton>
        <Pressable style={styles.closeRow} accessibilityRole="button" onPress={() => router.back()}>
          <Body size={13} color={colors.text3}>
            Close
          </Body>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modal: {
    width: '100%',
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.hairline2,
    borderRadius: radii.cardXl,
    padding: 22,
    // RN-platform-difference: web uses `0 30px 80px rgba(0,0,0,0.6)`.
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 30 },
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headline: {
    marginTop: 14,
    lineHeight: 27,
  },
  copy: {
    marginTop: 12,
    lineHeight: 21,
  },
  altList: {
    marginTop: 18,
    gap: 8,
  },
  altRow: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: 12,
    backgroundColor: 'rgba(245,244,239,0.015)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ctaBtn: { marginTop: 18 },
  closeRow: {
    marginTop: 10,
    alignItems: 'center',
  },
});
