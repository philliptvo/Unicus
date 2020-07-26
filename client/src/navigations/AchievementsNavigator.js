import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AchievementsScreen } from '../screens/Collections';

const Stack = createStackNavigator();

const AchievementsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
    </Stack.Navigator>
  );
};

export default AchievementsNavigator;
