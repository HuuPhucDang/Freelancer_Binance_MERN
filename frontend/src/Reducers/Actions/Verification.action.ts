import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';

// SINGLE ACTIONS
const setVerificationLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_VERIFICATION_ACTION_LOADING,
    payload,
  };
};

const resetVerificationReducer = () => {
  return {
    type: ACTION_TYPES.RESET_VERIFICATION_REDUCER,
  };
};

// ASYNC ACTIONS
const uploadCardsIdFail = () => {
  return {
    type: ACTION_TYPES.UPLOAD_CARDS_ID_FAILURE,
  };
};

const uploadCardsIdSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.UPLOAD_CARDS_ID_SUCCESS,
    payload,
  };
};

const uploadCardsId = (payload: FormData) => {
  return async (dispatch: any) => {
    dispatch(setVerificationLoading(true));
    await API.uploadCardsId(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(uploadCardsIdFail());
        else {
          const resolveResult: {
            status: boolean;
            message: string;
            payload: any;
          } = results as { status: boolean; message: string; payload: any };
          Utils.setUserData(resolveResult.payload);
          dispatch(uploadCardsIdSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(uploadCardsIdFail());
      });
  };
};

export default {
  resetVerificationReducer,
  uploadCardsId,
};
