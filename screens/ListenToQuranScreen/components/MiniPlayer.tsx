import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAudio } from "../../../context/AudioContext";

export default function MiniPlayer() {
  const navigation = useNavigation();
  const { isPlaying, toggle, currentSurah, reciterId, reciterName } = useAudio();
  

  // 👉 Don't render if nothing is playing
  if (!currentSurah) return null;

  const handleOpenPlayer = () => {
  navigation.navigate("FullAudioPlayerScreen", {
    surahName: currentSurah,
    reciterId,
    reciterName,
  });
};


  return (
    <TouchableOpacity style={styles.container} onPress={handleOpenPlayer}>
      <Text style={styles.title}>{currentSurah || "لا يوجد تشغيل"}</Text>
      <TouchableOpacity onPress={(e) => {
        e.stopPropagation(); // Prevent parent navigation
        toggle();
      }}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6b4c3b",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
});
