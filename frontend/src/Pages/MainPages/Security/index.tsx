import React from 'react';
import {
  Grid,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import Assets from '@/Assets';

function createData(
  icon: string,
  title: string,
  subtitle: string,
  value: string,
  required: boolean
) {
  return { icon, title, subtitle, value, required };
}

const rows = [
  createData(
    Assets.passwordIcon,
    'Mật khẩu đăng nhập',
    'Mật khẩu đăng nhập được dùng để đăng nhập vào tài khoản của bạn',
    '',
    false
  ),
  createData(
    Assets.phoneVerifyIcon,
    'Xác minh qua số điện thoại',
    'Bảo vệ tài khoản và giao dịch của bạn.',
    '',
    true
  ),
  createData(
    Assets.mailVerifyIcon,
    'Xác minh qua địa chỉ email',
    'Bảo vệ tài khoản và giao dịch của bạn.',
    'hng****@gmail.com',
    true
  ),
  createData(
    Assets.otpIcon,
    'Mật khẩu rút tiền',
    'Bảo vệ tài khoản và giao dịch của bạn.Mật khẩu được yêu cầu mỗi khi thực hiện thao tác rút tiền .',
    '',
    true
  ),
];

const Security: React.FC = () => {
  // Constructors
  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: {
            xs: 0,
            md: '1em 0',
          },
          mx: 'auto',
        }}
      >
        <Grid container columnSpacing={4}>
          <Grid
            item
            xs={12}
            md={2.5}
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
          <Grid item xs={12} md={9.5} borderLeft="1px solid #949494">
            <Stack
              direction="column"
              sx={{
                padding: {
                  xs: '10px',
                  md: '0 50px 0 0 ',
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
                >
                  Bảo mật
                </Typography>
                <Box component="img" src={Assets.securityIcon} />
              </Stack>
              <Box
                sx={{
                  backgroundColor: 'background.securityNotification',
                  padding: '10px 14px',
                  marginTop: '11px ',
                  minHeight: '45px',
                  borderRadius: '5px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: 'text.primary',
                  }}
                >
                  Để tăng tính bảo mật cho tài khoản, bạn nên bật tính năng 2FA,
                  bao gồm cả Binance/Google Authenticator.
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '28px',
                  marginTop: '30px',
                }}
              >
                Bảo mật nâng cao{' '}
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ marginTop: '10px', boxShadow: 'none' }}
              >
                <Table
                  size="small"
                  sx={{
                    minWidth: '100%',
                    backgroundColor: 'background.default',
                  }}
                  aria-label="simple table"
                >
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.title}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ paddingX: 0 }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            padding="6px 0"
                          >
                            <Box sx={{ width: '40px' }}>
                              <Box
                                component="img"
                                src={row.icon}
                                sx={{
                                  width: '40px',
                                  height: '40px',
                                  objectFit: 'contain',
                                  marginLeft: '-10px',
                                }}
                              />
                            </Box>
                            <Stack
                              direction="column"
                              sx={{ marginLeft: '10px', flex: 1 }}
                            >
                              <Typography
                                sx={{
                                  fontSize: '12px',
                                  lienHeight: '20px',
                                  fontWeight: 600,
                                  color: 'text.primary',
                                }}
                              >
                                {row.title}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '11px',
                                  lienHeight: '20px',
                                  fontWeight: 400,
                                }}
                              >
                                {row.subtitle}
                              </Typography>
                            </Stack>
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
                            {!row.required ? (
                              ''
                            ) : row.value ? (
                              <Stack flexDirection="row" alignItems="center">
                                <CheckCircleIcon
                                  color="success"
                                  sx={{ fontSize: '18px' }}
                                />
                                <Typography
                                  sx={{ fontSize: '10px', marginLeft: '5px' }}
                                >
                                  {row.value}
                                </Typography>
                              </Stack>
                            ) : (
                              <Stack flexDirection="row" alignItems="center">
                                <CancelIcon
                                  color="disabled"
                                  sx={{ fontSize: '18px' }}
                                />
                                <Typography
                                  sx={{ fontSize: '10px', marginLeft: '5px' }}
                                >
                                  Chưa liên kết
                                </Typography>
                              </Stack>
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ padding: '24px 0' }}>
                          <Button
                            sx={{
                              fontSize: '11px',
                              textTransform: 'unset',
                              backgroundColor: 'background.lightSilver',
                              color: 'text.secondary',
                              width: '73px',
                              minHeight: '23px',
                              padding: '0',
                            }}
                          >
                            {row.value ? 'Thay đổi' : 'Kích hoạt'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Bảo mật" />;
};

export default Security;
