/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/login/login';
import SplashScreen from './src/splash/splash';
import RegisterScreen from './src/register/register';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';
import HomeScreen from './src/home/home';

const AppStack = createNativeStackNavigator();
const store = configureStore({});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack.Navigator initialRouteName="Splash">
          <AppStack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          <AppStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <AppStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />

          <AppStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;
