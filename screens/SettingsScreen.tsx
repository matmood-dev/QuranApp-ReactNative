import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Headers from '../components/HomeScreen/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '../components/AppText';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Headers />
      <AppText color='#6b4c3b' align='center' size={24} paddindTop={20} marginBottom={20}>الإعدادات</AppText>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="moon-outline" size={22} color="#6b4c3b" />
          <AppText color='#333' size={18} font='lightFont' paddingHorizontal={10}>الوضع الليلي</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="information-circle-outline" size={22} color="#6b4c3b" />
          <AppText color='#333' size={18} font='lightFont' paddingHorizontal={10}>حول التطبيق</AppText>
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
  content: {
    paddingHorizontal: 20,
  },
  settingItem: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff', // use solid color for better shadow rendering on Android
  padding: 16,
  borderRadius: 12,
  marginBottom: 12,

  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Android shadow
  elevation: 5,
},
});
