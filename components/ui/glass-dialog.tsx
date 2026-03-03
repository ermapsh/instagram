import { GlassView } from 'expo-glass-effect';
import React from 'react';
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle
} from 'react-native';
import { useAppTheme } from '../../hooks/useTheme';
import { Button } from './button';

interface GlassDialogProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    primaryAction?: {
        label: string;
        onPress: () => void;
        variant?: 'danger' | 'primary';
    };
    secondaryAction?: {
        label: string;
        onPress: () => void;
    };
    children?: React.ReactNode;
    containerStyle?: ViewStyle;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const GlassDialog: React.FC<GlassDialogProps> = ({
    visible,
    onClose,
    title,
    message,
    primaryAction,
    secondaryAction,
    children,
    containerStyle,
}) => {
    const theme = useAppTheme();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <Pressable onPress={(e) => e.stopPropagation()}>
                    <GlassView
                        style={[
                            styles.modalContent,
                            containerStyle
                        ]}
                    >
                        <View style={styles.innerContent}>
                            {title && (
                                <Text style={[styles.title, { color: theme.color.text }]}>
                                    {title}
                                </Text>
                            )}
                            {message && (
                                <Text style={[styles.message, { color: theme.color.textSecondary }]}>
                                    {message}
                                </Text>
                            )}

                            {children}

                            <View style={styles.actions}>
                                {primaryAction && (
                                    <Button
                                        title={primaryAction.label}
                                        variant="primary"
                                        onPress={() => {
                                            primaryAction.onPress();
                                        }}
                                    />
                                )}

                                {secondaryAction && (
                                    <Button
                                        title={secondaryAction.label}
                                        variant="outline"
                                        onPress={() => {
                                            secondaryAction.onPress();
                                        }}
                                    />
                                )}
                            </View>
                        </View>
                    </GlassView>
                </Pressable>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        borderRadius: 30,
        overflow: 'hidden',
        width: SCREEN_WIDTH * 0.85,
        maxWidth: 400,
    },
    innerContent: {
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'left',
        marginBottom: 12,
        lineHeight: 24,
    },
    message: {
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 12,
        lineHeight: 20,
    },
    actions: {
        width: '100%',
    },
});
