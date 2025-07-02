import { useEffect, useState } from 'react';
import { I18nManager, LogBox, View } from 'react-native';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DrawerMenu from './components/HomeScreen/Header/DrawerMenu';
import PageView from './screens/PageView';
import SurahList from './screens/SurahList';
import { AudioProvider } from './context/AudioContext'; // ✅ Import context
import MiniPlayer from './screens/ListenToQuranScreen/components/MiniPlayer'; // ✅ Optional MiniPlayer

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Require cycle:', 'VirtualizedLists should never be nested']);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
    }

    Font.loadAsync({
      QuranFont: require('./assets/fonts/ScheherazadeNew-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
  <AudioProvider>
    <NavigationContainer>
      {/* 👇 This wrapper ensures MiniPlayer is part of the visual stack */}
      <View style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
          <Stack.Screen name="PageView" component={PageView} />
          <Stack.Screen name="SurahList" component={SurahList} />
        </Stack.Navigator>

        {/* ✅ MiniPlayer placed at the bottom of every screen */}
        <MiniPlayer />
      </View>
    </NavigationContainer>
  </AudioProvider>
</SafeAreaProvider>
  );
}
