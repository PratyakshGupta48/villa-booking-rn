// NumberStepper — port of <Stepper> from screens/datesheet.jsx. Two 38×38
// hairline-bordered pills with minus/plus icons, a serif tabular-numeric
// value in the middle. Disabled (lowered colour) when at the min/max bound.

import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radii } from '../../lib/theme';
import { Minus, Plus } from '../icons';
import { Serif } from '../typography';

export type NumberStepperProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
};

export function NumberStepper({ value, min = 1, max = 99, onChange }: NumberStepperProps) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Decrease"
        disabled={!canDecrement}
        onPress={() => onChange(value - 1)}
        style={styles.btn}
      >
        <Minus size={16} color={canDecrement ? colors.text : colors.text4} />
      </Pressable>
      <Serif size={26} weight={400} tnum style={styles.value}>
        {value}
      </Serif>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increase"
        disabled={!canIncrement}
        onPress={() => onChange(value + 1)}
        style={styles.btn}
      >
        <Plus size={16} color={canIncrement ? colors.text : colors.text4} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  btn: {
    width: 38,
    height: 38,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.hairline2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    minWidth: 28,
    textAlign: 'center',
  },
});
