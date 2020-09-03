import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ButtonText = (props) => {
  const { buttonStyles, buttonActionStyles, handlePress, label, textStyles } = props;

  return (
    <View style={[styles.textButton, buttonStyles]}>
      <TouchableOpacity style={[styles.textButtonAction, buttonActionStyles]} onPress={handlePress}>
        <Text style={[styles.text, textStyles]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ButtonIcon = (props) => {
  const { buttonActionStyles, handlePress, icon } = props;

  return (
    <TouchableOpacity style={[styles.imageButtonAction, buttonActionStyles]} onPress={handlePress}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButton: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  textButtonAction: {
    borderRadius: 5,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButtonAction: {},
  text: {
    fontSize: 16,
  },
});

export { ButtonText, ButtonIcon };
