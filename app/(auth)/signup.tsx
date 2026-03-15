import { GlassDialog } from '@/components/ui/glass-dialog';
import { globalStyle } from '@/constant/globalstyle';
import { useRouter } from 'expo-router';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useAppTheme } from '../../hooks/useTheme';

import Dob from '@/components/auth/signup/dob';
import Fullname from '@/components/auth/signup/fullname';
import Mobile from '@/components/auth/signup/mobile';
import Otp from '@/components/auth/signup/otp';
import Password from '@/components/auth/signup/password';
import Username from '@/components/auth/signup/username';

function Signup() {
    const router = useRouter();
    const theme = useAppTheme();
    const pagerRef = useRef<PagerView>(null);

    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

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
                        onNext={() => {
                            Keyboard.dismiss();
                            pagerRef.current?.setPage(1);
                        }}
                        onPressBack={onPressBack}
                    />
                </View>

                <View key="1" className="flex-1">
                    <Otp
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
                    <Password
                        onNext={(password) => {
                            console.log('Password submitted', password);
                            pagerRef.current?.setPage(3);
                        }}
                        onPressBack={() => {
                            pagerRef.current?.setPage(1);
                        }}
                    />
                </View>


                <View key="3" className="flex-1">
                    <Dob
                        onNext={(dob) => {
                            console.log('DOB submitted', dob);
                            // Next screen would be fullname
                            pagerRef.current?.setPage(4);
                        }}
                        onPressBack={() => {
                            pagerRef.current?.setPage(2);
                        }}
                    />
                </View>

                <View key="4" className="flex-1">
                    <Fullname
                        onNext={(fullname) => {
                            console.log('Fullname submitted', fullname);
                            // Next screen would be username
                            pagerRef.current?.setPage(5);
                        }}
                        onPressBack={() => {
                            pagerRef.current?.setPage(3);
                        }}
                    />
                </View>

                <View key="5" className="flex-1">
                    <Username
                        onNext={(username) => {
                            console.log('Username submitted', username);
                            // Submit all forms here
                        }}
                        onPressBack={() => {
                            pagerRef.current?.setPage(4);
                        }}
                    />
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
    }
});