import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors, fonts } from '../theme';
import { categories, coffees } from '../data/coffees';
import { RootStackParamList, TabParamList } from '../navigation/types';
import CoffeeCard from '../components/CoffeeCard';
import CategoryChips from '../components/CategoryChips';
import PromoBanner from '../components/PromoBanner';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const H_PADDING = 24;
const GAP = 16;

export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = (width - H_PADDING * 2 - GAP) / 2;

  const [category, setCategory] = useState(categories[0]);
  const [query, setQuery] = useState('');

  const data = useMemo(
    () =>
      coffees.filter(
        (c) =>
          (category === 'All Coffee' || c.category === category) &&
          c.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );

  const header = (
    <View>
      <LinearGradient
        colors={[colors.darker, colors.dark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerBg, { height: insets.top + 240 }]}
      />

      <View style={{ paddingTop: insets.top + 24, paddingHorizontal: H_PADDING }}>
        <Text style={styles.locationLabel}>Location</Text>
        <View style={styles.locationRow}>
          <Text style={styles.location}>Bilzen, Tanjungbalai</Text>
          <Ionicons name="chevron-down" size={16} color="#DDDDDD" />
        </View>

        <View style={styles.searchRow}>
          <View style={styles.search}>
            <Ionicons name="search-outline" size={20} color={colors.white} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search coffee"
              placeholderTextColor={colors.grey}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filter} activeOpacity={0.85}>
            <Ionicons name="options-outline" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      <PromoBanner />

      <View style={{ marginTop: 24, marginBottom: 16 }}>
        <CategoryChips items={categories} selected={category} onSelect={setCategory} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={header}
        ListEmptyComponent={<Text style={styles.empty}>No coffee found</Text>}
        columnWrapperStyle={{ paddingHorizontal: H_PADDING, gap: GAP, marginBottom: GAP }}
        contentContainerStyle={{ paddingBottom: 110 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CoffeeCard
            coffee={item}
            width={cardWidth}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
            onAdd={() => navigation.navigate('Order', { id: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  headerBg: { position: 'absolute', top: 0, left: 0, right: 0 },
  locationLabel: { fontFamily: fonts.regular, fontSize: 12, color: colors.grey },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  location: { fontFamily: fonts.semibold, fontSize: 14, color: '#DDDDDD' },
  searchRow: { flexDirection: 'row', gap: 16, marginTop: 24, marginBottom: 24 },
  search: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInput: { flex: 1, fontFamily: fonts.regular, fontSize: 14, color: colors.white },
  filter: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.grey,
  },
});
