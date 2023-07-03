import React from 'react';
import _ from 'lodash';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
  TableHead,
  TextField,
  InputAdornment,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GppGoodIcon from '@mui/icons-material/GppGood';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { EditAvatar, EditName } from '@/Components/Popup';
import { ENUMS, ROUTERS } from '@/Constants';
import { Utils } from '@/Libs';
import { AuthActions, UserActions } from '@/Reducers/Actions';
import { useTypedDispatch } from '@/Reducers/store';

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

  const [tableData, setTableData] = React.useState<any>([]);
  const [enchangeRate, setEnchangeRate] = React.useState<number>(0);
  const [keyword, setKeyword] = React.useState<string>('');

  React.useEffect(() => {
    if (!isMd) Utils.redirect(ROUTERS.HOME);
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
  const _renderTable = () => {
    const resolveData = tableData.filter((item: { symbol: string }) =>
      item.symbol.includes(keyword)
    );
    return (
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
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#7D6F6F',
                  padding: 0,
                }}
              >
                Tên
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#7D6F6F',
                  padding: 0,
                }}
              >
                Giá gần nhất
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#7D6F6F',
                  padding: 0,
                }}
              >
                Thay đổi 24h
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.isEmpty(resolveData) && (
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
            {_.map(resolveData, (item, index) => (
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
                        fontSize: '20px',
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
                      fontSize: '20px',
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
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 20px',
                      fontSize: '20px',
                      lineHeight: '24px',
                      background: '#E71616',
                      borderRadius: '4px',
                      color: '#FFFFFF',
                      height: '43px',
                      width: '96px',
                    }}
                  >
                    {item?.growth}%
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const _renderContent = () => {
    return (
      <Grid
        container
        columnSpacing="24px"
        rowSpacing={3.5}
        padding={{ xs: '10px', md: 0 }}
      >
        <Grid item xs={12} md={6}>
          <Stack direction="column">
            <TextField
              id="outlined-basic"
              label="Tìm kiếm"
              variant="outlined"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              sx={{
                background: 'rgba(187, 174, 174, 0.34)',
                borderRadius: '10px',

                '> *': {
                  fontSize: '20px',
                  fontWeight: 600,
                  borderRadius: '10px',
                  borderColor: 'rgba(187, 174, 174, 0.34) !important',
                },
                fieldset: {
                  borderColor: 'rgba(187, 174, 174, 0.34) !important',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon sx={{ fontSize: '40px' }} />
                  </InputAdornment>
                ),
              }}
            />
            <Stack direction="row" marginTop="30px">
              <Stack direction="column" flex={1}>
                <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>
                  Tổng số dư (BTC)
                </Typography>
                <Stack direction="column">
                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontWeight: 600,
                      lineHeight: '30px',
                    }}
                  >
                    {Number(userData?.wallet?.balance || 0).toFixed(2)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontWeight: 400,
                      lineHeight: '30px',
                      marginTop: '6px',
                    }}
                  >
                    ={' '}
                    {(
                      userData?.wallet?.balance * enchangeRate || 0
                    ).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                marginTop={{
                  xs: '10px',
                  pc: '50px',
                }}
              >
                <Button
                  sx={{
                    fontSize: '20px',
                    fontWeight: 600,
                    textTransform: 'unset',
                    backgroundColor: 'background.burntSienna',
                    color: 'text.secondary',
                    width: '111px',
                    height: '43px',
                    marginRight: {
                      xs: '10px',
                      pc: '30px',
                    },
                    borderRadius: '8px',
                  }}
                  onClick={() => Utils.redirect(ROUTERS.RECHARGE)}
                >
                  Nạp tiền
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="column" sx={{}}>
            <Stack direction="row" alignItems="center">
              <Typography sx={{ fontSize: '22px', fontWeight: 400 }}>
                Danh sách yêu thích
              </Typography>
            </Stack>
            <Stack sx={{ width: '100%' }}>{_renderTable()}</Stack>
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
            {_renderContent()}
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Tổng quan" />;
};

export default Overview;
