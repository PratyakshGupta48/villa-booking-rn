// Photo — port of the <Photo> primitive from common.jsx. A hero-image
// container with a fallback colour visible while the network image loads,
// a grain overlay on top of the image, and an optional dark-from-bottom
// gradient for editorial readability of overlaid text. Children render
// above everything so a caller can lay name, location, or CTAs on top.

import { type ReactNode } from 'react';
import { type ImageStyle, StyleSheet, View, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { Grain } from './Grain';

export type PhotoProps = {
  src: string;
  fallback?: string;
  aspectRatio?: number;
  rounded?: number;
  /** Hide the dark-from-bottom gradient — used when the photo sits in a card. */
  noGradient?: boolean;
  /** Hide the grain texture — useful for small thumbnails. */
  noGrain?: boolean;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  children?: ReactNode;
};

export function Photo({
  src,
  fallback = '#222',
  aspectRatio,
  rounded,
  noGradient = false,
  noGrain = false,
  style,
  imageStyle,
  children,
}: PhotoProps) {
  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: fallback },
        aspectRatio !== undefined && { aspectRatio },
        rounded !== undefined && { borderRadius: rounded },
        style,
      ]}
    >
      <Image
        source={{ uri: src }}
        style={[StyleSheet.absoluteFillObject, imageStyle]}
        contentFit="cover"
        transition={140}
        cachePolicy="memory-disk"
        // RN-platform-difference: web design applies `filter: saturate(0.9)
        // brightness(0.96)`; RN's Image has no filter equivalent and the
        // colour shift is small enough to accept.
      />
      {!noGrain && <Grain />}
      {!noGradient && (
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.55)']}
          locations={[0.35, 1]}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
});
