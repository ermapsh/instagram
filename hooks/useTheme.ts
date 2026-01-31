import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../utils/theme";

export function useAppTheme() {
    const scheme = useColorScheme();
    return scheme === "dark" ? darkTheme : lightTheme;
}
