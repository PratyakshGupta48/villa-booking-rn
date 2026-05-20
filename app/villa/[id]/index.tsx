// B. Villa Detail — full-bleed gallery, info hierarchy, sticky CTA.
//
// Translated from /Users/pratyakshgupta/Downloads/flymeout/project/villas/
// screens/detail.jsx. Single image with overlaid pagination dots stands in
// for the full gallery (real swipe comes in a later phase). Sub-components
// (FloatingTopBar, GalleryDots, StatTile, Amenity, MiniMonth, StickyBookBar)
// stay co-located here — they only appear on this screen.

import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Avatar } from '../../../src/components/avatar';
import { VerifiedBadge } from '../../../src/components/badges';
import { GoldButton } from '../../../src/components/buttons';
import { Hairline } from '../../../src/components/hairlines';
import {
  Back,
  Bath,
  Bed,
  Bell,
  Chef,
  type IconProps,
  Pool,
  Share,
  Spa,
  Star,
  Users,
  Wave,
  Wifi,
} from '../../../src/components/icons';
import { Photo } from '../../../src/components/photo/Photo';
import { Body, Caps, Serif, Tnum } from '../../../src/components/typography';
import { requireVilla, type Villa } from '../../../src/lib/data';
import { colors, radii } from '../../../src/lib/theme';

const GALLERY_HEIGHT = 470;
const STATUS_BAR_PAD = 56;

// --- Sub-components -------------------------------------------------------

function GalleryDots({ count = 5, active = 1 }: { count?: number; active?: number }) {
  return (
    <View style={dotStyles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={[
            dotStyles.dot,
            {
              width: i === active ? 18 : 6,
              backgroundColor: i === active ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
            },
          ]}
        />
      ))}
    </View>
  );
}

const dotStyles = StyleSheet.create({
  row: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    zIndex: 5,
  },
  dot: {
    height: 6,
    borderRadius: 999,
  },
});

function FloatingTopBar() {
  return (
    <View style={topBarStyles.row} pointerEvents="box-none">
      <Pressable onPress={() => router.back()} style={topBarStyles.pill}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
        <Back size={18} color={colors.text} />
      </Pressable>
      <Pressable style={topBarStyles.pill}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
        <Share size={15} color={colors.text} />
      </Pressable>
    </View>
  );
}

const topBarStyles = StyleSheet.create({
  row: {
    position: 'absolute',
    top: STATUS_BAR_PAD,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 6,
  },
  pill: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: 'rgba(10,10,10,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

function StatTile({ icon, big, label }: { icon: ReactNode; big: number; label: string }) {
  return (
    <View style={statStyles.tile}>
      <View>{icon}</View>
      <View style={statStyles.row}>
        <Serif size={22} weight={400} style={{ lineHeight: 22 }}>
          {big}
        </Serif>
        <Caps size={11} color={colors.text3} style={{ letterSpacing: 0.06 * 11 }}>
          {label}
        </Caps>
      </View>
    </View>
  );
}

const statStyles = StyleSheet.create({
  tile: {
    flex: 1,
    padding: 18,
    paddingHorizontal: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.card,
    backgroundColor: 'rgba(245,244,239,0.015)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
});

function Amenity({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <View style={amenityStyles.cell}>
      <View>{icon}</View>
      <Body size={13} color={colors.text}>
        {label}
      </Body>
    </View>
  );
}

const amenityStyles = StyleSheet.create({
  cell: {
    width: '33.333%',
    paddingVertical: 18,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
    gap: 10,
  },
});

// --- Static inline month calendar (the design's mini-month preview) ------

const DAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

function MiniMonth({
  year = 2026,
  month = 8, // 0-indexed: 8 = September
  booked = [3, 4, 15, 16, 17, 28],
  available = [8, 9, 10, 11, 12, 13],
}: {
  year?: number;
  month?: number;
  booked?: readonly number[];
  available?: readonly number[];
}) {
  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const monthName = first.toLocaleString('en-US', { month: 'long' });

  return (
    <View>
      <View style={calStyles.header}>
        <Serif size={18}>
          {monthName} {year}
        </Serif>
        <View style={calStyles.navArrows}>
          <Back size={16} color={colors.text3} />
          <View style={{ transform: [{ rotate: '180deg' }] }}>
            <Back size={16} color={colors.text3} />
          </View>
        </View>
      </View>
      <View style={calStyles.dayHeaderRow}>
        {DAY_INITIALS.map((d, i) => (
          <View key={i} style={calStyles.dayHeaderCell}>
            <Body size={10} color={colors.text3} style={{ letterSpacing: 0.1 * 10 }}>
              {d}
            </Body>
          </View>
        ))}
      </View>
      <View style={calStyles.grid}>
        {cells.map((d, i) => {
          if (d === null) return <View key={i} style={calStyles.emptyCell} />;
          const isBooked = booked.includes(d);
          const isAvail = available.includes(d);
          return (
            <View
              key={i}
              style={[calStyles.cell, isAvail && { backgroundColor: 'rgba(212,178,122,0.08)' }]}
            >
              <Tnum
                size={13}
                color={isBooked ? colors.text4 : colors.text}
                weight={isAvail ? 500 : 400}
                style={isBooked ? { textDecorationLine: 'line-through' } : undefined}
              >
                {d}
              </Tnum>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const calStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  navArrows: {
    flexDirection: 'row',
    gap: 18,
  },
  dayHeaderRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  dayHeaderCell: {
    width: '14.2857%',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 4,
  },
  cell: {
    width: '14.2857%',
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.calendarCell,
  },
  emptyCell: {
    width: '14.2857%',
    height: 34,
  },
});

function StickyBookBar({ price, villaId }: { price: number; villaId: string }) {
  return (
    <View style={bookBarStyles.outer} pointerEvents="box-none">
      <LinearGradient
        colors={['rgba(10,10,10,0)', '#0A0A0A']}
        locations={[0, 0.26]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={bookBarStyles.pill}>
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFillObject} />
        <View style={bookBarStyles.priceCol}>
          <Caps size={11} color={colors.text3} style={{ letterSpacing: 0.06 * 11 }}>
            from
          </Caps>
          <View style={bookBarStyles.priceRow}>
            <Tnum size={18} weight={600}>
              ${price.toLocaleString()}
            </Tnum>
            <Body size={12} color={colors.text3}>
              / night
            </Body>
          </View>
        </View>
        <GoldButton style={{ height: 44 }} onPress={() => router.push(`/villa/${villaId}/book`)}>
          Check availability
        </GoldButton>
      </View>
    </View>
  );
}

const bookBarStyles = StyleSheet.create({
  outer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 26,
    zIndex: 40,
  },
  pill: {
    backgroundColor: 'rgba(20,20,20,0.92)',
    borderWidth: 1,
    borderColor: colors.hairline2,
    borderRadius: 999,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  priceCol: {
    paddingLeft: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
});

// --- Amenities preset (matches the design's hard-coded set) --------------

type AmenityDef = { Icon: (props: IconProps) => ReactNode; label: string };
const AMENITIES: readonly AmenityDef[] = [
  { Icon: Pool, label: 'Pool' },
  { Icon: Wave, label: 'Sea view' },
  { Icon: Wifi, label: 'Wi-Fi' },
  { Icon: Bell, label: 'Concierge' },
  { Icon: Spa, label: 'Spa' },
  { Icon: Chef, label: 'Chef-on-call' },
];

// --- The screen ----------------------------------------------------------

export default function VillaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const villa: Villa = requireVilla(id || 'aroma');

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Gallery */}
        <Photo
          src={villa.photo}
          fallback={villa.fallback}
          style={{ height: GALLERY_HEIGHT, width: '100%' }}
        >
          <GalleryDots count={5} active={1} />
        </Photo>

        {/* Body */}
        <View style={styles.body}>
          <Caps>{`${villa.city}, ${villa.country}`}</Caps>
          <Serif size={40} weight={400} style={styles.title}>
            {villa.name}
          </Serif>

          {/* Rating row */}
          <View style={styles.ratingRow}>
            <Star size={11} color={colors.gold} />
            <Serif size={14} italic color={colors.text}>
              4.9
            </Serif>
            <Serif size={14} italic color={colors.text4}>
              ·
            </Serif>
            <Serif size={14} italic color={colors.text2}>
              24 stays
            </Serif>
          </View>

          {/* Host row */}
          <View style={styles.hostRow}>
            <Avatar name={villa.host} size={36} />
            <View style={{ gap: 4 }}>
              <Body size={13.5}>
                Hosted by{' '}
                <Body size={13.5} weight={500}>
                  {villa.host}
                </Body>
              </Body>
              <VerifiedBadge small />
            </View>
          </View>

          <Hairline style={styles.divider} />

          {/* 3-stat row */}
          <View style={styles.statsRow}>
            <StatTile
              icon={<Users size={17} color={colors.text2} />}
              big={villa.sleeps}
              label="Guests"
            />
            <StatTile
              icon={<Bed size={17} color={colors.text2} />}
              big={Math.ceil(villa.sleeps / 2)}
              label="Bedrooms"
            />
            <StatTile
              icon={<Bath size={17} color={colors.text2} />}
              big={Math.max(2, Math.floor(villa.sleeps / 2))}
              label="Bathrooms"
            />
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Caps>Amenities</Caps>
            <View style={styles.amenityGrid}>
              {AMENITIES.map(({ Icon, label }) => (
                <Amenity key={label} icon={<Icon size={18} color={colors.gold} />} label={label} />
              ))}
            </View>
          </View>

          {/* About */}
          <View style={styles.section}>
            <Caps>About</Caps>
            <Serif size={17} italic style={styles.aboutPara}>
              A whitewashed retreat set into a hillside above the Aegean — three terraces drop down
              to a heated infinity pool that vanishes into the sea.
            </Serif>
            <Serif size={17} italic style={styles.aboutPara}>
              Mornings begin with espresso on the south terrace; evenings end with the chef’s
              slow-cooked lamb and the sound of cicadas in the olives.
            </Serif>
          </View>

          {/* Availability */}
          <View style={styles.section}>
            <Caps>Availability</Caps>
            <View style={styles.availabilityCard}>
              <MiniMonth />
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={styles.legendSwatchAvail} />
                  <Caps size={11.5} color={colors.text3} style={{ letterSpacing: 0.04 * 11.5 }}>
                    Available
                  </Caps>
                </View>
                <View style={styles.legendItem}>
                  <View style={styles.legendSwatchBooked} />
                  <Caps size={11.5} color={colors.text3} style={{ letterSpacing: 0.04 * 11.5 }}>
                    Booked
                  </Caps>
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: 140 }} />
        </View>
      </ScrollView>

      <FloatingTopBar />
      <StickyBookBar price={villa.price} villaId={villa.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  body: {
    paddingTop: 28,
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 8,
    lineHeight: 41,
  },
  ratingRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  hostRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    marginVertical: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  section: {
    marginTop: 36,
  },
  amenityGrid: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  aboutPara: {
    marginTop: 12,
    lineHeight: 17 * 1.55,
  },
  availabilityCard: {
    marginTop: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.card,
    backgroundColor: 'rgba(245,244,239,0.015)',
  },
  legendRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 18,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendSwatchAvail: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: 'rgba(212,178,122,0.15)',
    borderWidth: 1,
    borderColor: colors.gold,
  },
  legendSwatchBooked: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.text4,
  },
});
