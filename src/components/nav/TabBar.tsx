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

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
      <LinearGradient
        colors={['rgba(10,10,10,0)', 'rgba(10,10,10,0.92)', '#0A0A0A']}
        locations={[0, 0.38, 1]}
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
    paddingBottom: padding.tabBarBottom,
    paddingTop: 10,
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
