import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Animated,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import UnicIcon from './unicIcon';

const BT_PRIMARY = 60;
const BT_SECONDARY = 48;

const FloatingActionItem = (props) => {
  const { icon, text, position, action, animation, reset } = props;
  const theme = useTheme();

  const translationInterpolate = (n) => ({
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80 - 60 * n],
        }),
      },
    ],
  });

  return (
    <Animated.View style={[styles.actionContainer, translationInterpolate(position)]}>
      <View
        style={[
          styles.textContainer(theme),
          Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow,
        ]}
      >
        <Text style={styles.text}>{text}</Text>
      </View>
      <View
        style={[
          styles.button,
          styles.secondary(theme),
          Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            reset();
            action();
          }}
        >
          <UnicIcon {...icon(20, theme.colors.primary)} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const FloatingAction = (props) => {
  const { actions } = props;

  const theme = useTheme();
  const animation = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    Animated.spring(animation, {
      toValue: active ? 0 : 1,
      friction: 6,
      useNativeDriver: true,
    }).start();

    setActive(!active);
  };

  const rotationInterpolate = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-45deg'],
        }),
      },
    ],
  };

  const renderTappableBackground = () => (
    <TouchableOpacity
      onPress={toggleMenu}
      style={[styles.overlay, { backgroundColor: '#00000040' }]}
    />
  );

  const renderMenuButton = () => (
    <TouchableWithoutFeedback onPress={toggleMenu}>
      <View>
        <Animated.View
          style={[
            styles.button,
            styles.menu(theme),
            Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow,
            rotationInterpolate,
          ]}
        >
          <UnicIcon type="AntDesign" name="plus" size={24} color={theme.colors.accent} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.overlay}>
      {active && renderTappableBackground()}
      <View style={styles.container}>
        {actions.map((action) => (
          <FloatingActionItem
            key={action.name}
            {...{
              ...action,
              animation,
              reset: () => toggleMenu(),
            }}
          />
        ))}
        {renderMenuButton()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  actionContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidShadow: {
    elevation: 5,
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { height: 10, width: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menu: (theme) => ({
    width: BT_PRIMARY,
    height: BT_PRIMARY,
    borderRadius: BT_PRIMARY / 2,
    backgroundColor: theme.colors.primary,
  }),
  secondary: (theme) => ({
    marginBottom: (BT_PRIMARY - BT_SECONDARY) / 2,
    marginRight: (BT_PRIMARY - BT_SECONDARY) / 2,
    width: BT_SECONDARY,
    height: BT_SECONDARY,
    borderRadius: BT_SECONDARY / 2,
    backgroundColor: theme.colors.accent,
  }),
  textContainer: (theme) => ({
    position: 'absolute',
    paddingHorizontal: 8,
    borderRadius: 8 / 2,
    height: 22,
    marginRight: 70,
    backgroundColor: theme.colors.border,
  }),
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default FloatingAction;
