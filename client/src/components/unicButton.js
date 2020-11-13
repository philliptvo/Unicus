import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

const UnicButton = (props) => {
  const { border, buttonActionStyles, handlePress, label, textStyles } = props;

  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.textButtonAction,
        {
          ...(border
            ? { borderColor: theme.colors.primary, borderWidth: 1 }
            : { backgroundColor: theme.colors.primary }),
        },
        buttonActionStyles,
      ]}
      onPress={handlePress}
    >
      <Text style={[{ fontSize: 16, color: theme.colors.text }, textStyles]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButtonAction: {
    flex: 1,
    width: '100%',
    height: 50,
    borderRadius: 25,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UnicButton;
