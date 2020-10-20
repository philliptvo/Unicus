import React from 'react';
import { StyleSheet, ActivityIndicator, Modal, View } from 'react-native';
// import { useTheme } from 'react-native-paper';

const Loader = (props) => {
  const { isLoading } = props;

  // const theme = useTheme();
  return (
    <Modal transparent animationType="none" visible={isLoading}>
      <View style={[styles.loading, { backgroundColor: '#00000040' }]}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
