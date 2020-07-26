import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { WishlistScreen } from '../screens/Collections';

const Stack = createStackNavigator();

const CollectionsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
    </Stack.Navigator>
  );
};

export default CollectionsNavigator;
