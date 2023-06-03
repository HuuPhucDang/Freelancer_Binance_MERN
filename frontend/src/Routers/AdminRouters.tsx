import { ROUTERS } from '@/Constants';
import { AdminPages } from '@pages';
import { ADMIN_ROUTER_ROOT } from '../Constants/Routers';

const AdminRouters = {
  path: ADMIN_ROUTER_ROOT,
  children: [
    {
      path: ROUTERS.REQUEST,
      element: <AdminPages.Request />,
    },
    {
      path: ROUTERS.ADMIN_SUPPORT,
      element: <AdminPages.Support />,
    },
    {
      path: ROUTERS.BANK_INFORMATION,
      element: <AdminPages.BankInformation />,
    },
  ],
};

export default AdminRouters;
