import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Image, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import logoIcon from '../../assets/logo_icon.png';

import { useTransition } from '../../common/utils/transitions';
import ButtonText from '../../components/buttonText';

const { interpolate } = Animated;

const { height, width } = Dimensions.get('window');
const IMAGE_HEIGHT = 250;
const IMAGE_WIDTH = 250;

const SplashScreen = ({ navigation }) => {
  const theme = useTheme();
  const [active, setActive] = useState(false);

  const transition = useTransition(active, { duration: 300 });
  const opacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });
  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  useEffect(() => {
    setTimeout(() => setActive(true), 100);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Image source={logoIcon} style={[styles.logo]} resizeMode="contain" />
      <Animated.View
        style={[
          styles.footer,
          {
            backgroundColor: theme.colors.surface,
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text style={[styles.textTitle, { color: theme.colors.text }]}>Let's Get Started!</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.textSubtitle, { color: theme.colors.text }]}>
            Start tracking your hoarding with an account now.
          </Text>
        </View>

        <ButtonText
          handlePress={() => navigation.navigate('Register')}
          label="Register"
          textStyles={styles.buttonLabel}
        />

        <ButtonText
          buttonActionStyles={{ backgroundColor: theme.colors.accent }}
          handlePress={() => navigation.navigate('Login')}
          label="Login"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginHorizontal: (width - IMAGE_WIDTH) / 2,
    marginTop: (height - IMAGE_WIDTH) / 5,
  },
  footer: {
    position: 'absolute',
    top: height / 2,
    height: height / 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textSubtitle: {
    fontSize: 15,
  },
  buttonLabel: {
    color: 'white',
  },
});

export default SplashScreen;
