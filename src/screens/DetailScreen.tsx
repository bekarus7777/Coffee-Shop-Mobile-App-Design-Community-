import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, formatPrice } from '../theme';
import { getCoffee } from '../data/coffees';
import { RootStackParamList } from '../navigation/types';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const SIZES = ['S', 'M', 'L'] as const;
const PREVIEW_LENGTH = 116;

export default function DetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const coffee = getCoffee(route.params.id);

  const [size, setSize] = useState<(typeof SIZES)[number]>('M');
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Detail"
        onBack={navigation.goBack}
        right={
          <TouchableOpacity onPress={() => setLiked((v) => !v)} hitSlop={12}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={24}
              color={liked ? colors.promoTag : colors.text}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 140 + insets.bottom }}
      >
        <Image source={coffee.image} style={styles.image} />

        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{coffee.name}</Text>
            <Text style={styles.type}>Ice/Hot</Text>
          </View>
          <View style={styles.tiles}>
            <View style={styles.tile}>
              <MaterialCommunityIcons name="moped" size={24} color={colors.primary} />
            </View>
            <View style={styles.tile}>
              <MaterialCommunityIcons name="seed" size={24} color={colors.primary} />
            </View>
            <View style={styles.tile}>
              <MaterialCommunityIcons name="cup-water" size={24} color={colors.primary} />
            </View>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={20} color={colors.star} />
          <Text style={styles.rating}>{coffee.rating}</Text>
          <Text style={styles.reviews}>({coffee.reviews})</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {expanded ? coffee.description : `${coffee.description.slice(0, PREVIEW_LENGTH)}.. `}
          <Text style={styles.readMore} onPress={() => setExpanded((v) => !v)}>
            {expanded ? ' Show Less' : 'Read More'}
          </Text>
        </Text>

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Size</Text>
        <View style={styles.sizes}>
          {SIZES.map((s) => {
            const active = s === size;
            return (
              <TouchableOpacity
                key={s}
                activeOpacity={0.8}
                onPress={() => setSize(s)}
                style={[styles.size, active && styles.sizeActive]}
              >
                <Text style={[styles.sizeText, active && styles.sizeTextActive]}>{s}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 16 }]}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>{formatPrice(coffee.price)}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buy}
          onPress={() => navigation.navigate('Order', { id: coffee.id })}
        >
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  image: { width: '100%', height: 202, borderRadius: 16, resizeMode: 'cover' },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 20 },
  name: { fontFamily: fonts.semibold, fontSize: 20, color: colors.text },
  type: { fontFamily: fonts.regular, fontSize: 12, color: colors.grey, marginTop: 6 },
  tiles: { flexDirection: 'row', gap: 12 },
  tile: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.tile,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  rating: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text },
  reviews: { fontFamily: fonts.regular, fontSize: 12, color: colors.grey },
  divider: { height: 1, backgroundColor: colors.greyLight, marginVertical: 20, marginHorizontal: 16 },
  sectionTitle: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text, marginBottom: 12 },
  description: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 22, color: colors.grey },
  readMore: { fontFamily: fonts.semibold, color: colors.primary },
  sizes: { flexDirection: 'row', gap: 16 },
  size: {
    flex: 1,
    height: 41,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.greyLight,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  sizeText: { fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  sizeTextActive: { color: colors.primary },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  priceLabel: { fontFamily: fonts.regular, fontSize: 14, color: colors.grey },
  price: { fontFamily: fonts.semibold, fontSize: 18, color: colors.primary, marginTop: 4 },
  buy: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: { fontFamily: fonts.semibold, fontSize: 16, color: colors.white },
});
