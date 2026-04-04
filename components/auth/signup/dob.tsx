import { AppHeader } from '@/components/app-header';
import DatePickerComponent from '@/components/datepicker/datepicker';
import { Button } from '@/components/ui/button';
import { useAppTheme } from '@/hooks/useTheme';
import { RootState } from '@/store';
import { setDob, setDobError } from '@/store/features/signup/signupSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import Animated, { SlideInDown } from 'react-native-reanimated';

interface DobProps {
    onNext: (dob: Date) => void;
    onPressBack: () => void;
}

function Dob({ onNext, onPressBack }: DobProps) {
    const theme = useAppTheme();
    const dispatch = useAppDispatch();
    const { dob: dobStringParam, dobError, isLoading } = useAppSelector((state: RootState) => state.signup);
    const dob = dobStringParam ? new Date(dobStringParam) : new Date();

    const calculateAge = useCallback((birthday: Date) => {
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }, []);

    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dobString = `${dob.getDate()} ${MONTHS[dob.getMonth()]} ${dob.getFullYear()}`;

    return (
        <View className="flex-1">
            <View style={styles.content}>
                <AppHeader
                    showBack={true}
                    onPressBack={() => {
                        onPressBack();
                    }}
                />
                <View>
                    <Text style={[styles.title, { color: theme.color.text }]}>
                        What&apos;s your date of birth?
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.color.text }]}>
                        Use your own date of birth, even if this account is for a business, a pet or something else.
                        No one will see this unless you choose to share it.{" "}
                        <Text
                            style={{ color: theme.color.brand }}
                            onPress={() => {
                                console.log("DOB info clicked")
                            }}
                        >
                            Why do I need to provide my date of birth?
                        </Text>
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.dobInputContainer,
                        { borderColor: theme.color.border, backgroundColor: theme.color.backgroundInteractive }
                    ]}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.dobLabel, { color: theme.color.textSecondary }]}>
                        Date of birth ({calculateAge(dob)} years old)
                    </Text>
                    <Text style={[styles.dobText, { color: theme.color.text }]}>
                        {dobString}
                    </Text>
                </TouchableOpacity>
                {
                    dobError && (
                        <HelperText type="error" visible={dobError} style={styles.errorText}>
                            You must be at least 13 years old to use Instagram.
                        </HelperText>
                    )
                }

                <View style={[styles.buttonGroup, {}]}>
                    <Button
                        title="Next"
                        onPress={() => {
                            if (calculateAge(dob) < 13) {
                                dispatch(setDobError(true));
                                return;
                            }
                            onNext(dob);
                        }}
                        disabled={dobError}
                        loading={isLoading}
                    />
                </View>
            </View>

            <Animated.View
                entering={SlideInDown}
                style={[styles.pickerContainer, { backgroundColor: theme.color.backgroundElevated }]}>
                <DatePickerComponent
                    value={dob}
                    onChange={(date: Date) => {
                        const age = calculateAge(date);
                        if (age < 13) {
                            dispatch(setDobError(true));
                        } else {
                            dispatch(setDobError(false));
                        }
                        dispatch(setDob(date.toISOString()));
                    }}
                    range={{
                        start: new Date(1900, 0, 1),
                        end: new Date()
                    }}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 10
    },
    subtitle: {
        flexDirection: 'row',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        marginBottom: 24,
    },
    dobInputContainer: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12
    },
    dobLabel: {
        fontSize: 12,
        marginBottom: 4,
    },
    dobText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonGroup: {
        gap: 8,
    },
    pickerContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    errorText: {
        color: 'red',
        fontWeight: 500,
        fontSize: 12,
        // marginTop: 4
    }
});

export default memo(Dob);