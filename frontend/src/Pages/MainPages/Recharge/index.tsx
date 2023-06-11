import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  OutlinedInput,
  InputAdornment,
  TextField,
} from '@mui/material';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import Assets from '@/Assets';
import {
  SystemInfoActions,
  TransactionActions,
  UserActions,
} from '../../../Reducers/Actions';
import { RootState, useTypedDispatch } from '../../../Reducers/store';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const { getSelf } = UserActions;
const { getSystemInfo } = SystemInfoActions;
const { requestRecharge, resetTransactionReducer } = TransactionActions;

const Recharge: React.FC = () => {
  const dispatch = useTypedDispatch();
  const systemInfo = useSelector((state: RootState) =>
    _.get(state.SYSTEM_INFO, 'payload')
  );
  const requestRechargeSuccess = useSelector((state: RootState) =>
    _.get(state.TRANSACTION, 'requestRechargeSuccess')
  );
  const invalidTypeMsg = 'Số tiền muốn nạp phải có định dạng số';
  const [isErr, setIsErr] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<number>(0);

  React.useEffect(() => {
    dispatch(getSystemInfo());
    dispatch(getSelf());
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
    if (!isNumber) setIsErr(true);
    else dispatch(requestRecharge({ amount }));
  };

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
        <Grid container columnSpacing={4} height="100%">
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
          <Grid item xs={12} md={9.5} borderLeft="1px solid #949494">
            <Grid
              container
              columnSpacing={3}
              padding={{
                xs: '10px',
                md: 0,
              }}
            >
              <Grid item xs={12} md={7.5}>
                <Stack direction="column">
                  <Typography
                    sx={{
                      fontSize: '24px',
                      lineHeight: '34px',
                      fontWeight: 600,
                    }}
                  >
                    Nạp tiền
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      lineHeight: '24px',
                      fontWeight: 400,
                      marginTop: '6px',
                    }}
                  >
                    Nạp tiền qua hệ thống banking ngân hàng
                  </Typography>
                  <Box
                    component="img"
                    src={Assets.qrImage}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      width: '250px',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                  <Stack direction="column" marginTop="24px">
                    <Box
                      sx={{
                        padding: '10px 16px',
                        backgroundColor: 'background.bankCardInformation',
                        borderRadius: '3px',
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
                        Họ và tên người nhận: <b>{systemInfo?.fullname}</b>
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: '12px',
                          marginTop: '2px',
                        }}
                      >
                        Số tài khoản: <b>{systemInfo?.accountNumber}</b>
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: '12px',
                          marginTop: '2px',
                        }}
                      >
                        Ngân hàng: <b> {systemInfo?.bankName}</b>
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: '12px',
                          marginTop: '2px',
                        }}
                      >
                        Nội dung: <b>{systemInfo?.message}</b>
                      </Typography>
                    </Box>
                    <TextField
                      hiddenLabel
                      variant="outlined"
                      size="small"
                      placeholder="Số tiền muốn nạp"
                      sx={{
                        ' .MuiInputBase-root': {
                          background: '#ffffff',
                        },
                      }}
                      type="number"
                      value={amount}
                      onChange={(e: any) => setAmount(e.target.value)}
                      InputProps={{
                        sx: {
                          height: '39px',
                          fontSize: '12px',
                          paddingLeft: '16px',
                          marginTop: '30px',
                          backgroundColor: 'background.chargeInput',
                          color: 'text.primary',
                        },
                        endAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ marginRight: '14px' }}
                          >
                            <Typography
                              sx={{
                                fontSize: '12px',
                                marginLeft: '16px',
                                color: 'text.primary',
                              }}
                            >
                              Tự quy đổi thành: USDT
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      error={isErr}
                      helperText={isErr ? invalidTypeMsg : ''}
                    />
                    <Button
                      sx={{
                        backgroundColor: 'background.burntSienna',
                        color: 'text.secondary',
                        textTransform: 'unset',
                        height: '26px',
                        width: '120px',
                        fontWeight: 400,
                        fontSize: '14px',
                        marginTop: '20px',
                        alignSelf: 'center',
                      }}
                      onClick={() => onSubmit()}
                    >
                      Gửi lệnh
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item md={4.5} display={{ xs: 'none', md: 'flex' }}>
                <Box
                  component="img"
                  src={systemInfo?.QRCode || Assets.qrImage}
                  sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
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
