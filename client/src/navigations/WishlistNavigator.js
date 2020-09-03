import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/App/header';
import { WishlistScreen } from '../screens/Collections';

const Stack = createStackNavigator();

const CollectionsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="My Collections"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
    </Stack.Navigator>
  );
};

export default CollectionsNavigator;
