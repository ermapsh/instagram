import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RNPaperProvider from '../provider/RNPaperProvider';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <RNPaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false, presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </RNPaperProvider>
    </SafeAreaProvider>
  );
}
