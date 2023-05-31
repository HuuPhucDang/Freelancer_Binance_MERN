import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import Assets from '@/Assets';
import { Sidebar } from '../../../Components/LayoutParts';

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
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: '1em 0',
          mx: 'auto',
        }}
      >
        <Grid container>
          <Grid item md={3}>
            <Sidebar />
          </Grid>
          <Grid item md={9}>
            <Stack direction="column">
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
                  backgroundColor: '#ED9251',
                  padding: '10px 14px',
                  marginTop: '16px ',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: 'text.secondary',
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
                        <TableCell component="th" scope="row">
                          <Stack
                            direction="row"
                            alignItems="center"
                            padding="6px 0"
                          >
                            <Box
                              component="img"
                              src={row.icon}
                              sx={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain',
                                marginRight: '10px',
                              }}
                            />
                            <Stack direction="column">
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
                        <TableCell align="right">
                          <Button
                            sx={{
                              fontSize: '12px',
                              marginRight: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.lightSilver',
                              color: 'text.secondary',
                              width: '80px',
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
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="Bảo mật" />;
};

export default Security;