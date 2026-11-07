import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme';

export default function PromoBanner() {
  return (
    <View style={styles.banner}>
      <Image source={require('../../assets/images/promo.png')} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Promo</Text>
        </View>
        <Text style={styles.title}>{'Buy one get\none FREE'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 140,
    marginHorizontal: 24,
    borderRadius: 16,
    backgroundColor: colors.promoBg,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    resizeMode: 'cover',
  },
  content: { flex: 1, padding: 12, paddingLeft: 24, justifyContent: 'center', alignItems: 'flex-start' },
  tag: {
    backgroundColor: colors.promoTag,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  tagText: { fontFamily: fonts.semibold, fontSize: 12, color: colors.white },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.white,
    backgroundColor: colors.darker,
  },
});
