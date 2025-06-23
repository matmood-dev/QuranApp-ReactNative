import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Headers from '../components/HomeScreen/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getShiaPrayerTimes, PrayerTimes } from '../utils/getPrayerTimes';

const prayerIcons: { [key: string]: string } = {
  Fajr: 'wb-sunny',
  Dhuhr: 'brightness-high',
  Maghrib: 'brightness-low',
  Midnight: 'nights-stay',
};

const prayerOrder = [
  { key: 'Fajr', label: 'الفجر' },
  { key: 'Dhuhr', label: 'الظهرين' },
  { key: 'Maghrib', label: 'العشائين' },
  { key: 'Midnight', label: 'منتصف الليل' },
];

export default function PrayerTimeScreen() {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getShiaPrayerTimes();
        setTimes(data);
      } catch (e) {
        console.error('Prayer times error:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <LinearGradient colors={['#fdfcfb', '#f3e7d9']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Headers />
        <Text style={styles.title}>مواقيت الصلاة</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#6b4c3b" style={{ marginTop: 40 }} />
        ) : error ? (
          <View style={{ padding: 20 }}>
            <Text style={{ color: '#c00', textAlign: 'center' }}>
              تعذر الحصول على مواقيت الصلاة حالياً. حاول لاحقاً.
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            {prayerOrder.map(({ key, label }, index) =>
              times?.[key as keyof PrayerTimes] ? (
                <View key={index} style={styles.card}>
                  <View style={styles.iconCircle}>
                    <MaterialIcons name={prayerIcons[key]} size={20} color="#6b4c3b" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.prayerText}>{label}</Text>
                    <Text style={styles.timeText}>
                      {times[key as keyof PrayerTimes]}
                    </Text>
                  </View>
                </View>
              ) : null
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6b4c3b',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#ffffffee',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e6d2c3',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  prayerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F4F4F',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b4c3b',
    marginTop: 4,
  },
});
