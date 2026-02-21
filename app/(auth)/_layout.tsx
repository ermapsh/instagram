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
            <Stack.Screen name="login"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: theme.color.background,
                    },
                    headerTransparent: true,
                    gestureEnabled: true,
                    headerLeft: () => <GoBack />
                }}
            />
            <Stack.Screen name="signup"
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: theme.color.background,
                    },
                    headerTransparent: true,
                    gestureEnabled: true,
                    headerLeft: () => <GoBack />
                }}
            />
            <Stack.Screen
                name="country-select"
                options={{
                    headerShown: true,
                    presentation: "modal",
                    animation: "slide_from_bottom",
                    headerTitle: "Select a country",
                    headerStyle: {
                        backgroundColor: theme.color.background
                    },
                    headerTitleStyle: {
                        color: theme.color.text
                    },
                    headerTransparent: true,
                    headerLeft: () => <GoBack icon="close" />
                }}
            />
            <Stack.Screen
                name="(app)"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="(screen)"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    )
}   