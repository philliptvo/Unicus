import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/App/header';
import { SettingsScreen } from '../screens/Collections';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="My Collections"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
