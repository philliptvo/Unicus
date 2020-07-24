import 'react-native-gesture-handler';
import React from 'react';
import axios from 'axios';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { AuthProvider, AuthStateContext } from './common/contexts/auth';
import { setAuthToken } from './common/utils/auth';
import { getRefreshToken, setRefreshToken } from './common/utils/storage';
import RootNavigator from './navigations/RootNavigator';

axios.defaults.baseURL = 'https://unicus-api.herokuapp.com/api';

axios.interceptors.response.use(
  (res) => {
    console.log(
      `[${new Date().toLocaleString()}] [${res.config.method.toUpperCase()} ${res.config.baseURL}${
        res.config.url
      }] Status: ${res.status}`
    );
    return res;
  },
  async (err) => {
    console.log(
      `[${new Date().toLocaleString()}] [${err.config.method.toUpperCase()} ${err.config.baseURL}${
        err.config.url
      }] [ERROR] Status: ${err.response.status}`
    );
    const originalRequest = err.config;

    if (err.response.status === 403 && originalRequest.url === '/auth/refresh-token') {
      // TODO: if refresh attempt failed, log user out
      console.log(
        `[${new Date().toLocaleString()}] [${originalRequest.config.method.toUpperCase()} ${
          originalRequest.baseURL
        }${originalRequest.url}] Logging out`
      );
      return Promise.reject(err);
    }

    if (err.response.status === 403 && !originalRequest.retry) {
      originalRequest.retry = true;

      const oldRefreshToken = await getRefreshToken();
      const res = await axios.post('/auth/refresh-token', { refreshToken: oldRefreshToken });

      if (res.status === 201) {
        const { jwtToken, refreshToken } = res.data;
        setRefreshToken(refreshToken);
        setAuthToken(jwtToken);
        // FIXME: manually set header in original request; configuring default axios header does not affect original request
        originalRequest.headers.Authorization = jwtToken;
        return axios(originalRequest);
      }
    }

    return Promise.reject(err);
  }
);

const CustomDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#ff8800',
    accent: '#ffc88a',
  },
};

const CustomDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const App = () => {
  return (
    <AuthProvider>
      <AuthStateContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value;

          return (
            <ActionSheetProvider>
              <PaperProvider theme={isDarkTheme ? CustomDarkTheme : CustomDefaultTheme}>
                <NavigationContainer theme={isDarkTheme ? CustomDarkTheme : CustomDefaultTheme}>
                  <RootNavigator />
                </NavigationContainer>
              </PaperProvider>
            </ActionSheetProvider>
          );
        }}
      </AuthStateContext.Consumer>
    </AuthProvider>
  );
};

export default App;
