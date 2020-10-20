import React from 'react';
import { StyleSheet, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import defaultCollection from '../assets/default_collection.png';

import UnicImage from './unicImage';

const CollectionIcon = (props) => {
  const { collection, nCol, onPress, onLongPress } = props;
  const theme = useTheme();

  return (
    <View style={{ flex: 1 / nCol }}>
      <TouchableOpacity
        style={[styles.action, { flex: 1 / nCol }]}
        onPress={() => onPress(collection)}
        onLongPress={() => onLongPress(collection)}
      >
        {collection.image ? (
          <UnicImage image={collection.image} blur={1} style={styles.image}>
            <Text style={[styles.label, { color: theme.colors.accent }]}>{collection.name}</Text>
          </UnicImage>
        ) : (
          <ImageBackground source={defaultCollection} blurRadius={1} style={styles.image}>
            <Text style={[styles.label, { color: theme.rolors.accent }]}>{collection.name}</Text>
          </ImageBackground>
        )}
      </TouchableOpacity>
    </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default CollectionIcon;
