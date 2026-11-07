import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Ellipse, Polyline } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts } from '../theme';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Delivery'>;

// Карта (assets/images/map.png) имеет размер 375x812, маршрут рисуется в тех же координатах.
const MAP_W = 375;
const MAP_H = 812;
const ROUTE = '81,237 97,237 97,206 121,206 121,180 240,176 253,167 253,311';
const PIN = { x: 78, y: 223 };
const RIDER = { x: 253, y: 330 };

export default function DeliveryScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Карта, маршрут и маркеры масштабируются от одной ширины экрана, чтобы всегда совпадать.
  const scale = width / MAP_W;
  const mapStyle = { position: 'absolute' as const, top: 0, left: 0, width, height: MAP_H * scale };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/map.png')} style={mapStyle} resizeMode="stretch" />

      <Svg style={mapStyle} viewBox={`0 0 ${MAP_W} ${MAP_H}`}>
        <Polyline
          points={ROUTE}
          fill="none"
          stroke={colors.primary}
          strokeWidth={3.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <Ellipse cx={PIN.x} cy={PIN.y + 4} rx={8} ry={3} fill="rgba(198,124,78,0.25)" />
      </Svg>

      {/* Маркеры (абсолютно позиционируются в тех же координатах, что и карта) */}
      <View style={[styles.pin, { left: PIN.x * scale - 12, top: PIN.y * scale - 24 }]}>
        <Ionicons name="location-sharp" size={24} color={colors.primary} />
      </View>
      <View style={[styles.rider, { left: RIDER.x * scale - 20, top: RIDER.y * scale - 20 }]}>
        <MaterialCommunityIcons name="moped" size={22} color={colors.primary} />
      </View>

      <View style={[styles.topRow, { top: insets.top + 12 }]}>
        <TouchableOpacity style={styles.mapBtn} onPress={navigation.goBack} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapBtn} activeOpacity={0.8}>
          <Ionicons name="locate-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.handle} />

        <Text style={styles.time}>10 minutes left</Text>
        <Text style={styles.deliveryTo}>
          Delivery to <Text style={styles.address}>Jl. Kpg Sutoyo</Text>
        </Text>

        <View style={styles.progress}>
          {[true, true, true, false].map((done, i) => (
            <View key={i} style={[styles.bar, done && styles.barDone]} />
          ))}
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <MaterialCommunityIcons name="moped" size={32} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>Delivered your order</Text>
            <Text style={styles.statusText}>
              We will deliver your goods to you in the shortes possible time.
            </Text>
          </View>
        </View>

        <View style={styles.courier}>
          <Image source={require('../../assets/images/courier.png')} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.courierName}>Brooklyn Simmons</Text>
            <Text style={styles.courierRole}>Personal Courier</Text>
          </View>
          <TouchableOpacity style={styles.call} activeOpacity={0.8}>
            <Ionicons name="call-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F4' },
  pin: { position: 'absolute', width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  rider: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  topRow: {
    position: 'absolute',
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(237,237,237,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.chip,
    marginBottom: 16,
  },
  time: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text, textAlign: 'center' },
  deliveryTo: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
    marginTop: 8,
  },
  address: { fontFamily: fonts.semibold, color: colors.text },
  progress: { flexDirection: 'row', gap: 8, marginTop: 16, marginBottom: 16 },
  bar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.chip },
  barDone: { backgroundColor: colors.green },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyLight,
  },
  statusIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.greyLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusTitle: { fontFamily: fonts.semibold, fontSize: 14, color: colors.text },
  statusText: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, color: colors.grey, marginTop: 4 },
  courier: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  avatar: { width: 56, height: 56, borderRadius: 16 },
  courierName: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text },
  courierRole: { fontFamily: fonts.regular, fontSize: 12, color: colors.grey, marginTop: 4 },
  call: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.greyLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
