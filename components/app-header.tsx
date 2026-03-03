import { os } from "@/constant/os";
import { useAppTheme } from "@/hooks/useTheme";
import { isGlassEffectAPIAvailable } from "expo-glass-effect";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { GlassIcon } from "./ui/glass-utility";

interface apppheader {
    showBack?: boolean,
    onPressBack?: () => void,
    title?: string,
    showRight?: boolean,
    rightComponent?: React.ReactNode
}

export function AppHeader({ showBack = true, onPressBack, title = "", showRight = false, rightComponent }: apppheader) {
    const theme = useAppTheme();
    const router = useRouter();
    const glassEffect = useMemo(() => isGlassEffectAPIAvailable(), [])
    return (
        <View style={[styles.container, { backgroundColor: theme.color.background }]}>
            <Pressable onPress={() => onPressBack ? onPressBack() : router.back()}>
                {showBack && glassEffect ?
                    <GlassIcon icon={os === 'android' ? 'arrow-left' : 'chevron-left'} color={theme.color.text} size={28} /> :
                    <Icon source={os === 'android' ? 'arrow-left' : 'chevron-left'} color={theme.color.text} size={28} />}
            </Pressable>
            <Text style={[styles.title, { color: theme.color.text }]}>{title}</Text>
            <View>
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
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})