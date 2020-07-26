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

import { AuthProvider, AuthStateContext } from './common/contexts/auth';
import RootNavigator from './navigations/RootNavigator';

axios.defaults.baseURL = 'https://unicus-api.herokuapp.com/api';

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
  },
};

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

const App = () => {
  return (
    <AuthProvider>
      <AuthStateContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value;

          return (
            <PaperProvider theme={isDarkTheme ? CustomDarkTheme : CustomDefaultTheme}>
              <NavigationContainer theme={isDarkTheme ? CustomDarkTheme : CustomDefaultTheme}>
                <RootNavigator />
              </NavigationContainer>
            </PaperProvider>
          );
        }}
      </AuthStateContext.Consumer>
    </AuthProvider>
  );
};

export default App;
