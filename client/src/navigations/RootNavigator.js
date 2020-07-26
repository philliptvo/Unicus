import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthState, useAuthDispatch } from '../common/contexts/auth';
import { refreshAuthToken } from '../common/utils/auth';
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
          await refreshAuthToken();
          dispatch({ type: 'REFRESH_TOKEN_SUCCESS' });
        } catch (err) {
          console.log('[callAsyncRefresh] silent refresh attempt');
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
