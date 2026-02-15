import { os } from '@/constant/os';
import { useAppTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export const unstable_settings = {
    anchor: 'home',
};

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export default function AppLayout() {
    const insets = useSafeAreaInsets();
    const theme = useAppTheme();

    const renderTabBar = ({ state, descriptors, navigation, position }: any) => {
        return (
            <View style={[
                styles.tabBarContainer,
                {
                    backgroundColor: theme.color.background,
                    borderTopColor: theme.color.border,
                    paddingBottom: os === 'ios' ? insets.bottom : 12,
                }
            ]}>
                <View style={styles.tabBarContent}>
                    {state.routes.map((route: any, index: number) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;
                        const routeName = route.name;

                        const opacity = position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.4, 1, 0.4],
                            extrapolate: 'clamp',
                        });

                        const scale = position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.85, 1.1, 0.85],
                            extrapolate: 'clamp',
                        });

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };

                        // Icon selection logic
                        const getIconSource = (name: string, focused: boolean) => {
                            const icons: any = {
                                home: [require('@/assets/icons/home.png'), require('@/assets/icons/home-outline.png')],
                                reels: [require('@/assets/icons/reel.png'), require('@/assets/icons/reel-outline.png')],
                                message: [require('@/assets/icons/message.png'), require('@/assets/icons/message-outline.png')],
                                search: [require('@/assets/icons/search.png'), require('@/assets/icons/search-outline.png')],
                            };
                            return icons[name] ? (focused ? icons[name][0] : icons[name][1]) : null;
                        };

                        const iconSource = getIconSource(routeName, isFocused);
                        const iconColor = theme.color.text;
                        const iconSize = 26;

                        return (
                            <TouchableOpacity
                                key={route.key}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={styles.tabItem}
                                activeOpacity={1}
                            >
                                <Animated.View style={{ transform: [{ scale }], opacity }}>
                                    {routeName === 'profile' ? (
                                        <Animated.View style={[
                                            styles.avatarContainer,
                                            isFocused && { borderColor: theme.color.text, borderWidth: 1.5 },
                                        ]}>
                                            <Avatar.Image
                                                size={26}
                                                source={{ uri: 'https://i.pravatar.cc/100' }}
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                        </Animated.View>
                                    ) : iconSource ? (
                                        <Icon color={iconColor} size={iconSize} source={iconSource} />
                                    ) : (
                                        <AnimatedIonicons name="square" size={iconSize} color={iconColor} />
                                    )}
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    return (
        <MaterialTopTabs
            tabBarPosition="bottom"
            tabBar={renderTabBar}
            screenOptions={{
                swipeEnabled: true,
                animationEnabled: true,
                tabBarIndicatorStyle: { height: 0 },
            }}
        >
            <MaterialTopTabs.Screen name="home" options={{ title: 'Home' }} />
            <MaterialTopTabs.Screen name="reels" options={{ title: 'Reel' }} />
            <MaterialTopTabs.Screen name="message" options={{ title: 'Message' }} />
            <MaterialTopTabs.Screen name="search" options={{ title: 'Search' }} />
            <MaterialTopTabs.Screen name="profile" options={{ title: 'Profile' }} />
        </MaterialTopTabs>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        elevation: 0,
    },
    tabBarContent: {
        flexDirection: 'row',
        height: 52,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    avatarContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});