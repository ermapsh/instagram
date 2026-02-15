import { ReelItem } from '@/components/reels/ReelItem';
import { useAppTheme } from '@/hooks/useTheme';
import { useIsFocused } from '@react-navigation/native';
import React, { useRef } from 'react';
import { Dimensions, FlatList, Platform, StyleSheet, View, ViewToken } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Sample reels data
const REELS_DATA = [
    {
        id: '1',
        username: 'explainer_.zone',
        avatar: 'https://i.pravatar.cc/150?u=explainer',
        videoUrl: require("@/assets/reel/get.mp4"),
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
        videoUrl: require("@/assets/reel/post.mp4"),
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
        videoUrl: 'https://videos.pexels.com/video-files/4114797/4114797-uhd_2560_1440_25fps.mp4',
        caption: 'Paradise found 🌴🌊',
        likes: 203000,
        comments: 612,
        shares: 5234,
        isFollowing: true,
    },
];

export default function ReelScreen() {
    const theme = useAppTheme();
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const [visibleItemIndex, setVisibleItemIndex] = React.useState(0);

    // Calculate tab bar height (52px + bottom inset for iOS, 12px padding for Android)
    const tabBarHeight = 52 + (Platform.OS === 'ios' ? insets.bottom : 12);
    const REEL_HEIGHT = SCREEN_HEIGHT - tabBarHeight;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    });

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0) {
            setVisibleItemIndex(viewableItems[0].index ?? 0);
        }
    });

    const getItemLayout = (_: any, index: number) => ({
        length: REEL_HEIGHT,
        offset: (REEL_HEIGHT + 4) * index,
        index,
    });

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background }]}>
            <FlatList
                data={REELS_DATA}
                renderItem={({ item, index }) => (
                    <ReelItem
                        {...item}
                        height={REEL_HEIGHT}
                        isActive={index === visibleItemIndex}
                        isVisible={index === visibleItemIndex && isFocused}
                    />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                snapToInterval={REEL_HEIGHT + 4}
                snapToAlignment="start"
                decelerationRate="fast"
                viewabilityConfig={viewabilityConfig.current}
                onViewableItemsChanged={onViewableItemsChanged.current}
                getItemLayout={getItemLayout}
                maxToRenderPerBatch={3}
                windowSize={5}
                contentContainerStyle={{ paddingBottom: tabBarHeight }}
                ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
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