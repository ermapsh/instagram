import { os } from '@/constant/os';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon } from 'react-native-paper';
import { useAppTheme } from '../../hooks/useTheme';

interface TabBarIconProps {
    routeName: string;
    isFocused: boolean;
    theme: any;
}

const TabBarIcon = ({ routeName, isFocused, theme }: TabBarIconProps) => {
    const iconColor = theme.color.text;
    const iconSize = isFocused ? 26 : 24;

    // Custom PNG icons for Home, Reel, Message, and Search
    if (routeName === 'home') {
        return (
            <Icon
                color={iconColor}
                size={iconSize}
                source={isFocused
                    ? require('@/assets/icons/home.png')
                    : require('@/assets/icons/home-outline.png')
                }
            />
        );
    }

    if (routeName === 'reel') {
        return (
            <Icon
                color={iconColor}
                size={iconSize}
                source={isFocused
                    ? require('@/assets/icons/reel.png')
                    : require('@/assets/icons/reel-outline.png')
                }
            />
        );
    }

    if (routeName === 'message') {
        return (
            <Icon
                color={iconColor}
                size={iconSize}
                source={isFocused
                    ? require('@/assets/icons/message.png')
                    : require('@/assets/icons/message-outline.png')
                }
            />
        );
    }

    if (routeName === 'search') {
        return (
            <Icon
                color={iconColor}
                size={iconSize}
                source={isFocused
                    ? require('@/assets/icons/search.png')
                    : require('@/assets/icons/search-outline.png')
                }
            />
        );
    }

    if (routeName === 'profile') {
        const avatarSize = isFocused ? 26 : 24;
        const containerSize = isFocused ? 32 : 30;
        return (
            <View style={[
                styles.avatarContainer,
                { width: containerSize, height: containerSize, borderRadius: containerSize / 2 },
                isFocused && { borderColor: theme.color.text, borderWidth: 1.5 }
            ]}>
                <Avatar.Image
                    size={avatarSize}
                    source={{ uri: 'https://i.pravatar.cc/100' }}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    }

    return <Ionicons name="square" size={iconSize} color={iconColor} />;
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation, insets }) => {
    const theme = useAppTheme();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: theme.color.background,
                borderTopColor: theme.color.border,
                paddingBottom: os === 'ios' ? insets.bottom : 12,
            }
        ]}>
            <View style={styles.content}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

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

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabItem}
                            activeOpacity={0.7}
                        >
                            <TabBarIcon
                                routeName={route.name}
                                isFocused={isFocused}
                                theme={theme}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    content: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    customIcon: {
        width: 24,
        height: 24,
    },
    avatarContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

