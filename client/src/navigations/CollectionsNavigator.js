import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationHeader from '../components/navigationHeader';
import {
  CollectionsScreen,
  CollectionScreen,
  FormScreen,
  ItemScreen,
} from '../screens/Collections';

const Stack = createStackNavigator();

const CollectionsNavigator = () => {
  const header = ({ scene, previous, navigation }) => (
    <NavigationHeader scene={scene} previous={previous} navigation={navigation} />
  );

  return (
    <>
      <Stack.Navigator
        initialRouteName="My Collections"
        screenOptions={{
          header,
        }}
      >
        <Stack.Screen
          name="My Collections"
          component={CollectionsScreen}
          options={{ enableFeatures: ['search', 'filter'] }}
        />
        <Stack.Screen
          name="Collection"
          component={CollectionScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Item" component={ItemScreen} />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={({ route }) => ({
            headerTitle: `New ${route.params.title}`,
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default CollectionsNavigator;
