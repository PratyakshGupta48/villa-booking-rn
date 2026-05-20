// Grain overlay — the .grain class from lib/tokens.css. A fractal-noise SVG
// laid over hero photos at low opacity to give the design its filmic texture.
//
// RN-platform-difference: the web design uses `mix-blend-mode: overlay`,
// which RN doesn't support. Straight alpha at 0.18 is a close visual match
// at this opacity and at the dark colour palette this app uses.

import { StyleSheet, View } from 'react-native';
import Svg, { Defs, FeColorMatrix, FeTurbulence, Filter, Rect } from 'react-native-svg';

export type GrainProps = {
  opacity?: number;
};

export function Grain({ opacity = 0.18 }: GrainProps) {
  return (
    <View style={[StyleSheet.absoluteFillObject, { opacity }]} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <Filter id="grainNoise">
            <FeTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves={2}
              stitchTiles="stitch"
            />
            <FeColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0" />
          </Filter>
        </Defs>
        <Rect width="100%" height="100%" filter="url(#grainNoise)" />
      </Svg>
    </View>
  );
}
