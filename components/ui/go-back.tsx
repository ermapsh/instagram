import { useAppTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';

function GoBack() {
    const router = useRouter();
    const theme = useAppTheme();
    return (
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={35} color={theme.color.text} />
        </TouchableOpacity>
    )
}

export default memo(GoBack)