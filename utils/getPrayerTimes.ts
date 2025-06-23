import * as Location from 'expo-location';

interface PrayerTimesOptions {
  latitude?: number;
  longitude?: number;
  method?: number; // e.g., 13 = Jafari
}

export const getShiaPrayerTimes = async (options: PrayerTimesOptions = {}) => {
  let { latitude, longitude, method } = options;

  // Default: Manama, Bahrain + Jafari
  if (!latitude || !longitude) {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission not granted, using default.');
        latitude = 26.2285;
        longitude = 50.5860;
      } else {
        const location = await Location.getCurrentPositionAsync({});
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
      }
    } catch (e) {
      console.warn('Location fetch failed, using default.', e);
      latitude = 26.2285;
      longitude = 50.5860;
    }
  }

  if (!method) {
    method = 13; // Jafari
  }

  const today = new Date();
  const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=1`;

  const res = await fetch(url);
  const json = await res.json();

  const timings = json.data.timings;

  return {
    Fajr: formatTime(timings.Fajr),
    Dhuhr: formatTime(timings.Dhuhr),
    Maghrib: formatTime(timings.Maghrib),
    Isha: formatTime(timings.Isha),
  };
};

const formatTime = (timeStr: string): string => {
  // Converts "04:15 (AST)" to "04:15"
  return timeStr.split(' ')[0];
};
