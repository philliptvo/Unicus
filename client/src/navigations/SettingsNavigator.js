import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationHeader from '../components/navigationHeader';
import { EditProfileScreen, SettingsScreen } from '../screens/Settings';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <NavigationHeader scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerTitle: 'Edit Profile' }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
