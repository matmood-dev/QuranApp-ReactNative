import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropdownHeader from '../components/DropdownHeader'; // Adjust path if needed
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PageView() {
  const route = useRoute();
  const navigation = useNavigation();
  const { pageNumber }: any = route.params;
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.alquran.cloud/v1/page/${pageNumber}/quran-uthmani`)
      .then((res) => {
        setPageData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [pageNumber]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" />
        <ActivityIndicator size="large" color="#008aad" />
      </SafeAreaView>
    );
  }

  const surahGroups: { [surahNumber: number]: any[] } = {};
  pageData.ayahs.forEach((ayah: any) => {
    if (!surahGroups[ayah.surah.number]) {
      surahGroups[ayah.surah.number] = [];
    }
    surahGroups[ayah.surah.number].push(ayah);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" />

      {/* Page selector with zIndex fix */}
      <View style={{ zIndex: 1000 }}>
        <DropdownHeader currentPage={pageNumber} />
      </View>


      {/* Scrollable content with nestedScrollEnabled to avoid FlatList conflict */}
      <ScrollView
        contentContainerStyle={styles.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ayahBlock}>
          {Object.values(surahGroups).map((ayahList: any[], index: number) => {
            const firstAyah = ayahList[0];
            const isTawbah = firstAyah.surah.number === 9;

            return (
              <View key={index} style={{ marginBottom: 32 }}>
                <Text style={styles.surahHeading}>{firstAyah.surah.name}</Text>
                {firstAyah.numberInSurah === 1 && !isTawbah && (
                  <Text style={styles.basmala}>﷽</Text>
                )}
                <Text style={styles.ayahInline}>
                  {ayahList.map((ayah: any, i: number) => {
                    const cleanedText = ayah.text.replace(
                      'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
                      ''
                    ).trim();

                    return (
                      <Text key={i}>
                        {cleanedText}{' '}
                        <Text style={styles.ayahNumber}>﴿{ayah.numberInSurah}﴾ </Text>
                      </Text>
                    );
                  })}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <Text style={styles.pageNumber}>صفحة {pageNumber}</Text>

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          onPress={() => {
            if (pageNumber < 604) {
              navigation.navigate('PageView', { pageNumber: pageNumber + 1 });
            }
          }}
          style={styles.navButton}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
          <Text style={styles.navButtonText}>الصفحة التالية</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (pageNumber > 1) {
              navigation.navigate('PageView', { pageNumber: pageNumber - 1 });
            }
          }}
          style={[styles.navButton, pageNumber <= 1 && { opacity: 0.5 }]}
          disabled={pageNumber <= 1}
        >
          <Text style={styles.navButtonText}>الصفحة السابقة</Text>
          <Ionicons name="chevron-forward" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
  },
  ayahBlock: {
    maxWidth: '96%',
    alignItems: 'center',
  },
  surahHeading: {
    fontSize: 34,
    fontFamily: 'QuranFont',
    color: '#004d66',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#e6f4f1',
    borderRadius: 12,
    elevation: 2,
  },
  basmala: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'QuranFont',
    color: '#004d66',
    marginTop: 8,
    marginBottom: 16,
  },
  ayahInline: {
    fontFamily: 'QuranFont',
    fontSize: 26,
    lineHeight: 48,
    textAlign: 'center',
    color: '#222',
    paddingHorizontal: 4,
  },
  ayahNumber: {
    fontSize: 18,
    color: '#999',
  },
  pageNumber: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginVertical: 12,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#008aad',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
