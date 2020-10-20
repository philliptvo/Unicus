import * as ImagePicker from 'expo-image-picker';

const getImageUrl = (filename) => {
  if (filename) {
    return `https://unicus-api.herokuapp.com/api/files/image/${filename}`;
  }
  return 'https://api.adorable.io/avatars/80/abott@adorable.png';
};

const getImageObject = (uri) => {
  const uriParts = uri.split('.');
  const fileName = uri.split('/').pop();
  const fileType = uriParts[uriParts.length - 1];

  return {
    uri,
    name: `${fileName}`,
    type: `image/${fileType}`,
  };
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
      aspect: [1, 1],
    });
  } else if (mode === 1) {
    pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });
  } else {
    return;
  }

  if (pickerResult.cancelled === true) {
    return;
  }
  return pickerResult;
};

export { getImageObject, selectImage };
