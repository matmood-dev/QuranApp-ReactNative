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
import duasSections from "../data/duasSections.json";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import AppText from "../components/AppText";

type DuasScreenNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "DuasScreen"
>;

export default function DuasScreen() {
  const navigation = useNavigation<DuasScreenNavProp>();

  return (
    <LinearGradient colors={["#fdfcfb", "#f3e7d9"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Headers />
        <AppText
          color="#6b4c3b"
          align="center"
          marginBottom={12}
          size={30}
          font="lightFont"
        >
          مفاتيح الجنان
        </AppText>

        <AppText
          color="#5a4a3c"
          align="center"
          size={16}
          font="lightFont"
          marginBottom={20}
          paddingHorizontal={20}
          lineHeight={25}
        >
          تجد هنا أكمل كتاب يضم جميع أدعية ومناجاة وزيارات مفاتيح الجنان التي
          بإمكانك الوصول إلى أي دعاء تريده من خلال فهرس سهل الاستعمال.
        </AppText>
        <ScrollView contentContainerStyle={styles.content}>
          {duasSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <AppText
                borderBottomColor="#e4cfc1"
                borderBottomWidth={2}
                marginBottom={25}
                font="lightFont"
                size={20}
                align="center"
                width="70%"
                paddingBottom={10}
              >
                {section.title}
              </AppText>
              <View style={styles.grid}>
                {section.items.map((dua, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => {
                      if (dua.duas) {
                        navigation.navigate("DuasListScreen", {
                          title: dua.title,
                          items: dua.duas,
                        });
                      }
                    }}
                  >
                    <View style={styles.iconCircle}>
                      <MaterialIcons
                        name={dua.icon as any}
                        size={20}
                        color="#6b4c3b"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <AppText color="#4F4F4F" size={18} font="lightFont" lineHeight={25} align="center">{dua.title}</AppText>
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
  content: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0e3d7",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
});
