import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { ButtonText } from './buttons';

const ImageInput = (props) => {
  const {
    containerStyles,
    buttonStyles,
    buttonActionStyles,
    imageStyles,
    textStyles,
    onChangeImage,
  } = props;

  const { showActionSheetWithOptions } = useActionSheet();
  const [selectedImage, setSelectedImage] = useState(null);

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
        switch (buttonIndex) {
          case 0:
            await selectImage(0);
            break;
          case 1:
            await selectImage(1);
            break;
          default:
            break;
        }
      }
    );
  };

  const selectImage = async (mode) => {
    const permission = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    let pickerResult;
    if (mode === 0) {
      pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      });
    }

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localuri: pickerResult.uri });
  };

  useEffect(() => {
    onChangeImage(selectedImage);
  }, [selectedImage]);

  return (
    <View style={[styles.container, containerStyles]}>
      {selectedImage !== null && (
        <Image source={{ uri: selectedImage.localuri }} style={[styles.thumbnail, imageStyles]} />
      )}
      <ButtonText
        buttonStyles={buttonStyles}
        buttonActionStyles={[styles.buttonAction, buttonActionStyles]}
        handlePress={openActionSheet}
        label={selectedImage == null ? 'Select Image' : 'Change Image'}
        textStyles={textStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  buttonAction: {
    width: '80%',
    height: 30,
    borderWidth: 2,
    padding: 10,
  },
});

export default ImageInput;
