import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NavigationDrawer from '../components/navigationDrawer';
import CollectionsNavigator from './CollectionsNavigator';
import WishlistNavigator from './WishlistNavigator';
import SettingsNavigator from './SettingsNavigator';
import AchievementsNavigator from './AchievementsNavigator';

import NavigationDrawerIcon from '../components/navigationDrawerIcon';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="CollectionsStack"
      drawerContent={(props) => <NavigationDrawer {...props} />}
      screenOptions={{ swipeEnabled: false }} // FIX: temporary fix for disabling drawer when navigating in nested stacks
    >
      <Drawer.Screen
        name="CollectionsStack"
        component={CollectionsNavigator}
        options={{
          drawerLabel: 'Collections',
          drawerIcon: ({ color }) => <NavigationDrawerIcon name="collections" color={color} />,
        }}
      />
      <Drawer.Screen
        name="WishlistStack"
        component={WishlistNavigator}
        options={{
          drawerLabel: 'Wishlist',
          drawerIcon: ({ color }) => <NavigationDrawerIcon name="star" color={color} />,
        }}
      />
      <Drawer.Screen
        name="AchievementsStack"
        component={AchievementsNavigator}
        options={{
          drawerLabel: 'Achievements',
          drawerIcon: ({ color }) => <NavigationDrawerIcon name="turned-in" color={color} />,
        }}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingsNavigator}
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ size, color }) => <NavigationDrawerIcon name="settings" color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
