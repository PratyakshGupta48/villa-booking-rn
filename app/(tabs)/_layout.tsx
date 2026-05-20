import { Tabs } from 'expo-router';

// Placeholder tab bar — replaced with the custom glass TabBar (matching the
// design bundle's lib/common.jsx) on Day 3.
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0A0A',
          borderTopColor: 'rgba(245,244,239,0.08)',
        },
        tabBarActiveTintColor: '#D4B27A',
        tabBarInactiveTintColor: '#6E6B66',
        tabBarLabelStyle: { fontSize: 10, letterSpacing: 0.14 * 10 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'DISCOVER' }} />
      <Tabs.Screen name="trips" options={{ title: 'TRIPS' }} />
      <Tabs.Screen name="profile" options={{ title: 'PROFILE' }} />
    </Tabs>
  );
}
