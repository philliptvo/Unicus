import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

import defaultCollection from '../assets/default_collection.png';

import UnicImage from './unicImage';

const CollectionIcon = (props) => {
  const { collection, nCol, onPress, onLongPress } = props;
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.action, { flex: 1 / nCol }]}
      onPress={() => onPress(collection)}
      onLongPress={() => onLongPress(collection)}
    >
      <UnicImage
        defaultSource={defaultCollection}
        image={collection.image}
        style={styles.image}
        blurRadius={2}
      >
        <Text style={[styles.label, { color: theme.colors.accent }]}>{collection.name}</Text>
      </UnicImage>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  action: {
    margin: 5, // matches padding in collection list container view
    overflow: 'hidden',
    borderRadius: 5,
  },
  image: {
    aspectRatio: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default CollectionIcon;
