import { Stack } from 'expo-router';
import React from 'react';

export const unstable_settings = {
    anchor: '(app)/(settings)',
};

export default function Layout() {
    // const theme = useAppTheme();
    return (
        <Stack>
            <Stack.Screen name="index"
                options={{
                    headerShown: false,
                    // headerTitle: "Settings & Activity",
                    // headerStyle: {
                    //     backgroundColor: theme.color.background,
                    // },
                    // headerTitleStyle: {
                    //     color: theme.color.text,
                    // },
                    // headerTransparent: true,
                    // gestureEnabled: true,
                    // headerLeft: () => <GoBack />
                }}
            />
        </Stack>
    )
}   