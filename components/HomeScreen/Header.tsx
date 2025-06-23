import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Menu, Bell } from 'lucide-react-native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Bell size={24} color="#333" />
      

      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Menu size={26} color="#333" />
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
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
