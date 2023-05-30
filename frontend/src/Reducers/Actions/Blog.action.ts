import _ from 'lodash';
import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';

// SINGLE ACTIONS
const setFetchBlogLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_BLOG_FETCH_LOADING,
    payload,
  };
};

const setGetBlogLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_BLOG_GET_LOADING,
    payload,
  };
};

const resetBlogReducer = () => {
  return {
    type: ACTION_TYPES.RESET_BLOG_REDUCER,
  };
};

// ASYNC ACTIONS
const fetchSectionFail = () => {
  return {
    type: ACTION_TYPES.FETCH_BLOG_SECTION_FAILURE,
  };
};

const fetchSectionSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_BLOG_SECTION_SUCCESS,
    payload,
  };
};

const fetchBlogSection = () => {
  return async (dispatch: any) => {
    dispatch(setFetchBlogLoading(true));
    await API.fetchBlogSection()
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(fetchSectionFail());
        else {
          dispatch(fetchSectionSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchSectionFail());
      });
  };
};

const fetchLatestListSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.FETCH_LATEST_BLOG_LIST_SUCCESS,
    payload,
  };
};

const fetchLatestListFail = () => {
  return {
    type: ACTION_TYPES.FETCH_LATEST_BLOG_LIST_FAILURE,
  };
};

const fetchLatestBlogList = () => {
  return async (dispatch: any) => {
    dispatch(setFetchBlogLoading(true));
    await API.fetchBlogList({ skipCount: 0, maxResultCount: 4 })
      .then(async (response: any) => {
        const result = await Utils.resolveResponse(response);
        if (!result) await dispatch(fetchLatestListFail());
        else {
          dispatch(fetchLatestListSuccess(result));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(fetchLatestListFail());
      });
  };
};

const getByIdSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_BLOG_BY_ID_SUCCESS,
    payload,
  };
};

const getByIdFail = () => {
  return {
    type: ACTION_TYPES.GET_BLOG_BY_ID_FAILURE,
  };
};

const getBlogById = (id: string) => {
  return async (dispatch: any) => {
    dispatch(setGetBlogLoading(true));
    await API.getBlogById(id)
      .then(async (response: any) => {
        const result: any = await Utils.resolveResponse(response);
        if (!result) await dispatch(getByIdFail());
        else {
          dispatch(getByIdSuccess(result));
        }
      })
      .catch(async (error: any) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getByIdFail());
      });
  };
};

export default {
  getBlogById,
  fetchBlogSection,
  fetchLatestBlogList,
  resetBlogReducer,
};
