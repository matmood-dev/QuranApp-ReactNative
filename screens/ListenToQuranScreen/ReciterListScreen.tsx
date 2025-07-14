import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/HomeScreen/Header";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ReciterCard from "./ReciterCard"; // 👈 Import the separate animated card

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const reciters = [
  {
    id: "ar.abdulbasit",
    name: "عبد الباسط عبد الصمد",
    image: require("../../assets/reciters/abdulbasit.jpg"),
  },
  {
    id: "ar.minshawi",
    name: "محمد المنشاوي",
    image: require("../../assets/reciters/minshawi.jpg"),
  },
  {
    id: "ar.kazemi",
    name: "عامر الكاظمي",
    image: require("../../assets/reciters/kademi.jpg"),
  },
  {
    id: "ar.tammar",
    name: "ميثم التمار",
    image: require("../../assets/reciters/tammar.jpg"),
  },
  // {
  //   id: "ar.salman-alutaibi",
  //   name: "سلمان العتيبي",
  //   image: require("../../assets/reciters/salman-alutaibi.jpg"),
  // }
];

type RootStackParamList = {
  SurahAudioScreen: { reciterId: string; reciterName: string };
  ReciterListScreen: undefined; // ✅ add this
  FullAudioPlayerScreen: { surahName: string; reciterId: string; reciterName: string }; // if used
};

export default function ReciterListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelect = (reciterId: string, reciterName: string) => {
    navigation.navigate("SurahAudioScreen", { reciterId, reciterName });
  };

  return (
    <LinearGradient colors={["#fdfcfb", "#e2d1c3"]} style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.heading}>اختر القارئ</Text>
        <FlatList
          key={"2-cols"}
          data={reciters}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          renderItem={({ item, index }) => (
            <ReciterCard item={item} index={index} onSelect={handleSelect} />
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({ ios: 150, android: 120 }),
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
