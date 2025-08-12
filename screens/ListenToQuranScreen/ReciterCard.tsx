import React, { useRef, useEffect, memo } from "react";
import {
  Animated,
  Pressable,
  Image,
  View,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../../components/AppText";

type Props = {
  item: { id: string; name: string; image: any };
  index: number;
  onSelect: (id: string, name: string) => void;
};

const { width } = Dimensions.get("window");
const H_PADDING = 32;     // container has 16 left + 16 right
const GUTTER = 12;        // matches row marginBottom / gap between columns
const CARD_SIZE = (width - H_PADDING - 2 * GUTTER) / 3; // 3 cols → 2 gutters

function ReciterCard({ item, index, onSelect }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleInAnim = useRef(new Animated.Value(0.96)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 380,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleInAnim, {
        toValue: 1,
        friction: 6,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleInAnim, index]);

  const onPressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 8,
      tension: 200,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleInAnim }],
      }}
    >
      <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => onSelect(item.id, item.name)}
          android_ripple={{ color: "rgba(0,0,0,0.09)", borderless: false }}
          style={styles.card}
        >
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.55)"]}
            style={styles.overlay}
          />
          <View style={styles.nameWrap}>
            <AppText
              color="white"
              align="center"
              font="lightFont"
              size={14}
              numberOfLines={1}
            >
              {item.name}
            </AppText>
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

export default memo(ReciterCard);

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.02 }],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  nameWrap: {
    position: "absolute",
    left: 6,
    right: 6,
    bottom: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.25)",
  },
});
