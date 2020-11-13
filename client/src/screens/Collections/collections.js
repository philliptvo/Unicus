import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import axios from 'axios';

import { processData, objectToFormData } from '../../common/utils/formdata';
import FloatingAction from '../../components/floatingAction';
import CollectionList from '../../components/collectionList';

const CollectionsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [state, setState] = useState({
    refreshing: true,
    collections: [],
  });

  const actions = [
    {
      text: 'New Collection',
      icon: (size, color) => ({
        type: 'MaterialIcons',
        name: 'collections',
        size,
        color,
      }),
      name: 'bt_collection',
      position: 0,
      onPress: () => {
        navigation.navigate('Form', { title: 'Collection', onSubmit: submitCollectionHandler });
      },
    },
    {
      text: 'New Item',
      icon: (size, color) => ({
        type: 'MaterialIcons',
        name: 'photo',
        size,
        color,
      }),
      name: 'bt_item',
      position: 1,
      onPress: () => {
        alert('TODO: implement new item screen');
      },
    },
  ];

  const fetchDataHandler = async () => {
    try {
      const { data } = await axios.get('/collections/');
      setState({ refreshing: false, collections: data.collections });
    } catch (err) {
      // Do nothing
    }
  };

  const pressCollectionHandler = (collection) => {
    // TODO: navigate to collection screen
    navigation.navigate('Collection', { collection });
  };

  const longPressCollectionHandler = (collection) => {
    // TODO: handle selecting collection
    alert(`Long pressed collection: ${collection.name}`);
  };

  const submitCollectionHandler = async (data) => {
    const formData = objectToFormData(processData(data));
    console.log('[SUBMIT COLLECTION]', formData);
    try {
      await axios.post('/collections/create', formData);
    } catch (err) {
      // Do nothing
    } finally {
      await fetchDataHandler();
      navigation.pop();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const asyncFetchData = async () => {
        await fetchDataHandler();
      };
      asyncFetchData();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <CollectionList
        collections={state.collections}
        refreshing={state.refreshing}
        onRefresh={fetchDataHandler}
        onPress={pressCollectionHandler}
        onLongPress={longPressCollectionHandler}
      />

      <FloatingAction actions={actions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5, // matches margin in collection icon
  },
});

export default CollectionsScreen;
