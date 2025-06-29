import { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/HomeScreen/Header';

export default function SurahList() {
  const [surahs, setSurahs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/surah')
      .then((res) => setSurahs(res.data.data))
      .catch(console.error);
  }, []);

  const goToSurahPage = async (surahNumber: number) => {
    try {
      const res = await axios.get(
        `https://api.alquran.cloud/v1/ayah/${surahNumber}:1`
      );
      const page = res.data.data.page;
      navigation.navigate('PageView', { pageNumber: page });
    } catch (err) {
      console.error('❌ Failed to fetch page number', err);
    }
  };

  return (
    <>
      <Header />
    <LinearGradient colors={['#fdfcfb', '#e2d1c3']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fdfcfb" />
        <FlatList
          data={surahs}
          keyExtractor={(item) => item.number.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => goToSurahPage(item.number)}
            >
              <View style={styles.row}>
                <Text style={styles.number}>{item.number}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 70,
  },
  list: {
    padding: 16,
  },
  item: {
  paddingVertical: 18,
  paddingHorizontal: 16,
  backgroundColor: '#ffffff',
  borderRadius: 16,
  marginBottom: 12,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  number: {
    fontSize: 16,
    color: 'brown',
    fontWeight: 'bold',
    marginLeft: 14,
  },
  name: {
    fontSize: 24,
    fontFamily: 'QuranFont',
    color: '#222',
    textAlign: 'right',
  },
});
