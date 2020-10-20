import React from 'react';
import { StyleSheet, Image, View, ImageBackground } from 'react-native';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import shorthash from 'shorthash';

const BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`;

const UnicImage = (props) => {
  const { children, blur, image, style, imageStyle } = props;

  return (
    <ImageBackground
      source={
        image
          ? {
              uri: `https://unicusapp.herokuapp.com/api/files/img/${image}`,
              headers: {
                Authorization: axios.defaults.headers.common.Authorization,
              },
            }
          : {
              uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
            }
      }
      blurRadius={blur}
      style={[styles.container, style]}
      {...(imageStyle && { imageStyle: [styles.image, imageStyle] })}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default UnicImage;
