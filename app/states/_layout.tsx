// Container for the design-state preview routes. Each route renders a
// single state from the bundle (loading skeletons, empty, three errors) so
// the visual fidelity is directly inspectable without having to trigger
// real-world conditions.

import { Stack } from 'expo-router';

export default function StatesLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
