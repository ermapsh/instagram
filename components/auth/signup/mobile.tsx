import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppTheme } from '@/hooks/useTheme';
import { RootState } from '@/store';
import { mobileApi, setMobile, setMobileError } from '@/store/features/signup/mobileSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HelperText } from 'react-native-paper';

interface MobileProps {
    onNext: () => void;
    onPressBack: () => void;
}

function Mobile({ onNext, onPressBack }: MobileProps) {
    const router = useRouter();
    const params = useLocalSearchParams();
    const theme = useAppTheme();
    const dispatch = useAppDispatch();
    const { isLoading, isSuccess, isError, message, data, mobile, mobileError } = useAppSelector((state: RootState) => state.mobile);

    const [inputMode, setInputMode] = useState<'phone' | 'email'>('phone');
    const [email, setEmail] = useState('');
    // const [emailError, setEmailError] = useState('');

    const selectedCountry = {
        name: (params.selectedCountryName as string) || 'India',
        code: (params.selectedCountryCode as string) || '+91'
    };

    const isPhone = inputMode === 'phone';

    const onChange = useCallback((text: string) => {
        if (isPhone) {
            if (text.length >= 10) {
                dispatch(setMobileError(false))
            } else {
                dispatch(setMobileError(true))
            }
            dispatch(setMobile(text))
        } else {
            // dispatch(setEmail(text))
        }
    }, [isPhone, dispatch]);

    const handleNext = useCallback(() => {
        if (isPhone) {
            dispatch(mobileApi(mobile));
        } else {
            // dispatch(emailApi(email));
        }
    }, [dispatch, mobile, isPhone]);

    useEffect(() => {
        if (isSuccess) {
            onNext?.();
        }
    }, [isSuccess, onNext])

    return (
        <View style={styles.container}>
            <AppHeader
                showBack={true}
                onPressBack={onPressBack}
            />
            <View style={styles.content}>
                <View>
                    <Text style={[styles.title, { color: theme.color.text }]}>
                        {isPhone ? "What's your mobile number?" : "What's your email address?"}
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.color.textSecondary }]}>
                        {isPhone
                            ? "Enter the mobile number on which you can be contacted. No one will see this on your profile."
                            : "Enter the email address at which you can be contacted. No one will see this on your profile."}
                    </Text>
                </View>

                {isPhone && (
                    <View style={styles.countrySelector}>
                        <Text style={[styles.countryText, { color: theme.color.text }]}>
                            {selectedCountry.name} ({selectedCountry.code})
                        </Text>
                        <TouchableOpacity onPress={() => router.push({
                            pathname: '/(auth)/country-select',
                            params: { selectedCode: selectedCountry.code }
                        })}>
                            <Text style={{ color: theme.color.brand, fontWeight: '600' }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <Input
                    placeholder={isPhone ? "Mobile number" : "Email address"}
                    keyboardType={isPhone ? "phone-pad" : "email-address"}
                    autoCapitalize="none"
                    value={isPhone ? mobile : email}
                    onChangeText={onChange}
                    containerStyle={styles.inputContainer}
                    maxLength={isPhone ? 10 : 255}
                />

                {isPhone && mobileError && (
                    <HelperText style={{ color: 'red' }} type="error" visible={true}>
                        Please enter a valid mobile number.
                    </HelperText>
                )}

                {isPhone && (
                    <Text style={[styles.notificationsText, { color: theme.color.textSecondary }]}>
                        You may receive WhatsApp and SMS notifications from us for security and login purposes.
                    </Text>
                )}

                <View style={styles.buttonGroup}>
                    <Button
                        loading={isLoading}
                        title="Next"
                        onPress={handleNext}
                        disabled={isPhone ? mobile.length < 5 : email.length < 5}
                    />

                    <Button
                        title={isPhone ? "Sign up with email address" : "Sign up with mobile number"}
                        variant="outline"
                    // onPress={() => {
                    //     setInputMode(isPhone ? 'email' : 'phone');
                    // }}
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                    <Text style={[styles.footerText, { color: theme.color.brand }]}>
                        I already have an account
                    </Text>
                </TouchableOpacity>
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
    countrySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    countryText: {
        fontSize: 16,
        fontWeight: '500',
    },
    inputContainer: {
    },
    notificationsText: {
        fontSize: 12,
        lineHeight: 16,
        marginVertical: 12,
        paddingHorizontal: 4,
    },
    buttonGroup: {
        gap: 8,
    },
    footer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

export default memo(Mobile);