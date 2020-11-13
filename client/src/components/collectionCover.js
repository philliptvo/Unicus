import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import defaultCollection from '../assets/default_collection.png';

import UnicImage from './unicImage';

const { interpolate, Extrapolate } = Animated;
const { height: wHeight, width: wWidth } = Dimensions.get('window');

export const HEADER_MAX_HEIGHT = wHeight / 3;
export const HEADER_MIN_HEIGHT = 80;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const CollectionCover = (props) => {
  const { collection, y } = props;

  const opacity = interpolate(y, {
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateY = interpolate(y, {
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View style={[styles.coverContainer, { transform: [{ translateY }] }]}>
      <UnicImage defaultSource={defaultCollection} image={collection.image} style={styles.cover} />
      <Animated.View style={[styles.overlay, { opacity }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  coverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  cover: {
    width: wWidth,
    height: HEADER_MAX_HEIGHT,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
});

export default CollectionCover;
