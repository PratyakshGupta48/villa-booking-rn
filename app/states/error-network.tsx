// State · Network issue — top toast with Retry + centered offline
// message. Translated from screens/states.jsx ScreenErrorNetwork.

import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { WifiOff } from '../../src/components/icons';
import { Toast } from '../../src/components/toast/Toast';
import { Body, Serif } from '../../src/components/typography';
import { colors, fonts, letterSpacing } from '../../src/lib/theme';

export default function ErrorNetworkScreen() {
  return (
    <View style={styles.screen}>
      {/* Top toast */}
      <View style={styles.toastWrap}>
        <Toast
          variant="network"
          icon={<WifiOff size={16} color={colors.text2} />}
          title="Network issue"
          message="Check your connection."
          action={{ label: 'Retry', onPress: () => router.back() }}
        />
      </View>

      {/* Centered offline message */}
      <View style={styles.centerWrap}>
        <WifiOff size={28} color={colors.text3} />
        <Serif size={22} italic style={styles.headline}>
          You’re offline.
        </Serif>
        <Body size={13} color={colors.text3} style={styles.copy}>
          We’ll resume your booking as soon as you reconnect.
        </Body>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(10,10,10,0.85)',
  },
  toastWrap: {
    position: 'absolute',
    top: 64,
    left: 16,
    right: 16,
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  headline: {
    marginTop: 14,
    textAlign: 'center',
    lineHeight: 25,
    letterSpacing: letterSpacing.serifItalic(22),
    fontFamily: fonts.serifItalic,
  },
  copy: {
    marginTop: 10,
    textAlign: 'center',
  },
});
