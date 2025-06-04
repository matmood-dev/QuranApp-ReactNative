import { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SurahView() {
  const route = useRoute();
  const navigation = useNavigation();
  const { surahNumber }: any = route.params;
  const [surah, setSurah] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`)
      .then((res) => {
        setSurah(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [surahNumber]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#008aad" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: '#fdfdfd' }]}>
        {/* Surah Header */}
        <View style={styles.headerCard}>
          <Text style={styles.surahName}>{surah.name}</Text>
          <Text style={styles.revelation}>
            {surah.revelationType === 'Meccan' ? '🕋 مكية' : '🕌 مدنية'} • {surah.ayahs.length} آية
          </Text>
        </View>

        {/* Basmala (skip for Surah 1 and 9) */}
        {surah.number !== 9 && (
          <Text style={styles.basmala}>﷽</Text>
        )}

        {/* Centered Inline Ayahs */}
        <View style={styles.ayahBlock}>
          <Text style={styles.ayahInline}>
            {surah.ayahs.map((ayah: any, index: number) => {
              const cleanedText = ayah.text.replace(
                'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
                ''
              ).trim();

              return (
                <Text key={index}>
                  {cleanedText} <Text style={styles.ayahNumber}>﴿{ayah.numberInSurah}﴾ </Text>
                </Text>
              );
            })}
          </Text>
        </View>

      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        {surah.number > 1 && (
          <Text
            style={styles.navButton}
            onPress={() =>
              navigation.replace('SurahView', { surahNumber: surah.number - 1 })
            }
          >
            ◀️ Previous
          </Text>
        )}
        {surah.number < 114 && (
          <Text
            style={styles.navButton}
            onPress={() =>
              navigation.replace('SurahView', { surahNumber: surah.number + 1 })
            }
          >
            Next ▶️
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  surahName: {
    fontSize: 36,
    color: '#008aad',
    marginVertical: 6,
    fontFamily: 'QuranFont',
  },
  revelation: {
  fontSize: 16,
  color: '#444',
  textAlign: 'center',
  width: '100%',
  marginTop: 8,
},
  basmala: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'QuranFont',
    color: '#444',
  },
  ayahBlock: {
    alignSelf: 'center',
    alignItems: 'center',
    maxWidth: '98%',
  },
  ayahNumber: {
    fontSize: 18,
    color: '#888',
  },
  navButtons: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  navButton: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#008aad',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 25,
    overflow: 'hidden',
  },
  ayahInline: {
  fontFamily: 'QuranFont',
  fontSize: 26,
  lineHeight: 55,
  textAlign: 'center',
  color: '#222',
  flexWrap: 'wrap',
},
});
