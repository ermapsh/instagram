import { useAppTheme } from '@/hooks/useTheme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomTabBar } from '../../../components/navigation/tab-bar';
import HomeScreen from './home';
import MessageScreen from './message';
import ProfileScreen from './profile';
import ReelScreen from './reel';
import SearchScreen from './search';

export const unstable_settings = {
    anchor: 'home',
};

const ROUTES = [
    { name: 'home', component: HomeScreen },
    { name: 'reel', component: ReelScreen },
    { name: 'message', component: MessageScreen },
    { name: 'search', component: SearchScreen },
    { name: 'profile', component: ProfileScreen },
];

export default function AppLayout() {
    const theme = useAppTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const insets = useSafeAreaInsets();

    const handleTabPress = (index: number) => {
        setActiveIndex(index);
    };

    const ActiveComponent = ROUTES[activeIndex].component;

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background }]}>
            <View style={styles.content}>
                <ActiveComponent />
            </View>

            {/* Custom Tab Bar */}
            <CustomTabBar
                insets={insets}
                state={{
                    index: activeIndex,
                    routes: ROUTES.map(r => ({ key: r.name, name: r.name })),
                } as any}
                navigation={{
                    navigate: (name: string) => {
                        const index = ROUTES.findIndex(r => r.name === name);
                        if (index !== -1) handleTabPress(index);
                    },
                    emit: () => ({ defaultPrevented: false }),
                } as any}
                descriptors={ROUTES.reduce((acc, route) => ({
                    ...acc,
                    [route.name]: { options: {} }
                }), {})}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});