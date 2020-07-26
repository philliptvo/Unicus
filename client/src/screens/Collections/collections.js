import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import axios from 'axios';
import styles from './styles';

const CollectionsScreen = () => {
  // const [state, setState] = useState({
  //   collections: [],
  //   isLoading: true,
  // });

  const fetchData = async () => {
    try {
      // TODO: fetch and store collections corresponding to logged in user
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Collections Screen!</Text>
    </View>
  );
};

export default CollectionsScreen;
