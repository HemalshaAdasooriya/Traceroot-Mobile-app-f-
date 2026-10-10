import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../src/lib/theme';

export default function BuyerTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#889C8A',
        tabBarShowLabel: true,
      }}
    >
      {/* 1. Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.labelText, { color }]}>Home</Text>
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />

      {/* 2. Market Tab (mapped to explore) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'storefront' : 'storefront-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabel: ({ color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.labelText, { color }]}>Market</Text>
            </View>
          ),
        }}
      />

      {/* 3. Orders Tab */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'basket' : 'basket-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabel: ({ color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.labelText, { color }]}>Orders</Text>
            </View>
          ),
        }}
      />

      {/* 4. Messages Tab with Badge 1 */}
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarBadge: 1,
          tabBarBadgeStyle: styles.badgeStyle,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'chat' : 'chat-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabel: ({ color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.labelText, { color }]}>Messages</Text>
            </View>
          ),
        }}
      />

      {/* 5. Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              size={24}
              color={color}
            />
          ),
          tabBarLabel: ({ color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.labelText, { color }]}>Profile</Text>
            </View>
          ),
        }}
      />

      {/* Contracts - subflow, hidden from bottom tab bar */}
      <Tabs.Screen
        name="contracts"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1B3220', // Deep Forest Green
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 84 : 68,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  labelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  activeIndicator: {
    width: 14,
    height: 3,
    backgroundColor: '#E68A28', // Warm amber active dash indicator
    borderRadius: 2,
    marginTop: 3,
  },
  badgeStyle: {
    backgroundColor: '#E66926', // Orange notification badge
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    minWidth: 16,
    height: 16,
    lineHeight: 16,
    borderRadius: 8,
  },
});