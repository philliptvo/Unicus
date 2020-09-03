import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import { useAuthDispatch } from '../../common/contexts/auth';
import { setAuthToken } from '../../common/utils/auth';
import StaticForm from '../../components/Forms/staticForm';
import { TextField } from '../../components/Forms/staticFields';
import { ButtonText } from '../../components/buttons';

const loginSchema = yup.object({
  email: yup.string().email('Not a valid email.').required('Required.'),
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
      alert(`Login failed with error: ${err.message}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Unicus</Text>
      </View>
      <Animatable.View
        style={[styles.footer, { backgroundColor: theme.colors.primary }]}
        animation="fadeInUp"
      >
        <StaticForm {...{ control, errors }}>
          <TextField name="email" label="Email" autoCapitalize="none" />
          <TextField name="password" label="Password" secureTextEntry autoCapitalize="none" />

          <TouchableOpacity style={{ marginTop: 15 }}>
            <Text style={{ color: '#fff' }}>Forgot Password?</Text>
          </TouchableOpacity>

          <ButtonText
            buttonStyles={styles.button}
            buttonActionStyles={[styles.buttonAction, { backgroundColor: theme.colors.accent }]}
            handlePress={handleSubmit(onSubmit)}
            label="Login"
            textStyles={styles.buttonText}
          />
        </StaticForm>
      </Animatable.View>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
