import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/App/header';
import { AchievementsScreen } from '../screens/Collections';

const Stack = createStackNavigator();

const AchievementsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="My Collections"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
    </Stack.Navigator>
  );
};

export default AchievementsNavigator;
