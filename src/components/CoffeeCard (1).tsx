import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Coffee } from '../data/coffees';
import { colors, fonts, formatPrice } from '../theme';

type Props = {
  coffee: Coffee;
  width: number;
  onPress: () => void;
  onAdd: () => void;
};

export default function CoffeeCard({ coffee, width, onPress, onAdd }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, { width }]}>
      <View style={styles.imageWrap}>
        <Image source={coffee.image} style={styles.image} />
        <View style={styles.rating}>
          <Ionicons name="star" size={12} color={colors.star} />
          <Text style={styles.ratingText}>{coffee.rating}</Text>
        </View>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {coffee.name}
      </Text>
      <Text style={styles.type}>{coffee.type}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(coffee.price)}</Text>
        <TouchableOpacity style={styles.add} onPress={onAdd} activeOpacity={0.8}>
          <Ionicons name="add" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 8,
    paddingBottom: 12,
  },
  imageWrap: { height: 128, borderRadius: 14, overflow: 'hidden', marginBottom: 12 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  rating: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 56,
    borderBottomLeftRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  ratingText: { fontFamily: fonts.semibold, fontSize: 10, color: colors.white },
  name: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text, paddingHorizontal: 4 },
  type: { fontFamily: fonts.regular, fontSize: 12, color: colors.grey, marginTop: 4, paddingHorizontal: 4 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 4,
  },
  price: { fontFamily: fonts.semibold, fontSize: 18, color: colors.text },
  add: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
