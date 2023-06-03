const USER_ROUTER_ROOT = '/';
const AUTH_ROUTER_ROOT = '/auth';
const ADMIN_ROUTER_ROOT = '/admin';

const USER_ROUTERS = {
  NOT_FOUND: '*',
  HOME: USER_ROUTER_ROOT,
  OVERVIEW: `${USER_ROUTER_ROOT}overview`,
  SECURITY: `${USER_ROUTER_ROOT}security`,
  VERIFY: `${USER_ROUTER_ROOT}verify`,
  CONNECT_BANK: `${USER_ROUTER_ROOT}connect-bank`,
  INVOICE: `${USER_ROUTER_ROOT}invoice`,
  SUPPORT: `${USER_ROUTER_ROOT}support`,
  RECHARGE: `${USER_ROUTER_ROOT}recharge`,
  WITHDRAW_MONEY: `${USER_ROUTER_ROOT}withdraw-money`,
  TRANSACTION: `${USER_ROUTER_ROOT}transaction`,
};

const AUTH_ROUTERS = {
  SIGN_IN: `${AUTH_ROUTER_ROOT}/sign-in`,
  SIGN_UP: `${AUTH_ROUTER_ROOT}/sign-up`,
};

const ADMIN_ROUTERS = {
  REQUEST: `${ADMIN_ROUTER_ROOT}/request`,
  BANK_INFORMATION: `${ADMIN_ROUTER_ROOT}/bank-information`,
  ADMIN_SUPPORT: `${ADMIN_ROUTER_ROOT}/support`,
};

export { USER_ROUTERS, AUTH_ROUTERS, ADMIN_ROUTER_ROOT };

export default {
  ...USER_ROUTERS,
  ...AUTH_ROUTERS,
  ...ADMIN_ROUTERS,
};
