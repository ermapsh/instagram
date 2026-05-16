import { AppHeader } from '@/components/app-header';
import { useAppTheme } from '@/hooks/useTheme';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Index() {
    const theme = useAppTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
            <AppHeader
                title="Settings & Activity"
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: theme.color.text, fontSize: 18 }}>
                    This is the settings screen.
                </Text>
            </View>

        </SafeAreaView>
    )
}

export default memo(Index);