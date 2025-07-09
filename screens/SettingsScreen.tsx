import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Headers from '../components/HomeScreen/Header';
const Ionicons = require('react-native-vector-icons/Ionicons');
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Headers />
      <Text style={styles.title}>الإعدادات</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="language-outline" size={22} color="#6b4c3b" />
          <Text style={styles.settingText}>اللغة</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="moon-outline" size={22} color="#6b4c3b" />
          <Text style={styles.settingText}>الوضع الليلي</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="information-circle-outline" size={22} color="#6b4c3b" />
          <Text style={styles.settingText}>حول التطبيق</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcfb',
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b4c3b',
    textAlign: 'center',
    marginVertical: 16,
  },
  content: {
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffdd',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  settingText: {
    fontSize: 16,
    marginStart: 12,
    color: '#333',
  },
});
