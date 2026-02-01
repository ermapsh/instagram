import { Tabs } from 'expo-router';
import React from 'react';
import { CustomTabBar } from '../../../components/navigation/tab-bar';

export const unstable_settings = {
    anchor: 'home',
};

export default function AppLayout() {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="home" />
            <Tabs.Screen name="reel" />
            <Tabs.Screen name="message" />
            <Tabs.Screen name="search" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}