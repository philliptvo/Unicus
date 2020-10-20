import React from 'react';
import { useTheme } from 'react-native-paper';

import UnicImage from './unicImage';

const UnicAvatar = (props) => {
  const { image, size } = props;
  const theme = useTheme();

  return (
    <UnicImage
      image={image}
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: theme.colors.primary,
      }}
      imageStyle={{
        height: size,
        width: size,
        borderRadius: size / 2,
      }}
    />
  );
};
export default UnicAvatar;
