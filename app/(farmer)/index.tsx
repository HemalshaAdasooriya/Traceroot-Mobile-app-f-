import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FarmerDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Farmer Dashboard</Text>
      <Text style={styles.subtitle}>Welcome to TraceRoot</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5F0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#114B25',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#2C5E3D',
  },
});
