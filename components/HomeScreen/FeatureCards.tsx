import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardSize = width / 4;

const features = [
  { title: 'قراءة القرآن', screen: 'SurahList', image: require('../../assets/quran-card.jpg') },
  { title: 'الاستماع للقرآن', screen: 'AudioQuran', image: require('../../assets/audio-card.jpg') },
  { title: 'مفاتيح الجنان', screen: 'Mafatih', image: require('../../assets/duas-card.jpg') },
  { title: 'قريبًا', screen: '', image: require('../../assets/comingsoon.jpg'), disabled: true },
];

export default function FeatureCards() {
  const navigation = useNavigation();

  return (
    <FlatList
      horizontal
      data={features}
      keyExtractor={(item) => item.title}
      showsHorizontalScrollIndicator={false}
      style={{ marginVertical: 16 }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={item.disabled}
          style={styles.card}
          onPress={() => {
            if (!item.disabled) navigation.navigate(item.screen);
          }}
        >
          <Image source={item.image} style={styles.cardImage} />
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginRight: 16,
  },
  cardImage: {
    width: cardSize,
    height: cardSize,
    borderRadius: 12,
  },
  cardText: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
  },
});
