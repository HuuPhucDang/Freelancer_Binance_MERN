import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';

// SINGLE ACTIONS
const setChatBoxLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_CHAT_BOX_ACTION_LOADING,
    payload,
  };
};

const resetChatBoxReducer = () => {
  return {
    type: ACTION_TYPES.RESET_CHAT_BOX_REDUCER,
  };
};

// ASYNC ACTIONS
const fetchChatBoxFail = () => {
  return {
    type: ACTION_TYPES.FETCH_CHAT_BOX_FAILURE,
  };
};

const fetchChatBoxSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_CHAT_BOX_SUCCESS,
    payload,
  };
};

const fetchChatBox = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setChatBoxLoading(true));
    await API.fetchChatBox(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(fetchChatBoxFail());
        else {
          dispatch(fetchChatBoxSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchChatBoxFail());
      });
  };
};

const fetchChatBoxByIdFail = () => {
  return {
    type: ACTION_TYPES.FETCH_CHAT_BOX_BY_ID_FAILURE,
  };
};

const fetchChatBoxByIdSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_CHAT_BOX_BY_ID_SUCCESS,
    payload,
  };
};

const fetchChatBoxById = (id: string) => {
  return async (dispatch: any) => {
    dispatch(setChatBoxLoading(true));
    await API.fetchChatBoxById(id)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(fetchChatBoxByIdFail());
        else {
          dispatch(fetchChatBoxByIdSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchChatBoxByIdFail());
      });
  };
};

export default {
  resetChatBoxReducer,
  fetchChatBox,
  fetchChatBoxById,
};
