import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

import DrawerContent from '../components/drawerContent';
import CollectionsNavigator from './CollectionsNavigator';
import WishlistNavigator from './WishlistNavigator';
import SettingsNavigator from './SettingsNavigator';
import AchievementsNavigator from './AchievementsNavigator';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="My Collections"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={CollectionsNavigator}
        options={{
          drawerLabel: 'Collections',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="collections" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Wishlist"
        component={WishlistNavigator}
        options={{
          drawerLabel: 'Wishlist',
          drawerIcon: ({ size, color }) => <MaterialIcons name="star" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Achievements"
        component={AchievementsNavigator}
        options={{
          drawerLabel: 'Achievements',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="turned-in" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
