import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks/useTheme';
import RNPaperProvider from '../provider/RNPaperProvider';

export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const theme = useAppTheme();
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <RNPaperProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{
            headerShown: true,
            headerTitle: "",
            headerBackButtonDisplayMode: "minimal",
            headerStyle: {
              backgroundColor: theme.color.background,
            },
            headerTransparent: true,
          }} />
        </Stack>
      </RNPaperProvider>
    </SafeAreaProvider>
  );
}
