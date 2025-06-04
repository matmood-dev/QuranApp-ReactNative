import { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
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
                {/* Optional: English name and ayah count */}
                {/* <Text style={styles.details}>{item.englishName} • {item.numberOfAyahs} Ayahs</Text> */}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    padding: 16,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  number: {
    fontSize: 16,
    color: '#008aad',
    marginLeft: 12,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontFamily: 'QuranFont',
    color: '#222',
    textAlign: 'right',
  },
  details: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
});
