import { AppHeader } from '@/components/app-header';
import { SearchInput } from '@/components/ui/search-input';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../hooks/useTheme';

interface Country {
    name: string;
    code: string;
}

const COUNTRIES: Country[] = [
    { name: 'Afghanistan', code: '+93' },
    { name: 'Albania', code: '+355' },
    { name: 'Algeria', code: '+213' },
    { name: 'American Samoa', code: '+1' },
    { name: 'Andorra', code: '+376' },
    { name: 'Angola', code: '+244' },
    { name: 'Anguilla', code: '+1' },
    { name: 'Antigua', code: '+1' },
    { name: 'Argentina', code: '+54' },
    { name: 'Armenia', code: '+374' },
    { name: 'Australia', code: '+61' },
    { name: 'Austria', code: '+43' },
    { name: 'Azerbaijan', code: '+994' },
    { name: 'Bahamas', code: '+1' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Barbados', code: '+1' },
    { name: 'Belarus', code: '+375' },
    { name: 'Belgium', code: '+32' },
    { name: 'Belize', code: '+501' },
    { name: 'Benin', code: '+229' },
    { name: 'Bermuda', code: '+1' },
    { name: 'Bhutan', code: '+975' },
    { name: 'Bolivia', code: '+591' },
    { name: 'Bosnia and Herzegovina', code: '+387' },
    { name: 'Botswana', code: '+267' },
    { name: 'Brazil', code: '+55' },
    { name: 'India', code: '+91' },
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
];

export default function CountrySelectScreen() {
    const theme = useAppTheme();
    const router = useRouter();
    const params = useLocalSearchParams();
    const [searchQuery, setSearchQuery] = useState('');

    // Get currently selected code from params if available
    const currentCode = params.selectedCode as string;

    const filteredCountries = useMemo(() => {
        return COUNTRIES.filter(country =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            country.code.includes(searchQuery)
        ).sort((a, b) => a.name.localeCompare(b.name));
    }, [searchQuery]);

    const handleSelect = useCallback((country: Country) => {
        try {
            router.back();
        } catch (error) {
            console.log(error);
        }
    }, [router]);

    const renderItem = ({ item }: { item: Country }) => {
        const isSelected = item.code === currentCode;
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => handleSelect(item)}
            >
                <View>
                    <Text style={[styles.countryName, { color: theme.color.text }]}>{item.name}</Text>
                    <Text style={[styles.countryCode, { color: theme.color.textSecondary }]}>{item.code}</Text>
                </View>

                <View style={[
                    styles.radioButton,
                    { borderColor: isSelected ? theme.color.brand : theme.color.textSecondary }
                ]}>
                    {isSelected && <View style={[styles.radioButtonInner, { backgroundColor: theme.color.brand }]} />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView
            style={[
                styles.modalContainer,
                { backgroundColor: theme.color.background }]}
        >
            <AppHeader
                title="Select Country"
                showBack
                backIcon='close'
                onPressBack={() => router.back()}
                style={{
                    paddingHorizontal: 14
                }}
            />
            <FlatList
                ListHeaderComponent={
                    <SearchInput
                        placeholder="Search countries..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        containerStyle={styles.searchContainer}
                        autoFocus={false}
                    />
                }
                data={filteredCountries}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                contentContainerStyle={styles.listContent}
                keyboardShouldPersistTaps="handled"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    safeAreaContent: {
        flex: 1,
        paddingTop: 16,
    },
    container: {
        flex: 1,
    },
    header: {
        // unused
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchContainer: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 40,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    countryName: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    countryCode: {
        fontSize: 14,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});
