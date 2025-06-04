import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface PageDropdownProps {
  currentPage: number;
}

export default function PageDropdown({ currentPage }: PageDropdownProps) {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentPage);
  const [items, setItems] = useState(
    Array.from({ length: 604 }, (_, i) => ({
      label: `صفحة ${i + 1}`,
      value: i + 1,
    }))
  );

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
          navigation.navigate('PageView', { pageNumber: newValue });
        }}
        setItems={setItems}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        placeholder="اختر الصفحة"
        zIndex={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 10,
    zIndex: 1000,
    width: '100%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    textAlign: 'right',
  },
  dropdown: {
    borderColor: '#ccc',
  },
  dropdownText: {
    textAlign: 'right',
  },
});
