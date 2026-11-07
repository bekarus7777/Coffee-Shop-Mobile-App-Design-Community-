import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme';
import { TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Tab = createBottomTabNavigator<TabParamList>();

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const icons: Record<keyof TabParamList, string> = {
  Home: 'home',
  Favorites: 'heart',
  Cart: 'bag-handle',
  Notifications: 'notifications',
};

function TabIcon({ route, focused }: { route: keyof TabParamList; focused: boolean }) {
  const base = icons[route];
  const name = (focused ? base : `${base}-outline`) as IconName;
  return (
    <View style={styles.iconWrap}>
      <Ionicons name={name} size={26} color={focused ? colors.primary : colors.grey} />
      <View style={[styles.dot, focused && styles.dotActive]} />
    </View>
  );
}

const Favorites = () => <PlaceholderScreen title="Favorites" />;
const Cart = () => <PlaceholderScreen title="Cart" />;
const Notifications = () => <PlaceholderScreen title="Notifications" />;

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          height: 64 + insets.bottom,
          paddingTop: 14,
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          elevation: 12,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
        },
        tabBarIcon: ({ focused }) => <TabIcon route={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrap: { alignItems: 'center', width: 40 },
  dot: { width: 10, height: 4, borderRadius: 2, marginTop: 4, backgroundColor: 'transparent' },
  dotActive: { backgroundColor: colors.primary },
});
