import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationHeader from '../components/navigationHeader';
import { WishlistScreen } from '../screens/Collections';

const Stack = createStackNavigator();

const CollectionsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Wishlist"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <NavigationHeader scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
    </Stack.Navigator>
  );
};

export default CollectionsNavigator;
