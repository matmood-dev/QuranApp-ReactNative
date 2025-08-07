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
import AppText from '../components/AppText';

const prayerIcons = {
  Fajr: 'wb-sunny',
  Dhuhr: 'brightness-high',
  Maghrib: 'brightness-low',
  Midnight: 'nights-stay',
} as const;

type PrayerKey = keyof typeof prayerIcons;


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
        <AppText color='#6b4c3b' size={25} align='center' marginBottom={30}>مواقيت الصلاة</AppText>

        {loading ? (
          <ActivityIndicator size="large" color="#6b4c3b" style={{ marginTop: 40 }} />
        ) : error ? (
          <View style={{ padding: 20 }}>
            <AppText color='red' size={16} align='center'>
              تعذر الحصول على مواقيت الصلاة حالياً. حاول لاحقاً.
            </AppText>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.content}>
            {prayerOrder.map(({ key, label }, index) =>
              times?.[key as keyof PrayerTimes] ? (
                <View key={index} style={styles.card}>
                  <View style={styles.iconCircle}>
                    <MaterialIcons name={prayerIcons[key as PrayerKey]} size={20} color="#6b4c3b" />
                  </View>
                  <View style={styles.textContainer}>
                    <AppText align='right' width='100%'>{label}</AppText>
                    <AppText align='right' width='100%' size={18} color='#6b4c3b' font='boldFont'>
                      {times[key as keyof PrayerTimes]}
                    </AppText>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
  flexDirection: 'row-reverse',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  padding: 16,
  borderRadius: 14,
  marginBottom: 14,

  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  // Android shadow (elevation only)
  elevation: 4,
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
});
