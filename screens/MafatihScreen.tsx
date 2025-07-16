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
import duasSections from '../data/duasSections.json';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type DuasScreenNavProp = NativeStackNavigationProp<RootStackParamList, "DuasScreen">;


export default function DuasScreen() {
  const navigation = useNavigation<DuasScreenNavProp>();

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
                    onPress={() => {
                      if (dua.duas) {
                        navigation.navigate("DuasListScreen", {
                          title: dua.title,
                          items: [{ title: dua.title, duas: dua.duas }],
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#6b4c3b",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#5a4a3c",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 16,
    fontWeight: "400",
  },
  content: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6b4c3b",
    marginBottom: 12,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#e4cfc1",
    paddingBottom: 6,
    alignSelf: "center",
    width: "70%",
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
  duaText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#4F4F4F",
    textAlign: "center",
  },
});
