import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppTheme } from '@/hooks/useTheme';
import { RootState } from '@/store';
import { signupVerify } from '@/store/features/signup/signupSlice';
import { setUsername, setUsernameError, usernameExist } from '@/store/features/usernameSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'expo-router';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

interface UsernameProps {
    onNext: (username: string) => void;
    onPressBack: () => void;
}

function Username({ onNext, onPressBack }: UsernameProps) {
    const theme = useAppTheme();
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Redux Selectors
    const { username, usernameError, isLoading: isUsernameLoading, message: usernameMessage } = useAppSelector((state: RootState) => state.username);
    const { password, fullName, dob, isLoading: isSignupLoading, isSuccess: isSignupSuccess } = useAppSelector((state: RootState) => state.signup);
    const otpData = useAppSelector((state: RootState) => state.otp.data);
    const mobileSliceData = useAppSelector((state: RootState) => state.mobile.data);

    // Fallback safely to grab sessionId from whichever slice held it based on OTP verify success
    const sessionId = otpData?.sessionId || mobileSliceData?.sessionId;

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const onChangeUsername = useCallback((text: string) => {
        dispatch(setUsername(text));

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (text.trim().length === 0) {
            dispatch(setUsernameError(false)); // Clear error if empty
            return;
        }

        debounceTimer.current = setTimeout(() => {
            dispatch(usernameExist({ username: text }))
                .unwrap()
                .then((res) => {
                    if (res?.data === true) {
                        dispatch(setUsernameError(false));
                    }
                })
                .catch((err) => {
                    // API returns 409 Username already taken
                    if (err?.code === 409 || err?.data === false) {
                        dispatch(setUsernameError(true));
                    }
                });
        }, 500);
    }, [dispatch]);

    const handleNext = useCallback(async () => {
        if (username.trim().length === 0 || usernameError) return;

        try {
            const payload = {
                sessionId: sessionId,
                username: username,
                password: password,
                fullName: fullName,
                dob: dob ? dob.split('T')[0] : ""
            };

            await dispatch(signupVerify(payload)).unwrap();
            onNext(username);
        } catch (error: any) {
            Alert.alert("Signup Failed", error?.message || "Something went wrong during signup");
        }

    }, [dispatch, sessionId, username, password, fullName, dob, usernameError, onNext]);

    useEffect(() => {
        if (isSignupSuccess) {
            router.dismissAll()
            router.replace('/(auth)/(app)/home')
        }
    }, [isSignupSuccess])

    return (
        <View style={styles.container}>
            <AppHeader
                showBack={true}
                onPressBack={onPressBack}
            />
            <View style={styles.content}>
                <View>
                    <Text style={[styles.title, { color: theme.color.text }]}>
                        Create a username
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.color.textSecondary }]}>
                        Add a username or use our suggestion. You can change this at any time.
                    </Text>
                </View>

                <Input
                    placeholder="Username"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={username}
                    onChangeText={onChangeUsername}
                    containerStyle={styles.inputContainer}
                    error={usernameError ? "Username not available" : ""}
                />

                <View style={styles.buttonGroup}>
                    <Button
                        title="Next"
                        onPress={handleNext}
                        disabled={username.trim().length === 0 || usernameError || isUsernameLoading}
                        loading={isSignupLoading || isUsernameLoading}
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

export default memo(Username);