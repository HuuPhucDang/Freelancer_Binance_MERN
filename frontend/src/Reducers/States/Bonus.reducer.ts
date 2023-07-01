import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  items: [],
};

export default (
  state = DEFAULT_STATES,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_UPDATE_BONUS_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }

    case ACTION_TYPES.FETCH_BONUS_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
        items: payload,
      };
    case ACTION_TYPES.FETCH_BONUS_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
        items: [],
      };

    case ACTION_TYPES.UPDATE_BONUS_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.UPDATE_BONUS_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    default:
      return state;
  }
};
