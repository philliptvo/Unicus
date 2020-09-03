import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ButtonIcon } from '../../components/buttons';

const CollectionsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [collections, setCollections] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const fetchData = async () => {
    try {
      // TODO: fetch and store collections corresponding to logged in user
      console.log('Fetching data');
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {collections.length === 0 ? (
        <>
          <Text style={[styles.text, { color: theme.colors.text }]}>
            You have no collections yet!
          </Text>
          <Text style={{ color: theme.colors.text }}>Press '+' to create a new collection!</Text>
        </>
      ) : (
        // TODO: Render collections
        <Text>Collections</Text>
      )}

      <ButtonIcon
        buttonActionStyles={{ position: 'absolute', bottom: 16, right: 16 }}
        handlePress={() => {
          navigation.navigate('Form', { title: 'Collection', onSubmit });
        }}
        icon={<MaterialCommunityIcons name="plus-circle" size={48} color={theme.colors.primary} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CollectionsScreen;
