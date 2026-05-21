// H. Profile — minimal account screen.
//
// Translated from /Users/pratyakshgupta/Downloads/flymeout/project/villas/
// screens/profile.jsx. Avatar + name + "Member since" chip + small
// VerifiedBadge, then the settings list (Payment methods, Notifications,
// Privacy, Sign out), then the FlyMeOut · v2.4.0 footer.

import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '../../src/components/avatar';
import { VerifiedBadge } from '../../src/components/badges';
import { Hairline } from '../../src/components/hairlines';
import { Chevron } from '../../src/components/icons';
import { Body, Caps, Serif } from '../../src/components/typography';
import { colors, fonts, letterSpacing, radii } from '../../src/lib/theme';

const STATE_PREVIEWS: readonly { label: string; path: string }[] = [
  { label: 'Discover · loading skeleton', path: '/states/loading-discover' },
  { label: 'Villa Detail · loading skeleton', path: '/states/loading-detail' },
  { label: 'Discover · empty filters', path: '/states/empty-discover' },
  { label: 'Error · card declined', path: '/states/error-card' },
  { label: 'Error · network issue', path: '/states/error-network' },
  { label: 'Error · dates just booked', path: '/states/error-dates' },
];

const PROFILE = {
  initialKey: 'A',
  name: 'Alex Greer',
  email: 'alex.greer@flymeout.com',
  memberSince: 2024,
} as const;

type Setting = { label: string; detail?: string };

const SETTINGS: readonly Setting[] = [
  { label: 'Payment methods', detail: 'Apple Pay · 1 card' },
  { label: 'Notifications', detail: 'On' },
  { label: 'Privacy' },
  { label: 'Sign out' },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: 56, paddingBottom: 130 + insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBlock}>
        <Caps color={colors.text3}>Account</Caps>
        <Serif size={52} style={styles.title}>
          Profile
        </Serif>

        <View style={styles.identityRow}>
          <Avatar name={PROFILE.initialKey} size={76} />
          <View style={{ flex: 1 }}>
            <Serif size={26} style={styles.name}>
              {PROFILE.name}
            </Serif>
            <Body size={13} color={colors.text2} style={{ marginTop: 4 }}>
              {PROFILE.email}
            </Body>
            <View style={styles.memberSince}>
              <Body
                size={10.5}
                color={colors.text2}
                style={{ letterSpacing: 0.08 * 10.5, textTransform: 'uppercase' }}
              >
                Member since {PROFILE.memberSince}
              </Body>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <VerifiedBadge small />
        </View>
      </View>

      <View style={styles.settingsBlock}>
        <Caps style={styles.settingsLabel}>Settings</Caps>
        <View style={styles.settingsCard}>
          {SETTINGS.map((s, i) => (
            <View key={s.label}>
              {i > 0 && <Hairline />}
              <SettingsRow label={s.label} detail={s.detail} />
            </View>
          ))}
        </View>

        {__DEV__ ? (
          <View style={styles.devBlock}>
            <Caps style={styles.settingsLabel}>Design states (dev only)</Caps>
            <View style={styles.settingsCard}>
              {STATE_PREVIEWS.map((p, i) => (
                <View key={p.path}>
                  {i > 0 && <Hairline />}
                  <Pressable
                    onPress={() => router.push(p.path as never)}
                    style={rowStyles.row}
                    accessibilityRole="button"
                  >
                    <Body size={15.5} color={colors.text}>
                      {p.label}
                    </Body>
                    <Chevron size={14} color={colors.text3} />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.versionRow}>
          <Serif size={13} italic color={colors.text3} style={styles.versionText}>
            FlyMeOut · v2.4.0
          </Serif>
        </View>
      </View>
    </ScrollView>
  );
}

// --- SettingsRow ----------------------------------------------------------

function SettingsRow({ label, detail }: Setting) {
  return (
    <Pressable style={rowStyles.row} accessibilityRole="button">
      <Body size={15.5} color={colors.text}>
        {label}
      </Body>
      <View style={rowStyles.right}>
        {detail ? (
          <Body size={13} color={colors.text3}>
            {detail}
          </Body>
        ) : null}
        <Chevron size={14} color={colors.text3} />
      </View>
    </Pressable>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 32,
  },
  name: {
    lineHeight: 27,
  },
  memberSince: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(245,244,239,0.04)',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.pill,
  },
  settingsBlock: {
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  settingsLabel: {
    paddingLeft: 4,
    marginBottom: 10,
  },
  settingsCard: {
    backgroundColor: '#101010',
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.cardLg,
    overflow: 'hidden',
  },
  devBlock: {
    marginTop: 28,
  },
  versionRow: {
    marginTop: 28,
    alignItems: 'center',
  },
  versionText: {
    letterSpacing: letterSpacing.serifItalic(13),
    fontFamily: fonts.serifItalic,
  },
});
