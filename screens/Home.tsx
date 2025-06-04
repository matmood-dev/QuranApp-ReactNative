import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const features = [
  {
    title: 'قراءة القرآن',
    icon: 'book',
    screen: 'القرآن الكريم',
    image: require('../assets/quran-card.jpg'),
  },
  {
    title: 'الاستماع للقرآن',
    icon: 'headset',
    screen: '',
    image: require('../assets/audio-card.jpg'),
  },
  // {
  //   title: 'مفاتيح الجنان',
  //   icon: 'bookmarks',
  //   screen: '',
  //   image: require('../assets/duas-card.jpg'),
  // },
];

const numColumns = 2;
const cardSize = Dimensions.get('window').width / numColumns - 32;

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground source={require('../assets/masjid-bg.jpg')} style={styles.background} resizeMode="cover">
        <View style={styles.overlay} />

        <View style={styles.container}>
          <Text style={styles.header}>مرحبًا بك في تطبيق القرآن الكريم</Text>

          <FlatList
            data={features}
            numColumns={numColumns}
            keyExtractor={(item) => item.title}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cardWrapper}
                onPress={() => item.screen && navigation.navigate(item.screen)}
                disabled={!item.screen}
                activeOpacity={0.85}
              >
                <ImageBackground
                  source={item.image}
                  style={styles.card}
                  imageStyle={styles.cardImage}
                >
                  <View style={styles.cardOverlay} />
                  <Ionicons name={item.icon} size={36} color="#fff" />
                  <Text style={styles.cardText}>{item.title}</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 1,
  },
  grid: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 24,
  },
  cardWrapper: {
    width: cardSize,
    height: cardSize,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    resizeMode: 'cover',
    borderRadius: 16,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 16,
  },
  cardText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
