import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../theme';

export default function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  title: { fontFamily: fonts.semibold, fontSize: 20, color: colors.text },
  subtitle: { fontFamily: fonts.regular, fontSize: 14, color: colors.grey, marginTop: 8 },
});
