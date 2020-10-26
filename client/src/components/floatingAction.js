import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, { interpolate } from 'react-native-reanimated';
import { useTransition } from '../common/utils/transitions';

import UnicIcon from './unicIcon';

const FloatingActionItem = (props) => {
  const { action, transition, toggle } = props;
  const theme = useTheme();

  return (
    <Animated.View
      style={[
        styles.actionContainer,
        {
          opacity: interpolate(transition, {
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1],
          }),
          transform: [
            { scale: transition },
            {
              translateY: interpolate(transition, {
                inputRange: [0, 1],
                outputRange: [0, -80 - 60 * action.position],
              }),
            },
          ],
        },
      ]}
    >
      <View style={[styles.textContainer, styles.shadow, { backgroundColor: theme.colors.border }]}>
        <Text style={styles.text}>{action.text}</Text>
      </View>
      <View
        style={[
          styles.button,
          styles.secondary,
          styles.shadow,
          { backgroundColor: theme.colors.accent },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            toggle();
            action.onPress();
          }}
        >
          <UnicIcon {...action.icon(20, theme.colors.primary)} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const FloatingAction = (props) => {
  const { actions } = props;

  const theme = useTheme();
  const [active, setActive] = useState(false);
  const transition = useTransition(active, { duration: 200 });

  const toggleMenu = () => {
    setActive(!active);
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
            styles.menu,
            styles.shadow,
            {
              backgroundColor: theme.colors.primary,
              transform: [
                {
                  rotate: interpolate(transition, {
                    inputRange: [0, 1],
                    outputRange: [0, -Math.PI / 4],
                  }),
                },
              ],
            },
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
            transition={transition}
            toggle={() => toggleMenu()}
            action={action}
          />
        ))}
        {renderMenuButton()}
      </View>
    </View>
  );
};

const BT_PRIMARY = 60;
const BT_SECONDARY = 48;

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
  shadow: {
    shadowColor: '#000',
    shadowOffset: { height: 10, width: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  menu: {
    width: BT_PRIMARY,
    height: BT_PRIMARY,
    borderRadius: BT_PRIMARY / 2,
  },
  secondary: {
    marginBottom: (BT_PRIMARY - BT_SECONDARY) / 2,
    marginRight: (BT_PRIMARY - BT_SECONDARY) / 2,
    width: BT_SECONDARY,
    height: BT_SECONDARY,
    borderRadius: BT_SECONDARY / 2,
  },
  textContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
    borderRadius: 8 / 2,
    height: 22,
    marginRight: 70,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default FloatingAction;
