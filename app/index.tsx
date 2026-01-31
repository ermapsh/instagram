import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/button";
import { useAppTheme } from "../hooks/useTheme";

export default function Index() {
    const theme = useAppTheme();

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.color.background },
            ]}
        >
            {/* content */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require("../assets/images/join-screen/join.png")}
                    style={{ width: 325, height: 325 }}
                    contentFit="cover"
                />
                <Text style={{ color: theme.color.text, fontSize: 24, fontWeight: '600', textAlign: 'center' }}>
                    Join Instagram
                </Text>
                <Text style={{ color: theme.color.text, fontSize: 15, fontWeight: '500', textAlign: 'center', marginTop: 12, paddingHorizontal: 20 }}>
                    Share what you&apos;re into with the people who get you.
                </Text>
            </View>

            <View>
                <Button title="Get started" variant="primary" />
                <Button title="I already have an account" variant="outline" />
                <Text style={{ color: theme.color.textSecondary, textAlign: 'center', marginTop: 24, fontSize: 12 }}>
                    By ErMapsh
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
});
