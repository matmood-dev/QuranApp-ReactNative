type PrayerKey = 'Fajr' | 'Shurooq' | 'Dhuhr' | 'Maghrib';
export type FullPrayerDay = {
  Fajr: string;
  Shurooq?: string; 
  Dhuhr: string;
  Maghrib: string;
  Midnight: string;
  Occasion?: string;
  ahkam?: string;
};