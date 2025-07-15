import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Headers from "../components/HomeScreen/Header";
import { useNavigation } from "@react-navigation/native";

const duasSections = [
  {
    title: "الأدعية والمناجاة",
    items: [
      { title: "الأدعية المشهورة", icon: "auto-stories", screen: "" },
      { title: "الدعوات النافعة والمختصرة", icon: "short-text", screen: "" },
      { title: "مناجاة خمسة عشر", icon: "favorite-border", screen: "" },
    ],
  },
  {
    title: "أعمال الأسبوع",
    items: [
      { title: "تعقيبات الصلاة", icon: "accessibility-new", screen: "" },
      { title: "أعمال الأسبوع", icon: "calendar-view-week", screen: "" },
      { title: "فضل الجمعة وأعمالها", icon: "event", screen: "" },
      { title: "تعيين أسماء أهل البيت (ع)", icon: "group", screen: "" },
    ],
  },
  {
    title: "الزيارات",
    items: [
      { title: "الآداب", icon: "emoji-people", screen: "" },
      { title: "زيارة النبي والزهراء والأئمة بالبقيع (ع)", icon: "place", screen: "" },
      { title: "زيارة أميرالمؤمنين (ع) وكيفيتها", icon: "travel-explore", screen: "" },
      { title: "فضل الكوفة ومسجدها وزيارة مسلم (ع)", icon: "location-city", screen: "" },
      { title: "فضل مسجد السهلة وزيد (ره) وصعصعة", icon: "mosque", screen: "" },
      { title: "فضل زيارة أبي عبد الله الحسين (ع) وآدابها وكيفيتها", icon: "military-tech", screen: "" },
      { title: "زيارة الكاظمين (ع) والنواب الأربعة وسلمان", icon: "groups", screen: "" },
      { title: "زيارة الإمام علي بن موسى الرضا (ع)", icon: "person-pin", screen: "" },
      { title: "زيارة أئمة سر من رأى (ع)", icon: "my-location", screen: "" },
      { title: "الزيارات الجامعة", icon: "school", screen: "" },
      { title: "الزيارات والصَّلاة على الحجج الطاهرين (ع)", icon: "stars", screen: "" },
      { title: "زيارة الأنبياء العظام (ع) وأبناء الأئمة الكرام", icon: "brightness-5", screen: "" },
    ],
  },
  {
    title: "أعمال أشهر السنة",
    items: [
      { title: "شهر رجب", icon: "event-note", screen: "" },
      { title: "شهر شعبان", icon: "event-note", screen: "" },
      { title: "شهر رمضان", icon: "wb-sunny", screen: "" },
      { title: "شهر شوال", icon: "brightness-6", screen: "" },
      { title: "شهر ذي القعده", icon: "event", screen: "" },
      { title: "شهر ذي الحجة", icon: "event", screen: "" },
      { title: "شهر محرم", icon: "warning", screen: "" },
      { title: "شهر صفر", icon: "calendar-today", screen: "" },
      { title: "شهر ربيع الأول", icon: "calendar-month", screen: "" },
      { title: "شهر ربيع الثاني", icon: "calendar-month", screen: "" },
      { title: "شهر جمادي الأولى", icon: "date-range", screen: "" },
      { title: "شهر جمادي الثاني", icon: "date-range", screen: "" },
      { title: "عامة الشهور", icon: "apps", screen: "" },
    ],
  },
];


export default function DuasScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#fdfcfb", "#f3e7d9"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Headers />
        <Text style={styles.title}>مفاتيح الجنان</Text>

        <Text style={styles.description}>
          تجد هنا أكمل كتاب يضم جميع أدعية ومناجاة وزيارات مفاتيح الجنان التي
          بإمكانك الوصول إلى أي دعاء تريده من خلال فهرس سهل الاستعمال.
        </Text>
        <ScrollView contentContainerStyle={styles.content}>
          {duasSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.grid}>
                {section.items.map((dua, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => navigation.navigate(dua.screen as never)}
                  >
                    <View style={styles.iconCircle}>
                      <MaterialIcons
                        name={dua.icon as any}
                        size={20}
                        color="#6b4c3b"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.duaText}>{dua.title}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
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
    fontWeight: "bold",
    color: "#6b4c3b",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: "#5a4a3c",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
    fontWeight: "400",
  },
  content: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    width: "48%",
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#ffffffee",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e6d2c3",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  duaText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4F4F4F",
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6b4c3b",
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  grid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
