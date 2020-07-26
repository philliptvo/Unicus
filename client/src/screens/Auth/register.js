import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

import { globalStyleVariables } from '../../styles';
import { useAuthDispatch } from '../../common/contexts/auth';
import Form from '../../components/form';
import FormField from '../../components/formField';

const registerSchema = yup.object({
  firstName: yup.string().required('Required.'),
  lastName: yup.string().required('Required.'),
  email: yup.string().email('Not a valid email.').required('Required.'),
  password: yup
    .string()
    .min(6, 'Password should be longer than 6 characters.')
    .required('Required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('Required.'),
});

const RegisterScreen = ({ navigation }) => {
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
      navigation.navigate('login');
    } catch (err) {
      alert(`Register failed with error: ${err.message}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <View style={styles.header}>
        <Text style={styles.textHeader}>Register!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUp">
        <Form {...{ control, errors }}>
          <FormField name="firstName" label="First Name" />
          <FormField name="lastName" label="Last Name" />
          <FormField name="email" label="Email" autoCapitalize="none" />
          <FormField name="password" label="Password" secureTextEntry autoCapitalize="none" />
          <FormField
            name="confirmPassword"
            label="Confirm Password"
            secureTextEntry
            autoCapitalize="none"
          />

          <View style={styles.button}>
            <TouchableOpacity style={styles.buttonAction} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </Form>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
    backgroundColor: globalStyleVariables.PRIMARY_COLOR,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
    backgroundColor: globalStyleVariables.SECONDARY_COLOR,
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
