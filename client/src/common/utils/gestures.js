import { event } from 'react-native-reanimated';

const onScrollEvent = (contentOffset) =>
  event([
    {
      nativeEvent: {
        contentOffset,
      },
    },
  ]);

export { onScrollEvent };
