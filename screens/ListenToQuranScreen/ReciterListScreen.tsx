import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../components/HomeScreen/Header";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ReciterCard from "./ReciterCard";
import AppText from "../../components/AppText";

const { width } = Dimensions.get("window");
export const CARD_SIZE = (width - 48) / 2; // shared with card

const reciters = [
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
    id: "ar.kjalil",
    name: "خالد الجليل",
    image: require("../../assets/reciters/kjalil.jpg"),
  },
  {
    "id": "ar.mrashad",
    "name": "محمد رشاد",
    "image": require("../../assets/reciters/mrashad.jpg"),
  },
  {
    "id": "ar.maher",
    "name": "ماهر المعيقلي",
    "image": require("../../assets/reciters/maher.jpg"),
  }
];

type RootStackParamList = {
  SurahAudioScreen: { reciterId: string; reciterName: string };
  ReciterListScreen: undefined;
  FullAudioPlayerScreen: {
    surahName: string;
    reciterId: string;
    reciterName: string;
  };
};

export default function ReciterListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelect = (reciterId: string, reciterName: string) => {
    navigation.navigate("SurahAudioScreen", { reciterId, reciterName });
  };

  return (
    <LinearGradient
      colors={["#f8fafc", "#eef2ff"]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
      />
      <Header />
      <View style={styles.container}>
        <AppText align="center" marginBottom={24} size={26} font="lightFont">
          اختر القارئ
        </AppText>

        <FlatList
          data={reciters}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={{ paddingBottom: 28 }}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            margin: 5,
            gap: 8,
          }}
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
    paddingTop: Platform.select({ ios: 140, android: 130 }),
    paddingHorizontal: 16,
  },
  list: {
    paddingBottom: 28,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
