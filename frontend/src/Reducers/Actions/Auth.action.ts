import { ACTION_TYPES, ROUTERS } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';

// SINGLE ACTIONS
const setLogged = () => {
  return {
    type: ACTION_TYPES.SET_LOGGED,
  };
};

const setAuthLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_AUTH_ACTION_LOADING,
    payload,
  };
};

const resetAuthReducer = () => {
  return {
    type: ACTION_TYPES.RESET_AUTH_REDUCER,
  };
};

// ASYNC ACTIONS
const loginFail = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
  };
};

const loginSuccess = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  };
};

const login = (payload: { username: string; password: string }) => {
  return async (dispatch: any) => {
    dispatch(setAuthLoading(true));
    await API.login(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(loginFail());
        else {
          const resolveResult: {
            message: string;
            payload: any;
            status: boolean;
          } = results as { message: string; payload: any; status: boolean };
          const { tokens, user } = resolveResult.payload;
          Utils.setAccessToken(tokens.access);
          Utils.setAccessToken(tokens.refresh);
          Utils.setUserData(user);
          dispatch(loginSuccess());
          Utils.redirect(ROUTERS.TRANSACTION);
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(loginFail());
      });
  };
};

const registerSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.REGISTER_SUCCESS,
    payload,
  };
};

const registerFail = () => {
  return {
    type: ACTION_TYPES.REGISTER_FAILURE,
  };
};

const register = (payload: {
  username: string;
  password: string;
  confirmPassword: string;
  inviteCode: string;
}) => {
  return async (dispatch: any) => {
    dispatch(setAuthLoading(true));
    await API.register(payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(registerFail());
        else {
          dispatch(registerSuccess(result));
          Utils.redirect(ROUTERS.SIGN_IN);
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(registerFail());
      });
  };
};

export default { setLogged, resetAuthReducer, login, register };
