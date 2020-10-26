import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { useAuthDispatch } from '../../common/contexts/auth';
import { setAuthToken } from '../../common/utils/auth';
import { StaticForm, TextField } from '../../components/Forms';
import ButtonText from '../../components/buttonText';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Not a valid email.')
    .min(8, 'Password should be longer than 8 characters.')
    .required('Required.'),
  password: yup.string().required('Required.'),
});

const LoginScreen = () => {
  const theme = useTheme();
  const dispatch = useAuthDispatch();

  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/auth/login', { email: data.email, password: data.password });
      const { user, jwtToken, refreshToken } = res.data;

      await AsyncStorage.setItem('refresh-token', refreshToken);
      setAuthToken(jwtToken);

      dispatch({
        type: 'SET_CURRENT_USER',
        user,
      });
    } catch (err) {
      alert(`Incorrect username or passport`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Unicus</Text>
      </View>
      <Animated.View style={[styles.footer, { backgroundColor: theme.colors.surface }]}>
        <StaticForm {...{ control, errors }}>
          <TextField name="email" label="Email" autoCapitalize="none" />
          <TextField name="password" label="Password" secureTextEntry autoCapitalize="none" />

          <TouchableOpacity style={{ marginTop: 15, paddingHorizontal: 30 }}>
            <Text style={{ color: theme.colors.text }}>Forgot Password?</Text>
          </TouchableOpacity>

          <ButtonText
            buttonStyles={styles.button}
            buttonActionStyles={[styles.buttonAction, { backgroundColor: theme.colors.primary }]}
            handlePress={handleSubmit(onSubmit)}
            label="Login"
            textStyles={styles.buttonText}
          />
        </StaticForm>
      </Animated.View>
    </View>
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
    flex: 3,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 50,
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

export default LoginScreen;
