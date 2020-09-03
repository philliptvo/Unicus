import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ItemScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Item Screen!</Text>
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

export default ItemScreen;
