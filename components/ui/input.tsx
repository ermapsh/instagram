import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    ViewStyle
} from 'react-native';
import { useAppTheme } from '../../hooks/useTheme';

interface InputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    rightAccessory?: React.ReactNode;
}

export function Input({
    style,
    containerStyle,
    placeholderTextColor,
    rightAccessory,
    ...props
}: InputProps) {
    const theme = useAppTheme();

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.color.backgroundSecondary,
                        color: theme.color.text,
                        borderColor: theme.color.border,
                        paddingRight: rightAccessory ? 48 : 16,
                    },
                    style,
                ]}
                placeholderTextColor={
                    placeholderTextColor || theme.color.textSecondary
                }
                {...props}
            />
            {rightAccessory && (
                <View style={styles.rightAccessoryContainer}>
                    {rightAccessory}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        fontSize: 16,
    },
    rightAccessoryContainer: {
        position: 'absolute',
        right: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
