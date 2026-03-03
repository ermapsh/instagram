import { os } from '@/constant/os';
import { useAppTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';

type GoBackProps = {
    icon?: any;
}
function GoBack({ icon = os === "ios" ? "chevron-left" : "arrow-left" }: GoBackProps) {
    const router = useRouter();
    const theme = useAppTheme();
    return (
        <TouchableOpacity onPress={() => router.back()}>
            <Icon source={icon} size={32} color={theme.color.text} />
        </TouchableOpacity>
    )
}

export default memo(GoBack)