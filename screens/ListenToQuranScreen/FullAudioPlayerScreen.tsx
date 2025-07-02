// screens/ListenToQuranScreen/FullAudioPlayerScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from '@react-native-community/slider';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useAudio } from "../../context/AudioContext";

type ParamList = {
  FullAudioPlayerScreen: {
    surahName: string;
    reciterId: string;
    reciterName: string;
  };
};

export default function FullAudioPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, "FullAudioPlayerScreen">>();
  const { surahName, reciterName } = route.params;
  const { isPlaying, toggle, position, duration, seekTo } = useAudio();

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("ReciterListScreen")}
      >
        <Ionicons name="chevron-back" size={24} color="#6b4c3b" />
      </TouchableOpacity>

      <Text style={styles.title}>{surahName}</Text>
      <Text style={styles.reciter}>بصوت: {reciterName}</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seekTo}
        minimumTrackTintColor="#6b4c3b"
        maximumTrackTintColor="#ccc"
      />
      <View style={styles.timeRow}>
        <Text>{formatTime(position)}</Text>
        <Text>{formatTime(duration)}</Text>
      </View>

      <TouchableOpacity onPress={toggle} style={styles.playButton}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fdfcfb",
  },
  backBtn: { position: "absolute", top: 50, left: 20 },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
    color: "#6b4c3b",
  },
  reciter: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
    color: "#777",
  },
  slider: { width: "100%", height: 40 },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  playButton: {
    alignSelf: "center",
    backgroundColor: "#6b4c3b",
    borderRadius: 50,
    padding: 20,
    elevation: 5,
  },
});
