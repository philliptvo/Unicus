import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import axios from 'axios';

import KeyboardAvoidingScrollView from '../../components/keyboardAvoidingScrollView';
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
    <KeyboardAvoidingScrollView containerStyle={{ backgroundColor: theme.colors.primary }}>
      <View style={styles.header}>
        <Text style={styles.title}>Register!</Text>
      </View>
      <View style={[styles.footer, { backgroundColor: theme.colors.surface }]}>
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
            handlePress={handleSubmit(onSubmit)}
            label="Register"
            textStyles={styles.buttonLabel}
          />
        </StaticForm>
      </View>
    </KeyboardAvoidingScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 75,
  },
  footer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 25,
  },
  title: {
    paddingLeft: 40,
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonLabel: {
    color: 'white',
  },
});

export default RegisterScreen;
