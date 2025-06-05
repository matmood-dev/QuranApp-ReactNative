import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/HomeScreen/Header';
import HomeHero from '../components/HomeScreen/HomeHero';
import FeatureCards from '../components/HomeScreen/FeatureCards';
import PrayerTimes from '../components/HomeScreen/PrayerTimes';



export default function HomeScreen() {

  return (
    <LinearGradient
      colors={['#fdfcfb', '#e2d1c3']}
      style={{ flex: 1 }}
    >
      <Header />
      <View style={styles.scrollShadow} />
      <ScrollView contentContainerStyle={styles.container}>
        
        <HomeHero />

        <FeatureCards />

        <PrayerTimes />

      </ScrollView>
    </LinearGradient>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    
  },
  scrollShadow: {
  height: 20,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
  zIndex: 500,
},
});
