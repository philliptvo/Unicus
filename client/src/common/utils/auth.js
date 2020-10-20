import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const refreshAuthToken = async () => {
  try {
    const oldRefreshToken = await AsyncStorage.getItem('refresh-token');
    const res = await axios.post('/auth/refresh-token', { refreshToken: oldRefreshToken });

    if (res.status === 201) {
      const { jwtToken, refreshToken } = res.data;

      await AsyncStorage.setItem('refresh-token', refreshToken);
      setAuthToken(jwtToken);
    }
  } catch (err) {
    throw new Error(err);
  }
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export { refreshAuthToken, setAuthToken };
