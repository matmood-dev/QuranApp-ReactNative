import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { I18nManager } from 'react-native';
import { Menu, Bell } from 'lucide-react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      {/* Left Icon */}
      <Menu size={26} color="#333" />

      {/* Center Logo */}
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Right Icon */}
      <Bell size={24} color="#333" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // top: 0,
    // left: 0,
    // right: 0,
    zIndex: 1000,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fdfdfd',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    position: 'absolute',
    width: '100%', 

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
  },
  logo: {
    width: 120,
    height: 40,
  },
});
