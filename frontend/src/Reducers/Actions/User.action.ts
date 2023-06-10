import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';

// SINGLE ACTIONS
const setUserLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_USER_ACTION_LOADING,
    payload,
  };
};

const resetUserReducer = () => {
  return {
    type: ACTION_TYPES.RESET_USER_REDUCER,
  };
};

// ASYNC ACTIONS
const updateAvatarFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_AVATAR_FAILURE,
  };
};

const updateAvatarSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_AVATAR_SUCCESS,
    payload,
  };
};

const updateAvatar = (payload: { avatar: string }) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.updateAvatar(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(updateAvatarFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          Utils.setUserData(resolveResult.payload);
          dispatch(updateAvatarSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateAvatarFail());
      });
  };
};

const fetchUsersSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_USERS_SUCCESS,
    payload,
  };
};

const fetchUsersFail = () => {
  return {
    type: ACTION_TYPES.FETCH_USERS_FAILURE,
  };
};

const fetchUsers = () => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.fetchUsers()
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(fetchUsersFail());
        else {
          dispatch(fetchUsersSuccess(result));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchUsersFail());
      });
  };
};

const getSelfFail = () => {
  return {
    type: ACTION_TYPES.GET_SELF_FAILURE,
  };
};

const getSelfSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_SELF_SUCCESS,
    payload,
  };
};

const getSelf = () => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.getSelf()
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(getSelfFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          Utils.setUserData(resolveResult.payload);
          dispatch(getSelfSuccess(resolveResult.payload));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getSelfFail());
      });
  };
};

const updateNicknameSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_NICKNAME_SUCCESS,
    payload,
  };
};

const updateNicknameFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_NICKNAME_FAILURE,
  };
};

const updateNickname = (payload: { nickname: string }) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.updateNickname(payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(updateNicknameFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = result as { status: boolean; message: string; payload: any };
          Utils.setUserData(resolveResult.payload);
          dispatch(updateNicknameSuccess(result));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateNicknameFail());
      });
  };
};

const updatePasswordSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_PASSWORD_SUCCESS,
    payload,
  };
};

const updatePasswordFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_PASSWORD_FAILURE,
  };
};

const updatePassword = (payload: { userId: string; password: string }) => {
  return async (dispatch: any) => {
    dispatch(setUserLoading(true));
    await API.updatePassword(payload)
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(updatePasswordFail());
        else {
          dispatch(updatePasswordSuccess(result));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updatePasswordFail());
      });
  };
};

export default {
  resetUserReducer,
  updateNickname,
  updateAvatar,
  fetchUsers,
  getSelf,
  updatePassword,
};
