import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import AppText from "../AppText";

const { width } = Dimensions.get("window");
const cardSize = (width - 48) / 2;

type FeatureItem = {
  title: string;
  screen: keyof RootStackParamList;
  params?: RootStackParamList[keyof RootStackParamList]; // proper typing
  image: any;
  badge?: string;
  disabled?: boolean;
};

const features: FeatureItem[] = [
  {
    title: "المصحف الشريف",
    screen: "SurahList",
    image: require("../../assets/quran-card.jpg"),
  },
  {
    title: "الاستماع للقرآن",
    screen: "ReciterListScreen",
    image: require("../../assets/reciters/kademi.jpg"),
  },
  {
    title: "مفاتيح الجنان",
    screen: "MafatihScreen",
    image: require("../../assets/duas-card.jpg"),
    badge: "جديد",
  },
  {
    title: "قريبًا",
    screen: "SurahList",
    image: require("../../assets/comingsoon.jpg"),
    disabled: true,
    badge: "قريبًا",
  },
];

export default function FeatureCards() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const rows = React.useMemo(() => {
    const r = [];
    for (let i = 0; i < features.length; i += 2) {
      r.push(features.slice(i, i + 2));
    }
    return r;
  }, []);

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item, index) => (
            <Animatable.View
              key={item.title}
              animation="fadeInUp"
              delay={rowIndex * 200 + index * 100}
              duration={500}
              useNativeDriver
            >
              <TouchableOpacity
                accessible
                accessibilityLabel={item.title}
                disabled={item.disabled}
                activeOpacity={0.9}
                style={[styles.card, item.disabled && { opacity: 0.6 }]}
                onPress={() => {
                  if (!item.disabled) {
                    navigation.navigate(item.screen, item.params as any);
                  }
                }}
              >
                <Image source={item.image} style={styles.cardImage} />
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.1)"]}
                  start={{ x: 0.5, y: 1 }}
                  end={{ x: 0.5, y: 0 }}
                  style={styles.gradient}
                />
                {item.badge && (
                  <View style={styles.badge}>
                    <AppText color="white" size={14}>{item.badge}</AppText>
                  </View>
                )}
                <View style={styles.textWrapper}>
                  <AppText font="lightFont" size={28} color="white" align="center">{item.title}</AppText>
                </View>
                {item.disabled && (
                  <View style={styles.disabledOverlay}>
                    <AppText font="boldFont" size={30} color="white">🔒</AppText>
                  </View>
                )}
              </TouchableOpacity>
            </Animatable.View>
          ))}
          {row.length < 2 && <View style={styles.card} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: cardSize,
    height: cardSize,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#FFA500",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF5722",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 10,
    elevation: 3,
  },
  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
});
