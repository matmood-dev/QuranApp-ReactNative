import { useEffect, useState } from 'react';
import { I18nManager, LogBox, View } from 'react-native';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DrawerMenu from './components/HomeScreen/Header/DrawerMenu';
import PageView from './screens/PageView';
import SurahList from './screens/SurahList';
import { AudioProvider } from './context/AudioContext'; 
import MiniPlayer from './screens/ListenToQuranScreen/components/MiniPlayer'; 
import DuasListScreen from './screens/MafatihScreen/DuasListScreen'
import DuaDetailScreen from './screens/MafatihScreen/DuaDetailScreen'

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
      lightFont: require('./assets/fonts/Rubik-Light.ttf'),
      normalFont: require('./assets/fonts/Rubik-Regular.ttf'),
      boldFont: require('./assets/fonts/Rubik-Medium.ttf'),
      duaLightFont: require('./assets/fonts/Lateef-ExtraLight.ttf'),
      duaNormalFont: require('./assets/fonts/Lateef-Regular.ttf'),
      duaBoldFont: require('./assets/fonts/Lateef-SemiBold.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
  <AudioProvider>
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DrawerMenu" component={DrawerMenu} />
          <Stack.Screen name="PageView" component={PageView} />
          <Stack.Screen name="SurahList" component={SurahList} />
          <Stack.Screen name="DuasListScreen" component={DuasListScreen} />
          <Stack.Screen name="DuaDetailScreen" component={DuaDetailScreen} />
        </Stack.Navigator>

        <MiniPlayer />
      </View>
    </NavigationContainer>
  </AudioProvider>
</SafeAreaProvider>
  );
}
