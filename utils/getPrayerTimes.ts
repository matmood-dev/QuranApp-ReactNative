// utils/getPrayerTimes.ts
export const getShiaPrayerTimes = async () => {
  const response = await fetch(
    'https://api.aladhan.com/v1/timingsByCity?city=Manama&country=Bahrain&method=0'
  );
  const json = await response.json();
  return json.data.timings;
};
