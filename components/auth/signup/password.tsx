import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppTheme } from '@/hooks/useTheme';
import React, { memo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PasswordProps {
    onNext: (password: string) => void;
    onPressBack: () => void;
}

function Password({ onNext, onPressBack }: PasswordProps) {
    const theme = useAppTheme();
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <AppHeader
                showBack={true}
                onPressBack={onPressBack}
            />
            <View style={styles.content}>
                <View>
                    <Text style={[styles.title, { color: theme.color.text }]}>
                        Create a password
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.color.textSecondary }]}>
                        Create a password with at least 6 letters or numbers. It should be something others can&apos;t guess.
                    </Text>
                </View>

                <Input
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    containerStyle={styles.inputContainer}
                />

                <View style={styles.buttonGroup}>
                    <Button
                        title="Next"
                        onPress={() => {
                            onNext(password);
                        }}
                        disabled={password.length < 6}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 16,
    },
    buttonGroup: {
        gap: 8,
    },
});

export default memo(Password);
