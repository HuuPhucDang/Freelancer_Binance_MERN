export default {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  USERS: {
    UPDATE_AVATAR: '/users/avatar',
    FETCH_USERS: '/users',
    GET_SELF: '/users/self',
    UPDATE_NICKNAME: '/users/nickname',
  },
  SECURITY: {
    CHANGE_PASSWORD: '/security/changePassword',
    VERIFY_PHONE_NUMBER: '/security/phonenumber',
    ACTIVE_EMAIL: '/security/activeEmail',
    CHANGE_EMAIL: '/security/changeEmail',
    ACTIVE_WITHDRAW_PASSWORD: '/security/activeWithdrawPassword',
    CHANGE_WITHDRAW_PASSWORD: '/security/changeWithdrawPassword',
  },
  BANK: {
    ACTIVE_BANK_CARD: '/bank/active',
  },
  VERIFICATION: {
    UPLOAD_CARDS_ID: '/verification/uploadIdCard',
  },
};
