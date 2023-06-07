import Cookies from 'universal-cookie';
import { COOKIE_KEYS } from '@/Constants';

const cookies = new Cookies();

const setAccessToken = (payload: { token: string; expires: string }) => {
  const { token, expires } = payload;
  cookies.set(COOKIE_KEYS.ACCESS_TOKEN, token, { expires: new Date(expires) });
};

const getAccessToken = () => {
  const mode = cookies.get(COOKIE_KEYS.ACCESS_TOKEN) || '';
  return mode;
};

const setRefreshToken = (payload: { token: string; expires: string }) => {
  const { token, expires } = payload;
  cookies.set(COOKIE_KEYS.REFRESH_TOKEN, token, { expires: new Date(expires) });
};

const getRefreshToken = () => {
  const token = cookies.get(COOKIE_KEYS.REFRESH_TOKEN) || '';
  return token;
};

const setUserData = (userData: any) => {
  cookies.set(COOKIE_KEYS.USER_DATA, userData);
};

const getUserData = () => {
  const userData = cookies.get(COOKIE_KEYS.USER_DATA) || {};
  return userData;
};

const saveThemeMode = (mode: 'dark' | 'light') => {
  cookies.set(COOKIE_KEYS.THEME_MODE, mode);
};

const getThemeMode = () => {
  const mode = cookies.get(COOKIE_KEYS.THEME_MODE) || 'light';
  return mode;
};

export {
  saveThemeMode,
  getThemeMode,
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  setUserData,
  getUserData,
};
