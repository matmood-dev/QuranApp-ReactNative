import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useAudio } from "../../context/AudioContext";

type RootStackParamList = {
  ReciterListScreen: undefined; // ✅ add this
  SurahAudioScreen: { reciterId: string; reciterName: string };
  FullAudioPlayerScreen: { surahName: string; reciterId: string; reciterName: string }; // if used
};

type Props = NativeStackScreenProps<RootStackParamList, "SurahAudioScreen">;

const SurahAudioScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "SurahAudioScreen">>();
  const { reciterId, reciterName } = route.params;

  const { play } = useAudio(); // ✅ use play from context
  const [surahs, setSurahs] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data))
      .catch((err) => console.error(err));
  }, []);

  const handlePlay = (surahNumber: number, surahName: string) => {
  play(surahName, reciterId, reciterName); // ✅ now sets all 3 values in context
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
        <Text style={styles.badgeText}>{item.number}</Text>
      </View>
      <Text style={styles.cardText}>{item.name}</Text>
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
        <Text style={styles.heading}>السور بصوت: {reciterName}</Text>
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
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6b4c3b",
    textAlign: "center",
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
  cardText: {
    fontSize: 18,
    color: "#222",
    writingDirection: "rtl",
    flex: 1,
    textAlign: "right",
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
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
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
