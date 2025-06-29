import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/HomeScreen/Header";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const reciters = [
  {
    id: "ar.abdulbasit",
    name: "عبد الباسط عبد الصمد",
    image: require("../assets/reciters/abdulbasit.jpg"),
  },
  {
    id: "ar.minshawi",
    name: "محمد المنشاوي",
    image: require("../assets/reciters/minshawi.jpg"),
  },
];

export default function ReciterListScreen() {
  const navigation = useNavigation();

  const handleSelect = (reciterId: string, reciterName: string) => {
    navigation.navigate("SurahAudioScreen", { reciterId, reciterName });
  };

  return (
    <LinearGradient colors={["#fdfcfb", "#e2d1c3"]} style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.heading}>اختر القارئ</Text>
        <FlatList
          key={"2-cols"} // ✅ Force FlatList to fully remount
          data={reciters}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSelect(item.id, item.name)}
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.overlay}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
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
  card: {
    width: cardWidth,
    height: cardWidth,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    elevation: 4,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
