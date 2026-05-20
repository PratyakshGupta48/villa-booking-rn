import { StyleSheet, Text, View } from 'react-native';

// Placeholder — translated from screens/trips.jsx on Day 8.
export default function TripsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Trips</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#F5F4EF',
    fontSize: 24,
  },
});
