interface ActionTypes {
  [key: string]: string;
}

const generateSyncActions = (actionList: string[]) => {
  const map: { [key: string]: string } = {};
  actionList.map((action) => {
    const name = action.trim();
    if (name !== '') {
      map[`${name}_SUCCESS`] = `${name}_SUCCESS`;
      map[`${name}_FAILURE`] = `${name}_FAILURE`;
    }
  });
  return map;
};

const generateLoadingActions = (actionList: string[]) => {
  const map: { [key: string]: string } = {};
  actionList.map((action) => {
    const name = action.trim();
    if (name !== '') {
      map[`SET_${name}_FETCH_LOADING`] = `SET_${name}_FETCH_LOADING`;
      map[`SET_${name}_GET_LOADING`] = `SET_${name}_GET_LOADING`;
      map[`SET_${name}_ACTION_LOADING`] = `SET_${name}_ACTION_LOADING`;
    }
  });
  return map;
};

const _loadingActions: ActionTypes = generateLoadingActions(['AUTH', 'BLOG']);

const _asyncActions: ActionTypes = generateSyncActions([
  'FETCH_LATEST_BLOG_LIST',
  'FETCH_BLOG_SECTION',
  'GET_BLOG_BY_ID',
]);

const _singleActions: ActionTypes = {
  // Auth actions
  SET_LOGGED: 'SET_LOGGED',
  // Widget actions
  SET_NOTIFICATION_MESSAGE: 'SET_NOTIFICATION_MESSAGE',
  SET_ALERT_MESSAGE: 'SET_ALERT_MESSAGE',
  // Blog actions
  SET_BLOG_PAGINATION: 'SET_BLOG_PAGINATION',
  SET_BLOG_META: 'SET_BLOG_META',
  RESET_BLOG_REDUCER: 'RESET_BLOG_REDUCER',
};

const ACTION_TYPES = {
  ..._asyncActions,
  ..._singleActions,
  ..._loadingActions,
};

export default ACTION_TYPES;
