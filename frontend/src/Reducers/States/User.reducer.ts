import { ACTION_TYPES, DEFAULT_LOADING_STATES } from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
};

export default (
  state = DEFAULT_STATES,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_USER_ACTION_LOADING: {
      return {
        ...state,
        isActionLoading: payload,
      };
    }
    case ACTION_TYPES.RESET_USER_REDUCER:
      return DEFAULT_STATES;

    case ACTION_TYPES.UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.UPDATE_AVATAR_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    case ACTION_TYPES.FETCH_USERS_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.FETCH_USERS_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    case ACTION_TYPES.GET_SELF_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.GET_SELF_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isActionLoading: false,
      };

    case ACTION_TYPES.UPDATE_NICKNAME_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isActionLoading: false,
      };
    case ACTION_TYPES.UPDATE_NICKNAME_FAILURE:
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
