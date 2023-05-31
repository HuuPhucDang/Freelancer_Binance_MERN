import { Button, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GppGoodIcon from '@mui/icons-material/GppGood';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import { ROUTERS } from '../../../Constants';
import { useLocation } from 'react-router';
interface IMenu {
  icon: JSX.Element;
  label: string;
  path: string;
}

const menu: IMenu[] = [
  {
    icon: <PersonIcon />,
    label: 'Tổng quan',
    path: ROUTERS.OVERVIEW,
  },
  {
    icon: <AdminPanelSettingsIcon />,
    label: 'Bảo mật',
    path: ROUTERS.SECURITY,
  },
  {
    icon: <GppGoodIcon />,
    label: 'Xác minh',
    path: ROUTERS.VERIFY,
  },
  {
    icon: <AccountBalanceIcon />,
    label: 'Liên kết ngân hàng',
    path: ROUTERS.CONNECT_BANK,
  },
  {
    icon: <AccountBalanceWalletOutlinedIcon />,
    label: 'Lịch sử nạp rút',
    path: ROUTERS.INVOICE,
  },
  {
    icon: <RecordVoiceOverOutlinedIcon />,
    label: 'CSKH trực tuyến',
    path: ROUTERS.SUPPORT,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <Stack
      sx={{
        borderRight: '1px solid background.lightSilver',
        height: '100%',
      }}
    >
      {menu.map((item: IMenu) => {
        const isActive = item.path === pathname;
        return (
          <Button
            key={item.path}
            startIcon={item.icon}
            variant="text"
            href={item.path}
            sx={{
              color: 'text.primary',
              justifyContent: 'flex-start',
              fontSize: '12px',
              height: '40px',
              padding: '0 10px',
              textTransform: "unset",
              backgroundColor: isActive
                ? 'background.secondary'
                : 'transparent',
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
};

export default Sidebar;
