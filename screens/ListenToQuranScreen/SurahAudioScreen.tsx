import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { useAudio } from "../../context/AudioContext";
import AppText from "../../components/AppText";

type NavParams = {
  SurahAudioScreen: { reciterId: string; reciterName: string };
  FullAudioPlayerScreen: {
    surahName: string;
    surahNumber: number;           // ✅ add number
    reciterId: string;
    reciterName: string;
    autoplay?: boolean;            // optional
  };
  ReciterListScreen: undefined;
};

type Props = DrawerScreenProps<NavParams, "SurahAudioScreen">;

type Surah = { number: number; name: string };

const SurahAudioScreen: React.FC<Props> = ({ navigation, route }) => {
  const { reciterId, reciterName } = route.params;
  const { play } = useAudio();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => mounted && setSurahs(data.data))
      .catch(console.error)
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ Play by number (more reliable than Arabic name) and navigate with both
  const handlePlay = useCallback(
    async (surahNumber: number, surahName: string) => {
      await play(surahNumber, reciterId, reciterName);
      navigation.navigate("FullAudioPlayerScreen", {
        surahName,
        surahNumber,           // ✅ pass number
        reciterId,
        reciterName,
        autoplay: false,       // already started playing above; keep UI in sync
      });
    },
    [navigation, play, reciterId, reciterName]
  );

  const data = useMemo(() => surahs, [surahs]);

  const renderItem = useCallback(
    ({ item, index }: { item: Surah; index: number }) => {
      return (
        <SurahRow
          index={index}
          item={item}
          onPress={() => handlePlay(item.number, item.name)}
        />
      );
    },
    [handlePlay]
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Header */}
      <LinearGradient
        colors={["#f8fafc", "#eef2ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Pressable
          onPress={() => navigation.navigate("ReciterListScreen")}
          style={styles.backButton}
          android_ripple={{ color: "rgba(0,0,0,0.08)", borderless: true }}
        >
          <Ionicons name="chevron-back" size={22} color="#334155" />
        </Pressable>

        <AppText color="#334155" align="center" font="lightFont" size={18}>
          السور بصوت: {reciterName}
        </AppText>
      </LinearGradient>

      {/* List */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.number)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default SurahAudioScreen;

/** ---- Row Card ---- */
function SurahRow({
  item,
  index,
  onPress,
}: {
  item: Surah;
  index: number;
  onPress: () => void;
}) {
  const fade = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(10)).current;
  const press = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 260,
        delay: index * 12,
        useNativeDriver: true,
      }),
      Animated.spring(translate, { toValue: 0, friction: 9, useNativeDriver: true }),
    ]).start();
  }, [fade, translate, index]);

  const onPressIn = () => Animated.spring(press, { toValue: 0.98, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(press, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ opacity: fade, transform: [{ translateY: translate }, { scale: press }] }}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        android_ripple={{ color: "rgba(0,0,0,0.06)" }}
        style={styles.card}
      >
        <View style={styles.badge}>
          <AppText font="boldFont" size={15} align="center" color="#fff">
            {item.number}
          </AppText>
        </View>

        {/* 🛠️ fixed stray curly brace in color */}
        <AppText flex={1} font="duaBoldFont" size={22} color="#111827">
          {item.name}
        </AppText>

        <Ionicons name="play-circle" size={24} color="#64748b" />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: Platform.OS === "android" ? 56 : 88,
    paddingBottom: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 3 },
    }),
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 50 : 80,
    left: 18,
    zIndex: 10,
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: { elevation: 4 },
    }),
  },

  list: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 2 },
    }),
  },

  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "brown",
  },

  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
