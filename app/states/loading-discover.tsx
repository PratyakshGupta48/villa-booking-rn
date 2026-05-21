// State · Discover loading — skeleton placeholder cards.
//
// Translated from screens/states.jsx ScreenLoadingDiscover. Mirrors the
// Discover layout exactly but swaps every chunk of content for a Sk block.

import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Sk } from '../../src/components/skeleton/Sk';
import { Caps, Serif } from '../../src/components/typography';
import { colors, radii } from '../../src/lib/theme';

export default function LoadingDiscoverScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: 56, paddingBottom: 110 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBlock}>
        <Caps color={colors.text3}>FlyMeOut · Villas</Caps>
        <Serif size={52} style={styles.title}>
          Villas
        </Serif>
      </View>

      <View style={styles.searchBlock}>
        <Sk height={50} radius={radii.pill} />
        <View style={styles.chipsRow}>
          <Sk height={38} width={120} radius={radii.pill} />
          <Sk height={38} width={130} radius={radii.pill} />
        </View>
      </View>

      <View style={styles.cardsBlock}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.cardWrap}>
            <Sk height={380} radius={radii.card} />
            <View style={styles.cardLines}>
              <Sk width={120} height={10} />
              <Sk width="62%" height={22} />
              <Sk width="46%" height={12} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerBlock: { paddingHorizontal: 24 },
  title: { marginTop: 8, lineHeight: 52, paddingBottom: 18 },
  searchBlock: { paddingHorizontal: 16, gap: 10 },
  chipsRow: { flexDirection: 'row', gap: 8 },
  cardsBlock: { paddingHorizontal: 16, paddingTop: 26 },
  cardWrap: { marginBottom: 26 },
  cardLines: { paddingHorizontal: 4, paddingTop: 14, gap: 10 },
});
