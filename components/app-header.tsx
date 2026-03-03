import { glassViewAvailable } from '@/constant/glassview';
import { os } from "@/constant/os";
import { useAppTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Icon } from "react-native-paper";
import { GlassIcon } from "./ui/glass-utility";

interface apppheader {
    showBack?: boolean,
    backIcon?: string,
    onPressBack?: () => void,
    title?: string,
    showRight?: boolean,
    rightComponent?: ReactNode,
    style?: StyleProp<ViewStyle>
}

export function AppHeader({ backIcon = os === 'android' ? 'arrow-left' : 'chevron-left', showBack = true, onPressBack, title = "", showRight = true, rightComponent, style }: apppheader) {
    const theme = useAppTheme();
    const router = useRouter();

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background }, style]}>
            <View style={styles.side}>
                {showBack && (
                    <Pressable onPress={() => onPressBack ? onPressBack() : router.back()}>
                        {glassViewAvailable ?
                            <GlassIcon icon={backIcon} color={theme.color.text} size={28} /> :
                            <Icon source={backIcon} color={theme.color.text} size={28} />}
                    </Pressable>
                )}
            </View>

            <View style={styles.center}>
                {!!title && <Text style={[styles.title, { color: theme.color.text }]} numberOfLines={1}>{title}</Text>}
            </View>

            <View style={[styles.side, { alignItems: 'flex-end' }]}>
                {showRight && rightComponent}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    side: {
        flex: 1,
        alignItems: 'flex-start',
    },
    center: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})