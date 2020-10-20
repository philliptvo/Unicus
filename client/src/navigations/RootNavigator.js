import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

import { useAuthState, useAuthDispatch } from '../common/contexts/auth';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isLoggedIn } = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    setTimeout(() => {
      const callAsyncRefresh = async () => {
        try {
          const { data } = await axios.get('/users/');
          dispatch({ type: 'SET_CURRENT_USER', user: data.user });
        } catch (err) {
          // Silent refresh attempt
        }
      };
      callAsyncRefresh();
    }, 1000);
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      {isLoggedIn ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
