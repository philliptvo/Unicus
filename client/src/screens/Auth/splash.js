import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { globalStyleVariables } from '../../styles';
import splash from '../../assets/splash.png';
import logo from '../../assets/logo.png';

const SplashScreen = ({ navigation }) => {
  return (
    <ImageBackground source={splash} style={styles.backgroundContainer}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={logo}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUp">
        <Text style={styles.textFooter}>Get started!</Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={{
              ...styles.buttonAction,
              backgroundColor: globalStyleVariables.SECONDARY_COLOR,
            }}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={{
              ...styles.buttonAction,
              borderColor: globalStyleVariables.SECONDARY_COLOR,
              borderWidth: 1,
              marginTop: 15,
            }}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: globalStyleVariables.PRIMARY_COLOR,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  textFooter: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
  },
  button: {
    justifyContent: 'center',
    marginTop: 15,
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
