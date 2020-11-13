import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CollectionItem = (props) => {
  const { item } = props;

  return (
    <TouchableOpacity style={styles.itemAction}>
      <View style={styles.row}>
        <View style={styles.itemIcon} />
        <View style={styles.itemLabel}>
          <Text style={styles.name}>{item.name}</Text>
          <Text numberOfLines={3} style={styles.description}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemAction: {
    height: 100,
    width: '100%',
    marginVertical: 5,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  itemIcon: {
    height: '100%',
    width: 100,
    backgroundColor: 'black',
  },
  itemLabel: {
    flexShrink: 1,
    paddingRight: 20,
    marginVertical: 10,
    marginLeft: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});

export default CollectionItem;
