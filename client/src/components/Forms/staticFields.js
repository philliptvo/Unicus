import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import ImageInput from '../imageInput';

const TextField = ({ label, error, onChange, ...inputProps }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, { borderColor: error ? '#fc6d47' : '#c0cbd3' }]}
        onChangeText={(val) => onChange(val)}
        {...inputProps}
      />
      <Text>{!!error && error.message}</Text>
    </View>
  );
};

const ImageField = ({ label, error, onChange, ...inputProps }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <ImageInput onChangeImage={(val) => onChange(val)} {...inputProps} />
      <Text>{!!error && error.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginHorizontal: 10,
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 10,
    paddingVertical: 5,
    paddingLeft: 5,
  },
  inputText: {
    fontSize: 16,
  },
});

export { TextField, ImageField };
