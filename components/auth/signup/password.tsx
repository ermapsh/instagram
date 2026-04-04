import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppTheme } from '@/hooks/useTheme';
import { RootState } from '@/store';
import { setPassword, setPasswordError } from '@/store/features/signup/signupSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

interface PasswordProps {
    onNext: (password: string) => void;
    onPressBack: () => void;
}

function Password({ onNext, onPressBack }: PasswordProps) {
    const theme = useAppTheme();
    const dispatch = useAppDispatch();
    const { password, passwordError, isLoading } = useAppSelector((state: RootState) => state.signup);
    const [isSecure, setIsSecure] = useState(true);
    const [remember, setRemember] = useState(true);

    const onChange = useCallback((text: string) => {
        if (text.length >= 6) {
            dispatch(setPasswordError(false));
        } else {
            dispatch(setPasswordError(true));
        }
        dispatch(setPassword(text));
    }, [dispatch]);

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
                        Create a password with at least six letters or numbers. It should be something that others can&apos;t guess.
                    </Text>
                </View>

                <Input
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={isSecure}
                    value={password}
                    onChangeText={onChange}
                    containerStyle={styles.inputContainer}
                    error={passwordError ? "Password must be at least 6 characters" : undefined}
                    rightAccessory={
                        <TouchableOpacity onPress={() => setIsSecure(!isSecure)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Icon source={isSecure ? require("@/assets/icons/eye-close.png") : require("@/assets/icons/eye-open.png")} size={22} color={theme.color.textSecondary} />
                        </TouchableOpacity>
                    }
                />

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        onPress={() => setRemember(!remember)}
                        style={[
                            styles.checkbox,
                            {
                                borderColor: remember ? theme.color.brand : theme.color.border,
                                backgroundColor: remember ? theme.color.brand : 'transparent'
                            }
                        ]}
                    >
                        {remember && <Ionicons name="checkmark" size={14} color="white" />}
                    </TouchableOpacity>
                    <Text style={[styles.checkboxText, { color: theme.color.text }]}>
                        Remember login info.{' '}
                    </Text>
                    <Text style={[styles.linkText, { color: theme.color.brand }]}>Learn more</Text>
                </View>

                <View style={styles.buttonGroup}>
                    <Button
                        title="Next"
                        onPress={() => {
                            onNext(password);
                        }}
                        disabled={password.length < 6 || passwordError}
                        loading={isLoading}
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxText: {
        fontSize: 14,
    },
    linkText: {
        fontSize: 14,
        fontWeight: '500',
    },
    buttonGroup: {
        gap: 8,
    },
    bottomContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    bottomText: {
        fontSize: 14,
        fontWeight: '500',
    },
});

export default memo(Password);
