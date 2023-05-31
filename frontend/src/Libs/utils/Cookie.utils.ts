import Cookies from 'universal-cookie';
import { COOKIE_KEYS } from '@/Constants';

const cookies = new Cookies();

const saveThemeMode = (mode: 'dark' | 'light') => {
  cookies.set(COOKIE_KEYS.THEME_MODE, mode);
};

const getThemeMode = () => {
  const mode = cookies.get(COOKIE_KEYS.THEME_MODE) || 'light';
  return mode
};

export { saveThemeMode, getThemeMode };
