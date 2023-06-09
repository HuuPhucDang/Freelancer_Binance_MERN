import React from 'react';
import _ from 'lodash';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GppGoodIcon from '@mui/icons-material/GppGood';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { EditAvatar, EditName } from '@/Components/Popup';
import { ENUMS, ROUTERS } from '@/Constants';
import { Utils } from '@/Libs';
import { AuthActions, UserActions } from '@/Reducers/Actions';
import { useTypedDispatch } from '@/Reducers/store';

import Assets from '../../../Assets';
import { useLocation } from 'react-router';
interface IMenu {
  icon: JSX.Element;
  label: string;
  path: string;
  isOnlyUser: boolean;
}
const menu: IMenu[] = [
  {
    icon: (
      <AdminPanelSettingsIcon
        sx={{
          fontSize: '35px !important',
        }}
      />
    ),
    label: 'Bảo mật',
    path: ROUTERS.SECURITY,
    isOnlyUser: false,
  },
  {
    icon: (
      <GppGoodIcon
        sx={{
          fontSize: '35px !important',
        }}
      />
    ),
    label: 'Xác minh',
    path: ROUTERS.VERIFY,
    isOnlyUser: false,
  },
  {
    icon: (
      <AccountBalanceIcon
        sx={{
          fontSize: '35px !important',
        }}
      />
    ),
    label: 'Liên kết ngân hàng',
    path: ROUTERS.CONNECT_BANK,
    isOnlyUser: false,
  },
  {
    icon: (
      <AccountBalanceWalletOutlinedIcon
        sx={{
          fontSize: '35px !important',
        }}
      />
    ),
    label: 'Lịch sử nạp rút',
    path: ROUTERS.INVOICE,
    isOnlyUser: false,
  },
  {
    icon: (
      <RecordVoiceOverOutlinedIcon
        sx={{
          fontSize: '35px !important',
        }}
      />
    ),
    label: 'CSKH trực tuyến',
    path: ROUTERS.SUPPORT,
    isOnlyUser: true,
  },
];

const userTypes = [
  {
    label: 'Sơ cấp',
    value: ENUMS.EUserType.BEGINNER,
  },
  {
    label: 'Trung cấp',
    value: ENUMS.EUserType.INTERMEDIATE,
  },
  {
    label: 'Nâng cao',
    value: ENUMS.EUserType.ADVANCE,
  },
  {
    label: 'Chuyên nghiệp',
    value: ENUMS.EUserType.PROFESSINAL,
  },
];

const { getSelf } = UserActions;
const { logout } = AuthActions;

const Overview: React.FC = () => {
  // Constructors
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [isShowNamePopup, setIsShowNamePopup] = React.useState<boolean>(false);
  const [isShowAvatarPopup, setIsShowAvatarPopup] =
    React.useState<boolean>(false);
  const { pathname } = useLocation();

  const [tableData, setTableData] = React.useState<any>([]);
  const [enchangeRate, setEnchangeRate] = React.useState<number>(0);

  React.useEffect(() => {
    Utils.WebSocket.emit('getLatestCoins', null, (data: any) => {
      setTableData(data);
    });
    Utils.WebSocket.on('updateAllCoinPriceNow', (data) => {
      setTableData(data);
    });
    Utils.WebSocket.emit(
      'exchangeCurrency',
      { symbol: 'USDTVND' },
      (data: any) => {
        setEnchangeRate(data || 0);
      }
    );
    dispatch(getSelf());
    return () => {
      Utils.WebSocket.off('updateAllCoinPriceNow');
      // Utils.WebSocket.disconnect();
    };
  }, []);

  // Renders
  const userType = React.useMemo(() => {
    let result = 'Sơ cấp';
    const findUserType = userTypes.find(
      (item: { label: string; value: string }) =>
        item.value === userData?.userType
    );

    if (findUserType) result = findUserType.label;
    return result;
  }, []);

  const onSignOut = async () => {
    await dispatch(logout());
    await Utils.clearCookies();
    await Utils.redirect(ROUTERS.SIGN_IN);
  };

  const _renderTable = () => (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 'none',
        borderRadius: '0px',
      }}
    >
      <Table
        size="small"
        sx={{
          minWidth: '100%',
          backgroundColor: 'background.mainContent',
        }}
        aria-label="simple table"
      >
        <TableBody>
          {_.isEmpty(tableData) && (
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ textAlign: 'center' }}
              >
                No Coins available
              </TableCell>
            </TableRow>
          )}
          {_.map(tableData, (item, index) => (
            <TableRow
              key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ padding: { xs: '4px', pc: '8px' } }}
              >
                <Stack direction="row" alignItems="center">
                  <Box
                    component="img"
                    src={item?.icon}
                    sx={{
                      width: {
                        xs: '22px',
                        pc: '36px',
                      },
                      borderRadius: '50px',
                      height: 'auto',
                      objectFit: 'contain',
                      marginRight: '10px',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '13px',
                        pc: '20px',
                      },
                      lienHeight: '20px',
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {item?.symbol}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell
                align="right"
                sx={{ padding: { xs: '4px', pc: '8px' } }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '10px',
                      pc: '20px',
                    },
                    lineHeight: '24px',
                    color: 'text.primary',
                  }}
                >
                  {item?.price}
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ padding: { xs: '4px', pc: '8px' } }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '10px',
                      pc: '20px',
                    },
                    lineHeight: '24px',
                    color: item?.growth < 0 ? '#F03030' : '#23631D',
                  }}
                >
                  {item?.growth}%
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{ padding: { xs: '4px', pc: '8px' } }}
              >
                <Link
                  sx={{
                    fontSize: {
                      xs: '10px',
                      pc: '20px',
                    },
                    lineHeight: '14px',
                    fontWeight: 400,
                    color: 'text.burntSienna',
                    textAlign: 'left',
                    marginTop: '20px',
                  }}
                  href={`${ROUTERS.TRANSACTION}?symbol=${item?.symbol}`}
                >
                  Giao dịch
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const _renderMobile = () => {
    return (
      <Grid
        container
        columnSpacing="24px"
        rowSpacing={3.5}
        padding={{ xs: '10px', md: 0 }}
      >
        <Grid item xs={12}>
          <Stack direction="row">
            <Avatar
              src={userData.avatar || ''}
              sx={{
                width: { xs: '70px', pc: '94px' },
                height: { xs: '70px', pc: '94px' },
                marginRight: '20px',
              }}
            />
            <Stack direction="column">
              <Typography
                sx={{
                  marginRight: '16px',
                  fontSize: '24px',
                  fontWeight: '600',
                }}
              >
                {userData ? userData?.nickname : 'Anonymous-User-b5b47p'}
              </Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                spacing={4}
                marginTop="10px"
              >
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 400,
                    color: userData?.security?.isVerified
                      ? '#23631D'
                      : '#E71616',
                  }}
                >
                  {userData?.security?.isVerified
                    ? 'Đã xác minh'
                    : 'Chưa xác minh'}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '18px',
                  }}
                >
                  {userType}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        {userData?.bank ? (
          <Grid item xs={12}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxHeight: 'max-content',
              }}
            >
              <Box
                src={Assets.bankCardImage}
                component="img"
                sx={{ width: '100%' }}
              />
              <Stack
                direction="column"
                sx={{
                  position: 'absolute',
                  top: '13%',
                  left: '30%',
                  userSelect: 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    textTransform: 'uppercase',
                    color: 'text.burntSienna',
                    fontWeight: 500,
                  }}
                >
                  {userData?.bank?.fullname}
                </Typography>
              </Stack>
              <Stack
                direction="column"
                sx={{
                  position: 'absolute',
                  top: '44%',
                  left: '30%',
                  userSelect: 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    textTransform: 'uppercase',
                    color: 'text.burntSienna',
                    fontWeight: 500,
                  }}
                >
                  {userData?.bank?.accountNumber}
                </Typography>
              </Stack>
              <Stack
                direction="column"
                sx={{
                  position: 'absolute',
                  bottom: '24%',
                  left: '30%',
                  userSelect: 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    textTransform: 'uppercase',
                    color: 'text.burntSienna',
                    fontWeight: 500,
                  }}
                >
                  {userData?.wallet?.balance || 0} USDT
                </Typography>
              </Stack>
              <Stack
                direction="column"
                sx={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '13%',
                  userSelect: 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    textTransform: 'uppercase',
                    color: 'text.burntSienna',
                    fontWeight: 500,
                  }}
                >
                  {userData?.bank?.bankName}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ) : null}
        <Grid xs={12}>
          <Stack direction="column" spacing="8px" padding="14px">
            {menu.map((item: IMenu) => {
              const isActive = item.path === pathname;
              if (item.isOnlyUser && userData?.role === 'admin') return null;
              return (
                <Button
                  key={item.path}
                  startIcon={item.icon}
                  variant="text"
                  href={item.path}
                  sx={{
                    display: 'flex',
                    color: 'text.primary',
                    justifyContent: 'flex-start',
                    fontSize: '20px',
                    height: {
                      xs: '40px',
                      pc: '55px',
                    },
                    padding: '0 10px',
                    textTransform: 'unset',
                    whiteSpace: 'nowrap',
                    minWidth: {
                      xs: 'max-content',
                      md: '100%',
                    },
                    backgroundColor: isActive
                      ? 'background.mainContent'
                      : 'transparent',
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
            <Button
              startIcon={
                <LogoutIcon
                  sx={{
                    fontSize: '35px !important',
                  }}
                />
              }
              variant="text"
              sx={{
                display: 'flex',
                color: 'text.primary',
                justifyContent: 'flex-start',
                fontSize: '20px',
                height: {
                  xs: '40px',
                  pc: '55px',
                },
                padding: '0 10px',
                textTransform: 'unset',
                whiteSpace: 'nowrap',
                minWidth: {
                  xs: 'max-content',
                  md: '100%',
                },
                backgroundColor: 'transparent',
              }}
              onClick={() => onSignOut()}
            >
              Đăng xuất
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const _renderDesktop = () => {
    return (
      <Grid
        container
        columnSpacing="24px"
        rowSpacing={3.5}
        padding={{ xs: '10px', md: 0 }}
      >
        <Grid item xs={12}>
          <Stack
            direction="row"
            sx={{
              backgroundColor: 'background.mainContent',
              padding: '13px',
            }}
          >
            <Avatar
              src={userData.avatar || ''}
              sx={{
                width: { xs: '70px', pc: '94px' },
                height: { xs: '70px', pc: '94px' },
                marginRight: '20px',
              }}
            />
            <Stack direction="column">
              <Stack direction="row" alignItems="center" marginBottom="16px">
                <Typography
                  sx={{
                    marginRight: '16px',
                    fontSize: {
                      xs: '14px',
                      pc: '24px',
                    },
                  }}
                >
                  {userData ? userData?.nickname : 'Anonymous-User-b5b47p'}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setIsShowNamePopup(true)}
                >
                  <ModeEditOutlineOutlinedIcon sx={{ fontSize: '20px' }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setIsShowAvatarPopup(true)}
                >
                  <RemoveRedEyeOutlinedIcon sx={{ fontSize: '20px' }} />
                </IconButton>
              </Stack>
              <Stack direction="row" flexWrap="wrap">
                <Box sx={{ marginRight: '20px', minWidth: 'max-content' }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '12px',
                        pc: '20px',
                      },
                      fontWeight: 600,
                    }}
                  >
                    ID người dùng
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '12px',
                        pc: '20px',
                      },
                    }}
                  >
                    {userData?.id}
                  </Typography>
                </Box>
                <Box sx={{ minWidth: 'max-content' }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '12px',
                        pc: '20px',
                      },
                      fontWeight: 600,
                    }}
                  >
                    Loại người dùng
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '12px',
                        pc: '20px',
                      },
                    }}
                  >
                    {userType}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: 'background.mainContent',
              padding: {
                xs: '20px',
                pc: '31px 60px',
              },
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>
                Số dư ước tính
              </Typography>
              <Stack direction="row" alignItems="center" marginTop="30px">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      pc: '24px',
                    },
                    fontWeight: 600,
                    lineHeight: '30px',
                  }}
                >
                  {Number(userData?.wallet?.balance || 0).toFixed(2)} USDT
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      pc: '24px',
                    },
                    fontWeight: 600,
                    lineHeight: '30px',
                    marginLeft: '30px',
                  }}
                >
                  ~~{' '}
                  {(
                    userData?.wallet?.balance * enchangeRate || 0
                  ).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Typography>
              </Stack>
            </Box>
            <Stack
              direction="row"
              marginTop={{
                xs: '10px',
                pc: '50px',
              }}
            >
              <Button
                sx={{
                  fontSize: {
                    xs: '16px',
                    pc: '20px',
                  },
                  fontWeigh: 500,
                  textTransform: 'unset',
                  backgroundColor: 'background.burntSienna',
                  color: 'text.secondary',
                  width: {
                    xs: '110px',
                    pc: '256px',
                  },
                  height: {
                    xs: '32px',
                    pc: '64px',
                  },
                  marginRight: {
                    xs: '10px',
                    pc: '30px',
                  },
                  borderRadius: '0px',
                }}
                onClick={() => Utils.redirect(ROUTERS.RECHARGE)}
              >
                Nạp
              </Button>
              <Button
                sx={{
                  fontSize: {
                    xs: '16px',
                    pc: '20px',
                  },
                  fontWeigh: 500,
                  textTransform: 'unset',
                  backgroundColor: 'background.lightSilver',
                  color: 'text.secondary',
                  width: {
                    xs: '110px',
                    pc: '256px',
                  },
                  height: {
                    xs: '32px',
                    pc: '64px',
                  },
                  borderRadius: '0px',
                }}
                onClick={() => Utils.redirect(ROUTERS.WITHDRAW_MONEY)}
              >
                Rút
              </Button>
            </Stack>
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <Typography
              sx={{
                fontSize: {
                  xs: '20px',
                  pc: '24px',
                },
                lineHeight: '24px',
                fontWeight: 600,
              }}
            >
              Giao dịch có trách nhiệm trong Binance Futures{' '}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: '11px',
                  pc: '16px',
                },
                lineHeight: '13px',
                color: '#7D6F6F',
                marginTop: '6px',
              }}
            >
              2023-05-22 09:28{' '}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: '15px',
                  pc: '20px',
                },
                lineHeight: {
                  xs: '18px',
                  pc: '24px',
                },
                marginTop: '12px',
              }}
            >
              Hợp đồng giao dịch nên được lên kế hoạch tốt và cân nhắc kĩ lưỡng.
              Để trở thành một trader thành công bạn phải giao dịch có trách
              nhiệm. Tìm hiểu lí do giải thích tại sao giao dịch có trách nhiệm
              lại quan trọng đối với thành công của bất kì trader nào và tìm
              hiểu một số lời khuyên khi bắt đầu{' '}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={5.5}>
          <Stack
            direction="column"
            sx={{
              backgroundColor: 'background.mainContent',
              padding: '24px',
            }}
          >
            <Stack direction="row" alignItems="center">
              <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>
                Thị trường
              </Typography>
              <IconButton
                href={ROUTERS.TRANSACTION}
                sx={{ marginLeft: '30px' }}
              >
                <Box
                  component="img"
                  src={Assets.rightIcon}
                  sx={{ width: '34px' }}
                />
              </IconButton>
            </Stack>
            <Stack sx={{ padding: '10px' }}>{_renderTable()}</Stack>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          display: 'flex',
          minHeight: {
            xs: 'calc(100vh - 70px)',
            md: 'calc(100vh - 180px)',
          },
          padding: {
            xs: '0',
          },
          margin: {
            xs: 0,
            md: '20px auto 0px auto',
          },
        }}
      >
        <EditAvatar
          open={isShowAvatarPopup}
          onClose={() => setIsShowAvatarPopup(false)}
        />
        <EditName
          open={isShowNamePopup}
          onClose={() => setIsShowNamePopup(false)}
        />
        <Grid container flex={1}>
          {isMd ? null : (
            <Grid
              item
              xs={12}
              md={2}
              width="100%"
              sx={{
                position: {
                  xs: 'sticky',
                  md: 'unset',
                },
                top: '70px',
                backgroundColor: 'background.default',
                zIndex: 1,
              }}
              borderTop="1px solid rgba(187, 174, 174, 0.9)"
            >
              <Sidebar />
            </Grid>
          )}

          <Grid
            item
            xs={12}
            md={9.5}
            borderLeft="1px solid rgba(187, 174, 174, 0.9)"
            padding={{
              xs: '10px',
              pc: '32px 32px 9px 26px',
            }}
            borderTop="1px solid rgba(187, 174, 174, 0.9)"
          >
            {isMd ? _renderMobile() : _renderDesktop()}
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Tổng quan" />;
};

export default Overview;
