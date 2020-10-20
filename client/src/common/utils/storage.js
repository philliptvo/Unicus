import AsyncStorage from '@react-native-community/async-storage';

const getRefreshToken = async () => {
  return AsyncStorage.getItem('refresh-token');
};

const setRefreshToken = async (refreshToken) => {
  return AsyncStorage.setItem('refresh-token', refreshToken);
};

const clearToken = async () => {
  return AsyncStorage.removeItem('refresh-token');
};

export { getRefreshToken, setRefreshToken, clearToken };
