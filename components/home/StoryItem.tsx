import { useAppTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';

interface StoryItemProps {
    avatar: string;
    username: string;
    isStory?: boolean; // True if unread story exists
    isMe?: boolean;    // True for current user's story
    size?: number;     // Customizable size
    showUsername?: boolean; // Option to hide username
}

export const StoryItem = ({
    avatar,
    username,
    isStory = true,
    isMe = false,
    size = 74,
    showUsername = true
}: StoryItemProps) => {
    const theme = useAppTheme();

    /* 
       Scaling Logic:
       - Default size: 74
       - Gradient padding: 2 (fixed)
       - Inner border (gap): 3 (fixed for >50px, can be smaller for tiny avatars)
       - Avatar size = size - (padding*2) - (borderWidth*2)
                     = size - 4 - 6 = size - 10
    */

    const borderWidth = size < 50 ? 2 : 3;
    const padding = 2;
    // Calculate avatar size based on outer ring size
    const avatarSize = size - (padding * 2) - (borderWidth * 2);

    return (
        <View style={[styles.container, { width: showUsername ? undefined : size + 4 }]}>
            <TouchableOpacity activeOpacity={0.9} style={styles.touchable}>
                {/* Gradient Border for Story */}
                {isStory && !isMe ? (
                    <LinearGradient
                        colors={['#C13584', '#E1306C', '#FD1D1D', '#F56040', '#F77737', '#FCAF45', '#FFDC80']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.gradientBorder, { width: size, height: size, borderRadius: size / 2, padding }]}
                    >
                        <View style={[
                            styles.innerBorder,
                            {
                                backgroundColor: theme.color.background,
                                borderWidth,
                                borderRadius: (size - padding * 2) / 2
                            }
                        ]}>
                            <Avatar.Image size={avatarSize} source={{ uri: avatar }} />
                        </View>
                    </LinearGradient>
                ) : (
                    <View style={[styles.gradientBorder, { width: size, height: size, borderRadius: size / 2, backgroundColor: 'transparent', padding }]}>
                        <View style={[
                            styles.innerBorder,
                            {
                                backgroundColor: theme.color.background,
                                borderWidth,
                                borderColor: 'transparent',
                                padding: 0,
                                borderRadius: (size - padding * 2) / 2
                            }
                        ]}>
                            <Avatar.Image size={avatarSize} source={{ uri: avatar }} />
                            {isMe && (
                                <View style={[styles.plusIcon, { backgroundColor: theme.color.brand }]}>
                                    <Ionicons name="add" size={16} color="white" />
                                </View>
                            )}
                        </View>
                    </View>
                )}

                {showUsername && (
                    <Text style={[styles.username, { color: theme.color.text, width: size + 10 }]} numberOfLines={1}>
                        {isMe ? 'Your Story' : username}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 6,
        alignItems: 'center',
    },
    touchable: {
        alignItems: 'center',
    },
    gradientBorder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerBorder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
    },
    username: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
    },
    plusIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    }
});
