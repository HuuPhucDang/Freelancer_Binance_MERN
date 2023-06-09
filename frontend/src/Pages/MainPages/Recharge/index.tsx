import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Avatar,
  TextField,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import Assets from '@/Assets';
import {
  SystemInfoActions,
  TransactionActions,
  UserActions,
  BonusActions,
} from '@/Reducers/Actions';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { Utils } from '@/Libs';

const { getSelf } = UserActions;
const { getSystemInfo } = SystemInfoActions;
const { requestRecharge, resetTransactionReducer } = TransactionActions;
const { fetchAllBonus } = BonusActions;

const Recharge: React.FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useTypedDispatch();
  const systemInfo = useSelector((state: RootState) =>
    _.get(state.SYSTEM_INFO, 'payload')
  );
  const requestRechargeSuccess = useSelector((state: RootState) =>
    _.get(state.TRANSACTION, 'requestRechargeSuccess')
  );
  const bonusItems: any = useSelector((state: RootState) =>
    _.get(state.BONUS, 'items')
  );

  const userData = Utils.getUserData();
  // const invalidTypeMsg = 'Số tiền muốn nạp phải có định dạng số';
  const [_isErr, setIsErr] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<number>(0);
  const [enchangeRate, setEnchangeRate] = React.useState<number>(0);
  const [currentType, setCurrentType] = React.useState<string>('USDT');
  const themeMode = Utils.getThemeMode();

  React.useEffect(() => {
    Utils.WebSocket.emit(
      'exchangeCurrency',
      { symbol: 'USDTVND' },
      (data: any) => {
        setEnchangeRate(data || 0);
      }
    );
    dispatch(getSystemInfo());
    dispatch(getSelf());
    dispatch(fetchAllBonus());
  }, []);

  React.useEffect(() => {
    if (requestRechargeSuccess) {
      setIsErr(false);
      setAmount(0);
      dispatch(resetTransactionReducer());
    }
  }, [requestRechargeSuccess]);

  const onSubmit = async () => {
    const isNumber = !Number.isNaN(amount);
    if (!isNumber || !amount) setIsErr(true);
    else
      dispatch(
        requestRecharge({
          amount: currentType === 'USDT' ? amount : amount / enchangeRate,
        })
      );
  };

  const _renderDesktop = () => {
    return (
      <>
        <Typography
          sx={{
            fontSize: {
              xs: '12px',
              pc: '20px',
            },
            lineHeight: '24px',
            fontWeight: 400,
            marginTop: '6px',
          }}
        >
          Nạp tiền qua hệ thống banking ngân hàng
        </Typography>
        {systemInfo?.QRUrl ? (
          <Box
            component="img"
            src={`data:image/*;base64,${systemInfo?.QRUrl}`}
            sx={{
              display: { xs: 'block', md: 'none' },
              width: '250px',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        ) : null}
        <Stack direction="column" marginTop="24px">
          <Box
            sx={{
              padding: '16px 24px 40px 24px',
              backgroundColor: 'background.bankCardInformation',
              borderRadius: '3px',
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: '12px', pc: '20px' },
              }}
            >
              Họ và tên người nhận: <b>{systemInfo?.fullname}</b>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: '12px', pc: '20px' },
                marginTop: '2px',
              }}
            >
              Số tài khoản: <b>{systemInfo?.accountNumber}</b>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: '12px', pc: '20px' },
                marginTop: '2px',
              }}
            >
              Ngân hàng: <b> {systemInfo?.bankName}</b>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: '12px', pc: '20px' },
                marginTop: '2px',
              }}
            >
              Nội dung:{' '}
              <b>
                tk:{userData?.username} {systemInfo?.message}
              </b>
            </Typography>
          </Box>
          <Stack
            direction="row"
            sx={{
              height: {
                xs: '39px',
                pc: '87px',
              },
              fontSize: {
                xs: '12px',
                pc: '20px',
              },
              paddingLeft: '16px',
              paddingRight: '16px',
              marginTop: {
                xs: '30px',
                pc: '70px',
              },
              backgroundColor: 'background.chargeInput',
              color: 'text.primary',
              alignItems: 'center',
              borderRadius: '4px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
            }}
          >
            <CurrencyInput
              id="validation-example-2-field"
              placeholder="1,234,567 VNĐ"
              allowDecimals={false}
              className={`form-control`}
              onValueChange={(value: any) => setAmount(value)}
              step={10}
              suffix=" VND"
              value={amount}
              style={{
                flex: 1,
                height: '100%',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'inherit',
                fontSize: 'inherit',
              }}
            />
            <Typography
              sx={{
                fontSize: 'inherit',
                marginLeft: '16px',
                color: 'text.primary',
                userSelect: 'none',
              }}
            >
              ~ {amount / enchangeRate} USDT
            </Typography>
          </Stack>
          <Button
            sx={{
              backgroundColor: 'background.burntSienna',
              color: 'text.secondary',
              textTransform: 'unset',
              height: {
                xs: '26px',
                pc: '60px',
              },
              width: {
                xs: '120px',
                pc: '266px',
              },
              fontWeight: 400,
              fontSize: {
                xs: '14px',
                pc: '20px',
              },
              marginTop: '20px',
              alignSelf: 'center',
            }}
            onClick={() => onSubmit()}
          >
            Gửi lệnh
          </Button>
        </Stack>
      </>
    );
  };

  const _renderCard = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          width: 'max-content',
          maxHeight: 'max-content',
        }}
      >
        <Box
          src={Assets.bankCardImage}
          component="img"
          sx={{ width: 1, maxWidth: { android: 350, ip13: 400 } }}
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
            {systemInfo?.fullname}
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
            {systemInfo?.accountNumber}
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
            {systemInfo?.bankName}
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
              fontSize: '15px',
              textTransform: 'uppercase',
              color: 'text.burntSienna',
              fontWeight: 500,
            }}
          >
            tk:{userData?.username} {systemInfo?.message}
          </Typography>
        </Stack>
      </Box>
    );
  };

  const _renderMobile = () => {
    return (
      <Stack direction="column">
        <Grid container columnSpacing="16px" rowSpacing="24px">
          {_.map(bonusItems, (item) => (
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="info"
                fullWidth
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#D9D9D9',
                  boxShadow: 'unset',
                  padding: '0',
                  textTransform: 'unset',
                }}
              >
                <Typography sx={{ fontSize: '20px', color: '#000000' }}>
                  ${item?.amount}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '20px',
                    color: '#816A6A',
                    textTransform: 'unset',
                  }}
                >
                  + ${item?.bonus} thưởng
                </Typography>
              </Button>
            </Grid>
          ))}
          <Grid item xs={4}>
            <TextField
              select
              defaultValue={currentType}
              fullWidth
              onChange={(e) => setCurrentType(e.target.value)}
            >
              <MenuItem value="USDT">$USDT</MenuItem>
              <MenuItem value="VND">VND</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              type="number"
              helperText={
                <Box
                  sx={{
                    color: themeMode === 'dark' ? 'white!important' : 'black',
                  }}
                >
                  {currentType === 'VND'
                    ? `~ ${amount ? amount / enchangeRate : 0} USDT`
                    : `${amount || 0} USDT`}
                </Box>
              }
              error={_isErr}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </Grid>
        </Grid>
        <Button
          sx={{
            backgroundColor: 'background.burntSienna',
            color: 'text.secondary',
            textTransform: 'unset',
            height: '60px',
            width: '143px',
            fontWeight: 500,
            fontSize: '20px',
            marginTop: '40px',
            alignSelf: 'center',
          }}
          onClick={() => onSubmit()}
        >
          Gửi lệnh
        </Button>
      </Stack>
    );
  };

  // Constructors
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
        <Grid container>
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
            md={10}
            borderLeft="1px solid #949494"
            padding={{
              xs: '10px',
              md: '19px 32px 19px 55px',
            }}
            borderTop="1px solid rgba(187, 174, 174, 0.9)"
          >
            <Grid container columnSpacing={3} padding={0}>
              <Grid item xs={12}>
                <Stack direction="column">
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
                      textAlign: 'center',
                    }}
                  >
                    Nạp tiền
                  </Typography>
                  {isMd ? (
                    <>
                      <Stack
                        direction="row"
                        alignItems="center"
                        marginTop="10px"
                        marginBottom="10px"
                        padding={{ xs: '0 20px', md: 0 }}
                      >
                        <Avatar
                          src={userData.avatar}
                          sx={{
                            width: { xs: '60px', pc: '93px' },
                            height: { xs: '60px', pc: '93px' },
                            marginRight: '20px',
                          }}
                        />
                        <Typography
                          sx={{
                            marginRight: '16px',
                            fontSize: {
                              xs: '24px',
                              pc: '25px',
                            },
                            fontWeight: 600,
                          }}
                        >
                          {userData.nickname}
                        </Typography>
                      </Stack>
                      {userData?.bank ? (
                        <Stack direction="column" marginBottom="30px">
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
                        </Stack>
                      ) : null}
                    </>
                  ) : null}
                  {isMd ? (
                    <>
                      {_renderCard()}
                      {_renderMobile()}
                    </>
                  ) : (
                    _renderDesktop()
                  )}
                </Stack>
              </Grid>
              <Grid item md={4.5} display={{ xs: 'none', md: 'flex' }}>
                {systemInfo?.QRUrl ? (
                  <Box
                    component="img"
                    src={`data:image/*;base64,${systemInfo?.QRUrl}`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '300px',
                      objectFit: 'contain',
                    }}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Nạp tiền" />;
};

export default Recharge;
