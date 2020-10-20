import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationHeader from '../components/navigationHeader';
import { AchievementsScreen } from '../screens/Collections';

const Stack = createStackNavigator();

const AchievementsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Achievements"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <NavigationHeader scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
    </Stack.Navigator>
  );
};

export default AchievementsNavigator;
