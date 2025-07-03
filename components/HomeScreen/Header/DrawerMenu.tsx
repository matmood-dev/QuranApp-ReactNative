import React from 'react';
import { I18nManager, StyleSheet, Text, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../../../screens/HomeScreen';
import SurahList from '../../../screens/SurahList';
import SettingsScreen from '../../../screens/SettingsScreen';
import AboutScreen from '../../../screens/AboutScreen';
import PrayerTimeScreen from '../../../screens/PrayerTimeScreen';
import ReciterListScreen from '../../../screens/ListenToQuranScreen/ReciterListScreen';
import SurahAudioScreen from '../../../screens/ListenToQuranScreen/SurahAudioScreen';
import FullAudioPlayerScreen from '../../../screens/ListenToQuranScreen/FullAudioPlayerScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const currentRoute = props.state.routeNames[props.state.index];

  const drawerItems = [
    { label: 'الرئيسية', icon: 'home-outline', screen: 'HomeScreen' },
    { label: 'المصحف الشريف', icon: 'book-outline', screen: 'SurahList' },
    { label: 'الاستماع للقرآن', icon: 'headset-outline', screen: 'ReciterListScreen' },
    { label: 'مواقيت الصلاة', icon: 'time-outline', screen: 'PrayerTime' },
    { label: 'الإعدادات', icon: 'settings-outline', screen: 'Settings' },
    { label: 'حول التطبيق', icon: 'information-circle-outline', screen: 'About' }, // ✅
  ];

  return (
    <LinearGradient colors={['#fdfcfb', '#e2d1c3']} style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        <View style={styles.header}>
          <Image source={require('../../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        {drawerItems.map((item, index) => (
          <DrawerItem
            key={index}
            label={item.label}
            onPress={() => props.navigation.navigate(item.screen)}
            labelStyle={[styles.label, currentRoute === item.screen && styles.activeLabel]}
            style={currentRoute === item.screen && styles.activeItem}
            icon={({ color, size }) => (
              <Ionicons
                name={item.icon}
                size={22}
                color={currentRoute === item.screen ? '#6b4c3b' : '#888'}
              />
            )}
          />
        ))}
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

export default function DrawerMenu() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition: I18nManager.isRTL ? 'left' : 'right',
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="SurahList" component={SurahList} />
      <Drawer.Screen name="PrayerTime" component={PrayerTimeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="ReciterListScreen" component={ReciterListScreen} />
      <Drawer.Screen name="SurahAudioScreen" component={SurahAudioScreen} />
      <Drawer.Screen name="FullAudioPlayerScreen" component={FullAudioPlayerScreen} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 40,
  },
  label: {
    textAlign: 'right',
    fontSize: 16,
    color: '#333',
  },
  activeItem: {
    backgroundColor: '#fff5ee',
    borderRightWidth: 5,
    borderRightColor: '#6b4c3b',
  },
  activeLabel: {
    color: '#6b4c3b',
    fontWeight: 'bold',
  },
});
