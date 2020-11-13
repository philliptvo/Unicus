import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { onScrollEvent } from '../../common/utils/gestures';
import { useValue } from '../../common/utils/hooks';

import CollectionCover from '../../components/collectionCover';
import CollectionContent from '../../components/collectionContent';
import CollectionHeader from '../../components/collectionHeader';

const items = [
  {
    id: 1,
    name: 'Hades',
    description:
      'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler.',
    image: '',
  },
  {
    id: 2,
    name: 'Tekken 7',
    description:
      'Discover the epic conclusion of the long-time clan warfare between members of the Mishima family.',
    image: '',
  },
  {
    id: 3,
    name: 'Gloomhaven',
    description:
      'Whether you are drawn to Gloomhaven by the call of adventure or by an avid desire for gold glimmering in the dark, your fate will surely be the same.',
    image: '',
  },
  {
    id: 4,
    name: 'Street Fighter V',
    description: 'Experience the intensity of head-to-head battles',
    image: '',
  },
  {
    id: 5,
    name: 'Stardew Valley',
    description:
      "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
    image: '',
  },
  {
    id: 6,
    name: 'Persona 4',
    description:
      'A coming of age story that sets the protagonist and his friends on a journey kickstarted by a chain of serial murders.',
    image: '',
  },
  {
    id: 7,
    name: 'Call of Duty Black Ops 3',
    description: '',
    image: '',
  },
  {
    id: 8,
    name: 'Until Dawn',
    description: '',
    image: '',
  },
];

const CollectionScreen = ({ route }) => {
  const { collection } = route.params;

  const y = useValue(0);
  const onScroll = onScrollEvent({ y });

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <StatusBar backgroundColor="black" />
      <CollectionCover {...{ collection, y }} />
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        {...{ onScroll }}
      >
        <CollectionContent {...{ items }} />
      </Animated.ScrollView>
      <CollectionHeader {...{ collection, y }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CollectionScreen;
