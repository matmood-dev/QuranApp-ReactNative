import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

interface PageDropdownProps {
  currentPage: number;
}

export default function PageDropdown({ currentPage }: PageDropdownProps) {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PageView'>;
  
  const navigation = useNavigation<NavigationProp>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentPage);
  const [items, setItems] = useState(
    Array.from({ length: 604 }, (_, i) => ({
      label: `صفحة ${i + 1}`,
      value: i + 1,
    }))
  );

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
          navigation.navigate('PageView', { pageNumber: newValue });
        }}
        setItems={setItems}
        placeholder="اختر الصفحة"
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    marginTop: 10,
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
});
