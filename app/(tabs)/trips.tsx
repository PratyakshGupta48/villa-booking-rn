// G. Trips — Upcoming / Past segmented control over a list of TripCards.
//
// Translated from /Users/pratyakshgupta/Downloads/flymeout/project/villas/
// screens/trips.jsx. The design splits this into three separate variants
// (Upcoming, Past, Empty); in the real app they're one screen driven by a
// local segment state. For now Past holds hand-crafted historical trips so
// the screen has texture; Day 10 wires Firestore.

import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import { type ReactNode, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GoldButton } from '../../src/components/buttons';
import { Hairline } from '../../src/components/hairlines';
import { Chevron, Pencil } from '../../src/components/icons';
import { Photo } from '../../src/components/photo/Photo';
import { Body, Caps, Serif } from '../../src/components/typography';
import { BOOKING, requireVilla, type Villa } from '../../src/lib/data';
import { colors, fonts, letterSpacing, radii } from '../../src/lib/theme';

type Segment = 'upcoming' | 'past';

type TripEntry = {
  villa: Villa;
  dates: string;
  status?: string;
  muted?: boolean;
  showReview?: boolean;
};

const PAST_TRIPS: TripEntry[] = [
  {
    villa: requireVilla('banyan'),
    dates: 'Mar 14 – Mar 19, 2026 · 5 nights',
    muted: true,
    showReview: true,
  },
  {
    villa: requireVilla('esprit'),
    dates: 'Sep 8 – Sep 13, 2025 · 5 nights',
    muted: true,
    showReview: true,
  },
  { villa: requireVilla('suprema'), dates: 'Apr 3 – Apr 8, 2025 · 5 nights', muted: true },
];

export default function TripsScreen() {
  const insets = useSafeAreaInsets();
  const [segment, setSegment] = useState<Segment>('upcoming');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: 56, paddingBottom: 110 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBlock}>
        <Caps color={colors.text3}>My Trips</Caps>
        <Serif size={52} style={styles.title}>
          Trips
        </Serif>
        <View style={{ marginTop: 18 }}>
          <SegmentedControl
            value={segment}
            onChange={setSegment}
            items={[
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'past', label: 'Past' },
            ]}
          />
        </View>
      </View>

      {segment === 'upcoming' ? <UpcomingView /> : <PastView />}
    </ScrollView>
  );
}

// --- Upcoming view --------------------------------------------------------

function UpcomingView() {
  return (
    <View style={styles.listWrap}>
      <FeaturedTripCard />
      <View style={{ height: 14 }} />
      <TripCard villa={requireVilla('phare')} dates="Dec 22 – Dec 29, 2026" status="Confirmed" />
    </View>
  );
}

// --- Past view ------------------------------------------------------------

function PastView() {
  return (
    <View style={styles.listWrap}>
      {PAST_TRIPS.map((t) => (
        <TripCard
          key={`${t.villa.id}-${t.dates}`}
          villa={t.villa}
          dates={t.dates}
          muted={t.muted}
          showReview={t.showReview}
        />
      ))}
    </View>
  );
}

// --- Segmented control ----------------------------------------------------

type SegmentedControlProps = {
  value: Segment;
  onChange: (next: Segment) => void;
  items: readonly { id: Segment; label: string }[];
};

function SegmentedControl({ value, onChange, items }: SegmentedControlProps) {
  return (
    <View style={segStyles.wrap}>
      {items.map((it) => {
        const on = it.id === value;
        return (
          <Pressable
            key={it.id}
            onPress={() => onChange(it.id)}
            style={[segStyles.item, on && segStyles.itemOn]}
            accessibilityRole="button"
          >
            <Body
              size={12.5}
              weight={on ? 600 : 500}
              color={on ? colors.goldButtonText : colors.text2}
            >
              {it.label}
            </Body>
          </Pressable>
        );
      })}
    </View>
  );
}

const segStyles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: colors.bgElev1,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.pill,
    padding: 4,
  },
  item: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  itemOn: {
    backgroundColor: colors.gold,
  },
});

// --- Featured upcoming card (the active BOOKING) -------------------------

function FeaturedTripCard() {
  return (
    <Link href={`/villa/${BOOKING.villa.id}`} asChild>
      <Pressable style={featuredStyles.card}>
        <Photo
          src={BOOKING.villa.photo}
          fallback={BOOKING.villa.fallback}
          style={{ height: 200, width: '100%' }}
          noGrain
        >
          <View style={featuredStyles.confirmedBadge}>
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
            <View style={featuredStyles.badgeDot} />
            <Body
              size={10.5}
              weight={500}
              color={colors.gold}
              style={{ letterSpacing: 0.08 * 10.5, textTransform: 'uppercase' }}
            >
              Confirmed
            </Body>
          </View>
        </Photo>
        <View style={featuredStyles.body}>
          <Caps color={colors.text2}>{`${BOOKING.villa.city}, ${BOOKING.villa.country}`}</Caps>
          <Serif size={26} style={featuredStyles.name}>
            {BOOKING.villa.name}
          </Serif>
          <View style={featuredStyles.bottomRow}>
            <Body size={13.5} color={colors.text2}>
              {BOOKING.startLabel} – {BOOKING.endLabel}, {BOOKING.year}
            </Body>
            <Serif size={13.5} italic color={colors.gold}>
              in 112 days
            </Serif>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const featuredStyles = StyleSheet.create({
  card: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.hairline2,
    borderRadius: radii.cardXl,
    overflow: 'hidden',
  },
  confirmedBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(10,10,10,0.5)',
    overflow: 'hidden',
    zIndex: 2,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.gold,
  },
  body: {
    paddingTop: 14,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  name: {
    marginTop: 6,
    lineHeight: 27,
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

// --- TripCard -------------------------------------------------------------

type TripCardProps = {
  villa: Villa;
  dates: string;
  status?: string;
  muted?: boolean;
  showReview?: boolean;
};

function TripCard({ villa, dates, status, muted, showReview }: TripCardProps): ReactNode {
  return (
    <View style={[cardStyles.card, muted && { opacity: 0.7 }]}>
      <Link href={`/villa/${villa.id}`} asChild>
        <Pressable style={cardStyles.row}>
          <Photo
            src={villa.photo}
            fallback={villa.fallback}
            style={{ width: 88, height: 88, flexShrink: 0 }}
            rounded={10}
            noGrain
          />
          <View style={cardStyles.info}>
            <View style={cardStyles.topRow}>
              <Caps color={colors.text3}>{`${villa.city}, ${villa.country}`}</Caps>
              {status ? (
                <View style={cardStyles.statusRow}>
                  <View style={cardStyles.statusDot} />
                  <Body
                    size={11}
                    weight={500}
                    color={colors.gold}
                    style={{ letterSpacing: 0.06 * 11, textTransform: 'uppercase' }}
                  >
                    {status}
                  </Body>
                </View>
              ) : null}
            </View>
            <Serif size={22} style={cardStyles.name}>
              {villa.name}
            </Serif>
            <Body size={12.5} color={colors.text2} style={{ marginTop: 8 }}>
              {dates}
            </Body>
          </View>
        </Pressable>
      </Link>
      {showReview ? (
        <>
          <Hairline />
          <Pressable style={cardStyles.reviewRow}>
            <View style={cardStyles.reviewLeft}>
              <Pencil size={14} color={colors.text2} />
              <Body size={13} color={colors.text2}>
                Leave a review
              </Body>
            </View>
            <Chevron size={14} color={colors.text2} />
          </Pressable>
        </>
      ) : null}
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.cardLg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },
  info: {
    flex: 1,
    paddingTop: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.gold,
  },
  name: {
    marginTop: 4,
    lineHeight: 24,
  },
  reviewRow: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

// --- Empty state (kept here for the day Trips is empty) ------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function EmptyView() {
  return (
    <View style={emptyStyles.wrap}>
      <Photo
        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1100&q=70"
        fallback="#3D4636"
        style={{ height: 380 }}
        rounded={radii.cardXl}
        noGrain
      />
      <Serif size={28} italic style={emptyStyles.headline}>
        No trips yet.
      </Serif>
      <Body size={14} color={colors.text2} style={emptyStyles.copy}>
        Your future stays will live here.{'\n'}Start with somewhere quiet.
      </Body>
      <GoldButton style={emptyStyles.cta}>Start exploring</GoldButton>
    </View>
  );
}

const emptyStyles = StyleSheet.create({
  wrap: {
    paddingTop: 30,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headline: {
    marginTop: 28,
    textAlign: 'center',
    lineHeight: 31,
    letterSpacing: letterSpacing.serifItalic(28),
    fontFamily: fonts.serifItalic,
  },
  copy: {
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 21,
  },
  cta: {
    marginTop: 22,
    paddingHorizontal: 28,
  },
});

// --- Screen styles --------------------------------------------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerBlock: {
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 8,
    lineHeight: 52,
  },
  listWrap: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
});
