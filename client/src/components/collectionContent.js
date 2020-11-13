import React from 'react';
import { View } from 'react-native';

import CollectionItem from './collectionItem';

import { HEADER_MAX_HEIGHT } from './collectionCover';

const CollectionContent = (props) => {
  const { items } = props;

  return (
    <>
      <View style={{ height: HEADER_MAX_HEIGHT }} />
      {items.map((item) => {
        return <CollectionItem key={item.id} item={item} />;
      })}
    </>
  );
};

export default CollectionContent;
