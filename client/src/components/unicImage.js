import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import shorthash from 'shorthash';

const BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`;

const UnicImage = (props) => {
  const { children, defaultSource, image, imageStyle, style, ...restProps } = props;

  const defaultSrc = typeof defaultSource === 'function' ? defaultSource : { uri: defaultSource };
  const source = image
    ? {
        uri: `https://unicusapp.herokuapp.com/api/files/img/${image}`,
        headers: { Authorization: axios.defaults.headers.common.Authorization },
      }
    : defaultSrc;

  return (
    <View style={[styles.container, style]}>
      <Image {...restProps} source={source} style={[styles.image, imageStyle]} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  image: {
    flex: 1,
    position: 'absolute',
    zIndex: 0,
    width: '100%',
    height: '100%',
  },
});

export default UnicImage;
