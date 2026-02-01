import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAppTheme } from '../../hooks/useTheme';

export default function SignupScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const theme = useAppTheme();
    const [inputMode, setInputMode] = useState<'phone' | 'email'>('phone');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');

    // Default to India if not specified in params
    const selectedCountry = {
        name: (params.selectedCountryName as string) || 'India',
        code: (params.selectedCountryCode as string) || '+91'
    };

    const isPhone = inputMode === 'phone';

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background }]}>


            {/* Main Content */}
            <View style={styles.content}>
                <Text style={[styles.title, { color: theme.color.text }]}>
                    {isPhone ? "What's your mobile number?" : "What's your email address?"}
                </Text>

                <Text style={[styles.subtitle, { color: theme.color.textSecondary }]}>
                    {isPhone
                        ? "Enter the mobile number on which you can be contacted. No one will see this on your profile."
                        : "Enter the email address at which you can be contacted. No one will see this on your profile."}
                </Text>

                {/* Country Selector Mock - Only for Phone */}
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

                {/* Input */}
                <Input
                    placeholder={isPhone ? "Mobile number" : "Email address"}
                    keyboardType={isPhone ? "phone-pad" : "email-address"}
                    autoCapitalize="none"
                    value={isPhone ? mobileNumber : email}
                    onChangeText={isPhone ? setMobileNumber : setEmail}
                    containerStyle={styles.inputContainer}
                    autoFocus
                />

                {isPhone && (
                    <Text style={[styles.notificationsText, { color: theme.color.textSecondary }]}>
                        You may receive WhatsApp and SMS notifications from us for security and login purposes.
                    </Text>
                )}

                {/* Actions */}
                <View style={styles.buttonGroup}>
                    <Button
                        title="Next"
                        onPress={() => {
                            // Handle next step
                            const result = {
                                type: isPhone ? 'phone' : 'email',
                                value: isPhone ? `${selectedCountry.code}${mobileNumber} ` : email
                            };
                            console.log('Next pressed:', isPhone ? result.value : email);
                            console.log('Signup payload:', result);
                        }}
                        disabled={isPhone ? mobileNumber.length < 5 : email.length < 5}
                    />

                    <Button
                        title={isPhone ? "Sign up with email address" : "Sign up with mobile number"}
                        variant="outline"
                        onPress={() => {
                            setInputMode(isPhone ? 'email' : 'phone');
                        }}
                    />
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                    <Text style={[styles.footerText, { color: theme.color.brand }]}>
                        I already have an account
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        padding: 24,
    },
    backButton: {
        marginBottom: 12,
        marginLeft: -8, // Align nicely with left edge
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
        marginBottom: 16,
    },
    notificationsText: {
        fontSize: 12,
        lineHeight: 16,
        marginBottom: 24,
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