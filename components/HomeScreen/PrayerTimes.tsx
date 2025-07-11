import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MapPin } from 'lucide-react-native';
import * as Location from 'expo-location';
import { getShiaPrayerTimes } from '../../utils/getPrayerTimes';

type PrayerKey = 'Fajr' | 'Dhuhr' | 'Maghrib' | 'Midnight';

const prayerOrder: PrayerKey[] = ['Fajr', 'Dhuhr', 'Maghrib', 'Midnight'];

const prayerLabels: { [key: string]: string } = {
  Fajr: 'الفجر',
  Dhuhr: 'الظهرين',
  Maghrib: 'العشائين',
  Midnight: 'منتصف الليل',
};

const prayerIcons: Record<PrayerKey, 'wb-sunny' | 'brightness-high' | 'brightness-low' | 'nights-stay'> = {
  Fajr: 'wb-sunny',
  Dhuhr: 'brightness-high',
  Maghrib: 'brightness-low',
  Midnight: 'nights-stay',
};


export default function PrayerTimes() {
  const [times, setTimes] = useState<Record<PrayerKey, string> | null>(null);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
  (async () => {
    try {
      const data = await getShiaPrayerTimes(); // fetch prayer times
      setTimes(data);

      // Get user's location and reverse geocode it
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const [place] = await Location.reverseGeocodeAsync(location.coords);
        if (place.city && place.country) {
          setCity(`${place.city}، ${place.country}`);
        }
      }

      // Calculate next prayer
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const prayerTimesInMinutes = prayerOrder.map((key) => {
        const [hour, minute] = data[key].split(':').map(Number);
        return { key, minutes: hour * 60 + minute };
      });

      const upcoming = prayerTimesInMinutes.find((p) => p.minutes > currentMinutes);
      setNextPrayer(upcoming ? upcoming.key : null);
    } catch (error) {
      console.error('Error loading prayer times or location:', error);
    }
  })();
}, []);



  if (!times) return <Text style={{ textAlign: 'center' }}>جارٍ التحميل...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={16} color="orange" />
          <Text style={styles.location}>{city || "المنامة، البحرين"}</Text>
        </View>
        <Text style={styles.date}>حسب المذهب الجعفري</Text>
      </View>

      <View style={styles.prayerGrid}>
        {prayerOrder.map((key) => (
          <View
            key={key}
            style={[
              styles.prayerCard,
              key === "Fajr" && styles.fajrCard,
              key === nextPrayer && styles.nextPrayerCard,
            ]}
          >
            <MaterialIcons
              name={prayerIcons[key]}
              size={24}
              color={key === nextPrayer ? "#FFA500" : "#4F6D7A"}
            />
            <Text style={styles.prayerName}>{prayerLabels[key]}</Text>
            <Text style={styles.prayerTime}>{times[key]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 40,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  header: {
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  locationContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    fontFamily: 'DINNextLTArabic-Medium',
    color: '#4F6D7A',
  },
  date: {
    fontSize: 13,
    fontFamily: 'DINNextLTArabic-Regular',
    color: '#6C757D',
  },
  prayerGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  prayerCard: {
    width: '22%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  fajrCard: {
    backgroundColor: '#F0F7FF',
    borderColor: '#D4E6FF',
    borderWidth: 1,
  },
  ishaCard: {
    backgroundColor: '#F5F0FF',
    borderColor: '#E6DDFF',
    borderWidth: 1,
  },
  nextPrayerCard: {
    borderColor: '#FFA500',
    borderWidth: 2,
    shadowColor: '#FFA500',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  prayerName: {
    fontSize: 14,
    fontFamily: 'DINNextLTArabic-Medium',
    color: '#4F6D7A',
    marginTop: 8,
    marginBottom: 4,
  },
  prayerTime: {
    fontSize: 15,
    fontFamily: 'DINNextLTArabic-Bold',
    color: '#2C3E50',
  },
});
