import { useEffect, useState } from 'react';
import { I18nManager, LogBox } from 'react-native';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomTabs from './navigation/BottomTabs';
import PageView from './screens/PageView';
import SurahList from './screens/SurahList';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

// Optional: silence warnings about RTL layout flips
LogBox.ignoreLogs(['Require cycle:', 'VirtualizedLists should never be nested']);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Enable RTL once
    if (!I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    // I18nManager.forceRTL(true);
    // console.log('RTL enabled – restart the app to apply changes.');
  }

    Font.loadAsync({
      QuranFont: require('./assets/fonts/ScheherazadeNew-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PageView" component={PageView} />
          <Stack.Screen name="SurahList" component={SurahList} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
