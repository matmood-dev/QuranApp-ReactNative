import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageDropdown from './PageDropdown'; // Adjust path if needed
import SurahDropdown from './SurahDropdown'; // Adjust path if needed

export default function DropdownHeader({ currentPage }: { currentPage: number }) {
  return (
    <View style={styles.container}>
      <View style={styles.dropdownWrapper}>
        <PageDropdown currentPage={currentPage} />
      </View>
      <View style={styles.dropdownWrapper}>
        <SurahDropdown />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 10,
    zIndex: 1000,
    gap: 8,
  },
  dropdownWrapper: {
    flex: 1,
    zIndex: 1000, // important for dropdown visibility
  },
});
