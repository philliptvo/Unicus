import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/App/header';
import {
  CollectionsScreen,
  CollectionScreen,
  FormScreen,
  ItemScreen,
} from '../screens/Collections';

const Stack = createStackNavigator();

const CollectionsNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="My Collections"
        screenOptions={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} previous={previous} navigation={navigation} />
          ),
        }}
      >
        <Stack.Screen
          name="My Collections"
          component={CollectionsScreen}
          options={{ enableFeatures: ['search', 'filter'] }}
        />
        <Stack.Screen name="Collection" component={CollectionScreen} />
        <Stack.Screen name="Item" component={ItemScreen} />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={({ route }) => ({ headerTitle: `Create ${route.params.title}` })}
        />
      </Stack.Navigator>
    </>
  );
};

export default CollectionsNavigator;
