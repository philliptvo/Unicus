import React, { useCallback, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { Feather } from '@expo/vector-icons';

import { useUpdateEffect } from '../common/utils/hooks';
import { getImageObject, selectImage } from '../common/utils/image';

const ImageInput = (props) => {
  const { initialImage, onImageChange, size, style } = props;

  const { showActionSheetWithOptions } = useActionSheet();
  const [image, setImage] = useState(initialImage || null);

  const openActionSheet = () => {
    const options = ['Take photo', 'Choose photo from library', 'Cancel'];
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        useModal: true,
      },
      async (buttonIndex) => {
        try {
          const res = await selectImage(buttonIndex);
          if (res) {
            setImage(getImageObject(res.uri));
          }
        } catch (err) {
          // Do nothing
        }
      }
    );
  };

  const selectImageHandler = useCallback((img) => {
    if (onImageChange !== null) {
      onImageChange(img);
    }
  }, []);

  useUpdateEffect(() => {
    selectImageHandler(image);
  }, [image]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.action,
          {
            height: size + 2,
            width: size + 2,
          },
          !image && {
            borderStyle: 'dashed',
            borderWidth: 3,
            borderRadius: size / 5,
          },
        ]}
        onPress={() => openActionSheet()}
      >
        {image ? (
          <ImageBackground
            source={image}
            style={[styles.image, { height: size, width: size, borderRadius: size / 5 }]}
          >
            <Feather name="camera" size={size / 4} color="white" />
          </ImageBackground>
        ) : (
          <Feather name="plus" size={size / 4} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default ImageInput;
