// VerifiedBadge — port of the <VerifiedBadge> primitive from common.jsx.
// A gold-bordered pill with the Shield icon and "VERIFIED MEMBER"
// uppercased. Two sizes — normal (used on the Villa detail header) and
// small (used inside the Review trip-details card).

import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii } from '../../lib/theme';
import { Shield } from '../icons';

export type VerifiedBadgeProps = {
  small?: boolean;
};

export function VerifiedBadge({ small = false }: VerifiedBadgeProps) {
  const iconSize = small ? 10 : 11;
  return (
    <View style={[styles.badge, small ? styles.badgeSmall : styles.badgeRegular]}>
      <Shield size={iconSize} color={colors.gold} />
      <Text style={[styles.label, small ? styles.labelSmall : styles.labelRegular]}>
        VERIFIED MEMBER
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(212,178,122,0.32)',
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  badgeRegular: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeSmall: {
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  label: {
    fontFamily: fonts.sansMedium,
    color: colors.gold,
  },
  labelRegular: {
    fontSize: 11,
    letterSpacing: 0.06 * 11,
  },
  labelSmall: {
    fontSize: 10,
    letterSpacing: 0.06 * 10,
  },
});
