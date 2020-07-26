import { StyleSheet } from 'react-native';

const globalStyleVariables = {
  PRIMARY_COLOR: '#22577A',
  SECONDARY_COLOR: '#38A3A5',
  BACKGROUND_COLOR: '#C7F9CC',
  HEADER_BACKGROUND_COLOR: '#22577A',
  HEADER_TINT_COLOR: '#FFF',
  HIGHLIGHT_COLOR: '#57CC99',
};

const globalStyles = StyleSheet.create({
  header: {
    backgroundColor: globalStyleVariables.BACKGROUND_COLOR,
  },
});

export { globalStyles, globalStyleVariables };
