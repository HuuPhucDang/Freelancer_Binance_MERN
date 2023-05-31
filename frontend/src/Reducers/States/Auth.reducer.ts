import { ACTION_TYPES } from '@/Constants';

const initialState = {
  isLogged: false,
};

export default (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { type } = action;
  switch (type) {
    case ACTION_TYPES.SET_LOGGED:
      return {
        ...state,
        isLogged: true,
      };

    default:
      return state;
  }
};
