import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import logoIcon from '../../assets/logo_icon.png';

import ButtonText from '../../components/buttonText';

const SplashScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View style={[styles.backgroundContainer, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.header}>
        <Image source={logoIcon} style={styles.logo} resizeMode="stretch" />
      </View>

      <Animated.View style={[styles.footer, { backgroundColor: theme.colors.surface }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.textTitle, { color: theme.colors.text }]}>Let's Get Started!</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.textSubtitle, { color: theme.colors.text }]}>
            Start tracking your hoarding with an account now.
          </Text>
        </View>

        <ButtonText
          buttonStyles={styles.button}
          buttonActionStyles={[styles.buttonAction, { backgroundColor: theme.colors.primary }]}
          handlePress={() => navigation.navigate('Register')}
          label="Register"
          textStyles={styles.buttonText}
        />

        <ButtonText
          buttonStyles={styles.button}
          buttonActionStyles={[styles.buttonAction, { backgroundColor: theme.colors.accent }]}
          handlePress={() => navigation.navigate('Login')}
          label="Login"
          textStyles={[styles.buttonText, { color: theme.colors.text }]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.5,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: 250,
    height: 250,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textSubtitle: {
    fontSize: 15,
  },
  buttonText: {
    color: 'white',
  },
  button: {
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonAction: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
