import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import UnicIcon from './unicIcon';

const { interpolate } = Animated;

const CollectionHeader = (props) => {
  const { collection, y } = props;

  const { goBack } = useNavigation();

  const translateY = interpolate(y, {
    inputRange: [],
    outputRange: [],
  });

  return (
    <View style={{ position: 'absolute', left: 0, right: 0 }}>
      <View
        style={{ flexDirection: 'row', height: 1, alignItems: 'center', paddingHorizontal: 16 }}
      >
        <UnicIcon type="Feather" name="arrow-left" size={24} color="black" />
        <TouchableOpacity onPress={() => goBack()}>
          <UnicIcon type="Feather" name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, flex: 1 }}>{collection.name}</Text>
      </View>
    </View>
  );
};

export default CollectionHeader;
