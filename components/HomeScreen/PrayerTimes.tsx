import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MapPin } from "lucide-react-native";
import { FullPrayerDay } from "../../types/prayers";
import { getCustomPrayerTimes } from "../../utils/getPrayerTimes";

type PrayerKey = "Fajr" | "Shurooq" | "Dhuhr" | "Maghrib";

const prayerOrder: PrayerKey[] = ["Fajr", "Shurooq", "Dhuhr", "Maghrib"];

const prayerLabels: Record<PrayerKey, string> = {
  Fajr: "الفجر",
  Shurooq: "الشروق",
  Dhuhr: "الظهرين",
  Maghrib: "العشائين",
};

const prayerIcons: Record<
  PrayerKey,
  "wb-sunny" | "brightness-5" | "brightness-7" | "nights-stay" | "mode-night"
> = {
  Fajr: "wb-sunny",         // valid
  Shurooq: "brightness-5",  // valid (represents sunrise)
  Dhuhr: "brightness-7",    // valid (full sun)
  Maghrib: "mode-night",      // valid, or use "brightness-4" if you prefer
};



const getCurrentMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

const getRemainingTime = (targetTime: string): string => {
  if (!targetTime) return "";
  const [h, m] = targetTime.split(":").map(Number);
  const targetMinutes = h * 60 + m;
  const diff = targetMinutes - getCurrentMinutes();
  if (diff <= 0) return "";
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${hours}س ${minutes}د`;
};

export default function PrayerTimes() {
  const [times, setTimes] = useState<FullPrayerDay | null>(null);
  const [nextPrayer, setNextPrayer] = useState<PrayerKey | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCustomPrayerTimes();
        setTimes(data);

        const currentMinutes = getCurrentMinutes();
        const prayerTimesInMinutes = prayerOrder
          .map((key) => {
            const time = data[key];
            if (!time) return null;
            const [hour, minute] = time.split(":").map(Number);
            return { key, minutes: hour * 60 + minute };
          })
          .filter(Boolean) as { key: PrayerKey; minutes: number }[];

        const upcoming = prayerTimesInMinutes.find(
          (p) => p.minutes > currentMinutes
        );
        setNextPrayer(upcoming ? upcoming.key : null);
      } catch (error) {
        console.error("Error loading prayer times or location:", error);
      }
    })();
  }, []);

  useEffect(() => {
  if (!times) return;

  const interval = setInterval(() => {
    const currentMinutes = getCurrentMinutes();
    const prayerTimesInMinutes = prayerOrder
      .map((key) => {
        const time = times[key];
        if (!time) return null;
        const [hour, minute] = time.split(":").map(Number);
        return { key, minutes: hour * 60 + minute };
      })
      .filter(Boolean) as { key: PrayerKey; minutes: number }[];

    const upcoming = prayerTimesInMinutes.find(
      (p) => p.minutes > currentMinutes
    );

    setNextPrayer(upcoming ? upcoming.key : null);
  }, 60000); // run every minute

  return () => clearInterval(interval);
}, [times]);


  if (!times)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>جارٍ التحميل...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={18} color={"#FF8C00"} />
          <Text style={styles.location}>المنامة، البحرين</Text>
        </View>
        <Text style={styles.date}>حسب المذهب الجعفري</Text>
      </View>

      {times.Occasion && (
        <View style={styles.occasionContainer}>
          <Text style={styles.occasion}>مناسبات اليوم: {times.Occasion}</Text>
        </View>
      )}

      {times.ahkam && (
        <View style={styles.ahkamContainer}>
          <Text style={styles.ahkam}>
            أحكام حلق الرأس والأظافر:  {times.ahkam}
          </Text>
        </View>
      )}

      <View style={styles.prayerGrid}>
        {prayerOrder.map((key) => {
          const time = times[key];
          if (!time) return null;

          const isNext = key === nextPrayer;
          return (
            <View
              key={key}
              style={[styles.prayerCard, isNext && styles.nextPrayerCard]}
            >
              <View style={styles.iconWrapper}>
                <MaterialIcons
                  key={`${key}-${isNext}`}
                  name={prayerIcons[key]}
                  size={28}
                  color={isNext ? "#FF8C00" : "#4F6D7A"}
                />
              </View>
              <Text style={styles.prayerName}>{prayerLabels[key]}</Text>
              <Text style={styles.prayerTime}>{time || "--:--"}</Text>
              {isNext && (
                <View style={styles.countdownContainer}>
                  <Text style={styles.countdown}>
                    تبقى {getRemainingTime(time)}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 20,
    marginBottom: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    marginBottom: 18,
    alignItems: "flex-end",
  },
  locationContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  location: {
    fontSize: 18,
    color: "#2C3E50",
  },
  date: {
    fontSize: 14,
    color: "#6C757D",
  },
prayerGrid: {
  flexDirection: "row-reverse",
  flexWrap: "wrap",
  justifyContent: "space-between",
  columnGap: 10,
},
prayerCard: {
  width: "47%",
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  paddingVertical: 16,
  paddingHorizontal: 12,
  marginBottom: 12,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 3,
  elevation: 2,
  borderWidth: 1,
  borderColor: "#E5E7EB",
},
nextPrayerCard: {
  borderColor: "#FF8C00",
  borderWidth: 2,
  backgroundColor: "#FFF8F0",
  shadowColor: "#FF8C00",
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 3 },
  shadowRadius: 8,
  elevation: 5,
  transform: [{ scale: 1.03 }],
},
prayerName: {
  fontSize: 15,
  fontWeight: "500",
  color: "#374151",
  marginBottom: 4,
},

prayerTime: {
  fontSize: 17,
  fontWeight: "bold",
  color: "#111827",
},
  countdownContainer: {
    backgroundColor: "rgba(255, 140, 0, 0.1)",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 6,
  },
  countdown: {
    fontSize: 14,
    color: "#d35400",
  },
  occasionContainer: {
    backgroundColor: "rgba(192, 57, 43, 0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  occasion: {
    fontSize: 15,
    color: "#c0392b",
    textAlign: "right",
    lineHeight: 22,
  },
  ahkamContainer: {
    backgroundColor: "rgba(108, 117, 125, 0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  ahkam: {
    fontSize: 14,
    color: "#6C757D",
    textAlign: "right",
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    fontSize: 16,
    color: "#4F6D7A",
  },
  iconWrapper: {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: "#F2F2F2",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 8,
},
});
