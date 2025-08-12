import React, { useEffect, useMemo } from "react";
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
    /** Optional but recommended to avoid Arabic name variants */
    surahNumber?: number;
    /** Autoplay when screen opens (default true) */
    autoplay?: boolean;
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
  const {
    surahName,
    reciterName,
    reciterId,
    surahNumber,
    autoplay = true,
  } = route.params;

  const { isPlaying, play, pause, position, duration, seekTo } = useAudio();

  // pick number if available (more reliable), otherwise Arabic name
  const surahKey = useMemo(
    () => (typeof surahNumber === "number" ? surahNumber : surahName),
    [surahNumber, surahName]
  );

  // Autoplay on mount (only once)
  useEffect(() => {
    if (autoplay) {
      play(surahKey, reciterId, reciterName).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  const onPlayPress = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await play(surahKey, reciterId, reciterName);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const imgSource =
    reciterImages[reciterId] ?? require("../../assets/reciters/placeholder.jpg");

  const sliderDisabled = !duration || duration <= 1;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() =>
          navigation.navigate(
            "SurahAudioScreen" as never,
            { reciterId, reciterName } as never
          )
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

      <View style={styles.imageBox}>
        <Image source={imgSource} style={styles.reciterImage} resizeMode="cover" />
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration || 1}
        value={position}
        onSlidingComplete={seekTo}
        disabled={sliderDisabled}
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

      <View style={styles.controls}>
        <TouchableOpacity disabled>
          <Ionicons name="play-back" size={36} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPress} style={styles.playButton}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={42} color="#fff" />
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
