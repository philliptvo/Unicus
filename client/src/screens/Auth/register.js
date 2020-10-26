import React from 'react';
import { Platform, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import axios from 'axios';

import { StaticForm, TextField } from '../../components/Forms';
import ButtonText from '../../components/buttonText';

const registerSchema = yup.object({
  firstName: yup.string().required('Required.'),
  lastName: yup.string().required('Required.'),
  email: yup.string().email('Not a valid email.').required('Required.'),
  password: yup
    .string()
    .min(8, 'Password should be longer than 8 characters.')
    .required('Required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('Required.'),
});

const RegisterScreen = ({ navigation }) => {
  const theme = useTheme();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      await axios.post('/auth/register', newUser);
      navigation.navigate('Login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.primary }]}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}
      enabled
    >
      <View style={styles.header}>
        <Text style={styles.textHeader}>Register!</Text>
      </View>
      <Animated.View
        style={[styles.footer, { backgroundColor: theme.colors.surface }]}
        animation="fadeInUp"
      >
        <StaticForm {...{ control, errors }}>
          <TextField name="firstName" label="First Name" />
          <TextField name="lastName" label="Last Name" />
          <TextField name="email" label="Email" autoCapitalize="none" />
          <TextField name="password" label="Password" secureTextEntry autoCapitalize="none" />
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            secureTextEntry
            autoCapitalize="none"
          />

          <ButtonText
            buttonStyles={styles.button}
            buttonActionStyles={[styles.buttonAction, { backgroundColor: theme.colors.primary }]}
            handlePress={handleSubmit(onSubmit)}
            label="Register"
            textStyles={styles.buttonText}
          />
        </StaticForm>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  textHeader: {
    alignSelf: 'flex-start',
    paddingLeft: 40,
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  buttonAction: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
