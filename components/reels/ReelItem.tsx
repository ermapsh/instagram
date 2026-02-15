import { useAppTheme } from '@/hooks/useTheme';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Icon } from 'react-native-paper';
import { runOnJS } from 'react-native-reanimated';
// Added withTiming here
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { MarqueeText } from '../common/MarqueeText';
import { StoryItem } from '../home/StoryItem';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ReelItemProps {
    id: string;
    username: string;
    avatar: string;
    videoUrl: string;
    caption: string;
    likes: number;
    comments: number;
    shares: number;
    isFollowing?: boolean;
    height: number;
    isVisible?: boolean;
    isActive?: boolean;
}

export const ReelItem = ({
    username,
    avatar,
    videoUrl,
    caption,
    likes,
    comments,
    shares,
    isFollowing = false,
    height,
    isVisible = false,
    isActive = false,
}: ReelItemProps) => {
    const theme = useAppTheme();
    const [progress, setProgress] = useState(0);
    const [isReposted, setIsReposted] = useState(false);

    const [isPlaying, setIsPlaying] = useState(true);
    const [isFastForwarding, setIsFastForwarding] = useState(false);
    const [duration, setDuration] = useState(0);
    const [isScrubbing, setIsScrubbing] = useState(false);

    // Refs for stable access in gesture callbacks
    // const barWidthRef = React.useRef(SCREEN_WIDTH); // Not needed if we use global constant
    const durationRef = React.useRef(0);

    const player = useVideoPlayer(videoUrl, (player) => {
        player.loop = true;
        if (isVisible) {
            player.play();
        }
    });

    const setPlaybackSpeed = (speed: number) => {
        player.playbackRate = speed;
        setIsFastForwarding(speed > 1);
    };

    const handleScrub = (x: number) => {
        const width = SCREEN_WIDTH;
        const dur = durationRef.current;

        if (width <= 0 || !dur) return;

        let percent = x / width;
        percent = Math.max(0, Math.min(1, percent));

        setProgress(percent * 100);
        player.currentTime = percent * dur;
    };

    const scrubGesture = React.useMemo(() => Gesture.Pan()
        .minDistance(0)
        .onStart((e) => {
            runOnJS(setIsScrubbing)(true);
            runOnJS(handleScrub)(e.x);
        })
        .onUpdate((e) => {
            runOnJS(handleScrub)(e.x);
        })
        .onEnd(() => {
            runOnJS(setIsScrubbing)(false);
        }), []);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const tapGesture = React.useMemo(() => Gesture.Tap()
        .onEnd(() => {
            runOnJS(togglePlay)();
        }), [isPlaying]); // Re-create if isPlaying changes (togglePlay logic) - actually togglePlay depends on isPlaying state, so wrapper needed?
    // Better: use function form of state setter inside togglePlay? setIsPlaying(p => !p).
    // Then togglePlay is stable.

    // Fix togglePlay dependency
    const stableTogglePlay = () => setIsPlaying(p => !p);

    const stableTapGesture = React.useMemo(() => Gesture.Tap()
        .onEnd(() => {
            runOnJS(stableTogglePlay)();
        }), []);

    const longPressGesture = React.useMemo(() => Gesture.LongPress()
        .minDuration(300)
        .onStart((e) => {
            const { x } = e;
            if (x > SCREEN_WIDTH * 0.6 || x < SCREEN_WIDTH * 0.1) {
                runOnJS(setPlaybackSpeed)(2.0);
            }
        })
        .onFinalize(() => {
            runOnJS(setPlaybackSpeed)(1.0);
        }), []);

    const composedGestures = Gesture.Race(longPressGesture, stableTapGesture);

    useEffect(() => {
        if (isVisible && isPlaying) {
            player.play();
        } else {
            player.pause();
        }
        return () => {
            player.pause();
        };
    }, [isVisible, isPlaying, player]);

    useEffect(() => {
        if (!isActive) {
            setProgress(0);
            setIsPlaying(true);
        }
    }, [isActive]);

    // Sync progress with real video time
    useEffect(() => {
        if (!isVisible || isScrubbing) return;

        const interval = setInterval(() => {
            if (player) {
                const current = player.currentTime;
                const total = player.duration;

                if (total > 0) {
                    setProgress((current / total) * 100);
                    setDuration(total);
                    durationRef.current = total; // Sync ref
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isVisible, isScrubbing, player]);



    // Animation values for repost button
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);
    const playIconScale = useSharedValue(0);
    const progressBarHeight = useSharedValue(2);

    useEffect(() => {
        if (!isPlaying) {
            playIconScale.value = withSpring(1, { damping: 10, stiffness: 200 });
        } else {
            playIconScale.value = withTiming(0, { duration: 200 });
        }
    }, [isPlaying]);

    useEffect(() => {
        const targetHeight = isScrubbing ? 10 : 3; // Expand only while scrubbing
        progressBarHeight.value = withTiming(targetHeight, { duration: 200 });
    }, [isScrubbing]);

    const formatCount = (count: number): string => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleRepost = () => {
        // Smooth 360-degree spin. Adding 360 ensures it spins continuously in the same direction on every tap
        rotation.value = withTiming(rotation.value + 360, { duration: 400 });

        // Keep your awesome scale pop effect
        scale.value = withSequence(
            withSpring(1.2, { damping: 10, stiffness: 300 }),
            withSpring(0.9, { damping: 10, stiffness: 300 }),
            withSpring(1, { damping: 10, stiffness: 300 })
        );

        setIsReposted(!isReposted);
    };

    const repostAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: `${rotation.value}deg` },
                { scale: scale.value },
            ],
        };
    });

    const playIconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: playIconScale.value }],
            opacity: playIconScale.value,
        };
    });

    const progressBarStyle = useAnimatedStyle(() => {
        return {
            height: progressBarHeight.value,
            borderRadius: 5, // Round corners when expanded
        };
    });

    return (
        <View style={[styles.container, { height }]}>
            {/* Video Player & Gestures */}
            <GestureDetector gesture={composedGestures}>
                <View style={StyleSheet.absoluteFill}>
                    <VideoView
                        style={styles.video}
                        player={player}
                        contentFit="cover"
                        nativeControls={false}
                    />

                    {/* Fast Forward Indicator */}
                    {isFastForwarding && (
                        <View style={styles.speedIndicator}>
                            <Text style={styles.speedText}>2x Speed</Text>
                            <Icon source="fast-forward" size={20} color="#fff" />
                        </View>
                    )}

                    <View style={styles.playIconContainer}>
                        <Animated.View style={[styles.playIconInner, playIconAnimatedStyle]}>
                            <Icon source={require("@/assets/icons/resume.png")} size={30} color="rgba(255, 255, 255, 0.6)" />
                        </Animated.View>
                    </View>
                </View>
            </GestureDetector>

            {/* Progress Bar - Bottom */}
            <GestureDetector gesture={scrubGesture}>
                <View
                    style={styles.progressContainer}
                >
                    <Animated.View style={[styles.progressBackground, progressBarStyle]}>
                        <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </Animated.View>
                </View>
            </GestureDetector>

            {/* Right Side Actions */}


            {/* Bottom User Info Section */}
            <View style={[styles.overlayContainer, { bottom: 20 }]}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={styles.userHeader}>
                        <StoryItem
                            avatar={avatar}
                            isStory={true}
                            size={40}
                            showUsername={false}
                            username=''
                        />
                        <View style={styles.userDetails}>
                            <View style={styles.usernameRow}>
                                <View>
                                    <Text style={styles.username}>{username}</Text>
                                    <MarqueeText
                                        text="Original Audio - Song Name Here"
                                        speed={7000}
                                        containerWidth={160}
                                        style={styles.musicText}
                                    />
                                </View>
                                {!isFollowing && (
                                    <TouchableOpacity style={styles.followButton}>
                                        <Text style={styles.followButtonText}>Follow</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>


                    {/* Description with Music Attribution */}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description} numberOfLines={2}>
                            {caption}
                        </Text>
                    </View>
                </View>
                <View style={styles.actionsContainer}>
                    {/* Likes */}
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon source={require("@/assets/icons/heart-outline.png")} size={28} color="#fff" />
                        <Text style={styles.actionText}>Likes</Text>
                    </TouchableOpacity>

                    {/* Comments */}
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon source={require("@/assets/icons/comment.png")} size={28} color="#fff" />
                        <Text style={styles.actionText}>{formatCount(comments)}</Text>
                    </TouchableOpacity>

                    {/* Repost */}
                    <TouchableOpacity style={styles.actionButton} onPress={handleRepost} activeOpacity={0.7}>
                        <Animated.View style={repostAnimatedStyle}>
                            <Icon source={require("@/assets/icons/repost.png")} size={28} color={isReposted ? "#00FF00" : "#fff"} />
                        </Animated.View>
                        <Text style={styles.actionText}>{formatCount(shares)}</Text>
                    </TouchableOpacity>

                    {/* Send/Share */}
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon source={require("@/assets/icons/message-outline.png")} size={28} color="#fff" />
                    </TouchableOpacity>

                    {/* More Options */}
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon source="dots-horizontal" color="#fff" size={24} />
                    </TouchableOpacity>

                    <View style={styles.musicAttributionContainer}>
                        <Image
                            source={{ uri: avatar }}
                            style={styles.musicAvatar}
                        />
                    </View>
                </View>
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#000',
        position: 'relative',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    playIconContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },

    progressContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        height: 20,
        justifyContent: 'flex-end',
    },
    progressBackground: {
        height: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#fff',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    captionContainer: {
        position: 'absolute',
        top: 60,
        left: 16,
        right: 80,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    caption: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '400',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    actionsContainer: {
        gap: 24,
    },
    actionButton: {
        alignItems: 'center',
        gap: 4,
    },
    actionText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    overlayContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 100,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    userDetails: {
        flex: 1,
    },
    usernameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    username: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    followButton: {
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
        marginLeft: 12
    },
    followButtonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    description: {
        color: '#fff',
        fontSize: 13,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
        lineHeight: 18,
        flex: 1,
        marginRight: 12,
    },
    musicText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '400',
        marginTop: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    musicAttributionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    musicAvatar: {
        width: 30,
        height: 30,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#fff',
    },
    playIconInner: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 15,
        borderRadius: 50,
    },
    speedIndicator: {
        position: 'relative',
        bottom: 150,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        zIndex: 10,
    },
    speedText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    progressContainerPaused: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 60,
    },
    timeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        minWidth: 35,
        textAlign: 'center',
    },
});