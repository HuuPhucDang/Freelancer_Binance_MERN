import React from 'react';
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
} from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import Assets from '@/Assets';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Sidebar } from '@/Components/LayoutParts';
import { EditAvatar, EditName } from '../../../Components/Popup';
import { ROUTERS } from '../../../Constants';
import { Utils } from '@/Libs';

function createData(
  icon: string,
  symbol: string,
  name: string,
  value: number,
  traffic: number
) {
  return { icon, symbol, name, value, traffic };
}

const rows = [
  createData(Assets.bnbIcon, 'BNB', 'BNB', 309.2, -0.06),
  createData(Assets.btcIcon, 'BTC', 'Bitcoin', 28.814, -0.4),
  createData(Assets.ethIcon, 'ETH', 'Ehereum', 1.809, -0.29),
  createData(Assets.pepeIcon, 'PEPE', 'PEPE', 0.546, 0.29),
  createData(Assets.eduIcon, 'EDU', 'Open...', 1.35, 2.0),
  createData(Assets.drepIcon, 'DREP', 'DREP', 0.177, -0.12),
  createData(Assets.suiIcon, 'SUI', 'Sui', 1.57, 2.13),
  createData(Assets.funIcon, 'FUN', 'Funtoken', 0.34, 2),
  createData(Assets.idIcon, 'ID', 'Space ID', 1.12, -0.12),
  createData(Assets.hookIcon, 'HOOK', 'Hooked Pr', 2.67, 2.13),
];

const Overview: React.FC = () => {
  // Constructors
  const [isShowNamePopup, setIsShowNamePopup] = React.useState<boolean>(false);
  const [isShowAvatarPopup, setIsShowAvatarPopup] =
    React.useState<boolean>(false);

  // Renders

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: {
            xs: '0',
            md: '1em 0',
          },
          mx: 'auto',
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
        <Grid container columnSpacing={2} height="100%">
          <Grid
            item
            xs={12}
            md={2.5}
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
          >
            <Sidebar />
          </Grid>
          <Grid
            item
            xs={12}
            md={9.5}
            borderLeft="1px solid #949494"
            padding={{ xs: '10px 0', md: '0' }}
          >
            <Grid
              container
              columnSpacing={2}
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
                    sx={{ width: '70px', height: '70px', marginRight: '20px' }}
                  />
                  <Stack direction="column">
                    <Stack
                      direction="row"
                      alignItems="center"
                      marginBottom="16px"
                    >
                      <Typography sx={{ marginRight: '16px' }}>
                        Anonymous-User-b5b47p
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => setIsShowNamePopup(true)}
                      >
                        <ModeEditOutlineOutlinedIcon
                          sx={{ fontSize: '20px' }}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setIsShowAvatarPopup(true)}
                      >
                        <RemoveRedEyeOutlinedIcon sx={{ fontSize: '20px' }} />
                      </IconButton>
                    </Stack>
                    <Stack direction="row">
                      <Box sx={{ marginRight: '20px' }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>
                          ID người dùng
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }}>
                          12648856
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>
                          Loại người dùng
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }}>
                          Người dùng thông thường
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
                    padding: '20px',
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>
                      Số dư ước tính
                    </Typography>
                    <Stack direction="row" alignItems="center" marginTop="30px">
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: '30px',
                        }}
                      >
                        0.00 USDT
                      </Typography>
                      <Box
                        component="img"
                        src={Assets.downArrowIcon}
                        sx={{
                          width: '19px',
                          height: '19px',
                          margin: '0 20px 0 10px',
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: '30px',
                        }}
                      >
                        ~~ VND
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" marginTop="10px">
                    <Button
                      sx={{
                        fontSize: '16px',
                        fontWeigh: 500,
                        textTransform: 'unset',
                        backgroundColor: 'background.burntSienna',
                        color: 'text.secondary',
                        width: '110px',
                        marginRight: ' 10px',
                        borderRadius: '0px',
                      }}
                      onClick={() => Utils.redirect(ROUTERS.RECHARGE)}
                    >
                      Nạp
                    </Button>
                    <Button
                      sx={{
                        fontSize: '16px',
                        fontWeigh: 500,
                        textTransform: 'unset',
                        backgroundColor: 'background.lightSilver',
                        color: 'text.secondary',
                        width: '110px',
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
                      fontSize: '20px',
                      lineHeight: '24px',
                      fontWeight: 600,
                    }}
                  >
                    Giao dịch có trách nhiệm trong Binance Futures{' '}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '11px',
                      lineHeight: '13px',
                      color: '#7D6F6F',
                      marginTop: '6px',
                    }}
                  >
                    2023-05-22 09:28{' '}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      lineHeight: '18px',
                      marginTop: '12px',
                    }}
                  >
                    Hợp đồng giao dịch nên được lên kế hoạch tốt và cân nhắc kĩ
                    lưỡng. Để trở thành một trader thành công bạn phải giao dịch
                    có trách nhiệm. Tìm hiểu lí do giải thích tại sao giao dịch
                    có trách nhiệm lại quan trọng đối với thành công của bất kì
                    trader nào và tìm hiểu một số lời khuyên khi bắt đầu{' '}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Stack
                  direction="column"
                  sx={{
                    backgroundColor: 'background.mainContent',
                    padding: '12px',
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>
                      Thị trường
                    </Typography>
                    <IconButton>
                      <ArrowCircleRightOutlinedIcon />
                    </IconButton>
                  </Stack>
                  <TableContainer
                    component={Paper}
                    sx={{
                      marginTop: '20px',
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
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ padding: '4px' }}
                            >
                              <Stack direction="row" alignItems="center">
                                <Box
                                  component="img"
                                  src={row.icon}
                                  sx={{
                                    width: '22px',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    marginRight: '10px',
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: '13px',
                                    lienHeight: '20px',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                  }}
                                >
                                  {row.symbol}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: '13px',
                                    lienHeight: '20px',
                                    fontWeight: 600,
                                    marginLeft: '10px',
                                  }}
                                >
                                  {row.name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="right" sx={{ padding: '4px' }}>
                              <Typography
                                sx={{
                                  fontSize: '10px',
                                  lineHeight: '24px',
                                  color: 'text.primary',
                                }}
                              >
                                {row.value}
                              </Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ padding: '4px' }}>
                              {row.traffic < 0 ? (
                                <Typography
                                  sx={{
                                    fontSize: '10px',
                                    lineHeight: '24px',
                                    color: '#F03030',
                                  }}
                                >
                                  {row.traffic}%
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    fontSize: '10px',
                                    lineHeight: '24px',
                                    color: '#23631D',
                                  }}
                                >
                                  +{row.traffic}%
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="right" sx={{ padding: '4px' }}>
                              <Link
                                sx={{
                                  fontSize: '10px',
                                  lineHeight: '14px',
                                  fontWeight: 400,
                                  color: 'text.burntSienna',
                                  textAlign: 'left',
                                  marginTop: '20px',
                                }}
                                href={ROUTERS.TRANSACTION}
                              >
                                Giao dịch
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Tổng quan" />;
};

export default Overview;
