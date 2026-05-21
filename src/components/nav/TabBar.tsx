// Custom glass tab bar — port of <TabBar> from common.jsx, slotted into
// Expo Router via the `tabBar` prop on <Tabs>. The visual is a dark
// vertical-gradient backdrop with subtle blur, the active tab in gold,
// inactive tabs in --text-3.

import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { type ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, padding } from '../../lib/theme';
import { Compass, type IconProps, Person, Suitcase } from '../icons';

type TabConfig = {
  name: string;
  label: string;
  Icon: ComponentType<IconProps>;
};

const TABS: Readonly<Record<string, TabConfig>> = {
  index: { name: 'index', label: 'Discover', Icon: Compass },
  trips: { name: 'trips', label: 'Trips', Icon: Suitcase },
  profile: { name: 'profile', label: 'Profile', Icon: Person },
};

// Height of the soft fade region above the tabs — long enough that the
// gradient has room to dissolve content into the dark backdrop without a
// visible edge. The BlurView only covers the tabs area below this region,
// hidden by the gradient at its top.
const FADE_HEIGHT = 64;

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Subtle blur — only over the tab area, masked by the gradient above. */}
      <BlurView intensity={14} tint="dark" style={styles.blur} />
      {/* Long soft gradient — fades from fully transparent at the top through
          to solid dark over the tabs, killing the hard edge the BlurView
          alone would draw. Five stops keep the curve smooth. */}
      <LinearGradient
        colors={[
          'rgba(10,10,10,0)',
          'rgba(10,10,10,0.28)',
          'rgba(10,10,10,0.65)',
          'rgba(10,10,10,0.92)',
          '#0A0A0A',
        ]}
        locations={[0, 0.32, 0.58, 0.82, 1]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={styles.tabs}>
        {state.routes.map((route, index) => {
          const config = TABS[route.name];
          if (!config) return null;
          const focused = state.index === index;
          const color = focused ? colors.gold : colors.text3;
          return (
            <Pressable
              key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
              }}
              accessibilityRole="button"
              style={styles.tab}
            >
              <config.Icon size={22} color={color} />
              <Text
                style={[
                  styles.label,
                  { color, fontFamily: focused ? fonts.sansSemibold : fonts.sansMedium },
                ]}
              >
                {config.label.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: FADE_HEIGHT,
    paddingBottom: padding.tabBarBottom,
  },
  blur: {
    position: 'absolute',
    left: 0,
    right: 0,
    // Start the blur a few pixels inside the gradient's mid-dark zone so its
    // top edge sits behind ~60% gradient cover — no visible boundary.
    top: FADE_HEIGHT - 8,
    bottom: 0,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.06 * 10,
  },
});
