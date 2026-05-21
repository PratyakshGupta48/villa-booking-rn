// State · Discover · empty — non-sticky header, large empty card with a
// sparse line-drawn search icon, a "Maybe instead" suggestion underneath.
// Translated from screens/states.jsx ScreenDiscoverEmpty.

import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GhostButton } from '../../src/components/buttons';
import { Chip } from '../../src/components/chips';
import { CalendarIcon, Search, Users } from '../../src/components/icons';
import { Photo } from '../../src/components/photo/Photo';
import { Body, Caps, Serif, Tnum } from '../../src/components/typography';
import { requireVilla } from '../../src/lib/data';
import { colors, fonts, letterSpacing, radii } from '../../src/lib/theme';

export default function EmptyDiscoverScreen() {
  const insets = useSafeAreaInsets();
  const phare = requireVilla('phare');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: 56, paddingBottom: 110 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      {/* Non-sticky Discover header */}
      <View style={styles.headerBlock}>
        <Caps color={colors.text3}>FlyMeOut · Villas</Caps>
        <Serif size={52} style={styles.title}>
          Villas
        </Serif>
        <View style={styles.searchBlock}>
          <View style={styles.searchField}>
            <Search size={17} color={colors.text2} />
            <Body size={15} color={colors.text2}>
              Where to?
            </Body>
          </View>
          <View style={styles.chipsRow}>
            <Chip icon={<CalendarIcon size={16} color={colors.text2} />}>Add dates</Chip>
            <Chip icon={<Users size={16} color={colors.text2} />}>Add guests</Chip>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.emptyCard}>
          <SparseSearchIcon />
          <Serif size={22} italic style={styles.emptyHeadline}>
            Nothing matches those filters.
          </Serif>
          <Body size={13} color={colors.text2} style={styles.emptyCopy}>
            We don’t have a villa that sleeps 12+ with a ski-in entrance and a private dock — yet.
          </Body>
          <GhostButton style={styles.clearBtn}>Clear filters</GhostButton>
        </View>

        <View style={styles.suggestionSection}>
          <Caps style={styles.suggestionLabel}>Maybe instead</Caps>
          <Link href={`/villa/${phare.id}`} asChild>
            <Pressable style={styles.cardWrap}>
              <Photo
                src={phare.photo}
                fallback={phare.fallback}
                aspectRatio={4 / 5}
                rounded={radii.card}
              />
              <View style={styles.cardBody}>
                <Caps>{`${phare.city}, ${phare.country}`}</Caps>
                <Serif size={26} style={styles.cardTitle}>
                  {phare.name}
                </Serif>
                <View style={styles.priceRow}>
                  <Tnum size={13.5} color={colors.text} weight={500}>
                    from ${phare.price.toLocaleString()}
                  </Tnum>
                  <Body size={13.5} color={colors.text3}>
                    / night
                  </Body>
                  <Body size={13.5} color={colors.text4}>
                    ·
                  </Body>
                  <Body size={13.5} color={colors.text2}>
                    Sleeps {phare.sleeps}
                  </Body>
                </View>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

function SparseSearchIcon() {
  return (
    <Svg
      width={76}
      height={76}
      viewBox="0 0 76 76"
      fill="none"
      stroke={colors.goldSoft}
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Circle cx={32} cy={32} r={20} />
      <Path d="M46 46l16 16" />
      <Path d="M22 32l8-6 6 10 4-5 5 3" />
      <Path d="M22 38l20 0" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerBlock: { paddingHorizontal: 24 },
  title: { marginTop: 8, lineHeight: 52, paddingBottom: 18 },
  searchBlock: { paddingHorizontal: 0, marginHorizontal: -8, gap: 10 },
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
  chipsRow: { flexDirection: 'row', gap: 8 },
  body: { paddingHorizontal: 16, paddingTop: 24 },
  emptyCard: {
    paddingVertical: 40,
    paddingHorizontal: 22,
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.cardXl,
    alignItems: 'center',
    gap: 14,
  },
  emptyHeadline: {
    textAlign: 'center',
    letterSpacing: letterSpacing.serifItalic(22),
    fontFamily: fonts.serifItalic,
  },
  emptyCopy: { textAlign: 'center', lineHeight: 19.5, maxWidth: 260 },
  clearBtn: { marginTop: 6, height: 44, paddingHorizontal: 22 },
  suggestionSection: { marginTop: 30 },
  suggestionLabel: { paddingLeft: 4, marginBottom: 12 },
  cardWrap: { paddingBottom: 26 },
  cardBody: { paddingHorizontal: 4, paddingTop: 14 },
  cardTitle: { marginTop: 6, lineHeight: 27 },
  priceRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    flexWrap: 'wrap',
  },
});
