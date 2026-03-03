import { useRouter } from "expo-router";
import React, { memo } from "react";


import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { useAppTheme } from "@/hooks/useTheme";

function Index() {
    const theme = useAppTheme();
    const router = useRouter();

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.color.background },
            ]}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require("@/assets/images/join-screen/join.png")}
                    style={{ width: 325, height: 325 }}
                    contentFit="cover"
                />
                <Text style={{ color: theme.color.text, fontSize: 24, fontWeight: '600', textAlign: 'center' }}>
                    Join Instagram
                </Text>
                <Text style={{ color: theme.color.text, fontSize: 15, fontWeight: '500', textAlign: 'center', marginTop: 12, paddingHorizontal: 25 }}>
                    Share what you&apos;re into with the people who get you.
                </Text>
            </View>

            <View>
                <Button title="Get started" variant="primary" onPress={() => router.push('/(auth)/signup')} />
                <Button title="I already have an account" variant="outline" onPress={() => router.push('/(auth)/login')} />
                <Text style={{ color: theme.color.textSecondary, textAlign: 'center', marginTop: 24, fontSize: 12 }}>
                    By ErMapsh
                </Text>
            </View>
        </SafeAreaView>
    );
}
export default memo(Index);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
});
