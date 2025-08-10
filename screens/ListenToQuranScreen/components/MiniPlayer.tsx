import React from "react";
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAudio } from "../../../context/AudioContext";

import AppText from "../../../components/AppText";

export default function MiniPlayer() {
  const navigation = useNavigation();
  const { isPlaying, toggle, currentSurah, reciterId, reciterName } = useAudio();

  if (!isPlaying || !currentSurah) return null;

  const handleOpenPlayer = () => {
    navigation.navigate("FullAudioPlayerScreen", {
      surahName: currentSurah,
      reciterId,
      reciterName,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOpenPlayer}>
      <AppText color="white" font="lightFont" size={20}>{currentSurah}</AppText>
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          toggle();
        }}
      >
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6b4c3b",
    padding: 12,
    paddingBottom: Platform.OS === "ios" ? 40 : 20, // 👈 iOS specific extra bottom padding
    paddingTop: Platform.OS === "ios" ? 20 : 20, // 👈 iOS specific extra bottom padding
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
