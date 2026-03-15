import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { useAppTheme } from '@/hooks/useTheme';
import { RootState } from '@/store';
import { otpVerifyApi } from '@/store/features/signup/otpSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface OtpProps {
    onNext: (otp: string) => void;
    onPressBack: () => void;
}

function Otp({ onNext, onPressBack }: OtpProps) {
    const OTP_LENGTH = 6;
    const theme = useAppTheme();
    const dispatch = useAppDispatch();
    const { isLoading, isSuccess, isError, message, data } = useAppSelector((state: RootState) => state.otp)
    const { data: mobileData } = useAppSelector((state: RootState) => state.mobile)
    const [otp, setOtp] = useState('');
    const otpInputRef = useRef<TextInput>(null);


    useEffect(() => {
        const timer = setTimeout(() => {
            otpInputRef.current?.focus();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const verifyOtp = useCallback(() => {
        try {
            const payload = {
                "sessionId": mobileData?.sessionId,
                "otp": otp
            }
            dispatch(otpVerifyApi(payload))
        } catch (error) {
            console.log(error)
        }
    }, [mobileData, otp, dispatch]);

    useEffect(() => {
        if (isSuccess) {
            onNext(data)
        }
    }, [isSuccess, data, onNext])

    return (
        <View style={styles.container}>
            <AppHeader
                showBack={true}
                onPressBack={() => {
                    setOtp('');
                    onPressBack();
                }}
            />
            <View style={styles.content}>
                <View>
                    <Text style={[styles.title, { color: theme.color.text }]}>
                        Enter the confirmation code
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.color.text }]}>
                        To confirm your account, enter the {OTP_LENGTH}-digit code that we sent {mobileData?.mobile}
                    </Text>
                </View>

                <View style={styles.otpWrapper}>
                    <View style={styles.otpContainer}>
                        {Array(OTP_LENGTH).fill(0).map((_, i) => {
                            const isFocused = otp.length === i;
                            return (
                                <View
                                    key={i}
                                    style={[
                                        styles.otpCell,
                                        {
                                            borderColor: isFocused ? theme.color.text : theme.color.border,
                                            backgroundColor: theme.color.backgroundElevated
                                        }
                                    ]}
                                >
                                    <Text style={[styles.otpText, { color: theme.color.text }]}>{otp[i] || ''}</Text>
                                </View>
                            );
                        })}
                    </View>
                    <TextInput
                        ref={otpInputRef}
                        value={otp}
                        onChangeText={(t) => { if (t.length <= OTP_LENGTH) setOtp(t.replace(/[^0-9]/g, '')) }}
                        keyboardType="number-pad"
                        style={styles.hiddenInput}
                        autoFocus={false}
                        maxLength={OTP_LENGTH}
                        caretHidden={true}
                    />
                </View>

                <View style={styles.buttonGroup}>
                    <Button
                        title="Next"
                        onPress={verifyOtp}
                        disabled={otp.length !== OTP_LENGTH}
                    />

                    <Button
                        title="I didn't receive the code"
                        variant="outline"
                        onPress={() => {
                            // Handle resend code
                            console.log('Resend code pressed');
                        }}
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
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 24,
    },
    buttonGroup: {
        gap: 8,
    },
    otpWrapper: {
        marginBottom: 24,
        position: 'relative',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    otpCell: {
        width: 48,
        height: 56,
        borderWidth: 1,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpText: {
        fontSize: 24,
        fontWeight: '600',
    },
    hiddenInput: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0,
    },
});

export default memo(Otp);