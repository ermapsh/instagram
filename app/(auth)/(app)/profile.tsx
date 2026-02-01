import { useAppTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
    const theme = useAppTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.color.background }]}>
            <Text style={[styles.text, { color: theme.color.text }]}>Profile Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
    },
});