import { ROUTERS } from '@/Constants';
import { MainPages } from '@pages';

const UserRouter = {
  path: ROUTERS.HOME,
  children: [
    {
      path: ROUTERS.HOME,
      element: <MainPages.Home />,
    },
    {
      path: ROUTERS.OVERVIEW,
      element: <MainPages.Overview />,
    },
  ],
};

const NotFoundRouter = {
  path: '*',
  element: <MainPages.NotFound />,
};

export default UserRouter;
export { NotFoundRouter };
