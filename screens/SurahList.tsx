import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

import Header from "../components/HomeScreen/Header";
import AppText from "../components/AppText";

type Surah = {
  number: number;
  name: string; // Arabic name from API
};

type NavigationProp = StackNavigationProp<RootStackParamList, "PageView">;

const { width } = Dimensions.get("window");
const H_PADDING = 32; // list horizontal padding (16 left + 16 right)
const GUTTER = 12;    // space between columns
const CARD_SIZE = (width - H_PADDING - GUTTER) / 2; // 2 cols -> 1 gutter

export default function SurahList() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    let mounted = true;
    axios
      .get("https://api.alquran.cloud/v1/surah")
      .then((res) => {
        if (!mounted) return;
        setSurahs(res.data.data);
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const goToSurahPage = useCallback(async (surahNumber: number) => {
    try {
      const res = await axios.get(`https://api.alquran.cloud/v1/ayah/${surahNumber}:1`);
      const page = res.data.data.page;
      navigation.navigate("PageView", { pageNumber: page });
    } catch (err) {
      console.error("❌ Failed to fetch page number", err);
    }
  }, [navigation]);

  const data = useMemo(() => {
    // Keep original order; you can reverse per-row if you like RTL zig-zag
    return surahs;
  }, [surahs]);

  return (
    <>
      <Header />
      <LinearGradient
        colors={["#f8fafc", "#eef2ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

          {/* Title */}
          <View style={styles.titleWrap}>
            <AppText align="center" size={22} font="lightFont" color="#334155">
              فهرس السور
            </AppText>
            <AppText align="center" size={14} font="lightFont" color="#64748b">
              اختر سورة للانتقال إلى صفحة المصحف
            </AppText>
          </View>

          {/* Loading */}
          {loading ? (
            <View style={styles.loadingWrap}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <Animated.FlatList
              data={data}
              keyExtractor={(item) => String(item.number)}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
              columnWrapperStyle={styles.rowWrapper}
              initialNumToRender={20}
              windowSize={10}
              removeClippedSubviews
              renderItem={({ item, index }) => (
                <Card
                  index={index}
                  number={item.number}
                  name={item.name}
                  onPress={() => goToSurahPage(item.number)}
                />
              )}
              ListFooterComponent={<View style={{ height: 12 }} />}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

/** --- Card (separate for clarity & perf) --- */
function Card({
  index,
  number,
  name,
  onPress,
}: {
  index: number;
  number: number;
  name: string;
  onPress: () => void;
}) {
  const fade = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(12)).current;
  const press = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 300, delay: index * 20, useNativeDriver: true }),
      Animated.spring(translate, { toValue: 0, friction: 8, useNativeDriver: true }),
    ]).start();
  }, [fade, translate, index]);

  const onPressIn = () => {
    Animated.spring(press, { toValue: 0.98, useNativeDriver: true, friction: 8 }).start();
  };
  const onPressOut = () => {
    Animated.spring(press, { toValue: 1, useNativeDriver: true, friction: 6 }).start();
  };

  return (
    <Animated.View style={{ opacity: fade, transform: [{ translateY: translate }, { scale: press }] }}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        android_ripple={{ color: "rgba(0,0,0,0.06)" }}
        style={styles.card}
      >
        {/* Number badge */}
        <View style={styles.numberBadge}>
          <AppText font="duaBoldFont" align="center" size={18} color="#fff">
            {number}
          </AppText>
        </View>

        {/* Name */}
        <AppText
          font="duaBoldFont"
          size={30}
          align="center"
          color="#111827"
          numberOfLines={1}
          // RTL: Arabic centered looks great; container is RTL-aware in row below if needed
        >
          {name}
        </AppText>

        {/* Subtle bottom gradient sheen */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.03)"]}
          style={styles.cardGradient}
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 80,
  },
  titleWrap: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // List layout
  list: {
    paddingHorizontal: 16,  // H_PADDING = 32 total
    paddingBottom: 16,
  },
  rowWrapper: {
    justifyContent: "space-between", // creates the horizontal gutter
    marginBottom: GUTTER,
  },

  // Card
  card: {
    width: CARD_SIZE,
    height: 92,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 4 },
    }),
    alignItems: "center",
    justifyContent: "center",
  },

  numberBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    height: 30,
    minWidth: 30,
    borderRadius: 15,
    paddingHorizontal: 8,
    backgroundColor: "brown", // soft violet
    alignItems: "center",
    justifyContent: "center",
  },

  cardGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 28,
  },
});
