import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import logo from '../assets/logo.png';

const NavigationHeader = ({ scene, previous, navigation }) => {
  const theme = useTheme();

  const { options } = scene.descriptor;

  return (
    <Appbar.Header
      theme={{ ...theme }}
      style={{ ...(options.headerTransparent && { backgroundColor: 'transparent' }) }}
    >
      {previous ? (
        <Appbar.BackAction color="white" onPress={() => navigation.pop()} />
      ) : (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={options.headerTitle !== undefined ? options.headerTitle : scene.route.name}
        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
      />
      {options.enableFeatures?.includes('search') && (
        <Appbar.Action icon="magnify" onPress={() => alert('TODO: Search')} />
      )}
      {options.enableFeatures?.includes('filter') && (
        <Appbar.Action icon="filter-variant" onPress={() => alert('TODO: Filter')} />
      )}
      {options.enableFeatures?.includes('options') && (
        <Appbar.Action icon="dots-vertical" onPress={() => alert('TODO: Options')} />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
});

export default NavigationHeader;
