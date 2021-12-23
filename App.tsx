/**
 * https://reactnavigation.org/docs/hello-react-navigation
 */
import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandler  from 'components/Error';

import SplashScreen from 'screens/Splash';
import HomeScreen from 'screens/Home';
import VideoScreen from 'screens/Video';

/**
 * https://reactnavigation.org/docs/native-stack-navigator#options
 */
const Stack = createNativeStackNavigator();

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle={'light-content'} translucent={true} backgroundColor="transparent" />
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{animation: 'fade'}}
            />
            <Stack.Screen name="Video" component={VideoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default App;