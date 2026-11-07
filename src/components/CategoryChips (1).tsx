import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, fonts } from '../theme';

type Props = {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
};

export default function CategoryChips({ items, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {items.map((item) => {
        const active = item === selected;
        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            onPress={() => onSelect(item)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 24, gap: 16 },
  chip: {
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: colors.primary },
  text: { fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  textActive: { fontFamily: fonts.semibold, color: colors.white },
});
