// C. Pick Dates + Guests — modal sheet over Detail.
//
// Translated from /Users/pratyakshgupta/Downloads/flymeout/project/villas/
// screens/datesheet.jsx. Renders as a transparent-modal route: a darkened
// backdrop (tap-to-dismiss) plus an 88%-height bottom sheet with a drag
// handle. The two stacked months drive a Zustand-backed range selection;
// the guest stepper and live price preview update against the same store.

import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GoldButton } from '../../../src/components/buttons';
import { SheetMonth } from '../../../src/components/calendar/SheetMonth';
import { Hairline } from '../../../src/components/hairlines';
import { Close } from '../../../src/components/icons';
import { NumberStepper } from '../../../src/components/stepper';
import { Body, Caps, Serif, Tnum } from '../../../src/components/typography';
import { requireVilla } from '../../../src/lib/data';
import { calcTotal } from '../../../src/lib/pricing';
import { colors, radii } from '../../../src/lib/theme';
import { useDraftBooking } from '../../../src/store/draftBooking';

// Booked dates for the demo — Day 10 will wire these to a Firestore feed.
const SEP_BOOKED = [3, 4, 15, 16, 17, 28] as const;
const OCT_BOOKED = [10, 11, 22, 23, 24] as const;

export default function BookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const villa = requireVilla(id || 'aroma');
  const insets = useSafeAreaInsets();

  const range = useDraftBooking((s) => s.range);
  const guests = useDraftBooking((s) => s.guests);
  const setGuests = useDraftBooking((s) => s.setGuests);

  const hasRange = range.start !== null && range.end !== null;
  const nights = hasRange ? (range.end as number) - (range.start as number) : 0;
  const total = calcTotal(villa.price, nights);

  const onContinue = () => {
    if (!hasRange) return;
    router.push('/checkout/review');
  };

  return (
    <View style={styles.root}>
      {/* Dimmed backdrop — tap to dismiss. */}
      <Pressable style={StyleSheet.absoluteFill} onPress={() => router.back()} />

      {/* Sheet */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom }]}>
        {/* Drag handle */}
        <View style={styles.handleRow}>
          <View style={styles.handle} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Caps color={colors.text3}>{`${villa.city}, ${villa.country}`}</Caps>
            <Serif size={22} style={styles.headerTitle}>
              Choose your dates
            </Serif>
          </View>
          <Pressable
            onPress={() => router.back()}
            style={styles.closeBtn}
            accessibilityRole="button"
          >
            <Close size={14} color={colors.text} />
          </Pressable>
        </View>

        <Hairline />

        {/* Selected range summary */}
        <View style={styles.summaryRow}>
          <SummaryCell label="Check-in" value={formatDay(range.start, range.monthIdx)} />
          <SummaryCell label="Check-out" value={formatDay(range.end, range.monthIdx)} />
        </View>

        {/* Scrollable calendar */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <SheetMonth year={2026} month={8} booked={SEP_BOOKED} />
          <SheetMonth year={2026} month={9} booked={OCT_BOOKED} />

          <Hairline strong style={styles.guestDivider} />

          <View style={styles.guestRow}>
            <View style={{ flexShrink: 1 }}>
              <Serif size={22}>How many guests?</Serif>
              <Body size={12} color={colors.text3} style={{ marginTop: 4 }}>
                Up to {villa.sleeps} guests for this villa
              </Body>
            </View>
            <NumberStepper value={guests} max={villa.sleeps} onChange={setGuests} />
          </View>

          <View style={{ height: 8 }} />
        </ScrollView>

        {/* Sticky bottom: price preview + CTA */}
        <View style={styles.footer}>
          <View style={styles.priceRow}>
            {hasRange ? (
              <>
                <Body size={13} color={colors.text2}>
                  {nights} night{nights === 1 ? '' : 's'} · {guests} guest{guests === 1 ? '' : 's'}
                </Body>
                <View style={styles.totalCol}>
                  <Tnum size={22} weight={600}>
                    ${total.toLocaleString()}
                  </Tnum>
                  <Body size={12} color={colors.text3}>
                    total
                  </Body>
                </View>
              </>
            ) : (
              <Body size={13} color={colors.text3}>
                Select a date range to see the total
              </Body>
            )}
          </View>
          <GoldButton fullWidth disabled={!hasRange} onPress={onContinue}>
            Continue
          </GoldButton>
        </View>
      </View>
    </View>
  );
}

// --- Summary cell (check-in / check-out boxes) --------------------------

function SummaryCell({ label, value }: { label: string; value: string | null }) {
  const active = value !== null;
  return (
    <View style={[summaryStyles.cell, active ? summaryStyles.cellActive : summaryStyles.cellEmpty]}>
      <Caps size={10} color={colors.text3} style={{ letterSpacing: 0.06 * 10 }}>
        {label}
      </Caps>
      <Serif size={18} color={active ? colors.text : colors.text3} style={{ marginTop: 2 }}>
        {value ?? 'Add date'}
      </Serif>
    </View>
  );
}

const summaryStyles = StyleSheet.create({
  cell: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  cellActive: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(212,178,122,0.05)',
  },
  cellEmpty: {
    borderColor: colors.hairline2,
    borderStyle: 'dashed',
  },
});

// --- Helpers ------------------------------------------------------------

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatDay(day: number | null, monthIdx: number | null): string | null {
  if (day === null || monthIdx === null) return null;
  const month = MONTH_NAMES[monthIdx] ?? '';
  return `${month} ${day}`;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '88%',
    backgroundColor: colors.bgSheet,
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    overflow: 'hidden',
    // RN-platform-difference: web uses a complex multi-stop box-shadow on the
    // sheet top edge; on iOS this is approximated with elevation via the
    // border-radius alone (the dim backdrop handles the depth read).
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 4,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(245,244,239,0.18)',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 22,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    marginTop: 4,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: 'rgba(245,244,239,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 4,
    paddingBottom: 14,
  },
  guestDivider: {
    marginTop: 4,
    marginBottom: 22,
  },
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#0B0B0B',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  totalCol: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
});
