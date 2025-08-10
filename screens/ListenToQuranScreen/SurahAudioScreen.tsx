import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useAudio } from "../../context/AudioContext";
import type { RootStackParamList } from "../../types/navigation";

import AppText from "../../components/AppText";

type Props = DrawerScreenProps<
  {
    SurahAudioScreen: { reciterId: string; reciterName: string };
    FullAudioPlayerScreen: { surahName: string; reciterId: string; reciterName: string };
    ReciterListScreen: undefined;
  },
  "SurahAudioScreen"
>;

const SurahAudioScreen: React.FC<Props> = ({ navigation, route }) => {
  const { reciterId, reciterName } = route.params;
  const { play } = useAudio();
  const [surahs, setSurahs] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data))
      .catch((err) => console.error(err));
  }, []);

  const handlePlay = (surahNumber: number, surahName: string) => {
    play(surahName, reciterId, reciterName);
    navigation.navigate("FullAudioPlayerScreen", {
      surahName,
      reciterId,
      reciterName,
    });
  };

  const renderSurah = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePlay(item.number, item.name)}
    >
      <View style={styles.cardBadge}>
        <AppText font="boldFont" size={18} align="center">{item.number}</AppText>
      </View>
      <AppText flex={1} font="duaBoldFont" size={35}>{item.name}</AppText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdfcfb" />
      <LinearGradient colors={["#fdfcfb", "#e2d1c3"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("ReciterListScreen")}
        >
          <Ionicons name="chevron-back" size={26} color="#6b4c3b" />
        </TouchableOpacity>
        <AppText color="#6b4c3b" align="center" font="lightFont" size={20}>السور بصوت: {reciterName}</AppText>
      </LinearGradient>

      <FlatList
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={renderSurah}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: Platform.OS === "android" ? 60 : 100,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e2d1c3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 50 : 90,
    left: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});

export default SurahAudioScreen;
