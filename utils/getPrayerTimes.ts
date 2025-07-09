import * as Location from 'expo-location';

interface PrayerTimesOptions {
  latitude?: number;
  longitude?: number;
  method?: number;
}

const formatTime = (timeStr: string): string => timeStr.split(' ')[0];

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function toHHMM(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export const getShiaPrayerTimes = async (options: PrayerTimesOptions = {}) => {
  let { latitude, longitude, method } = options;

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

  if (!method) method = 13;

  const today = new Date();
  const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  const url = `https://api.aladhan.com/v1/timings/${date}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=1`;

  const res = await fetch(url);
  const json = await res.json();
  const timings = json.data.timings;

  const maghribMin = toMinutes(formatTime(timings.Maghrib));
  const fajrMin = toMinutes(formatTime(timings.Fajr)) + 1440;
  const midnightMin = Math.floor((maghribMin + fajrMin) / 2);

  return {
    Fajr: formatTime(timings.Fajr),
    Dhuhr: formatTime(timings.Dhuhr),
    Maghrib: formatTime(timings.Maghrib),
    Midnight: toHHMM(midnightMin % 1440),
  };
};

export type PrayerTimes = Awaited<ReturnType<typeof getShiaPrayerTimes>>;