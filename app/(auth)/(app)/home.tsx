import { PostItem } from '@/components/home/PostItem';
import { StoryItem } from '@/components/home/StoryItem';
import { BadgedIcon } from '@/components/ui/badged-icon';
import { useAppTheme } from '@/hooks/useTheme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STORIES = [
    { id: 'me', username: 'Your story', avatar: 'https://i.pravatar.cc/150?u=me', isMe: true, isStory: false },
    { id: '1', username: 'aman_kamte_12', avatar: 'https://i.pravatar.cc/150?u=1', isStory: true },
    { id: '2', username: 'gawde_chandu...', avatar: 'https://i.pravatar.cc/150?u=2', isStory: true },
    { id: '3', username: 'apkarasgulla', avatar: 'https://i.pravatar.cc/150?u=3', isStory: true },
    { id: '4', username: 'troll_mumbai', avatar: 'https://i.pravatar.cc/150?u=4', isStory: true },
    { id: '5', username: 'other_user', avatar: 'https://i.pravatar.cc/150?u=5', isStory: true },
];

const POSTS = [
    {
        id: '1',
        username: 'mumbaiculture.in',
        avatar: 'https://i.pravatar.cc/150?u=mumbai', // Placeholder
        imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=2835&auto=format&fit=crop', // Placeholder for Mumbai street/high court
        caption: 'Bombay High Court Seeks Details Of Hate Speech And Threats By MNS And Raj Thackeray',
        likes: 1243,
        timestamp: '15 hours ago',
        location: 'Mumbai, Maharashtra'
    },
    {
        id: '2',
        username: 'theaxedrop',
        avatar: 'https://i.pravatar.cc/150?u=tax',
        imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2787&auto=format&fit=crop',
        caption: 'Walking through the streets of Monaco 🇮🇩✨',
        likes: 859,
        timestamp: '2 hours ago',
    }
];

export default function HomeScreen() {
    const theme = useAppTheme();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const RenderStories = () => (
        <View style={styles.storiesContainer}>
            <FlatList
                horizontal
                data={STORIES}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storiesContent}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <StoryItem
                        avatar={item.avatar}
                        username={item.username}
                        isMe={item.isMe}
                        isStory={item.isStory}
                    />
                )}
            />
        </View>
    );

    const toFavourite = useCallback(() => {
        router.navigate('/(auth)/(screen)/notification')
    }, [router])

    const Header = useCallback(() => {
        return (
            <View className="h-[50px] flex-row items-center px-4">

                {/* Left */}
                <View className="flex-1">
                    <Icon
                        source={require("@/assets/icons/plus.png")}
                        size={26}
                        color={theme.color.text}
                    />
                </View>

                {/* Center */}
                <View className="flex-1 items-center">
                    <Image
                        source={require('@/assets/images/logoname.png')}
                        style={{
                            width: 170,
                            height: 40,
                            tintColor: theme.color.text,
                        }}
                        contentFit="contain"
                    />
                </View>

                {/* Right */}
                <View className="flex-1 items-end">
                    <TouchableOpacity onPress={toFavourite}>
                        <BadgedIcon
                            size={26}
                            color={theme.color.text}
                            source={require('@/assets/icons/heart-outline.png')}
                            hasBadge
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }, [theme.color.text, toFavourite])

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background, paddingTop: insets.top }]}>
            <Header />
            <FlatList
                ListHeaderComponent={RenderStories}
                data={POSTS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PostItem
                        avatar={item.avatar}
                        username={item.username}
                        imageUrl={item.imageUrl}
                        caption={item.caption}
                        likes={item.likes}
                        timestamp={item.timestamp}
                        location={item.location}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }} // Space for tab bar
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 8,
        height: 50,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'System', // Or specific Instagram font if available. 'System' works well on iOS.
    },
    topBarIcons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    iconButton: {
        marginLeft: 20,
    },
    storiesContainer: {
        marginBottom: 8,
    },
    storiesContent: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    separator: {
        height: 0.5,
        width: '100%',
        marginTop: 4,
    }
});