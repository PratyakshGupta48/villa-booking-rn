// Sk — shimmer skeleton block, port of <Sk> from screens/states.jsx.
// The web version uses a CSS @keyframes background-position cycle; in RN
// the equivalent is a horizontally-translating LinearGradient layered over
// a dark base, driven by Reanimated.

import { useEffect } from 'react';
import { type DimensionValue, StyleSheet, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { timings } from '../../lib/theme';

export type SkProps = {
  width?: DimensionValue;
  height?: number;
  radius?: number;
  style?: ViewStyle;
};

export function Sk({ width = '100%', height = 16, radius = 6, style }: SkProps) {
  const offset = useSharedValue(-100);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(100, { duration: timings.shimmer, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [offset]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${offset.value}%` }],
  }));

  return (
    <View
      style={[
        { width, height, borderRadius: radius, backgroundColor: '#161616', overflow: 'hidden' },
        style,
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyle]} pointerEvents="none">
        <LinearGradient
          colors={['#161616', '#1F1F1F', '#161616']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
    </View>
  );
}
