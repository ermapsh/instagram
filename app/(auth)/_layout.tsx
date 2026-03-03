import { useAppTheme } from '@/hooks/useTheme';
import { Stack } from 'expo-router';
import React from 'react';


export default function Layout() {
    const theme = useAppTheme();
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen
                name="signup"
                options={{
                    headerShown: false,
                    headerTitle: "",
                    presentation: "modal",
                }}
            />

            <Stack.Screen
                name="login"
                options={{
                    headerShown: false,
                    headerTitle: "",
                    presentation: "modal"
                }}
            />

            <Stack.Screen
                name="country-select"
                options={{
                    headerShown: false,
                    presentation: "modal",
                    animation: "slide_from_bottom"
                }}
            />

            <Stack.Screen
                name="(app)"
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="(screen)"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}   