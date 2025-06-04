import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SurahDropdown() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/surah')
      .then((res) => {
        const formatted = res.data.data.map((surah: any) => ({
          label: surah.name,
          value: surah.number,
        }));
        setItems(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch surahs', err);
        setLoading(false);
      });
  }, []);

  const handleSelect = async (surahNumber: number) => {
    try {
      const res = await axios.get(`https://api.alquran.cloud/v1/ayah/${surahNumber}:1`);
      const page = res.data.data.page;
      navigation.navigate('PageView', { pageNumber: page });
    } catch (err) {
      console.error('Failed to fetch page for surah', err);
    }
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          const newValue = callback(value);
          setValue(newValue);
          handleSelect(newValue);
        }}
        setItems={setItems}
        placeholder="اختر السورة"
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        loading={loading}
        zIndex={999}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 10,
    zIndex: 999,
    width: '100%',
    alignSelf: 'center',
  },
  dropdown: {
    borderColor: '#ccc',
  },
  dropdownText: {
    textAlign: 'right',
  },
});
