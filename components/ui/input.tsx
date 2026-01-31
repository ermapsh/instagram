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
}

export function Input({
    style,
    containerStyle,
    placeholderTextColor,
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
                    },
                    style,
                ]}
                placeholderTextColor={
                    placeholderTextColor || theme.color.textSecondary
                }
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        width: '100%',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        fontSize: 16,
    },
});
