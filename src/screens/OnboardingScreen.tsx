import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts } from '../theme';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/onboarding.png')} style={styles.image} />
      <LinearGradient
        colors={['rgba(5,5,5,0)', 'rgba(5,5,5,0.85)', colors.black]}
        locations={[0, 0.55, 1]}
        style={styles.gradient}
      />

      <View style={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.title}>Fall in Love with Coffee in Blissful Delight!</Text>
        <Text style={styles.subtitle}>
          Welcome to our cozy coffee corner, where every cup is a delightful for you.
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => navigation.replace('Main')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  image: { position: 'absolute', top: 0, left: 0, right: 0, height: '68%', resizeMode: 'cover' },
  gradient: { position: 'absolute', left: 0, right: 0, top: '38%', bottom: 0 },
  content: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 24 },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 32,
    lineHeight: 48,
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.grey,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontFamily: fonts.semibold, fontSize: 16, color: colors.white },
});
