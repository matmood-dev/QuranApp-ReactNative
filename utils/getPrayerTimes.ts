import { FullPrayerDay } from '../types/prayers';

type MonthlyPrayerData = Record<string, FullPrayerDay>;

export const getCustomPrayerTimes = async (): Promise<FullPrayerDay> => {
  const data: MonthlyPrayerData = require('../data/prayerTimes.json');
  const today = new Date().toISOString().split('T')[0]; // format YYYY-MM-DD
  const todayData = data[today];

  if (!todayData) {
    throw new Error(`No prayer data found for ${today}`);
  }

  // Optionally calculate Midnight if missing
  if (!todayData.Midnight && todayData.Fajr && todayData.Maghrib) {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const toHHMM = (m: number) => {
      const h = Math.floor(m / 60) % 24;
      const min = m % 60;
      return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    };

    const maghrib = toMinutes(todayData.Maghrib);
    const fajr = toMinutes(todayData.Fajr) + 1440; // next day
    todayData.Midnight = toHHMM(Math.floor((maghrib + fajr) / 2) % 1440);
  }

  return todayData;
};
