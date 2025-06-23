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
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DropdownHeader from '../components/DropdownHeader';

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
        <StatusBar barStyle="dark-content" backgroundColor="#fdfcfb" />
        <ActivityIndicator size="large" color="brown" />
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
    <LinearGradient colors={['#fdfcfb', '#e2d1c3']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fdfcfb" />

        <View style={{ zIndex: 1000, paddingHorizontal: 16, marginBottom: 8 }}>
          <DropdownHeader currentPage={pageNumber} />
        </View>

        <View style={styles.mainContent}>
  <View style={styles.card}>
    <ScrollView
      style={styles.ayahScroll}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
      {Object.values(surahGroups).map((ayahList: any[], index: number) => {
        const firstAyah = ayahList[0];
        const isTawbah = firstAyah.surah.number === 9;

        return (
          <View key={index} style={{ marginBottom: 24 }}>
            <Text style={styles.surahHeading}>{firstAyah.surah.name}</Text>
            {firstAyah.numberInSurah === 1 && !isTawbah && (
              <Text style={styles.basmala}>﷽</Text>
            )}
            <Text style={styles.ayahText}>
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
    </ScrollView>
  </View>
</View>


        <View style={styles.footer}>
          <Text style={styles.pageNumber}>صفحة {pageNumber}</Text>
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
              style={[
                styles.navButton,
                pageNumber <= 1 && { opacity: 0.5 },
              ]}
              disabled={pageNumber <= 1}
            >
              <Text style={styles.navButtonText}>الصفحة السابقة</Text>
              <Ionicons name="chevron-forward" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 70,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfcfb',
  },
  mainContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffffcc',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    maxWidth: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  surahHeading: {
    fontSize: 26,
    fontFamily: 'QuranFont',
    textAlign: 'center',
    color: 'brown',
    marginBottom: 12,
  },
  basmala: {
    fontSize: 36,
    fontFamily: 'QuranFont',
    color: '#6b4c3b',
    textAlign: 'center',
    marginBottom: 16,
  },
 ayahScroll: {
  maxHeight: 480, 
  marginTop: 8,
},
  ayahText: {
    fontSize: 24,
    fontFamily: 'QuranFont',
    textAlign: 'center',
    lineHeight: 40,
    color: '#222',
  },
  ayahNumber: {
    fontSize: 18,
    color: '#a18a7f',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  pageNumber: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#6b4c3b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 6,
    fontWeight: '600',
  },
});
