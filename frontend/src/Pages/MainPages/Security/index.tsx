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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import Assets from '@/Assets';
import {
  ActiveWithdrawPassword,
  ChangeWithdrawPassword,
  ChangeEmail,
  ChangePassword,
  ChangePhoneNumber,
  ActiveEmail,
} from '@/Components/Popup';
import { Utils } from '@/Libs';
import { useTypedDispatch } from '@/Reducers/store';
import { UserActions } from '@/Reducers/Actions';

const { getSelf } = UserActions;

const Security: React.FC = () => {
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const security = userData?.security;
  // Constructors
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const [isShowChangePassword, setIsShowChangePassword] =
    React.useState<boolean>(false);
  const [isShowChangePhoneNumber, setIsShowChangePhoneNumber] =
    React.useState<boolean>(false);
  const [isShowChangeEmail, setIsShowChangeEmail] =
    React.useState<boolean>(false);
  const [isShowChangeWithdrawPassword, setIsShowChangeWithdrawPassword] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getSelf());
  }, []);

  const _renderDesktopTable = () => {
    return (
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
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ paddingX: 0 }}>
                <Stack direction="row" alignItems="center" padding="6px 0">
                  <Box sx={{ width: '40px' }}>
                    <Box
                      component="img"
                      src={Assets.passwordIcon}
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
                        fontSize: {
                          xs: '12px',
                          pc: '24px',
                        },
                        lienHeight: '20px',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      Mật khẩu đăng nhập
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '11px',
                          pc: '20px',
                        },
                        lienHeight: '20px',
                        fontWeight: 400,
                      }}
                    >
                      Mật khẩu đăng nhập được dùng để đăng nhập vào tài khoản
                      của bạn
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
                ></Typography>
              </TableCell>
              <TableCell align="right" sx={{ padding: '24px 0' }}>
                <Button
                  sx={{
                    fontSize: {
                      xs: '11px',
                      pc: '20px',
                    },
                    textTransform: 'unset',
                    backgroundColor: 'background.lightSilver',
                    color: 'text.secondary',
                    width: {
                      xs: '73px',
                      pc: '153px',
                    },
                    minHeight: {
                      xs: '23px',
                      pc: '38px',
                    },
                    padding: '0',
                  }}
                  onClick={() => setIsShowChangePassword(true)}
                >
                  Thay đổi
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ paddingX: 0 }}>
                <Stack direction="row" alignItems="center" padding="6px 0">
                  <Box sx={{ width: '40px' }}>
                    <Box
                      component="img"
                      src={Assets.phoneVerifyIcon}
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
                        fontSize: {
                          xs: '12px',
                          pc: '24px',
                        },
                        lienHeight: '20px',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      Xác minh qua số điện thoại
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '11px',
                          pc: '20px',
                        },
                        lienHeight: '20px',
                        fontWeight: 400,
                      }}
                    >
                      Bảo vệ tài khoản và giao dịch của bạn.
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
                  {userData?.security?.phonenumber ? (
                    <Stack flexDirection="row" alignItems="center">
                      <CheckCircleIcon
                        color="success"
                        sx={{ fontSize: '18px' }}
                      />
                      <Typography
                        sx={{
                          fontSize: '18px',
                          marginLeft: '5px',
                        }}
                      >
                        {userData?.security?.phonenumber}
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack flexDirection="row" alignItems="center">
                      <CancelIcon color="disabled" sx={{ fontSize: '18px' }} />
                      <Typography
                        sx={{
                          fontSize: '18px',
                          marginLeft: '5px',
                        }}
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
                    fontSize: {
                      xs: '11px',
                      pc: '20px',
                    },
                    textTransform: 'unset',
                    backgroundColor: 'background.lightSilver',
                    color: 'text.secondary',
                    width: {
                      xs: '73px',
                      pc: '153px',
                    },
                    minHeight: {
                      xs: '23px',
                      pc: '38px',
                    },
                    padding: '0',
                  }}
                  onClick={() => setIsShowChangePhoneNumber(true)}
                >
                  {userData?.security?.phonenumber ? 'Thay đổi' : 'Kích hoat'}
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ paddingX: 0 }}>
                <Stack direction="row" alignItems="center" padding="6px 0">
                  <Box sx={{ width: '40px' }}>
                    <Box
                      component="img"
                      src={Assets.mailVerifyIcon}
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
                        fontSize: {
                          xs: '12px',
                          pc: '24px',
                        },
                        lienHeight: '20px',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      Xác minh qua địa chỉ email
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '11px',
                          pc: '20px',
                        },
                        lienHeight: '20px',
                        fontWeight: 400,
                      }}
                    >
                      Bảo vệ tài khoản và giao dịch của bạn.
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
                  {userData?.security?.email ? (
                    <Stack flexDirection="row" alignItems="center">
                      <CheckCircleIcon
                        color="success"
                        sx={{ fontSize: '18px' }}
                      />
                      <Typography
                        sx={{
                          fontSize: '18px',
                          marginLeft: '5px',
                        }}
                      >
                        {userData?.security?.email}
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack flexDirection="row" alignItems="center">
                      <CancelIcon color="disabled" sx={{ fontSize: '18px' }} />
                      <Typography
                        sx={{
                          fontSize: '18px',
                          marginLeft: '5px',
                        }}
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
                    fontSize: {
                      xs: '11px',
                      pc: '20px',
                    },
                    textTransform: 'unset',
                    backgroundColor: 'background.lightSilver',
                    color: 'text.secondary',
                    width: {
                      xs: '73px',
                      pc: '153px',
                    },
                    minHeight: {
                      xs: '23px',
                      pc: '38px',
                    },
                    padding: '0',
                  }}
                  onClick={() => setIsShowChangeEmail(true)}
                >
                  {userData?.security?.email ? 'Thay đổi' : 'Kích hoat'}
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ paddingX: 0 }}>
                <Stack direction="row" alignItems="center" padding="6px 0">
                  <Box sx={{ width: '40px' }}>
                    <Box
                      component="img"
                      src={Assets.otpIcon}
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
                        fontSize: {
                          xs: '12px',
                          pc: '24px',
                        },
                        lienHeight: '20px',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      Mật khẩu rút tiền
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '11px',
                          pc: '20px',
                        },
                        lienHeight: '20px',
                        fontWeight: 400,
                      }}
                    >
                      Bảo vệ tài khoản và giao dịch của bạn.Mật khẩu được yêu
                      cầu mỗi khi thực hiện thao tác rút tiền.
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
                  {userData?.security?.isVerified ? (
                    <Stack flexDirection="row" alignItems="center">
                      <CheckCircleIcon
                        color="success"
                        sx={{ fontSize: '18px' }}
                      />
                      <Typography
                        sx={{
                          fontSize: '18px',
                          marginLeft: '5px',
                        }}
                      >
                        Đã kích hoạt
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack flexDirection="row" alignItems="center">
                      <CancelIcon color="disabled" sx={{ fontSize: '18px' }} />
                      <Typography
                        sx={{
                          fontSize: '18px',
                          marginLeft: '5px',
                        }}
                      >
                        Chưa kích hoạt
                      </Typography>
                    </Stack>
                  )}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ padding: '24px 0' }}>
                <Button
                  sx={{
                    fontSize: {
                      xs: '11px',
                      pc: '20px',
                    },
                    textTransform: 'unset',
                    backgroundColor: 'background.lightSilver',
                    color: 'text.secondary',
                    width: {
                      xs: '73px',
                      pc: '153px',
                    },
                    minHeight: {
                      xs: '23px',
                      pc: '38px',
                    },
                    padding: '0',
                  }}
                  onClick={() => setIsShowChangeWithdrawPassword(true)}
                >
                  {userData?.security?.isVerified ? 'Thay đổi' : 'Kích hoat'}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const _renderMobileTable = () => {
    return (
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
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ paddingX: 0 }}>
                <Stack direction="column" sx={{ marginLeft: '10px', flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      lienHeight: '20px',
                      fontWeight: 500,
                      color: 'text.primary',
                    }}
                  >
                    Mật khẩu đăng nhập
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      lienHeight: '20px',
                      fontWeight: 400,
                    }}
                  >
                    Mật khẩu đăng nhập được dùng để đăng nhập vào tài khoản của
                    bạn
                  </Typography>
                  <Button
                    sx={{
                      fontSize: '18px',
                      textTransform: 'unset',
                      backgroundColor: 'background.lightSilver',
                      color: 'text.secondary',
                      width: '96px',
                      minHeight: '39px',
                      padding: '0',
                    }}
                    onClick={() => setIsShowChangePassword(true)}
                  >
                    Thay đổi
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ paddingX: 0 }}>
                <Stack direction="row" alignItems="center" padding="6px 0">
                  <Stack
                    direction="column"
                    sx={{ marginLeft: '10px', flex: 1 }}
                  >
                    <Typography
                      sx={{
                        fontSize: '24px',
                        lienHeight: '20px',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      Xác minh qua số điện thoại
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '20px',
                        lienHeight: '20px',
                        fontWeight: 400,
                      }}
                    >
                      Bảo vệ tài khoản và giao dịch của bạn.
                    </Typography>
                    <Stack direction="row" alignItems="flex-end">
                      <Button
                        sx={{
                          fontSize: '18px',
                          textTransform: 'unset',
                          backgroundColor: 'background.lightSilver',
                          color: 'text.secondary',
                          width: '96px',
                          minHeight: '39px',
                          padding: '0',
                          marginRight: '40px',
                        }}
                        onClick={() => setIsShowChangePhoneNumber(true)}
                      >
                        {userData?.security?.phonenumber
                          ? 'Thay đổi'
                          : 'Kích hoat'}
                      </Button>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          lineHeight: '24px',
                          color: 'text.primary',
                        }}
                      >
                        {userData?.security?.phonenumber ? (
                          <Stack flexDirection="row" alignItems="center">
                            <CheckCircleIcon
                              color="success"
                              sx={{ fontSize: '18px' }}
                            />
                            <Typography
                              sx={{
                                fontSize: '18px',
                                marginLeft: '5px',
                              }}
                            >
                              {userData?.security?.phonenumber}
                            </Typography>
                          </Stack>
                        ) : (
                          <Stack flexDirection="row" alignItems="center">
                            <CancelIcon
                              color="disabled"
                              sx={{ fontSize: '18px' }}
                            />
                            <Typography
                              sx={{
                                fontSize: '18px',
                                marginLeft: '5px',
                              }}
                            >
                              Chưa liên kết
                            </Typography>
                          </Stack>
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ paddingX: 0 }}>
                <Stack direction="column" sx={{ marginLeft: '10px', flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      lienHeight: '20px',
                      fontWeight: 500,
                      color: 'text.primary',
                    }}
                  >
                    Xác minh qua địa chỉ email
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      lienHeight: '20px',
                      fontWeight: 400,
                    }}
                  >
                    Bảo vệ tài khoản và giao dịch của bạn.
                  </Typography>
                  <Stack direction="row" alignItems="flex-end">
                    <Button
                      sx={{
                        fontSize: '18px',
                        textTransform: 'unset',
                        backgroundColor: 'background.lightSilver',
                        color: 'text.secondary',
                        width: '96px',
                        minHeight: '39px',
                        padding: '0',
                        marginRight: '40px',
                      }}
                      onClick={() => setIsShowChangeEmail(true)}
                    >
                      {userData?.security?.email ? 'Thay đổi' : 'Kích hoat'}
                    </Button>
                    <Typography
                      sx={{
                        fontSize: '10px',
                        lineHeight: '24px',
                        color: 'text.primary',
                      }}
                    >
                      {userData?.security?.email ? (
                        <Stack flexDirection="row" alignItems="center">
                          <CheckCircleIcon
                            color="success"
                            sx={{ fontSize: '18px' }}
                          />
                          <Typography
                            sx={{
                              fontSize: '18px',
                              marginLeft: '5px',
                            }}
                          >
                            {userData?.security?.email}
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack flexDirection="row" alignItems="center">
                          <CancelIcon
                            color="disabled"
                            sx={{ fontSize: '18px' }}
                          />
                          <Typography
                            sx={{
                              fontSize: '18px',
                              marginLeft: '5px',
                            }}
                          >
                            Chưa liên kết
                          </Typography>
                        </Stack>
                      )}
                    </Typography>
                  </Stack>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row" sx={{ paddingX: 0 }}>
                <Stack direction="row" alignItems="center" padding="6px 0">
                  <Stack
                    direction="column"
                    sx={{ marginLeft: '10px', flex: 1 }}
                  >
                    <Typography
                      sx={{
                        fontSize: '24px',
                        lienHeight: '20px',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      Mật khẩu rút tiền
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '20px',
                        lienHeight: '20px',
                        fontWeight: 400,
                      }}
                    >
                      Bảo vệ tài khoản và giao dịch của bạn.Mật khẩu được yêu
                      cầu mỗi khi thực hiện thao tác rút tiền.
                    </Typography>
                    <Stack direction="row" alignItems="flex-end">
                      <Button
                        sx={{
                          fontSize: '18px',
                          textTransform: 'unset',
                          backgroundColor: 'background.lightSilver',
                          color: 'text.secondary',
                          width: '96px',
                          minHeight: '39px',
                          padding: '0',
                          marginRight: '40px',
                        }}
                        onClick={() => setIsShowChangeWithdrawPassword(true)}
                      >
                        {userData?.security?.isVerified
                          ? 'Thay đổi'
                          : 'Kích hoat'}
                      </Button>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          lineHeight: '24px',
                          color: 'text.primary',
                        }}
                      >
                        {userData?.security?.isVerified ? (
                          <Stack flexDirection="row" alignItems="center">
                            <CheckCircleIcon
                              color="success"
                              sx={{ fontSize: '18px' }}
                            />
                            <Typography
                              sx={{
                                fontSize: '18px',
                                marginLeft: '5px',
                              }}
                            >
                              Đã kích hoạt
                            </Typography>
                          </Stack>
                        ) : (
                          <Stack flexDirection="row" alignItems="center">
                            <CancelIcon
                              color="disabled"
                              sx={{ fontSize: '18px' }}
                            />
                            <Typography
                              sx={{
                                fontSize: '18px',
                                marginLeft: '5px',
                              }}
                            >
                              Chưa kích hoạt
                            </Typography>
                          </Stack>
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
        <ChangePassword
          open={isShowChangePassword}
          onClose={() => setIsShowChangePassword(false)}
        />
        <ChangePhoneNumber
          open={isShowChangePhoneNumber}
          onClose={() => setIsShowChangePhoneNumber(false)}
        />
        <ChangeEmail
          open={security?.email && security?.email && isShowChangeEmail}
          onClose={() => setIsShowChangeEmail(false)}
        />
        <ActiveEmail
          open={!security?.email && isShowChangeEmail}
          onClose={() => setIsShowChangeEmail(false)}
        />
        <ActiveWithdrawPassword
          open={!security?.isVerified && isShowChangeWithdrawPassword}
          onClose={() => setIsShowChangeWithdrawPassword(false)}
        />
        <ChangeWithdrawPassword
          open={security?.isVerified && isShowChangeWithdrawPassword}
          onClose={() => setIsShowChangeWithdrawPassword(false)}
        />
        <Grid container>
          {isMd ? null : (
            <Grid
              item
              xs={12}
              md={2}
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
            md={10}
            borderLeft="1px solid #949494"
            padding={{
              xs: '10px',
              pc: '60px 71px',
            }}
            borderTop="1px solid rgba(187, 174, 174, 0.9)"
          >
            <Stack direction="column">
              <Stack
                direction="row"
                justifyContent={{
                  xs: 'center',
                  md: 'space-between',
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '24px',
                      pc: '64px',
                    },
                    lineHeight: {
                      xs: '34px',
                      pc: '70px',
                    },
                    fontWeight: 600,
                  }}
                >
                  Bảo mật
                </Typography>
                {isMd ? null : (
                  <Box
                    component="img"
                    src={
                      userData?.security?.isVerified
                        ? Assets.successSecurityImage
                        : Assets.securityIcon
                    }
                    sx={{ width: '134px' }}
                  />
                )}
              </Stack>
              <Box
                sx={{
                  backgroundColor: 'background.securityNotification',
                  padding: {
                    xs: '10px 14px',
                    pc: '10px 30px',
                  },
                  marginTop: '11px ',
                  minHeight: {
                    xs: '82px',
                    pc: '79px',
                  },
                  borderRadius: '5px',
                  display: 'flex',
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '18px',
                      pc: '20px',
                    },
                    fontWeight: 400,
                    lineHeight: '24px',
                    color: 'text.primary',
                  }}
                >
                  Để tăng tính bảo mật cho tài khoản, bạn nên bật tính năng 2FA,
                  bao gồm cả Binance/Google Authenticator.
                </Typography>
                {isMd ? (
                  <Box
                    component="img"
                    src={
                      userData?.security?.isVerified
                        ? Assets.successSecurityImage
                        : Assets.securityIcon
                    }
                    sx={{
                      width: {
                        xs: '57px',
                        md: '134px',
                      },
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                ) : null}
              </Box>
              {isMd ? null : (
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      pc: '20px',
                    },
                    fontWeight: 600,
                    lineHeight: '28px',
                    marginTop: '30px',
                  }}
                >
                  Bảo mật nâng cao{' '}
                </Typography>
              )}
              {isMd ? _renderMobileTable() : _renderDesktopTable()}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Bảo mật" />;
};

export default Security;
