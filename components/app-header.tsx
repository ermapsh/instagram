import { os } from "@/constant/os";
import { useAppTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { GlassIcon } from "./ui/glass-utility";

interface apppheader { showBack?: boolean, title?: string, showRight?: boolean, rightComponent?: React.ReactNode }

export function AppHeader({ showBack = true, title = "", showRight = false, rightComponent }: apppheader) {
    const theme = useAppTheme();
    const router = useRouter();

    return (
        <View style={{ paddingVertical: 12, backgroundColor: theme.color.background, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Pressable onPress={() => router.back()}>
                {showBack && <GlassIcon icon={os === 'android' ? 'arrow-left' : 'chevron-left'} color={theme.color.text} size={28} />}
            </Pressable>
            <Text style={{ color: theme.color.text, fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
            <View>
                {showRight && rightComponent}
            </View>
        </View>
    )
}

