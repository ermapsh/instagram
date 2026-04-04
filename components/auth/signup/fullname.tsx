import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppTheme } from '@/hooks/useTheme';
import { RootState } from '@/store';
import { setFullName, setFullNameError } from '@/store/features/signup/signupSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FullnameProps {
    onNext: (fullname: string) => void;
    onPressBack: () => void;
}

function Fullname({ onNext, onPressBack }: FullnameProps) {
    const theme = useAppTheme();
    const dispatch = useAppDispatch();
    const { fullName, fullNameError, isLoading } = useAppSelector((state: RootState) => state.signup);

    const onChange = useCallback((text: string) => {
        if (text.trim().length === 0) {
            dispatch(setFullNameError(true));
        } else {
            dispatch(setFullNameError(false));
        }
        dispatch(setFullName(text));
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
                        What&apos;s your name?
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.color.text }]}>
                        Add your name so that friends can find you.
                    </Text>
                </View>

                <Input
                    placeholder="Full name"
                    autoCapitalize="words"
                    value={fullName}
                    onChangeText={onChange}
                    containerStyle={styles.inputContainer}
                    error={fullNameError ? "Please enter your full name" : undefined}
                />

                <View style={styles.buttonGroup}>
                    <Button
                        title="Next"
                        onPress={() => {
                            if (fullName.trim().length === 0) {
                                dispatch(setFullNameError(true));
                                return;
                            }
                            onNext(fullName);
                        }}
                        disabled={fullName.trim().length === 0 || fullNameError}
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
    buttonGroup: {
        gap: 8,
    },
});

export default memo(Fullname);