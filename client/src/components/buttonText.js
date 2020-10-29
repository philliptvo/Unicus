import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const ButtonText = (props) => {
  const { buttonStyles, buttonActionStyles, handlePress, label, textStyles } = props;

  const theme = useTheme();

  return (
    <View style={[styles.textButton, buttonStyles]}>
      <TouchableOpacity
        style={[
          styles.textButtonAction,
          { backgroundColor: theme.colors.primary },
          buttonActionStyles,
        ]}
        onPress={handlePress}
      >
        <Text style={[styles.text, { color: theme.colors.text }, textStyles]}>{label}</Text>
      </TouchableOpacity>
    </View>
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
    borderRadius: 25,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default ButtonText;
