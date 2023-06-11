import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';

// SINGLE ACTIONS
const setSystemInfoLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_SYSTEM_INFO_ACTION_LOADING,
    payload,
  };
};

const resetSystemInfoReducer = () => {
  return {
    type: ACTION_TYPES.RESET_SYSTEM_INFO_REDUCER,
  };
};

// ASYNC ACTIONS
const getSystemInfoFail = () => {
  return {
    type: ACTION_TYPES.GET_SYSTEM_INFO_FAILURE,
  };
};

const getSystemInfoSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_SYSTEM_INFO_SUCCESS,
    payload,
  };
};

const getSystemInfo = () => {
  return async (dispatch: any) => {
    dispatch(setSystemInfoLoading(true));
    await API.getSystemInfo()
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(getSystemInfoFail());
        else {
          const resolveResult: {
            message: string;
            payload: any;
            status: boolean;
          } = results as { message: string; payload: any; status: boolean };
          dispatch(getSystemInfoSuccess(resolveResult.payload));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getSystemInfoFail());
      });
  };
};

const updateSystemInfoFail = () => {
  return {
    type: ACTION_TYPES.UPDATE_SYSTEM_INFO_FAILURE,
  };
};

const updateSystemInfoSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_SYSTEM_INFO_SUCCESS,
    payload,
  };
};

const updateSystemInfo = (id: string, payload: FormData) => {
  return async (dispatch: any) => {
    dispatch(setSystemInfoLoading(true));
    await API.updateSystemInfo(id, payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(updateSystemInfoFail());
        else {
          dispatch(updateSystemInfoSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(updateSystemInfoFail());
      });
  };
};

export default {
  resetSystemInfoReducer,
  getSystemInfo,
  updateSystemInfo,
};
