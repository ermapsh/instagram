import { GlassView } from "expo-glass-effect";
import { ViewStyle } from "react-native";
import { Icon } from "react-native-paper";

export function GlassIcon({ icon, color, size, style }: { icon: string, color: string, size: number, style?: ViewStyle }) {
    return (
        <GlassView style={[{ padding: 9, borderRadius: 50 }, style]}>
            <Icon source={icon} size={size} color={color} />
        </GlassView>
    )
}
