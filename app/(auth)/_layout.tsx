import GoBack from '@/components/ui/go-back';
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
                    headerLeft: () => <GoBack icon="close" />
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