import { useAppTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface NotificationUser {
    id: string;
    username: string;
    avatarUrl: string;
}

export interface NotificationItemType {
    id: string;
    users: NotificationUser[];
    action: string;
    target?: string;
    time: string;
    type: 'like_reel' | 'like_comment' | 'follow_request';
    mediaUrl?: string;
}

interface NotificationItemProps {
    item: NotificationItemType;
}

function NotificationItem({ item }: NotificationItemProps) {
    const theme = useAppTheme();

    return (
        <Pressable style={styles.container}>
            {/* Avatars */}
            <View style={styles.avatarContainer}>
                {item.users.length === 1 ? (
                    <Image source={{ uri: item.users[0].avatarUrl }} style={[styles.avatar, { borderColor: theme.color.background }]} />
                ) : item.users.length > 1 ? (
                    <View style={styles.stackedAvatars}>
                        <Image source={{ uri: item.users[1].avatarUrl }} style={[styles.avatarBack, { borderColor: theme.color.background }]} />
                        <Image source={{ uri: item.users[0].avatarUrl }} style={[styles.avatarFront, { borderColor: theme.color.background }]} />
                    </View>
                ) : null}

                {/* Badge */}
                {item.type.includes('like') && (
                    <View style={[styles.badgeContainer, { backgroundColor: theme.color.background }]}>
                        <View style={styles.likeBadge}>
                            <Ionicons name="heart" size={10} color="white" />
                        </View>
                    </View>
                )}
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
                <Text style={[styles.text, { color: theme.color.text }]}>
                    {item.users.map((u, i) => (
                        <Text key={u.id} style={{ fontWeight: 'bold' }}>
                            {u.username}{i < item.users.length - 1 ? ', ' : ' '}
                        </Text>
                    ))}
                    {item.users.length > 1 && <Text>and others </Text>}
                    <Text>{item.action} </Text>
                    {item.target && <Text style={{ fontWeight: 'bold' }}>{item.target}</Text>}
                    <Text style={[styles.timeText, { color: theme.color.textSecondary || '#888' }]}> {item.time}</Text>
                </Text>
            </View>

            {/* Right side (Media or Button) */}
            {item.mediaUrl && (
                <View style={styles.rightContainer}>
                    <Image source={{ uri: item.mediaUrl }} style={styles.mediaImage} />
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    avatarContainer: {
        width: 44,
        height: 44,
        marginRight: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
    },
    stackedAvatars: {
        width: 44,
        height: 44,
    },
    avatarBack: {
        width: 32,
        height: 32,
        borderRadius: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        borderWidth: 2,
    },
    avatarFront: {
        width: 32,
        height: 32,
        borderRadius: 16,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 2,
    },
    badgeContainer: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        borderRadius: 10,
        padding: 2,
    },
    likeBadge: {
        backgroundColor: '#FF3040',
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        marginRight: 12,
    },
    text: {
        fontSize: 14,
        lineHeight: 18,
    },
    timeText: {
        fontSize: 14,
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaImage: {
        width: 44,
        height: 44,
        borderRadius: 4,
        backgroundColor: '#333',
    },
});

export default memo(NotificationItem);
