import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, formatPrice } from '../theme';
import { getCoffee } from '../data/coffees';
import { RootStackParamList } from '../navigation/types';
import ScreenHeader from '../components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Order'>;

const OLD_DELIVERY_FEE = 2.0;
const DELIVERY_FEE = 1.0;

export default function OrderScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const coffee = getCoffee(route.params.id);

  const [mode, setMode] = useState<'Deliver' | 'Pick Up'>('Deliver');
  const [qty, setQty] = useState(1);

  const isDeliver = mode === 'Deliver';
  const subtotal = coffee.price * qty;
  const total = subtotal + (isDeliver ? DELIVERY_FEE : 0);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Order" onBack={navigation.goBack} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 220 + insets.bottom }}
      >
        <View style={styles.segment}>
          {(['Deliver', 'Pick Up'] as const).map((m) => {
            const active = m === mode;
            return (
              <TouchableOpacity
                key={m}
                activeOpacity={0.85}
                onPress={() => setMode(m)}
                style={[styles.segmentItem, active && styles.segmentActive]}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{m}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.pad}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.addressName}>Jl. Kpg Sutoyo</Text>
          <Text style={styles.addressText}>Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.</Text>

          <View style={styles.pills}>
            <TouchableOpacity style={styles.pill} activeOpacity={0.8}>
              <Ionicons name="create-outline" size={16} color={colors.text} />
              <Text style={styles.pillText}>Edit Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill} activeOpacity={0.8}>
              <Ionicons name="document-text-outline" size={16} color={colors.text} />
              <Text style={styles.pillText}>Add Note</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={[styles.pad, styles.itemRow]}>
          <Image source={coffee.image} style={styles.itemImage} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.itemName}>{coffee.name}</Text>
            <Text style={styles.itemType}>{coffee.type}</Text>
          </View>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => setQty((q) => Math.max(1, q - 1))}
              hitSlop={8}
            >
              <Ionicons name="remove" size={16} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity style={styles.stepBtn} onPress={() => setQty((q) => q + 1)} hitSlop={8}>
              <Ionicons name="add" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.discountStrip} />

        <TouchableOpacity activeOpacity={0.85} style={[styles.discount, styles.pad]}>
          <Ionicons name="pricetag-outline" size={22} color={colors.primary} />
          <Text style={styles.discountText}>1 Discount is Applies</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.pad}>
          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Payment Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {isDeliver ? (
                <>
                  <Text style={styles.strike}>{formatPrice(OLD_DELIVERY_FEE, 1)}</Text>
                  <Text style={styles.summaryValue}>{formatPrice(DELIVERY_FEE, 1)}</Text>
                </>
              ) : (
                <Text style={styles.summaryValue}>{formatPrice(0, 1)}</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.paymentRow}>
          <Ionicons name="wallet-outline" size={26} color={colors.primary} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.paymentTitle}>Cash/Wallet</Text>
            <Text style={styles.paymentTotal}>{formatPrice(total)}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={colors.text} />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.orderBtn}
          onPress={() => navigation.navigate('Delivery')}
        >
          <Text style={styles.orderText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  pad: { paddingHorizontal: 24 },
  segment: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 24,
    padding: 4,
    borderRadius: 12,
    backgroundColor: colors.chip,
  },
  segmentItem: { flex: 1, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  segmentActive: { backgroundColor: colors.primary },
  segmentText: { fontFamily: fonts.regular, fontSize: 16, color: colors.text },
  segmentTextActive: { fontFamily: fonts.semibold, color: colors.white },
  sectionTitle: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text, marginBottom: 16 },
  addressName: { fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
  addressText: { fontFamily: fonts.regular, fontSize: 12, color: colors.grey, marginTop: 8 },
  pills: { flexDirection: 'row', gap: 12, marginTop: 16 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },
  pillText: { fontFamily: fonts.regular, fontSize: 12, color: colors.text },
  divider: { height: 1, backgroundColor: colors.greyLight, marginVertical: 16, marginHorizontal: 40 },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  itemImage: { width: 54, height: 54, borderRadius: 14 },
  itemName: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text },
  itemType: { fontFamily: fonts.regular, fontSize: 12, color: colors.grey, marginTop: 4 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.greyLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { fontFamily: fonts.semibold, fontSize: 14, color: colors.text, minWidth: 12, textAlign: 'center' },
  discountStrip: { height: 4, backgroundColor: '#FCF0E8', marginTop: 20, marginBottom: 20 },
  discount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
    backgroundColor: colors.white,
  },
  discountText: { flex: 1, fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  summaryValue: { fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
  strike: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
    textDecorationLine: 'line-through',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  paymentRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  paymentTitle: { fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
  paymentTotal: { fontFamily: fonts.semibold, fontSize: 14, color: colors.primary, marginTop: 4 },
  orderBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: { fontFamily: fonts.semibold, fontSize: 16, color: colors.white },
});
