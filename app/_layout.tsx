import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css";
import RNPaperProvider from '../provider/RNPaperProvider';

export const unstable_settings = {
  anchor: '(auth)/(app)/home',
};

export default function RootLayout() {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <RNPaperProvider>
          {/* <Stack>
            <Stack.Screen name="index"
              options={{ headerShown: false }} />
            <Stack.Screen name="(auth)"
              options={{
                headerShown: false
              }} />
          </Stack> */}
          <Slot screenOptions={{ headerShown: false }} />
        </RNPaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
