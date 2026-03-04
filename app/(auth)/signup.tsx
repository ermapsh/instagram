import { GlassDialog } from '@/components/ui/glass-dialog';
import { globalStyle } from '@/constant/globalstyle';
import { useRouter } from 'expo-router';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useAppTheme } from '../../hooks/useTheme';

import Dob from '@/components/auth/signup/dob';
import Mobile from '@/components/auth/signup/mobile';
import Otp from '@/components/auth/signup/otp';

function Signup() {
    const router = useRouter();
    const theme = useAppTheme();
    const pagerRef = useRef<PagerView>(null);

    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

    // Auth State
    const [contactFormattedValue, setContactFormattedValue] = useState('');

    const onPressBack = useCallback(() => {
        try {
            setShowLeaveConfirm(true)
        } catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background }]}>
            <PagerView scrollEnabled={false} ref={pagerRef} style={globalStyle.flex1} initialPage={0}>

                <View key="0" className="flex-1">
                    <Mobile
                        onNext={(data) => {
                            setContactFormattedValue(data.formattedValue);
                            Keyboard.dismiss();
                            pagerRef.current?.setPage(1);
                        }}
                        onPressBack={onPressBack}
                    />
                </View>

                <View key="1" className="flex-1">
                    <Otp
                        contactFormattedValue={contactFormattedValue}
                        onNext={(otp) => {
                            console.log('OTP submitted', otp);
                            Keyboard.dismiss();
                            pagerRef.current?.setPage(2);
                        }}
                        onPressBack={() => {
                            pagerRef.current?.setPage(0);
                        }}
                    />
                </View>

                <View key="2" className="flex-1">
                    <Dob />
                </View>

            </PagerView>

            <GlassDialog
                visible={showLeaveConfirm}
                onClose={() => setShowLeaveConfirm(false)}
                title="Do you want to stop creating your account?"
                message="If you stop now, you'll lose any progress that you've made."
                primaryAction={{
                    label: "Stop creating account",
                    onPress: () => {
                        setShowLeaveConfirm(false);
                        router.back();
                    },
                    variant: 'danger'
                }}
                secondaryAction={{
                    label: "Continue creating account",
                    onPress: () => setShowLeaveConfirm(false)
                }}
            />
        </View>
    );
}

export default memo(Signup);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8
    }
});