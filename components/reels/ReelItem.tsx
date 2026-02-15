import { useAppTheme } from '@/hooks/useTheme';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
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
}: ReelItemProps) => {
    const theme = useAppTheme();
    const [isReposted, setIsReposted] = useState(false);

    // Animation values for repost button
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    const formatCount = (count: number): string => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        } else if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
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

    return (
        <View style={styles.container}>
            {/* Video Thumbnail/Player */}
            <Image
                source={{ uri: videoUrl }}
                style={styles.video}
                contentFit="cover"
            />

            {/* Right Side Actions */}


            {/* Bottom User Info Section */}
            <View style={styles.overlayContainer}>
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
});