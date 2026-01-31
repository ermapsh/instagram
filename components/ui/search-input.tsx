import { Ionicons } from '@expo/vector-icons';
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

interface SearchInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
}

export function SearchInput({
    style,
    containerStyle,
    placeholderTextColor,
    ...props
}: SearchInputProps) {
    const theme = useAppTheme();

    return (
        <View style={[
            styles.container,
            { backgroundColor: theme.color.backgroundSecondary },
            containerStyle
        ]}>
            <Ionicons
                name="search"
                size={18}
                color={theme.color.textSecondary}
                style={styles.icon}
            />
            <TextInput
                style={[
                    styles.input,
                    {
                        color: theme.color.text,
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
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 40,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
});
