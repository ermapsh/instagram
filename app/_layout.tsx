import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks/useTheme';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import RNPaperProvider from '../provider/RNPaperProvider';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const theme = useAppTheme();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RNPaperProvider>
        <Stack>
          <Stack.Screen name="index"
            options={{ headerShown: false }} />
          <Stack.Screen name="(auth)"
            options={{
              headerShown: false
            }} />
        </Stack>
      </RNPaperProvider>
    </SafeAreaProvider>
  );
}
