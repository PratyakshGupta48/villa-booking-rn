// State · Detail loading — skeleton placeholders matching the Villa Detail
// layout. Translated from screens/states.jsx ScreenLoadingDetail.

import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Hairline } from '../../src/components/hairlines';
import { Back, Share } from '../../src/components/icons';
import { Sk } from '../../src/components/skeleton/Sk';
import { colors } from '../../src/lib/theme';

const STATUS_BAR_PAD = 56;

export default function LoadingDetailScreen() {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Sk height={470} radius={0} />
        <View style={styles.body}>
          <Sk width={150} height={10} />
          <View style={{ height: 14 }} />
          <Sk width="80%" height={36} />
          <View style={{ height: 14 }} />
          <Sk width={180} height={14} />

          <View style={styles.hostRow}>
            <Sk width={36} height={36} radius={999} />
            <View style={{ gap: 6 }}>
              <Sk width={140} height={12} />
              <Sk width={110} height={10} />
            </View>
          </View>

          <Hairline style={{ marginVertical: 8 }} />

          <View style={styles.statsRow}>
            <Sk height={84} radius={14} />
            <Sk height={84} radius={14} />
            <Sk height={84} radius={14} />
          </View>

          <View style={{ marginTop: 18 }}>
            <Sk width={90} height={10} />
            <View style={styles.amenityGrid}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={styles.amenityCell}>
                  <Sk width={20} height={20} radius={4} />
                  <Sk width="80%" height={12} />
                </View>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 22, gap: 8 }}>
            <Sk width="100%" height={12} />
            <Sk width="95%" height={12} />
            <Sk width="60%" height={12} />
          </View>
        </View>
      </ScrollView>

      {/* Floating top bar copied locally so the loading screen feels like the real Detail. */}
      <View style={styles.topBarRow} pointerEvents="box-none">
        <Pressable onPress={() => router.back()} style={styles.pill}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
          <Back size={18} color={colors.text} />
        </Pressable>
        <Pressable style={styles.pill}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
          <Share size={15} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { paddingTop: 28, paddingHorizontal: 24 },
  hostRow: { marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  statsRow: { flexDirection: 'row', gap: 10 },
  amenityGrid: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityCell: {
    width: '33.333%',
    gap: 10,
    paddingVertical: 9,
  },
  topBarRow: {
    position: 'absolute',
    top: STATUS_BAR_PAD,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
