import React, { useState, useEffect, useCallback } from 'react';
import {
  ImageBackground,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { Feather, Ionicons } from '@expo/vector-icons';
import imagePlaceholder from '../assets/imagePlaceholder.png';

const N_COL = 3;

const ImageInput = (props) => {
  const {
    containerStyles,
    buttonStyles,
    buttonActionStyles,
    imageStyles,
    initialImages,
    multi, // TODO: multi files support
    onChangeImage,
  } = props;

  const { showActionSheetWithOptions } = useActionSheet();
  const [images, setImages] = useState(initialImages || [{ localuri: '' }]);

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
            selectImage(0);
            break;
          case 1:
            selectImage(1);
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
        aspect: [4, 3],
      });
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    }

    if (pickerResult.cancelled === true) {
      return;
    }
    setImages((imageArray) => [
      ...imageArray.slice(0, -1),
      { localuri: pickerResult.uri },
      imageArray[images.length - 1],
    ]);
  };

  const renderPlaceholder = () => (
    <TouchableOpacity
      style={[styles.placeholderAction, { flex: 1 / N_COL }]}
      onPress={() => openActionSheet()}
    >
      <ImageBackground source={imagePlaceholder} style={[styles.placeholder]}>
        <Feather name="plus" size={36} color="black" />
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderImageInput = (item) => (
    <ImageBackground
      source={{ uri: item.localuri }}
      style={[styles.thumbnail, imageStyles, { flex: 1 / N_COL }]}
    >
      <TouchableOpacity
        style={{ height: 20, width: 20, margin: 5 }}
        onPress={() => {
          // TODO: delete image
        }}
      >
        <Ionicons
          name={Platform.OS === 'android' ? 'md-close-circle-outline' : 'ios-close-circle-outline'}
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </ImageBackground>
  );

  useEffect(() => {
    selectImageHandler(images);
  }, [images]);

  const selectImageHandler = useCallback((image) => {
    if (typeof onChangeImage === 'function') {
      onChangeImage(image);
    }
  }, []);

  return (
    <FlatList
      data={images}
      renderItem={({ item }) =>
        item.localuri !== '' ? renderImageInput(item) : renderPlaceholder()
      }
      numColumns={N_COL}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  thumbnail: {
    aspectRatio: 1,
    flexDirection: 'row-reverse',
    margin: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  placeholderAction: {
    margin: 5,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  buttonAction: {
    width: '80%',
    height: 30,
    borderWidth: 1,
    padding: 10,
  },
});

export default ImageInput;
