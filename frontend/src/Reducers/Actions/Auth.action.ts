import { ACTION_TYPES } from '@/Constants';

// SINGLE ACTIONS
const setLogged = () => {
  return {
    type: ACTION_TYPES.SET_LOGGED,
  };
};

export default { setLogged };
