import { useAppTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { StoryItem } from './StoryItem';

const { width } = Dimensions.get('window');

interface PostItemProps {
    avatar: string;
    username: string;
    imageUrl: string;
    caption: string;
    likes: number;
    timestamp: string;
    location?: string;
}

export const PostItem = ({ avatar, username, imageUrl, caption, likes, timestamp, location }: PostItemProps) => {
    const theme = useAppTheme();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <StoryItem
                        avatar={avatar}
                        username={username}
                        isStory={true}
                        size={33}
                        showUsername={false}
                    />
                    <View style={styles.headerText}>
                        <Text style={[styles.username, { color: theme.color.text }]}>{username}</Text>
                        {location && <Text style={[styles.location, { color: theme.color.text }]}>{location}</Text>}
                    </View>
                </View>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={20} color={theme.color.text} />
                </TouchableOpacity>
            </View>

            {/* Media */}
            <View style={styles.mediaContainer}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.media}
                    contentFit="cover"
                    transition={200}
                />
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <View style={styles.actionsLeft}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon source={require("@/assets/icons/heart-outline.png")} size={26} color={theme.color.text} />
                        {/* <Ionicons name="heart-outline" size={26} color={theme.color.text} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon source={require("@/assets/icons/comment.png")} size={25} color={theme.color.text} />

                        {/* <Ionicons name="chatbubble-outline" size={25} color={theme.color.text} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon source={require("@/assets/icons/message-outline.png")} size={25} color={theme.color.text} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Icon source={require("@/assets/icons/bookmark-outline.png")} size={25} color={theme.color.text} />
                </TouchableOpacity>
            </View>

            {/* Likes & Caption */}
            <View style={styles.footer}>
                <Text style={[styles.likes, { color: theme.color.text }]}>{likes.toLocaleString()} likes</Text>

                <View style={styles.captionContainer}>
                    <Text style={[styles.caption, { color: theme.color.text }]}>
                        <Text style={styles.captionUsername}>{username} </Text>
                        {caption}
                    </Text>
                </View>

                <TouchableOpacity>
                    <Text style={styles.comments}>View all 17 comments</Text>
                </TouchableOpacity>

                <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    username: {
        fontWeight: '600',
        fontSize: 14,
    },
    location: {
        fontSize: 11,
        marginTop: 1,
    },
    mediaContainer: {
        width: width,
        height: width * 1.25, // 4:5 Aspect Ratio standard
        backgroundColor: '#1c1c1c',
    },
    media: {
        width: '100%',
        height: '100%',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    actionsLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        marginRight: 16,
    },
    footer: {
        paddingHorizontal: 12,
    },
    likes: {
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 6,
    },
    captionContainer: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    caption: {
        fontSize: 14,
        lineHeight: 18,
    },
    captionUsername: {
        fontWeight: '600',
    },
    comments: {
        color: '#666',
        fontSize: 14,
        marginBottom: 4,
    },
    timestamp: {
        color: '#666',
        fontSize: 11,
    },
});
