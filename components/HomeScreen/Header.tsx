import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Menu, Bell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../../types/navigation';

export default function Header() {
  type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fdfdfd',
    zIndex: 1000,
    position: 'absolute',
    width: '100%',
  },
  header: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60, // Adjust if needed
  },
  logo: {
    width: 120,
    height: 40,
  },
});
