import React, { useRef, useEffect } from "react";
import { Animated, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";

type Props = {
  item: {
    id: string;
    name: string;
    image: any;
  };
  index: number;
  onSelect: (id: string, name: string) => void;
};

export default function ReciterCard({ item, index, onSelect }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity style={cardStyles.card} onPress={() => onSelect(item.id, item.name)}>
        <Image source={item.image} style={cardStyles.image} />
        <View style={cardStyles.overlay}>
          <AppText color="white" align="center" font="lightFont" size={28}>{item.name}</AppText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    width: (require("react-native").Dimensions.get("window").width - 48) / 2,
    height: (require("react-native").Dimensions.get("window").width - 48) / 2,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    elevation: 4,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
});