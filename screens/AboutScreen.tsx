import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Headers from '../components/HomeScreen/Header';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Headers />
      <Text style={styles.title}>حول التطبيق</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons name="book-outline" size={26} color="#6b4c3b" style={styles.icon} />
          <Text style={styles.description}>
            هذا التطبيق يقدم تجربة قراءة واستماع للقرآن الكريم، مع إمكانية الوصول إلى مفاتيح الجنان والمزيد من الميزات الإسلامية الروحية.
            {'\n\n'}
            الإصدار: <Text style={styles.bold}>1.0.0</Text>
            {'\n'}
            المطور: <Text style={styles.bold}>محمود الترابي</Text>
          </Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b4c3b',
    textAlign: 'center',
    marginVertical: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoCard: {
    backgroundColor: '#ffffffdd',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    color: '#6b4c3b',
  },
});
