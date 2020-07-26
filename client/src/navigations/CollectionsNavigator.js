import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CollectionsScreen, CollectionScreen, ItemScreen } from '../screens/Collections';

const Stack = createStackNavigator();

const CollectionsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Collections" component={CollectionsScreen} />
      <Stack.Screen name="Collection" component={CollectionScreen} />
      <Stack.Screen name="Item" component={ItemScreen} />
    </Stack.Navigator>
  );
};

export default CollectionsNavigator;
