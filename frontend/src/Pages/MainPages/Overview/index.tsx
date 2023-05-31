import React from 'react';
import {
  Container,
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
import DefaultLayout from '@/Components/DefaultLayout';
import Assets from '@/Assets';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Sidebar } from '../../../Components/LayoutParts';

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

  // Renders

  const renderMain = () => {
    return (
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: '1em 0',
          mx: 'auto',
        }}
      >
        <Grid container columnSpacing={2} height="100%">
          <Grid item md={3}>
            <Sidebar />
          </Grid>
          <Grid item md={9}>
            <Grid container columnSpacing={2} rowSpacing={4}>
              <Grid item md={12}>
                <Stack
                  direction="row"
                  sx={{
                    backgroundColor: 'background.secondary',
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
                      <IconButton size="small">
                        <ModeEditOutlineOutlinedIcon
                          sx={{ fontSize: '20px' }}
                        />
                      </IconButton>
                      <IconButton size="small">
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
              <Grid item md={5}>
                <Box
                  sx={{
                    backgroundColor: 'background.secondary',
                    padding: '20px',
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>
                      Số dư ước tính
                    </Typography>
                    <Stack direction="row" marginTop="30px">
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: '30px',
                        }}
                      >
                        0.00 USDT
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: '30px',
                          marginLeft: '20px',
                        }}
                      >
                        ~~ VND
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" marginTop="10px">
                    <Button
                      sx={{
                        fontSize: '12px',
                        textTransform: 'unset',
                        backgroundColor: 'background.burntSienna',
                        color: 'text.secondary',
                        width: '110px',
                        marginRight: ' 10px',
                      }}
                    >
                      Nạp
                    </Button>
                    <Button
                      sx={{
                        fontSize: '12px',
                        textTransform: 'unset',
                        backgroundColor: 'background.lightSilver',
                        color: 'text.secondary',
                        width: '110px',
                      }}
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
              <Grid item md={7}>
                <Stack
                  direction="column"
                  sx={{
                    backgroundColor: 'background.secondary',
                    padding: '20px'
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
                  <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                    <Table
                      size="small"
                      sx={{
                        minWidth: '100%',
                        backgroundColor: 'background.secondary',
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
                            <TableCell component="th" scope="row">
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
                            <TableCell align="right">
                              <Typography
                                sx={{
                                  fontSize: '10px',
                                  lineHeight: '24px',
                                  color: 'text.primary',
                                }}
                              >
                                {' '}
                                {row.value}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
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
                            <TableCell align="right">
                              <Link
                                sx={{
                                  fontSize: '11px',
                                  lineHeight: '14px',
                                  fontWeight: 400,
                                  color: 'text.burntSienna',
                                  textAlign: 'left',
                                  marginTop: '20px',
                                }}
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
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="Tổng quan" />;
};

export default Overview;
