import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { memo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAppTheme } from '../../hooks/useTheme';

function Login() {
    const theme = useAppTheme();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        // Simulate login delay
        // setTimeout(() => {
        setIsLoading(false);
        // router.dismissAll();
        router.push('/(auth)/(app)/home');
        // Navigate or handle success
        // }, 2000);
    };

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={[
                styles.container,
                { backgroundColor: theme.color.background },
            ]}
        >
            <View style={styles.content}>
                <Image
                    source={require("@/assets/images/join-screen/insta.png")}
                    style={{ width: 75, height: 75, marginBottom: 40 }}
                    contentFit="cover"
                />

                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Username, email or mobile number"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <Button
                    title="Log in"
                    variant="primary"
                    onPress={handleLogin}
                    loading={isLoading}
                // disabled={!username || !password}
                />

                <TouchableOpacity style={{ marginTop: 12 }}>
                    <Text style={{ color: theme.color.text, textAlign: 'center', fontSize: 15, fontWeight: '600' }}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Button
                    title="Create new account"
                    variant="outline"
                    onPress={() => router.push('/(auth)/signup')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        paddingVertical: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        fontFamily: 'Instagram-Logo', // Placeholder if font not available
    },
    inputContainer: {
        width: '100%',
        gap: 12,
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        fontSize: 16,
    },
    footer: {
        paddingVertical: 20,
    },
});

export default memo(Login);