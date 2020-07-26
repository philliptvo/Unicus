import React, { createContext, useContext, useReducer } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  isDarkTheme: false,
  userFirstName: null,
  userLastName: null,
  userId: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userFirstName: action.user.firstName,
        userLastName: action.user.lastName,
        userId: action.user.id,
      };
    case 'REFRESH_TOKEN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        userFirstName: null,
        userLastName: null,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => useContext(AuthStateContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);

export { AuthProvider, AuthStateContext, useAuthState, useAuthDispatch };
