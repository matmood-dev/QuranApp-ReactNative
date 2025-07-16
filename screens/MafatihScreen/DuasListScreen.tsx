// screens/DuasListScreen.tsx
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Animated,
  Dimensions 
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

type DuasListRouteProp = RouteProp<RootStackParamList, "DuasListScreen">;
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

export default function DuasListScreen() {
  const route = useRoute<DuasListRouteProp>();
  const navigation = useNavigation<NavProp>();
  const { title, items } = route.params;
  
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient colors={["#fdfcfb", "#f7f0e8", "#f3e7d9"]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        
        {/* Enhanced Header Section */}
        <View style={styles.headerSection}>
          <LinearGradient
            colors={["#8b6f47", "#6b4c3b"]}
            style={styles.titleContainer}
          >
            <MaterialIcons 
              name="menu-book" 
              size={24} 
              color="#ffffff" 
              style={styles.titleIcon}
            />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.titleUnderline} />
          </LinearGradient>
          
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              اختر الدعاء الذي تريد قراءته
            </Text>
            <Text style={styles.itemCount}>
              {items[0]?.duas.length || 0} دعاء
            </Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {items[0]?.duas.map((dua, index) => (
            <Animated.View
              key={index}
              style={[
                styles.cardWrapper,
                { transform: [{ scale: scaleAnim }] }
              ]}
            >
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("DuaDetailScreen", { title: dua.title })}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#ffffff", "#fafafa"]}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.numberContainer}>
                      <LinearGradient
                        colors={["#e6d2c3", "#d4c4b0"]}
                        style={styles.numberCircle}
                      >
                        <Text style={styles.numberText}>{index + 1}</Text>
                      </LinearGradient>
                    </View>
                    
                    <View style={styles.textContainer}>
                      <Text style={styles.duaText}>{dua.title}</Text>
                    </View>
                    
                    <View style={styles.arrowContainer}>
                      <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color="#6b4c3b"
                        style={styles.arrowIcon}
                      />
                    </View>
                  </View>
                  
                  {/* Decorative elements */}
                  <View style={styles.cornerAccent} />
                  <View style={styles.bottomAccent} />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
          
          {/* Bottom spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  headerSection: {
    marginBottom: 25,
    paddingHorizontal: 16,
  },
  titleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  titleUnderline: {
    position: "absolute",
    bottom: 8,
    width: 60,
    height: 3,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    opacity: 0.8,
  },
  subtitleContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "#5a4a3c",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: "#8b6f47",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardGradient: {
    position: "relative",
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 16,
  },
  numberContainer: {
    marginLeft: 12,
  },
  numberCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  numberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b4c3b",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  duaText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4F4F4F",
    textAlign: "center",
    lineHeight: 24,
  },
  arrowContainer: {
    marginRight: 4,
  },
  arrowIcon: {
    opacity: 0.6,
  },
  cornerAccent: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    backgroundColor: "rgba(107, 76, 59, 0.06)",
    borderBottomLeftRadius: 15,
  },
  bottomAccent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(107, 76, 59, 0.1)",
  },
  bottomSpacer: {
    height: 30,
  },
});