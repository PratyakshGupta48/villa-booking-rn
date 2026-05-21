// F. Confirmation — restrained luxury, no confetti.
//
// Translated from /Users/pratyakshgupta/Downloads/flymeout/project/villas/
// screens/confirmation.jsx. Hero band over the villa photo with a soft
// warm vignette down to bg, a small refined accent mark, the italic-serif
// "You're going to {City}." headline, a booking-ref pill, a stay-at-a-
// glance details card, and two CTAs.

import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GhostButton, GoldButton } from '../../../src/components/buttons';
import { Hairline } from '../../../src/components/hairlines';
import { Check } from '../../../src/components/icons';
import { Photo } from '../../../src/components/photo/Photo';
import { Caps, Serif, Tnum } from '../../../src/components/typography';
import { BOOKING, requireVilla } from '../../../src/lib/data';
import { colors, fonts, letterSpacing, radii } from '../../../src/lib/theme';

const STATUS_BAR_PAD = 56;
const HERO_HEIGHT = 360;

export default function ConfirmationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  // The booking is fixed sample data against the mocked data layer; the
  // {id} param drives the hero photo only.
  const villa = requireVilla(id || 'aroma');
  const b = BOOKING;

  const stayRows: [string, string][] = [
    ['Check-in', `${b.startLabel}, ${b.year} · 4:00 PM`],
    ['Check-out', `${b.endLabel}, ${b.year} · 11:00 AM`],
    ['Guests', `${b.guests} guests`],
    ['Hosted by', b.villa.host],
    ['Total paid', `$${b.total.toLocaleString()} · Apple Pay`],
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero band */}
      <View style={styles.hero}>
        <Photo
          src={villa.photo}
          fallback={villa.fallback}
          style={{ height: HERO_HEIGHT, width: '100%' }}
          noGradient
          noGrain
        />
        <LinearGradient
          colors={['rgba(10,10,10,0.55)', 'rgba(10,10,10,0.7)', colors.bg]}
          locations={[0, 0.6, 1]}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
        <View style={styles.heroTopEyebrow}>
          <Caps color={colors.text2}>FlyMeOut · Booking confirmed</Caps>
        </View>
        <View style={styles.heroCenter}>
          <ConfirmMark />
          <Serif size={38} italic style={styles.heroHeadline}>
            You’re going to{'\n'}
            {b.villa.city}.
          </Serif>
        </View>
      </View>

      {/* Below hero */}
      <View style={styles.below}>
        <Serif size={18} color={colors.text2} style={styles.sub}>
          {b.villa.name} · {b.startLabel} – {b.endLabel}
        </Serif>

        <View style={styles.refBadge}>
          <Caps size={12} color={colors.text2} style={{ letterSpacing: 0.14 * 12 }}>
            Booking ·{' '}
          </Caps>
          <Tnum size={12} weight={500} style={{ letterSpacing: 0.1 * 12 }}>
            {b.ref}
          </Tnum>
        </View>

        {/* Stay-at-a-glance card */}
        <View style={styles.stayCard}>
          {stayRows.map(([label, value], i) => (
            <Fragment key={label}>
              {i > 0 && <Hairline />}
              <View style={styles.stayRow}>
                <Caps size={11.5} color={colors.text3} style={{ letterSpacing: 0.06 * 11.5 }}>
                  {label}
                </Caps>
                <Tnum size={14}>{value}</Tnum>
              </View>
            </Fragment>
          ))}
        </View>

        <Serif size={13} italic color={colors.text3} style={styles.helpText}>
          Your itinerary, host contact, and gate code will arrive by email and live in Trips.
        </Serif>

        <View style={styles.ctaCol}>
          <GoldButton fullWidth onPress={() => router.replace('/(tabs)/trips')}>
            View trip details
          </GoldButton>
          <GhostButton fullWidth onPress={() => router.replace('/(tabs)')}>
            Back to Discover
          </GhostButton>
        </View>
      </View>
    </ScrollView>
  );
}

// --- ConfirmMark ----------------------------------------------------------

function ConfirmMark() {
  return (
    <View style={markStyles.outer}>
      <View style={markStyles.ring}>
        <Check size={22} color={colors.gold} strokeWidth={1.7} />
      </View>
    </View>
  );
}

const markStyles = StyleSheet.create({
  outer: {
    // RN-platform-difference: web uses `box-shadow: 0 0 0 6px rgba(212,178,
    // 122,0.08)` to draw the subtle glow ring around the mark. RN has no
    // outset-shadow equivalent on iOS, so we paint a soft tinted ring as a
    // sibling View one level out.
    width: 68,
    height: 68,
    borderRadius: 999,
    backgroundColor: 'rgba(212,178,122,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: 56,
    height: 56,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// --- Screen styles --------------------------------------------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  hero: {
    position: 'relative',
    height: HERO_HEIGHT,
  },
  heroTopEyebrow: {
    position: 'absolute',
    top: STATUS_BAR_PAD,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  heroCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 92,
    alignItems: 'center',
    gap: 20,
  },
  heroHeadline: {
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: letterSpacing.serifItalic(38),
    paddingHorizontal: 24,
  },
  below: {
    paddingHorizontal: 24,
    paddingTop: 8,
    alignItems: 'center',
  },
  sub: {
    textAlign: 'center',
  },
  refBadge: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.hairline2,
  },
  stayCard: {
    marginTop: 28,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.cardLg,
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  stayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  helpText: {
    marginTop: 22,
    textAlign: 'center',
    letterSpacing: letterSpacing.serifItalic(13),
    fontFamily: fonts.serifItalic,
  },
  ctaCol: {
    marginTop: 28,
    gap: 10,
    alignSelf: 'stretch',
  },
});
