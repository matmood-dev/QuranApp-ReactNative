import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

export default function HomeHero() {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      {/* Search Box */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#6C757D" />
        <TextInput
          placeholder="ابحث عن سورة أو قارئ..."
          placeholderTextColor="#ADB5BD"
          style={styles.input}
        />
        <Ionicons name="mic-outline" size={20} color="#6C757D" />
      </View>

      {/* Hero Card */}
      <View style={styles.heroCardContainer}>
        <Image
          source={require("../../assets/audio-card.jpg")}
          style={styles.heroBackgroundImage}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.4)"]}
          style={StyleSheet.absoluteFill}
        />

        <BlurView intensity={15} tint="light" style={StyleSheet.absoluteFill} />

        <View style={styles.heroContent}>
          <View style={styles.textContainer}>
            <Text style={styles.heroTitle}>استمع للقرآن الكريم</Text>
            <Text style={styles.heroSubtitle}>
              تطبيقك المفضل لتلاوة القرآن وتدبر معانيه
            </Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => navigation.navigate("ReciterListScreen")}
            >
              <Text style={styles.heroButtonText}>ابدأ الاستماع</Text>
              <Ionicons
                name="play"
                size={16}
                color="#fff"
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../assets/quran-illustration.png")}
            style={styles.heroForegroundImage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
    textAlign: 'right',
    paddingHorizontal: 8,
  },
  heroCardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 200,
    marginBottom: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  heroBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'right',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'DINNextLTArabic-Regular',
    marginBottom: 20,
    textAlign: 'right',
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroButton: {
    backgroundColor: '#38A169',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  buttonIcon: {
    marginRight: 8,
  },
  heroForegroundImage: {
    width: 120,
    height: 120,
    marginLeft: 16,
    resizeMode: 'contain',
    zIndex: 1,
  },
});