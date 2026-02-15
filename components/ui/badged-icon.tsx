import { useAppTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';

interface BadgedIconProps {
    source: any;
    size?: number;
    color?: string;
    hasBadge?: boolean;
    badgeColor?: string;
}

export const BadgedIcon = ({
    source,
    size = 24,
    color,
    hasBadge = false,
    badgeColor = '#FF3040'
}: BadgedIconProps) => {
    const theme = useAppTheme();
    const finalColor = color || theme.color.text;

    return (
        <View style={{ width: size, height: size }}>
            <Icon source={source} size={size} color={finalColor} />
            {hasBadge && (
                <View
                    style={[
                        styles.badge,
                        {
                            backgroundColor: badgeColor,
                            borderColor: theme.color.background
                        }
                    ]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: 1,
        right: -2,
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1.5,
        zIndex: 1,
    }
});
