import { ROUTERS } from '@/Constants';
import { AuthPages } from '@pages';

const AuthRouters = {
  path: ROUTERS.HOME,
  children: [
    {
      path: ROUTERS.SIGN_IN,
      element: <AuthPages.SignIn />,
    },
    {
      path: ROUTERS.SIGN_UP,
      element: <AuthPages.SignUp />,
    },
  ],
};

export default AuthRouters;
