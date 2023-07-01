import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';
import { pushNotification } from '../../Libs/utils/Widget.utils';

// SINGLE ACTIONS
const setBonusLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_BONUS_ACTION_LOADING,
    payload,
  };
};

// ASYNC ACTIONS
const getSystemInfoFail = () => {
  return {
    type: ACTION_TYPES.FETCH_BONUS_FAILURE,
  };
};

const getSystemInfoSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_BONUS_SUCCESS,
    payload,
  };
};

const fetchAllBonus = () => {
  return async (dispatch: any) => {
    dispatch(setBonusLoading(true));
    await API.getAllBonus()
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
    type: ACTION_TYPES.UPDATE_BONUS_FAILURE,
  };
};

const updateSystemInfoSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPDATE_BONUS_SUCCESS,
    payload,
  };
};

const updateBonus = (id: string, payload: any) => {
  return async (dispatch: any) => {
    dispatch(setBonusLoading(true));
    await API.updateBonus(id, payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        const resolveResults: { message: string } = results as {
          message: string;
        };
        const { message } = resolveResults;
        if (!results) await dispatch(updateSystemInfoFail());
        else {
          pushNotification({
            type: 'success',
            message,
          });
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
  fetchAllBonus,
  updateBonus,
};
