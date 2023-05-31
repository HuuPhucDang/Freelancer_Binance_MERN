const USER_ROUTER_ROOT = '/';

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
};

export { USER_ROUTERS };

export default {
  ...USER_ROUTERS,
};
