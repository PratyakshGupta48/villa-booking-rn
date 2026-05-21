// D. Review — summary card, trip details, price breakdown, payment row,
// cancellation line, sticky CTA.
//
// Translated from /Users/pratyakshgupta/Downloads/flymeout/project/villas/
// screens/review.jsx. Renders the active sample BOOKING against the mocked
// data layer (see README "Data layer" for the production-wiring shape).

import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '../../src/components/avatar';
import { GoldButton } from '../../src/components/buttons';
import { ApplePay, Back, Card, Chevron, Lock } from '../../src/components/icons';
import { Photo } from '../../src/components/photo/Photo';
import { Body, Caps, Serif, Tnum } from '../../src/components/typography';
import { BOOKING } from '../../src/lib/data';
import { colors, fonts, letterSpacing, radii } from '../../src/lib/theme';

const STATUS_BAR_PAD = 56;

export default function ReviewScreen() {
  const b = BOOKING;
  const subtotal = b.nightly * b.nights;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ReviewHeader />

        <View style={styles.body}>
          <Serif size={34} style={styles.title}>
            Review your trip
          </Serif>

          {/* Summary card */}
          <View style={styles.summaryCard}>
            <Photo
              src={b.villa.photo}
              fallback={b.villa.fallback}
              style={styles.summaryThumb}
              rounded={10}
              noGradient
              noGrain
            />
            <View style={styles.summaryInfo}>
              <Caps color={colors.text3}>{`${b.villa.city}, ${b.villa.country}`}</Caps>
              <Serif size={22} style={styles.summaryName}>
                {b.villa.name}
              </Serif>
              <View style={styles.summaryHost}>
                <Avatar name={b.villa.host} size={18} />
                <Body size={12.5} color={colors.text2}>
                  Hosted by {b.villa.host}
                </Body>
              </View>
            </View>
          </View>

          {/* Trip details */}
          <View style={styles.section}>
            <Caps>Trip details</Caps>
            <View style={{ marginTop: 6 }}>
              <DetailRow
                label="Dates"
                value={`${b.startLabel} – ${b.endLabel}`}
                value2={`${b.nights} nights`}
              />
              <DetailRow
                label="Guests"
                value={`${b.guests} guests`}
                value2="2 adults · 2 children"
              />
              <DetailRow label="Host" value={b.villa.host} value2="Verified Member" />
            </View>
          </View>

          {/* Price breakdown */}
          <View style={styles.section}>
            <Caps>Price</Caps>
            <View style={{ marginTop: 8 }}>
              <PriceLine
                label={`$${b.nightly.toLocaleString()} × ${b.nights} nights`}
                value={`$${subtotal.toLocaleString()}`}
              />
              <PriceLine label="Cleaning fee" value={`$${b.cleaning}`} />
              <PriceLine label="Service fee" value={`$${b.service}`} />
              <PriceLine total label="Total · USD" value={`$${b.total.toLocaleString()}`} />
            </View>
          </View>

          {/* Payment */}
          <View style={styles.section}>
            <Caps>Pay with</Caps>
            <View style={styles.paymentRow}>
              <View style={styles.paymentLeft}>
                <View style={styles.applePayPill}>
                  <ApplePay width={28} color="#000" />
                </View>
                <View>
                  <Body size={15} weight={500}>
                    Apple Pay
                  </Body>
                  <Body size={12} color={colors.text3} style={{ marginTop: 2 }}>
                    Default · ending in •• 4421
                  </Body>
                </View>
              </View>
              <Chevron size={14} color={colors.text3} />
            </View>
            <Pressable style={styles.addCardRow}>
              <View style={styles.addCardLeft}>
                <Card size={16} color={colors.text2} />
                <Body size={14} color={colors.text2}>
                  Add a card
                </Body>
              </View>
              <Chevron size={14} color={colors.text2} />
            </Pressable>
          </View>

          {/* Cancellation */}
          <Serif size={14} italic style={styles.cancellation}>
            Free cancellation until {b.cancelBy}.
          </Serif>

          <View style={{ height: 130 }} />
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.stickyCtaWrap} pointerEvents="box-none">
        <LinearGradient
          colors={['rgba(10,10,10,0)', '#0A0A0A']}
          locations={[0, 0.36]}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
        <GoldButton
          fullWidth
          style={styles.reserveBtn}
          onPress={() => router.push(`/confirmation/${b.villa.id}`)}
        >
          Reserve and pay ${b.total.toLocaleString()}
        </GoldButton>
        <View style={styles.secureRow}>
          <Lock size={11} color={colors.text3} />
          <Caps size={11} color={colors.text3} style={{ letterSpacing: 0.04 * 11 }}>
            Payment secured by Stripe
          </Caps>
        </View>
      </View>
    </View>
  );
}

// --- Header --------------------------------------------------------------

function ReviewHeader() {
  return (
    <View style={headerStyles.row}>
      <Pressable
        onPress={() => router.back()}
        style={headerStyles.backBtn}
        accessibilityRole="button"
      >
        <Back size={16} color={colors.text2} />
      </Pressable>
      <Caps color={colors.text3}>Review · 1 of 2</Caps>
      <View style={{ width: 36 }} />
    </View>
  );
}

const headerStyles = StyleSheet.create({
  row: {
    paddingTop: STATUS_BAR_PAD,
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.hairline2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// --- DetailRow ------------------------------------------------------------

function DetailRow({ label, value, value2 }: { label: string; value: string; value2?: string }) {
  return (
    <View style={detailRowStyles.row}>
      <Caps size={13} color={colors.text3} style={{ letterSpacing: 0.04 * 13 }}>
        {label}
      </Caps>
      <View style={detailRowStyles.right}>
        <Body size={15}>{value}</Body>
        {value2 ? (
          <Body size={12.5} color={colors.text3} style={{ marginTop: 3 }}>
            {value2}
          </Body>
        ) : null}
      </View>
    </View>
  );
}

const detailRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  right: {
    alignItems: 'flex-end',
  },
});

// --- PriceLine ------------------------------------------------------------

function PriceLine({
  label,
  value,
  total = false,
}: {
  label: string;
  value: string;
  total?: boolean;
}) {
  return (
    <View style={[priceLineStyles.row, total && priceLineStyles.totalRow]}>
      <PriceLabel label={label} total={total} />
      <PriceValue value={value} total={total} />
    </View>
  );
}

function PriceLabel({ label, total }: { label: string; total: boolean }): ReactNode {
  if (total) {
    return (
      <Caps
        size={14}
        color={colors.text}
        style={{ letterSpacing: 0.04 * 14, fontFamily: fonts.sansMedium }}
      >
        {label}
      </Caps>
    );
  }
  return (
    <Body size={13.5} color={colors.text2} weight={400}>
      {label}
    </Body>
  );
}

function PriceValue({ value, total }: { value: string; total: boolean }): ReactNode {
  if (total) {
    return (
      <Serif size={28} weight={400} tnum>
        {value}
      </Serif>
    );
  }
  return (
    <Tnum size={14} weight={500}>
      {value}
    </Tnum>
  );
}

const priceLineStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
  },
  totalRow: {
    paddingTop: 14,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.hairline2,
    marginTop: 8,
  },
});

// --- Screen styles --------------------------------------------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  body: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 8,
    lineHeight: 36,
    letterSpacing: letterSpacing.serif(34),
  },
  section: {
    marginTop: 28,
  },
  summaryCard: {
    marginTop: 22,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.cardLg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  summaryThumb: {
    width: 82,
    height: 82,
    flexShrink: 0,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryName: {
    marginTop: 4,
    lineHeight: 24,
  },
  summaryHost: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  paymentRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.card,
  },
  paymentLeft: {
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
  },
  addCardRow: {
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.card,
  },
  addCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cancellation: {
    marginTop: 26,
    textAlign: 'center',
    color: colors.text2,
  },
  stickyCtaWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 26,
  },
  reserveBtn: {
    height: 56,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
});
