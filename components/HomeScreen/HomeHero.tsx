import React from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

import AppText from '../AppText';

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
            <AppText size={24} color='white'>استمع للقرآن الكريم</AppText>
            <AppText size={16} color='white' style={{ marginTop: 8 }}>
              تطبيقك المفضل لتلاوة القرآن وتدبر معانيه
            </AppText>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => navigation.navigate("ReciterListScreen")}
            >
              <AppText color='white'>ابدأ الاستماع</AppText>
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
    fontFamily: 'normalFont',
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