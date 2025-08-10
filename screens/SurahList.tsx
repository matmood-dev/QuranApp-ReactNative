import { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

import Header from "../components/HomeScreen/Header";
import AppText from "../components/AppText";

export default function SurahList() {
  type Surah = {
    number: number;
    name: string;
  };

  type NavigationProp = StackNavigationProp<RootStackParamList, "PageView">;

  const [surahs, setSurahs] = useState<Surah[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    axios
      .get("https://api.alquran.cloud/v1/surah")
      .then((res) => setSurahs(res.data.data))
      .catch(console.error);
  }, []);

  const goToSurahPage = async (surahNumber: number) => {
    try {
      const res = await axios.get(
        `https://api.alquran.cloud/v1/ayah/${surahNumber}:1`
      );
      const page = res.data.data.page;
      navigation.navigate("PageView", { pageNumber: page });
    } catch (err) {
      console.error("❌ Failed to fetch page number", err);
    }
  };

  return (
    <>
      <Header />
      <LinearGradient colors={["#fdfcfb", "#e2d1c3"]} style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor="#fdfcfb" />
          <FlatList
            data={
              surahs.length % 2 === 0
                ? surahs
                    .reduce<Surah[][]>(
                      (acc, _, i) =>
                        i % 2 === 0
                          ? [...acc, surahs.slice(i, i + 2).reverse()]
                          : acc,
                      []
                    )
                    .flat()
                : surahs
            }
            keyExtractor={(item) => item.number.toString()}
            numColumns={2}
            contentContainerStyle={styles.list}
            columnWrapperStyle={styles.rowWrapper}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => goToSurahPage(item.number)}
              >
                <View style={styles.row}>
                  <AppText style={[styles.number]}>{item.number}</AppText>
                  <View style={{ flex: 1 }}>
                    <AppText font="lightFont" size={20} align="center">
                      {item.name}
                    </AppText>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 80,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  rowWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  item: {
    width: cardWidth,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  number: {
    fontSize: 16,
    color: "brown",
    fontWeight: "bold",
    marginLeft: 12,
  },
});
