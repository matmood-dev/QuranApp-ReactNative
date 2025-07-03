import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
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
  const reciterImages: Record<string, any> = {
    "ar.abdulbasit": require("../../assets/reciters/abdulbasit.jpg"),
    "ar.minshawi": require("../../assets/reciters/minshawi.jpg"),
    "ar.kazemi": require("../../assets/reciters/kademi.jpg"),
    "ar.tammar": require("../../assets/reciters/tammar.jpg"),
    "ar.salman-alutaibi": require("../../assets/reciters/salman-alutaibi.jpg"),
  };

  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, "FullAudioPlayerScreen">>();
  const { surahName, reciterName, reciterId } = route.params;
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
        onPress={() =>
          navigation.navigate("SurahAudioScreen", {
            reciterId,
            reciterName,
          })
        }
      >
        <Ionicons name="chevron-back" size={26} color="#6b4c3b" />
      </TouchableOpacity>

      <Text style={styles.surahName}>{surahName}</Text>
      <Text style={styles.reciter}>بصوت: {reciterName}</Text>

      {/* Optional waveform or image placeholder */}
      <View style={styles.imageBox}>
        <Image
          source={reciterImages[reciterId]}
          style={styles.reciterImage}
          resizeMode="cover"
        />
      </View>

      {/* Slider and time */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seekTo}
        minimumTrackTintColor="#6b4c3b"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#6b4c3b"
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Playback controls */}
      <View style={styles.controls}>
        <TouchableOpacity disabled>
          <Ionicons name="play-back" size={36} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggle} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={42}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity disabled>
          <Ionicons name="play-forward" size={36} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfcfb",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 60 : 100,
  },
  backBtn: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 80,
    left: 20,
    zIndex: 10,
  },
  surahName: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 8,
    color: "#6b4c3b",
    writingDirection: "rtl",
  },
  reciter: {
    fontSize: 18,
    textAlign: "center",
    color: "#777",
    marginBottom: 30,
    writingDirection: "rtl",
  },
  imageBox: {
    width: "100%",
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  timeText: {
    color: "#555",
    fontSize: 14,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  playButton: {
    backgroundColor: "#6b4c3b",
    borderRadius: 50,
    padding: 20,
    elevation: 6,
  },
  reciterImage: {
    width: "100%",
    height: 230,
    borderRadius: 20,
  },
});
