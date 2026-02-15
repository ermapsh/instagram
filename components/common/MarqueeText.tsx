import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

interface MarqueeTextProps {
    text: string;
    speed?: number; // Duration for one full scroll cycle
    spacing?: number; // Gap between the end of the text and the next start
    containerWidth: number; // The fixed width of your marquee window
    style?: TextStyle;
    containerStyle?: ViewStyle;
}

export const MarqueeText = ({
    text,
    speed = 8000,
    spacing = 40, // The gap between end and start
    containerWidth,
    style,
    containerStyle,
}: MarqueeTextProps) => {
    const [textWidth, setTextWidth] = useState(0);
    const translateX = useSharedValue(0);

    const onLayout = (event: LayoutChangeEvent) => {
        const width = event.nativeEvent.layout.width;
        if (width > 0 && width !== textWidth) {
            setTextWidth(width);
        }
    };

    // Start animation when textWidth is measured
    useEffect(() => {
        if (textWidth > 0) {
            // Always animate - scroll the full text width + spacing
            translateX.value = 0;
            translateX.value = withRepeat(
                withTiming(-(textWidth + spacing), {
                    duration: speed,
                    easing: Easing.linear,
                }),
                -1, // Infinite
                false // Don't reverse
            );
        }
    }, [textWidth, spacing, speed, translateX]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={[styles.container, { width: containerWidth }, containerStyle]}>
            <Animated.View style={[styles.animatedRow, animatedStyle]}>
                <Text
                    onLayout={onLayout}
                    style={[style, styles.text]}
                    numberOfLines={1}
                >
                    {text}
                </Text>

                {/* Always show second instance for seamless loop */}
                {textWidth > 0 && (
                    <>
                        <View style={{ width: spacing }} />
                        <Text style={[style, styles.text]} numberOfLines={1}>
                            {text}
                        </Text>
                    </>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        height: 16,
    },
    animatedRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        flexShrink: 0,
    },
});