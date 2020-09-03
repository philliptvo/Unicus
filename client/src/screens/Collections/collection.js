import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CollectionScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Collection Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // '#AFAFDC',
  },
});

export default CollectionScreen;
