import { useAppTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'expo-image';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;

// Mock Data
const PROFILE_DATA = {
    username: 'ermapsh',
    name: 'Mahesh Mestri he',
    bio: '🇮🇳 भारतीय 🕉️',
    link: 'music.youtube.com/playlist?list=PLmfea...',
    music: "Human · Rag'n'Bone Man",
    postsCount: 9,
    followersCount: 213,
    followingCount: 218,
    avatar: 'https://avatars.githubusercontent.com/u/72149385?v=4',
    note: 'Flowers or chocolate?',
};

const HIGHLIGHTS_DATA = [
    { id: '1', title: 'New', img: null, isAdd: true }, // Placeholder for 'New'
    { id: '2', title: '☕ & 🧍', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&q=80' },
    { id: '3', title: 'Mumbai 🫶', img: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=200&q=80' },
    { id: '4', title: '🇮🇳', img: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=200&q=80' },
    { id: '5', title: 'Goa 🏖️', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&q=80' },
];

const POSTS_DATA = [
    { id: '1', type: 'image', uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80', multiple: true },
    { id: '2', type: 'image', uri: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&q=80', multiple: true },
    { id: '3', type: 'image', uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80', multiple: true },
    { id: '4', type: 'image', uri: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80' },
    { id: '5', type: 'image', uri: 'https://images.unsplash.com/photo-1501854140884-074cf2b24d52?w=400&q=80', multiple: true },
    { id: '6', type: 'image', uri: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80', multiple: true },
    { id: '7', type: 'image', uri: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80' },
    { id: '8', type: 'image', uri: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?w=400&q=80', multiple: true },
    { id: '9', type: 'image', uri: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80' },
];

const Tab = createMaterialTopTabNavigator();

const renderPostItem = ({ item }: { item: typeof POSTS_DATA[0] }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.postItem}>
        <Image source={{ uri: item.uri }} style={styles.postImage} contentFit="cover" transition={200} />
        {item.multiple && (
            <Ionicons name="layers" size={16} color="white" style={styles.multipleIcon} />
        )}
    </TouchableOpacity>
);

const EmptyComponent = () => {
    const theme = useAppTheme();
    return (
        <View style={{ flex: 1, padding: 40, alignItems: 'center', backgroundColor: theme.color.background }}>
            <Text style={{ color: theme.color.textSecondary, fontSize: 16 }}>No posts yet</Text>
        </View>
    );
};

// Tab Screens
function GridTab() {
    const theme = useAppTheme();
    return (
        <FlatList
            data={POSTS_DATA}
            renderItem={renderPostItem}
            keyExtractor={item => item.id}
            numColumns={3}
            ListEmptyComponent={EmptyComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ backgroundColor: theme.color.background, flexGrow: 1 }}
            style={{ backgroundColor: theme.color.background }}
        />
    )
}

function ReelTab() {
    const theme = useAppTheme();
    return (
        <FlatList
            data={POSTS_DATA.slice(0, 5)}
            renderItem={renderPostItem}
            keyExtractor={item => item.id}
            numColumns={3}
            ListEmptyComponent={EmptyComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ backgroundColor: theme.color.background, flexGrow: 1 }}
            style={{ backgroundColor: theme.color.background }}
        />
    )
}

function RepostTab() {
    // const theme = useAppTheme();
    return <EmptyComponent />;
}

function TagTab() {
    const theme = useAppTheme();
    return (
        <FlatList
            data={POSTS_DATA.slice(2, 6)}
            renderItem={renderPostItem}
            keyExtractor={item => item.id}
            numColumns={3}
            ListEmptyComponent={EmptyComponent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ backgroundColor: theme.color.background, flexGrow: 1 }}
            style={{ backgroundColor: theme.color.background }}
        />
    )
}

export default function ProfileScreen() {
    const theme = useAppTheme();
    const insets = useSafeAreaInsets();

    const highlightData = useMemo(() => HIGHLIGHTS_DATA, []);

    const renderHighlight = useCallback(({ item }: { item: typeof HIGHLIGHTS_DATA[0] }) => (
        <View style={styles.highlightItem}>
            <View style={[styles.highlightCircleOuter, { borderColor: theme.color.border }]}>
                <View style={[styles.highlightCircleInner, { backgroundColor: theme.color.background }]}>
                    {item.isAdd ? (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="add" size={24} color={theme.color.text} />
                        </View>
                    ) : (
                        <Image source={item.img ? { uri: item.img } : undefined} style={styles.highlightImage} />
                    )}
                </View>
            </View>
            <Text style={[styles.highlightTitle, { color: theme.color.text }]} numberOfLines={1}>
                {item.title}
            </Text>
        </View>
    ), [theme]);

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background, paddingTop: insets.top }]}>
            {/* Top Navigation Bar */}
            <View style={styles.navBar}>
                <View style={styles.navLeft}>
                    <Ionicons name="add-outline" size={30} color={theme.color.text} />
                </View>
                <View style={styles.navCenter}>
                    {/* Lock Icon */}
                    <Ionicons name="lock-closed-outline" size={14} color={theme.color.text} style={{ marginRight: 4 }} />
                    <Text style={[styles.navUsername, { color: theme.color.text }]}>{PROFILE_DATA.username}</Text>
                    {/* Chevron & Dot */}
                    <View style={styles.chevronContainer}>
                        <Ionicons name="chevron-down" size={14} color={theme.color.text} />
                        <View style={styles.redDot} />
                    </View>
                </View>
                <View style={styles.navRight}>
                    <TouchableOpacity style={styles.threadsIconContainer}>
                        <Ionicons name="at-outline" size={26} color={theme.color.text} />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>9+</Text>
                        </View>
                    </TouchableOpacity>
                    <Ionicons name="menu-outline" size={32} color={theme.color.text} />
                </View>
            </View>

            <View style={styles.headerContent}>
                {/* Top Stat Row */}
                <View style={styles.topRow}>
                    {/* Avatar with Note */}
                    <View style={styles.avatarSection}>
                        <View style={[styles.noteBubble, { backgroundColor: theme.color.backgroundElevated }]}>
                            <Text style={[styles.noteText, { color: theme.color.text }]}>{PROFILE_DATA.note}</Text>
                            <View style={[styles.bubbleTail, { backgroundColor: theme.color.backgroundElevated }]} />
                        </View>
                        <View style={styles.storyRing}>
                            <Image source={{ uri: PROFILE_DATA.avatar }} style={styles.avatarImage} />
                            <View style={[styles.plusBadge, { backgroundColor: theme.color.background }]}>
                                <Ionicons name="add-circle" size={24} color={theme.color.text} />
                            </View>
                        </View>
                    </View>

                    {/* Stats */}
                    <View style={styles.statsSection}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, { color: theme.color.text }]}>{PROFILE_DATA.postsCount}</Text>
                            <Text style={[styles.statLabel, { color: theme.color.text }]}>posts</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, { color: theme.color.text }]}>{PROFILE_DATA.followersCount}</Text>
                            <Text style={[styles.statLabel, { color: theme.color.text }]}>followers</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statNumber, { color: theme.color.text }]}>{PROFILE_DATA.followingCount}</Text>
                            <Text style={[styles.statLabel, { color: theme.color.text }]}>following</Text>
                        </View>
                    </View>
                </View>

                {/* Bio Section */}
                <View style={styles.bioSection}>
                    <Text style={[styles.bioName, { color: theme.color.text }]}>{PROFILE_DATA.name}</Text>
                    <Text style={[styles.bioText, { color: theme.color.text }]}>{PROFILE_DATA.bio}</Text>

                    {/* Link */}
                    <View style={styles.linkContainer}>
                        <Ionicons name="link" size={14} color={theme.color.brand} style={{ transform: [{ rotate: '45deg' }] }} />
                        <Text style={[styles.linkText, { color: theme.color.brand }]}>{PROFILE_DATA.link}</Text>
                    </View>

                    {/* Music (if any) */}
                    <View style={styles.musicContainer}>
                        <Ionicons name="play-circle-outline" size={14} color={theme.color.text} />
                        <Text style={[styles.musicText, { color: theme.color.text }]}>{PROFILE_DATA.music}</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsRow}>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.color.backgroundElevated }]}>
                        <Text style={[styles.actionButtonText, { color: theme.color.text }]}>Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.color.backgroundElevated }]}>
                        <Text style={[styles.actionButtonText, { color: theme.color.text }]}>Share profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButtonIcon, { backgroundColor: theme.color.backgroundElevated }]}>
                        <Ionicons name="person-add-outline" size={18} color={theme.color.text} />
                    </TouchableOpacity>
                </View>

                {/* Highlights */}
                <View style={styles.highlightsContainer}>
                    <FlatList
                        horizontal
                        data={highlightData}
                        renderItem={renderHighlight}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    />
                </View>
            </View>

            {/* Material Top Tabs */}
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarIndicatorStyle: { backgroundColor: theme.color.text, height: 1 },
                    tabBarItemStyle: { height: 44 },
                    tabBarStyle: { backgroundColor: theme.color.background, elevation: 0, shadowOpacity: 0 },
                }}
            >
                <Tab.Screen
                    name="Grid"
                    component={GridTab}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? require('@/assets/icons/grid.png') : require('@/assets/icons/grid-outline.png')}
                                style={{ width: 24, height: 24, tintColor: focused ? theme.color.text : theme.color.textSecondary }}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Reel"
                    component={ReelTab}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? require('@/assets/icons/reel.png') : require('@/assets/icons/reel-outline.png')}
                                style={{ width: 24, height: 24, tintColor: focused ? theme.color.text : theme.color.textSecondary }}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Repost"
                    component={RepostTab}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={require('@/assets/icons/repost.png')}
                                style={{ width: 26, height: 26, tintColor: focused ? theme.color.text : theme.color.textSecondary }}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Tag"
                    component={TagTab}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? require('@/assets/icons/tag.png') : require('@/assets/icons/tag-outline.png')}
                                style={{ width: 26, height: 26, tintColor: focused ? theme.color.text : theme.color.textSecondary }}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    navLeft: {
        width: 60,
    },
    navCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navUsername: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 4,
    },
    chevronContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    redDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ff3b30',
        marginLeft: -2,
        marginTop: -2,
    },
    navRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        width: 60,
        justifyContent: 'flex-end',
    },
    threadsIconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -8,
        backgroundColor: '#ff3b30',
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 1,
        minWidth: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    headerContent: {
        paddingTop: 8,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 35,
        justifyContent: 'space-between',
    },
    avatarSection: {
        alignItems: 'center',
        marginRight: 20,
    },
    noteBubble: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        position: 'absolute',
        top: -20,
        zIndex: 10,
        marginBottom: 4,
        minWidth: 60,
    },
    noteText: {
        fontSize: 10,
        textAlign: 'center',
        fontWeight: '500',
    },
    bubbleTail: {
        position: 'absolute',
        bottom: -4,
        left: 20,
        width: 8,
        height: 8,
        transform: [{ rotate: '45deg' }],
        zIndex: -1,
    },
    storyRing: {
        width: 86,
        height: 86,
        borderRadius: 43,
        padding: 3,
        borderWidth: 2,
        borderColor: '#e1306c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#eee',
    },
    plusBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 15,
        padding: 1,
    },
    statsSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '600',
    },
    statLabel: {
        fontSize: 14,
        marginTop: 0,
    },
    bioSection: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    bioName: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    bioText: {
        fontSize: 14,
        marginBottom: 4,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    linkText: {
        fontSize: 14,
        marginLeft: 4,
        fontWeight: '500',
    },
    musicContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    musicText: {
        fontSize: 14,
        marginLeft: 6,
    },
    actionsRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 8,
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 7,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    highlightsContainer: {
        marginBottom: 10,
    },
    highlightItem: {
        alignItems: 'center',
        marginRight: 16,
        width: 66,
    },
    highlightCircleOuter: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: .5,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    highlightCircleInner: {
        width: 58,
        height: 58,
        borderRadius: 29,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    highlightImage: {
        width: '100%',
        height: '100%',
    },
    highlightTitle: {
        fontSize: 12,
        textAlign: 'center',
    },
    postItem: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        padding: 0.5,
    },
    postImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#262626',
    },
    multipleIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
    }
});