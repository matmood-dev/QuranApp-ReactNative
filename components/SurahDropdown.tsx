import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function SurahDropdown() {

  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PageView'>;

  const navigation = useNavigation<NavigationProp>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.alquran.cloud/v1/surah')
      .then((res) => {
        const formatted = res.data.data.map((surah: any) => ({
          label: `${surah.name}`,
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
    <View style={styles.wrapper}>
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
        searchable={true}
        searchPlaceholder="اكتب اسم السورة"
        searchTextInputStyle={styles.searchInput}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        listItemContainerStyle={styles.listItem}
        listItemLabelStyle={styles.listItemText}
        modalContentContainerStyle={styles.modalContent}
        modalProps={{
          animationType: 'slide',
        }}
        listMode="MODAL"
        dropDownDirection="AUTO"
        rtl={true}
        loading={loading}
        zIndex={2000}
        zIndexInverse={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    marginTop: 10,
    zIndex: 2000,
  },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
    height: 50,
  },
  dropdownText: {
    textAlign: 'right',
    fontSize: 16,
    color: '#333',
  },
  modalContent: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  listItem: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  listItemText: {
    textAlign: 'right',
    fontSize: 18,
    color: '#444',
  },
  searchInput: {
    textAlign: 'right',
    fontSize: 16,
  },
});
