/**
 * https://reactnavigation.org/docs/hello-react-navigation
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
      <NavigationContainer>
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
    </ErrorBoundary>
  );
}

export default App;