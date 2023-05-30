import {
  ACTION_TYPES,
  DEFAULT_LOADING_STATES,
  DEFAULT_PAGINATION,
} from '@/Constants';

const DEFAULT_STATES = {
  ...DEFAULT_LOADING_STATES,
  recommendBlogList: [],
  blogSection: [],
  pagination: DEFAULT_PAGINATION,
  meta: null,
  blogDetail: null,
};

export default (
  state = DEFAULT_STATES,
  action: { type: string; payload: string }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SET_BLOG_FETCH_LOADING: {
      return {
        ...state,
        isFetchLoading: payload,
      };
    }
    case ACTION_TYPES.SET_BLOG_GET_LOADING: {
      return {
        ...state,
        isGetLoading: payload,
      };
    }
    case ACTION_TYPES.SET_BLOG_PAGINATION:
      return {
        ...state,
        pagination: payload,
      };
    case ACTION_TYPES.SET_BLOG_META:
      return {
        ...state,
        meta: payload,
      };
    case ACTION_TYPES.RESET_BLOG_REDUCER:
      return DEFAULT_STATES;

    case ACTION_TYPES.FETCH_LATEST_BLOG_LIST_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isFetchLoading: false,
        recommendBlogList: payload,
      };
    case ACTION_TYPES.FETCH_LATEST_BLOG_LIST_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isFetchLoading: false,
      };

    case ACTION_TYPES.FETCH_BLOG_SECTION_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isFetchLoading: false,
        blogSection: payload,
      };
    case ACTION_TYPES.FETCH_BLOG_SECTION_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isFetchLoading: false,
      };

    case ACTION_TYPES.GET_BLOG_BY_ID_SUCCESS:
      return {
        ...state,
        requestIsSuccess: true,
        requestHasError: false,
        isGetLoading: false,
        countryDetail: payload,
      };
    case ACTION_TYPES.GET_BLOG_BY_ID_FAILURE:
      return {
        ...state,
        requestHasError: true,
        requestIsSuccess: false,
        isGetLoading: false,
      };

    default:
      return state;
  }
};
