import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WishlistScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Wishlist Screen!</Text>
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

export default WishlistScreen;
