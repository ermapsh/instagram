import { GlassView } from 'expo-glass-effect';
import React from 'react';
import {
    Animated,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle
} from 'react-native';
import { Portal } from 'react-native-paper';
import { useAppTheme } from '../../hooks/useTheme';

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
    const [fadeAnim] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, fadeAnim]);

    if (!visible) return null;

    return (
        <Portal>
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
                                    <Pressable
                                        onPress={primaryAction.onPress}
                                        style={({ pressed }) => [
                                            styles.button,
                                            styles.primaryButton,
                                            {
                                                backgroundColor: primaryAction.variant === 'danger'
                                                    ? '#0095f6' // Instagram blue
                                                    : theme.color.brand,
                                                opacity: pressed ? 0.8 : 1
                                            }
                                        ]}
                                    >
                                        <Text style={styles.primaryButtonText}>
                                            {primaryAction.label}
                                        </Text>
                                    </Pressable>
                                )}

                                {secondaryAction && (
                                    <Pressable
                                        onPress={secondaryAction.onPress}
                                        style={({ pressed }) => [
                                            styles.button,
                                            styles.secondaryButton,
                                            {
                                                backgroundColor: theme
                                                    ? 'rgba(255, 255, 255, 0.1)'
                                                    : 'rgba(0, 0, 0, 0.05)',
                                                opacity: pressed ? 0.8 : 1
                                            }
                                        ]}
                                    >
                                        <Text style={[styles.secondaryButtonText, { color: theme.color.text }]}>
                                            {secondaryAction.label}
                                        </Text>
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </GlassView>
                </Pressable>
            </View>
        </Portal>
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
        marginBottom: 24,
        lineHeight: 20,
    },
    actions: {
        width: '100%',
        gap: 12,
    },
    button: {
        width: '100%',
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButton: {
        // Shadow/Elevation if needed
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
    secondaryButton: {
        // Shadow/Elevation if needed
    },
    secondaryButtonText: {
        fontSize: 15,
        fontWeight: '600',
    },
});
