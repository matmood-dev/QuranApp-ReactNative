import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "../../components/AppText";

type DuaDetailRouteProp = RouteProp<RootStackParamList, "DuaDetailScreen">;

export default function DuaDetailScreen() {
  const route = useRoute<DuaDetailRouteProp>();
  const navigation = useNavigation();
  const { title, header, text, text2 } = route.params;
  const [fontSize, setFontSize] = useState(34);

  const increaseFontSize = () => {
    if (fontSize < 60) setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 20) setFontSize(fontSize - 2);
  };

  return (
    <LinearGradient
      colors={["#fdfcfb", "#f7f0e8", "#f3e7d9"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* Enhanced Header */}
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={["#8b6f47", "#6b4c3b"]}
              style={styles.backButtonGradient}
            >
              <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>

          <LinearGradient
            colors={["#8b6f47", "#6b4c3b"]}
            style={styles.titleContainer}
          >
            <AppText color="white" font="lightFont" size={26} align="center">{title}</AppText>
            <View style={styles.titleUnderline} />
          </LinearGradient>
        </View>

        {/* Control Bar */}
        <View style={styles.controlBar}>
          <LinearGradient
            colors={["#ffffff", "#fafafa"]}
            style={styles.controlBarGradient}
          >
            <TouchableOpacity
              style={styles.controlButton}
              onPress={decreaseFontSize}
            >
              <MaterialIcons name="text-decrease" size={20} color="#6b4c3b" />
            </TouchableOpacity>

            <View style={styles.fontSizeIndicator}>
              <AppText color="#6b4c3b">حجم الخط</AppText>
              <AppText color="#6b4c3b" align="center">{fontSize}</AppText>
            </View>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={increaseFontSize}
            >
              <MaterialIcons name="text-increase" size={20} color="#6b4c3b" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Dua Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Main Dua Content */}
          <View style={styles.duaContentContainer}>
            <LinearGradient
              colors={["#ffffff", "#fafafa"]}
              style={styles.duaContentGradient}
            >
              <View style={styles.decorativeTop} />

              <View style={styles.duaTextContainer}>
                {header ? (
                  <AppText align="center" size={30} color="#6b4c3b" font="duaLightFont">
                    {header}
                  </AppText>
                ) : null}

                <AppText font="QuranFont" align="center" size={60} color="#6b4c3b">
                ﷽
              </AppText>

                <AppText style={{ fontSize }} font="duaNormalFont" align="center" color="#333333">
                  {text || "لم يتم العثور على نص الدعاء."}
                </AppText>

                {text2 ? (
                  <AppText style={{ fontSize }} font="duaNormalFont" align="center" color="#333333">
                    {text2}
                  </AppText>
                ) : null}
              </View>
              <View style={styles.decorativeBottom} />
            </LinearGradient>
          </View>
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
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 16,
    zIndex: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  backButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  titleIcon: {
    marginBottom: 8,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: "#ffffff",
    borderRadius: 2,
    marginTop: 8,
    opacity: 0.8,
  },
  controlBar: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  controlBarGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  controlButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(107, 76, 59, 0.1)",
  },
  fontSizeIndicator: {
    alignItems: "center",
    backgroundColor: "rgba(107, 76, 59, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  bismillahContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  bismillahGradient: {
    padding: 16,
    alignItems: "center",
  },
  duaContentContainer: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  duaContentGradient: {
    position: "relative",
  },
  decorativeTop: {
    height: 4,
    backgroundColor: "rgba(107, 76, 59, 0.1)",
  },
  duaTextContainer: {
    padding: 24,
  },
  decorativeBottom: {
    height: 4,
    backgroundColor: "rgba(107, 76, 59, 0.1)",
  },
});
