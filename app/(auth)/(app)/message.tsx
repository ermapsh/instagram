import { StoryItem } from '@/components/home/StoryItem';
import { useAppTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock Data
const NOTES_DATA = [
    { id: '1', username: 'Your note', avatar: 'https://avatars.githubusercontent.com/u/72149385?v=4', note: 'Flowers or chocolate?', isMe: true },
    { id: '2', username: 'alexa_designs', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60', note: '📍 Location off', isMe: false },
    { id: '3', username: 'travel_mike', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60', note: 'Har Har', isMe: false, music: 'Dj Glory, Arijit...' },
    { id: '4', username: 'sara_smiles', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60', note: 'Weekend vibes', isMe: false },
];

const MESSAGES_DATA = [
    { id: '1', username: 'coding_w_ryan', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=60', message: 'Liked a message', time: '3h', active: false, hasStory: true },
    { id: '2', username: 'nature_snaps', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60', message: 'Sent 3h ago', time: '', active: false, hasStory: false },
    { id: '3', username: 'design_guru', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60', message: 'Sent 3h ago', time: '', active: false, hasStory: true },
    { id: '4', username: 'fitness_freak', avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&auto=format&fit=crop&q=60', message: 'Seen by you', time: '', active: false, hasStory: false },
    { id: '5', username: 'tech_ninja', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60', message: 'Active 3h ago', time: '', active: true, hasStory: true },
    { id: '6', username: 'coffee_addict', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=60', message: 'Reacted 😂 to your message', time: '5h', active: false, hasStory: false },
    { id: '7', username: 'john_doe', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop&q=60', message: 'See you tomorrow!', time: '1d', active: false, hasStory: true },
    { id: '8', username: 'jane_smith', avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&auto=format&fit=crop&q=60', message: 'Shared a reel', time: '2d', active: false, hasStory: false },
];

export default function MessageScreen() {
    const theme = useAppTheme();
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'Primary' | 'Requests'>('Primary');

    const renderNoteItem = ({ item }: { item: typeof NOTES_DATA[0] }) => (
        <View style={styles.noteItem}>
            {/* Bubble */}
            <View style={[styles.noteBubble, { backgroundColor: theme.color.backgroundElevated }]}>
                <Text style={[styles.noteText, { color: theme.color.text }]} numberOfLines={2}>
                    {item.note}
                </Text>
                {/* Little Tail for bubble */}
                <View style={[styles.bubbleTail, { backgroundColor: theme.color.backgroundElevated }]} />
            </View>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <Avatar.Image size={70} source={{ uri: item.avatar }} />
                {item.isMe ? (
                    <View style={[styles.plusIcon, { backgroundColor: theme.color.background }]}>
                        <Ionicons name="add-circle" size={24} color={theme.color.text} />
                    </View>
                ) : null}
            </View>

            {/* Username */}
            <Text style={[styles.noteUsername, { color: theme.color.text }]} numberOfLines={1}>
                {item.username}
            </Text>
        </View>
    );

    const renderMessageItem = ({ item }: { item: typeof MESSAGES_DATA[0] }) => (
        <TouchableOpacity style={styles.messageItem} activeOpacity={0.7}>
            <View style={styles.messageAvatarContainer}>
                <StoryItem
                    avatar={item.avatar}
                    username={item.username}
                    isStory={item.hasStory}
                    size={64}
                    showUsername={false}
                />
                {item.active && (
                    <View style={[styles.activeIndicator, { borderColor: theme.color.background }]} />
                )}
            </View>
            <View style={styles.messageContent}>
                <Text style={[styles.messageUsername, { color: theme.color.text }]} numberOfLines={1}>
                    {item.username}
                </Text>
                <View style={styles.messageRow}>
                    <Text
                        style={[
                            styles.messageText,
                            {
                                color: item.message.includes('Sent') || item.message.includes('Active')
                                    ? theme.color.textSecondary
                                    : theme.color.text, // Bold/Bright if "Liked" or Unread logic (simulated)
                                fontWeight: item.message.includes('Sent') ? '400' : '600'
                            }
                        ]}
                        numberOfLines={1}
                    >
                        {item.message}
                    </Text>
                    {item.time ? (
                        <Text style={[styles.messageTime, { color: theme.color.textSecondary }]}> · {item.time}</Text>
                    ) : null}
                </View>
            </View>
            <TouchableOpacity>
                <Ionicons name="camera-outline" size={26} color={theme.color.text} style={{ opacity: 0.6 }} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background, paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={[styles.headerTitle, { color: theme.color.text }]}>ermapsh</Text>
                    <Ionicons name="chevron-down" size={16} color={theme.color.text} style={styles.chevron} />
                </View>
                <TouchableOpacity>
                    <Ionicons name="create-outline" size={28} color={theme.color.text} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={[styles.searchContainer, { backgroundColor: theme.color.backgroundElevated }]}>
                    <Ionicons name="search" size={20} color={theme.color.textSecondary} />
                    <TextInput
                        placeholder="Search or ask Meta AI"
                        placeholderTextColor={theme.color.textSecondary}
                        style={[styles.searchInput, { color: theme.color.text }]}
                    />
                </View>

                {/* Notes Section */}
                <View style={styles.notesContainer}>
                    <FlatList
                        horizontal
                        data={NOTES_DATA}
                        renderItem={renderNoteItem}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.notesList}
                    />
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity onPress={() => setActiveTab('Primary')} style={styles.tabButton}>
                        <Text style={[styles.tabText, { color: activeTab === 'Primary' ? theme.color.text : theme.color.textSecondary }]}>
                            Messages
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setActiveTab('Requests')} style={styles.tabButton}>
                        <Text style={[styles.tabText, { color: activeTab === 'Requests' ? theme.color.text : theme.color.textSecondary }]}>
                            Requests
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Messages List */}
                {/* <View style={styles.messagesList}>
                    {MESSAGES_DATA.map(item => (
                        <React.Fragment key={item.id}>
                            {renderMessageItem({ item })}
                        </React.Fragment>
                    ))}
                </View> */}
                <FlatList
                    data={MESSAGES_DATA}
                    renderItem={renderMessageItem}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    chevron: {
        marginTop: 4,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12, // Rounded corners
        marginBottom: 20,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    notesContainer: {
        marginBottom: 24,
    },
    notesList: {
        paddingHorizontal: 12,
        gap: 16,
    },
    noteItem: {
        alignItems: 'center',
        width: 80,
    },
    noteBubble: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 6,
        minWidth: 70,
        alignItems: 'center',
        position: 'relative',
        height: 50,
        justifyContent: 'center',
    },
    noteText: {
        fontSize: 11,
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 14,
    },
    bubbleTail: {
        position: 'absolute',
        bottom: -4,
        left: 20, // Align with avatar somewhat
        width: 8,
        height: 8,
        transform: [{ rotate: '45deg' }],
        zIndex: -1,
    },
    avatarContainer: {
        position: 'relative',
    },
    plusIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 12,
    },
    noteUsername: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    tabButton: {
        marginRight: 20,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
    },
    messagesList: {
        paddingHorizontal: 16,
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
        paddingRight: 16,
    },
    messageAvatarContainer: {
        position: 'relative',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4ade80', // Green
        borderWidth: 2,
    },
    messageContent: {
        flex: 1,
        gap: 2,
    },
    messageUsername: {
        fontSize: 14,
        fontWeight: '400',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageText: {
        fontSize: 14,
        flex: 1,
    },
    messageTime: {
        fontSize: 14,
    },
});