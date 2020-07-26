import React, { forwardRef } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const FormField = forwardRef(({ label, error, ...inputProps }, ref) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={ref}
        style={[styles.input, { borderColor: error ? '#fc6d47' : '#c0cbd3' }]}
        {...inputProps}
      />
      <Text>{!!error && error.message}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
});

export default FormField;
