import React from 'react';
import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle
} from 'react-native';
import { useAppTheme } from '../../hooks/useTheme';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: ButtonVariant;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    disabled?: boolean;
}

export function Button({
    title,
    variant = 'primary',
    style,
    textStyle,
    loading = false,
    disabled = false,
    ...props
}: CustomButtonProps) {
    const theme = useAppTheme();
    const primaryColor = theme.color.brand;
    const textColor = theme.color.text;
    const borderColor = theme.color.border;

    const isDisabled = loading || disabled;

    const getButtonStyle = (): StyleProp<ViewStyle> => {
        const baseStyle: ViewStyle = {
            opacity: isDisabled ? 0.5 : 1,
        };

        switch (variant) {
            case 'primary':
                return {
                    ...baseStyle,
                    backgroundColor: primaryColor,
                    borderWidth: 0,
                };
            case 'outline':
                return {
                    ...baseStyle,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: borderColor,
                };
            case 'ghost':
                return {
                    ...baseStyle,
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                };
            default:
                return {
                    ...baseStyle,
                    backgroundColor: primaryColor,
                };
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'primary':
                return '#FFFFFF';
            case 'outline':
            case 'ghost':
                return textColor;
            default:
                return '#FFFFFF';
        }
    };

    const getTextStyle = (): StyleProp<TextStyle> => {
        return {
            color: getTextColor(),
        };
    };

    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle(), style]}
            activeOpacity={0.7}
            disabled={isDisabled}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size="small" color={getTextColor()} />
            ) : (
                <Text style={[styles.text, getTextStyle(), textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 100, // Capsule shape as per Instagram
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 8,
    },
    text: {
        fontSize: 15,
        fontWeight: '500',
    },
});
