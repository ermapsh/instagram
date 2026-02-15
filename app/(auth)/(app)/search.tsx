import { useAppTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { Dimensions, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;

// Mock Data for Explore Grid
const EXPLORE_DATA = [
    { id: '1', type: 'reel', uri: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=400&q=80' },
    { id: '2', type: 'video', uri: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80' },
    { id: '3', type: 'image', uri: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80' },
    { id: '4', type: 'image', uri: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&q=80' },
    { id: '5', type: 'reel', uri: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=400&q=80' },
    { id: '6', type: 'carousel', uri: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80' },
    { id: '7', type: 'video', uri: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&q=80' },
    { id: '8', type: 'reel', uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80' },
    { id: '9', type: 'image', uri: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&q=80' },
    { id: '10', type: 'reel', uri: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80' },
    { id: '11', type: 'carousel', uri: 'https://images.unsplash.com/photo-1495360019602-e0019222cfc2?w=400&q=80' },
    { id: '12', type: 'image', uri: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80' },
    { id: '13', type: 'reel', uri: 'https://images.unsplash.com/photo-1506755855567-92ff770e8d00?w=400&q=80' },
    { id: '14', type: 'video', uri: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80' },
    { id: '15', type: 'carousel', uri: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80' },
    { id: '16', type: 'image', uri: 'https://images.unsplash.com/photo-1571757767119-6834d4d59afc?w=400&q=80' },
    { id: '17', type: 'reel', uri: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&q=80' },
    { id: '18', type: 'video', uri: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?w=400&q=80' },
    { id: '19', type: 'image', uri: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&q=80' },
    { id: '20', type: 'reel', uri: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&q=80' },
    { id: '21', type: 'carousel', uri: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=400&q=80' },
];

export default function SearchScreen() {
    const theme = useAppTheme();
    const insets = useSafeAreaInsets();

    const renderItem = useCallback(({ item }: { item: typeof EXPLORE_DATA[0] }) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.gridItem}>
            <Image
                source={{ uri: item.uri }}
                style={styles.image}
                contentFit="cover"
                transition={200}
            />
            {/* Type Icon Overlay */}
            {item.type !== 'image' && (
                <View style={styles.iconOverlay}>
                    <Ionicons
                        name={
                            item.type === 'reel' ? 'play-outline' :
                                item.type === 'video' ? 'videocam-outline' :
                                    item.type === 'carousel' ? 'layers-outline' : 'image-outline'
                        }
                        size={16}
                        color="#fff"
                    />
                </View>
            )}
        </TouchableOpacity>
    ), []);

    return (
        <View style={[styles.container, { backgroundColor: theme.color.background, paddingTop: insets.top }]}>
            {/* Search Bar Header */}
            <View style={styles.headerContainer}>
                <View style={[styles.searchBar, { backgroundColor: theme.color.backgroundElevated }]}>
                    <Ionicons name="search" size={20} color={theme.color.textSecondary} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search or ask Meta AI"
                        placeholderTextColor={theme.color.textSecondary}
                        style={[styles.searchInput, { color: theme.color.text }]}
                    />
                </View>
            </View>

            {/* Content Grid */}
            <FlatList
                data={EXPLORE_DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.gridContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
    },
    gridContent: {
        paddingBottom: 80,
    },
    gridItem: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 1.25, // Aspect ratio roughly 4:5 like Instagram Explore vertical tiles
        borderWidth: 0.5, // Thin border/gap simulation
        borderColor: 'transparent', // Or actual gap using FlatList container style maybe better?
        // Instagram uses 1px gap usually.
        padding: 0.5, // Using padding to create the thin gap lines
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#262626', // Placeholder color
    },
    iconOverlay: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'transparent',
    }
});