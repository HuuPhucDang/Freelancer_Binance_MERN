const USER_ROUTER_ROOT = '/';

const USER_ROUTERS = {
  NOT_FOUND: '*',
  HOME: USER_ROUTER_ROOT,
  OVERVIEW: `${USER_ROUTER_ROOT}overview`,
};

export { USER_ROUTERS };

export default {
  ...USER_ROUTERS,
};
