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

const _loadingActions: ActionTypes = generateLoadingActions([
  'AUTH',
  'BLOG',
  'BANK',
  'SECURITY',
  'USER',
  'VERIFICATION',
]);

const _asyncActions: ActionTypes = generateSyncActions([
  'FETCH_LATEST_BLOG_LIST',
  'FETCH_BLOG_SECTION',
  'GET_BLOG_BY_ID',
  'LOGIN',
  'REGISTER',
  'UPDATE_NICKNAME',
  'ACTIVE_BANK_CARD',
  'CHANGE_PASSWORD',
  'VERIFY_PHONE_NUMBER',
  'ACTIVE_EMAIL',
  'CHANGE_EMAIL',
  'ACTIVE_WITHDRAW_PASSWORD',
  'CHANGE_WITHDRAW_PASSWORD',
  'UPDATE_AVATAR',
  'FETCH_USERS',
  'GET_SELF',
  'UPDATE_NICKNAME',
  'UPLOAD_CARDS_ID',
]);

const _singleActions: ActionTypes = {
  // Auth actions
  SET_LOGGED: 'SET_LOGGED',
  RESET_AUTH_REDUCER: 'RESET_AUTH_REDUCER',
  // Widget actions
  SET_NOTIFICATION_MESSAGE: 'SET_NOTIFICATION_MESSAGE',
  SET_ALERT_MESSAGE: 'SET_ALERT_MESSAGE',
  // Blog actions
  SET_BLOG_PAGINATION: 'SET_BLOG_PAGINATION',
  SET_BLOG_META: 'SET_BLOG_META',
  RESET_BLOG_REDUCER: 'RESET_BLOG_REDUCER',
  // Bank actions
  RESET_BANK_REDUCER: 'RESET_BANK_REDUCER',
  // Security actions
  RESET_SECURITY_REDUCER: 'RESET_SECURITY_REDUCER',
  // User actions
  RESET_USER_REDUCER: 'RESET_USER_REDUCER',
  // Verification actions
  RESET_VERIFICATION_REDUCER: 'RESET_VERIFICATION_REDUCER',
};

const ACTION_TYPES = {
  ..._asyncActions,
  ..._singleActions,
  ..._loadingActions,
};

export default ACTION_TYPES;
