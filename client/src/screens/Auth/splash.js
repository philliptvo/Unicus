import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import splash from '../../assets/splash.png';

import { ButtonText } from '../../components/buttons';

const SplashScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ImageBackground source={splash} style={styles.backgroundContainer}>
      <View style={styles.header}>
        {/* <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={logo}
          style={styles.logo}
          resizeMode="stretch"
        /> */}
      </View>

      <Animatable.View
        style={[styles.footer, { backgroundColor: theme.colors.primary }]}
        animation="fadeInUp"
      >
        <Text style={[styles.textFooter, { color: theme.colors.accent }]}>Get Hoarding!</Text>

        <ButtonText
          buttonStyles={styles.button}
          buttonActionStyles={[styles.buttonAction, { backgroundColor: theme.colors.accent }]}
          handlePress={() => navigation.navigate('Register')}
          label="Register"
          textStyles={styles.buttonText}
        />

        <ButtonText
          buttonStyles={styles.button}
          buttonActionStyles={[
            styles.buttonAction,
            { borderColor: theme.colors.accent, borderWidth: 1, marginTop: 30 },
          ]}
          handlePress={() => navigation.navigate('Login')}
          label="Login"
          textStyles={styles.buttonText}
        />
      </Animatable.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  textFooter: {
    fontSize: 25,
    fontWeight: 'bold',
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
