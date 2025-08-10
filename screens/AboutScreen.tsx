import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Headers from '../components/HomeScreen/Header';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppText from '../components/AppText';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Headers />
      <AppText size={24} color='#6b4c3b' paddindTop={20} marginBottom={20} align='center'>حول التطبيق</AppText>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons name="book-outline" size={26} color="#6b4c3b" style={styles.icon} />
          <AppText align='center' size={16} color='#444'>
            هذا التطبيق يقدم تجربة قراءة واستماع للقرآن الكريم، مع إمكانية الوصول إلى مفاتيح الجنان والمزيد من الميزات الإسلامية الروحية.
            {'\n\n'}
            الإصدار: <AppText color='#6b4c3b' font='boldFont'>1.0.0</AppText>
            {'\n'}
            المطور: <AppText color='#6b4c3b' font='boldFont'>محمود الترابي</AppText>
          </AppText>
        </View>
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
    paddingBottom: 20,
  },
  infoCard: {
  backgroundColor: '#fff', // use solid white for clean rendering
  padding: 20,
  borderRadius: 16,

  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,

  // Android shadow
  elevation: 6,

  // layout
  flexDirection: 'column', // optional: default is 'column'
  alignItems: 'center',
},

  icon: {
    marginBottom: 12,
  },
});
