// Hairline — the 1px dividers used everywhere. .hair = subtle, .hair-strong
// = a touch more present. Both colours come from lib/tokens.css.

import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors } from '../../lib/theme';

export type HairlineProps = {
  strong?: boolean;
  vertical?: boolean;
  style?: ViewStyle;
};

export function Hairline({ strong = false, vertical = false, style }: HairlineProps) {
  return (
    <View
      style={[
        styles.line,
        vertical ? styles.vertical : styles.horizontal,
        { backgroundColor: strong ? colors.hairline2 : colors.hairline },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  line: {},
  horizontal: { height: 1, alignSelf: 'stretch' },
  vertical: { width: 1, alignSelf: 'stretch' },
});
