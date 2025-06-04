import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BottomTabs from './navigation/BottomTabs';
import PageView from './screens/PageView';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'QuranFont': require('./assets/fonts/ScheherazadeNew-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Tab-based main app */}
          <Stack.Screen name="MainTabs" component={BottomTabs} />
          {/* Stack-only screen */}
          <Stack.Screen name="PageView" component={PageView} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
