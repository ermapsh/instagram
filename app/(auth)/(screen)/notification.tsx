import NotificationItem, { NotificationItemType } from '@/components/notification/NotificationItem';
import { useAppTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_DATA = [
    {
        title: 'Highlights',
        data: [
            {
                id: '1',
                users: [
                    { id: 'u1', username: 'akash_2_000', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
                    { id: 'u2', username: 'shubham.monde', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
                ],
                action: 'liked mr.shubh_mhadye\'s reel that you reposted.',
                time: '2h',
                type: 'like_reel',
                mediaUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?width=100&height=100&fit=crop',
            }
        ]
    },
    {
        title: 'Yesterday',
        data: [
            {
                id: '2',
                users: [
                    { id: 'u3', username: 's4u_patil_1717', avatarUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
                    { id: 'u4', username: 'king.rk7', avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e2d826720d' },
                ],
                action: 'liked rimmor_solis\'s reel that you reposted.',
                time: '1d',
                type: 'like_reel',
                mediaUrl: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?width=100&height=100&fit=crop',
            }
        ]
    },
    {
        title: 'Last 7 days',
        data: [
            {
                id: '3',
                users: [
                    { id: 'u5', username: '_harshad_salunkhe_', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e-29026024d' },
                ],
                action: 'liked newswithronit\'s reel that you reposted.',
                time: '1d',
                type: 'like_reel',
                mediaUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?width=100&height=100&fit=crop',
            },
            {
                id: '4',
                users: [
                    { id: 'u6', username: 'shubham.monde.56', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
                ],
                action: 'liked _vibee_station\'s reel that you reposted.',
                time: '2d',
                type: 'like_reel',
                mediaUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?width=100&height=100&fit=crop',
            },
            {
                id: '5',
                users: [
                    { id: 'u7', username: 'akash_2_000', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
                    { id: 'u8', username: 'shubham.monde.56', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
                ],
                action: 'liked _yashhh.lly\'s reel that you reposted.',
                time: '3d',
                type: 'like_reel',
                mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?width=100&height=100&fit=crop',
            },
            {
                id: '6',
                users: [
                    { id: 'u9', username: 'harsh7070_', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026021d' },
                ],
                action: 'liked your comment: Jisko pet nahi vo shet nahi 😂😂 jk',
                time: '3d',
                type: 'like_comment',
                mediaUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?width=100&height=100&fit=crop',
            }
        ]
    }
] as { title: string, data: NotificationItemType[] }[];

function Notification() {
    const theme = useAppTheme();
    const router = useRouter();

    const renderHeader = () => (
        <View style={[styles.header, { borderBottomColor: theme.color.border }]}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={28} color={theme.color.text} />
            </Pressable>
            <Pressable style={styles.headerTitleContainer}>
                <Text style={[styles.headerTitle, { color: theme.color.text }]}>ermapsh</Text>
                <Ionicons name="chevron-down" size={16} color={theme.color.textSecondary || '#888'} />
                <View style={styles.redDot} />
            </Pressable>
        </View>
    );

    const renderFollowRequests = () => (
        <Pressable style={styles.followRequestsRow}>
            <View style={styles.followRequestsIconContainer}>
                <Ionicons name="person-add-outline" size={24} color={theme.color.text} />
            </View>
            <View style={styles.followRequestsTexts}>
                <Text style={[styles.followRequestsTitle, { color: theme.color.text }]}>Follow requests</Text>
                <Text style={[styles.followRequestsSubtitle, { color: theme.color.textSecondary || '#888' }]}>Approve or decline requests</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.background }}>
            {renderHeader()}
            <SectionList
                sections={MOCK_DATA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NotificationItem item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={[styles.sectionTitle, { color: theme.color.text }]}>{title}</Text>
                )}
                ListHeaderComponent={renderFollowRequests}
                stickySectionHeadersEnabled={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 4,
    },
    redDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FF3040',
        marginLeft: 4,
        marginBottom: 8,
    },
    followRequestsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 0,
    },
    followRequestsIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    followRequestsTexts: {
        flex: 1,
    },
    followRequestsTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    followRequestsSubtitle: {
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 8,
    }
});

export default memo(Notification)