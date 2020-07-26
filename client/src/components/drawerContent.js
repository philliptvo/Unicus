import React from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

import { useAuthState, useAuthDispatch } from '../common/contexts/auth';

const DrawerContent = (props) => {
  const { userName, isDarkTheme } = useAuthState();
  const dispatch = useAuthDispatch();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('refresh-token');

      dispatch({ type: 'LOGOUT' });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
              }}
              size={50}
            />
            <View style={{ flexDirection: 'column', marginLeft: 15 }}>
              <Title style={styles.title}>{userName}</Title>
              <Caption style={styles.caption}>Title: Hoarder</Caption>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>15</Paragraph>
              <Caption style={styles.caption}>Collections</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
              <Caption style={styles.caption}>Items</Caption>
            </View>
          </View>
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItemList {...props} />
        </Drawer.Section>

        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => toggleTheme()}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={isDarkTheme} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => <MaterialIcons name="exit-to-app" color={color} size={size} />}
          label="Logout"
          onPress={() => logout()}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default DrawerContent;
