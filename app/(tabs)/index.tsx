// A. Discover — Villas feed.
//
// Translated from /Users/pratyakshgupta/Downloads/flymeout/project/villas/
// screens/discover.jsx. Sticky header (eyebrow + serif title + search row +
// two chips) over a single-column feed of villa cards. The cards link into
// the /villa/[id] detail route.

import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Chip } from '../../src/components/chips';
import { CalendarIcon, Search, Users } from '../../src/components/icons';
import { Photo } from '../../src/components/photo/Photo';
import { Body, Caps, Serif, Tnum } from '../../src/components/typography';
import { VILLAS, type Villa } from '../../src/lib/data';
import { colors, fonts, radii } from '../../src/lib/theme';

const STATUS_BAR_PAD = 56;

function DiscoverHeader() {
  return (
    <LinearGradient
      colors={['#0A0A0A', 'rgba(10,10,10,0.92)', 'rgba(10,10,10,0)']}
      locations={[0.78, 0.95, 1]}
      style={styles.headerWrap}
    >
      <View style={{ height: STATUS_BAR_PAD }} />
      <Caps style={styles.eyebrow} color={colors.text3}>
        FlyMeOut · Villas
      </Caps>
      <Serif size={52} weight={400} style={styles.title}>
        Villas
      </Serif>
      <View style={styles.searchBlock}>
        <View style={styles.searchField}>
          <Search size={17} color={colors.text2} />
          <Text style={styles.searchPlaceholder}>Where to?</Text>
        </View>
        <View style={styles.chipsRow}>
          <Chip icon={<CalendarIcon size={16} color={colors.text2} />}>Add dates</Chip>
          <Chip icon={<Users size={16} color={colors.text2} />}>Add guests</Chip>
        </View>
      </View>
    </LinearGradient>
  );
}

function VillaCard({ v }: { v: Villa }) {
  return (
    <Link href={`/villa/${v.id}`} asChild>
      <Pressable style={styles.cardWrap}>
        <Photo src={v.photo} fallback={v.fallback} aspectRatio={4 / 5} rounded={radii.card} />
        <View style={styles.cardBody}>
          <Caps>{`${v.city}, ${v.country}`}</Caps>
          <Serif size={26} weight={400} style={styles.cardTitle}>
            {v.name}
          </Serif>
          <View style={styles.priceRow}>
            <Tnum size={13.5} color={colors.text} weight={500}>
              from ${v.price.toLocaleString()}
            </Tnum>
            <Body size={13.5} color={colors.text3}>
              / night
            </Body>
            <Body size={13.5} color={colors.text4}>
              ·
            </Body>
            <Body size={13.5} color={colors.text2}>
              Sleeps {v.sleeps}
            </Body>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: 110 + insets.bottom }}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      <DiscoverHeader />
      <View style={{ paddingTop: 6 }}>
        {VILLAS.map((v) => (
          <VillaCard key={v.id} v={v} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerWrap: {
    paddingBottom: 14,
  },
  eyebrow: {
    paddingHorizontal: 24,
  },
  title: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 18,
    lineHeight: 52,
  },
  searchBlock: {
    paddingHorizontal: 16,
    gap: 10,
  },
  searchField: {
    height: 50,
    borderRadius: radii.pill,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: colors.hairline,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 12,
  },
  searchPlaceholder: {
    color: colors.text2,
    fontFamily: fonts.sans,
    fontSize: 15,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cardWrap: {
    paddingHorizontal: 16,
    paddingBottom: 26,
  },
  cardBody: {
    paddingTop: 14,
    paddingHorizontal: 4,
  },
  cardTitle: {
    marginTop: 6,
    lineHeight: 27,
  },
  priceRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    flexWrap: 'wrap',
  },
});
