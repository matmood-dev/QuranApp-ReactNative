import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import SurahList from '../screens/SurahList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PageView from '../screens/PageView';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#008aad',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          height: 80,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'الرئيسية') iconName = 'home';
          else if (route.name === 'القرآن الكريم') iconName = 'book-sharp';
          else if (route.name === 'الاستماع للقرآن') iconName = 'musical-notes';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="hh" component={HomeScreen} />
      <Tab.Screen name="الرئيسية" component={Home} />
      <Tab.Screen name="القرآن الكريم" component={SurahList} />
    </Tab.Navigator>
  );
}
