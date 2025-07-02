import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAudio } from "../../../context/AudioContext";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function MiniPlayer() {
  const { isPlaying, toggle, currentSurah } = useAudio();

  // 👉 Don't render the MiniPlayer if nothing is playing
  if (!currentSurah) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentSurah || "لا يوجد تشغيل"}</Text>
      <TouchableOpacity onPress={toggle}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
      </TouchableOpacity>
    </View>
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
