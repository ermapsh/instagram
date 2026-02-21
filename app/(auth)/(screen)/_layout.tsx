import GoBack from '@/components/ui/go-back';
import { useAppTheme } from '@/hooks/useTheme';
import { Stack } from 'expo-router';
import React from 'react';

export const unstable_settings = {
    anchor: '(app)/home',
};

export default function Layout() {
    const theme = useAppTheme();
    return (
        <Stack>
            <Stack.Screen name="notification"
                options={{
                    headerShown: false,
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: theme.color.background,
                    },
                    headerTransparent: true,
                    gestureEnabled: true,
                    headerLeft: () => <GoBack />
                }}
            />
        </Stack>
    )
}   