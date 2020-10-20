import React from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';

import CollectionIcon from './collectionIcon';

const CollectionList = (props) => {
  const theme = useTheme();
  const { collections, refreshing, onRefresh, onPress, onLongPress } = props;

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          colors={[theme.colors.primary, theme.colors.accent]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      data={collections}
      renderItem={({ item }) => (
        <CollectionIcon collection={item} nCol={3} onPress={onPress} onLongPress={onLongPress} />
      )}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      extraData={collections}
    />
  );
};

const styles = StyleSheet.create({});

export default CollectionList;
