import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageDropdown from './PageDropdown'; // Adjust path if needed
import SurahDropdown from './SurahDropdown'; // Adjust path if needed

export default function DropdownHeader({ currentPage }: { currentPage: number }) {
  return (
    <View style={styles.container}>
      {/* Higher zIndex for PageDropdown */}
      <View style={[styles.dropdownWrapper, { zIndex: 2000 }]}>
        <PageDropdown currentPage={currentPage} />
      </View>
      
      {/* Lower zIndex for SurahDropdown */}
      <View style={[styles.dropdownWrapper, { zIndex: 1000 }]}>
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
    gap: 8,
  },
  dropdownWrapper: {
    flex: 1,
  },
});
