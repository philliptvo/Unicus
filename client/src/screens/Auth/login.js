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
import KeyboardAvoidingScrollView from '../../components/keyboardAvoidingScrollView';
import { StaticForm, TextField } from '../../components/Forms';
import UnicButton from '../../components/unicButton';

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
    <KeyboardAvoidingScrollView containerStyle={{ backgroundColor: theme.colors.primary }}>
      <View style={styles.header}>
        <Text style={styles.title}>Unicus</Text>
      </View>
      <View style={[styles.footer, { backgroundColor: theme.colors.surface }]}>
        <StaticForm {...{ control, errors }}>
          <TextField name="email" label="Email" autoCapitalize="none" />
          <TextField name="password" label="Password" secureTextEntry autoCapitalize="none" />

          <TouchableOpacity
            style={{ marginTop: 15, paddingHorizontal: 30 }}
            onPress={() => alert('Forgot Password')}
          >
            <Text style={{ color: theme.colors.text }}>Forgot Password?</Text>
          </TouchableOpacity>

          <UnicButton
            handlePress={handleSubmit(onSubmit)}
            label="Login"
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

export default LoginScreen;
