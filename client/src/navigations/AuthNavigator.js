import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, RegisterScreen, SplashScreen } from '../screens/Auth';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{ animationEnabled: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
