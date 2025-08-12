import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useAudio } from "../../context/AudioContext";

import AppText from "../../components/AppText";

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
    "ar.afasi": require("../../assets/reciters/afasi.jpg"),
    "ar.maher": require("../../assets/reciters/maher.jpg"),
    "ar.mayoob": require("../../assets/reciters/mayoob.png"),
    "ar.mrashad": require("../../assets/reciters/mrashad.jpg"),
    "ar.rkurdi": require("../../assets/reciters/rkurdi.webp"),
    "ar.sghamdi": require("../../assets/reciters/sghamdi.jpg"),
    "ar.sudais": require("../../assets/reciters/sudais.jpg"),
    "ar.ydosary": require("../../assets/reciters/ydosary.webp"),
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

      <AppText
        color="#6b4c3b"
        font="duaBoldFont"
        size={50}
        marginBottom={8}
        align="center"
      >
        {surahName}
      </AppText>
      <AppText font="lightFont" align="center" marginBottom={50}>
        بصوت: {reciterName}
      </AppText>

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
        <AppText color="#555" font="boldFont" align="left">
          {formatTime(position)}
        </AppText>
        <AppText color="#555" font="boldFont" align="right">
          {formatTime(duration)}
        </AppText>
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
