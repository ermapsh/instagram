import { ReelItem } from '@/components/reels/ReelItem';
import { useAppTheme } from '@/hooks/useTheme';
import React, { useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, View, ViewToken } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Sample reels data
const REELS_DATA = [
    {
        id: '1',
        username: 'explainer_.zone',
        avatar: 'https://i.pravatar.cc/150?u=explainer',
        videoUrl: 'https://images.unsplash.com/photo-1682695796497-31a44224d6d6?q=80&w=2070&auto=format&fit=crop',
        caption: 'My heart was not ready for this 🥺',
        likes: 125000,
        comments: 380,
        shares: 3387,
        isFollowing: false,
    },
    {
        id: '2',
        username: 'nature_clips',
        avatar: 'https://i.pravatar.cc/150?u=nature',
        videoUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
        caption: 'Stunning mountain views 🏔️✨',
        likes: 89000,
        comments: 245,
        shares: 1892,
        isFollowing: false,
    },
    {
        id: '3',
        username: 'travel_diaries',
        avatar: 'https://i.pravatar.cc/150?u=travel',
        videoUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop',
        caption: 'Paradise found 🌴🌊',
        likes: 203000,
        comments: 612,
        shares: 5234,
        isFollowing: true,
    },
];

export default function ReelScreen() {
    const theme = useAppTheme();
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    });

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        // Handle video play/pause based on viewable items
        // In production, you'd manage video playback here
        console.log('Viewable items:', viewableItems);
    });

    const getItemLayout = (_: any, index: number) => ({
        length: SCREEN_HEIGHT,
        offset: SCREEN_HEIGHT * index,
        index,
    });

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background }]}>
            <FlatList
                data={REELS_DATA}
                renderItem={({ item }) => <ReelItem {...item} />}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={SCREEN_HEIGHT}
                snapToAlignment="start"
                decelerationRate="fast"
                viewabilityConfig={viewabilityConfig.current}
                onViewableItemsChanged={onViewableItemsChanged.current}
                getItemLayout={getItemLayout}
                removeClippedSubviews
                maxToRenderPerBatch={3}
                windowSize={5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});