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
import { CommonStyles } from '@/Components/Common';

const { getSelf } = UserActions;
const { getSystemInfo } = SystemInfoActions;
const { requestRecharge, resetTransactionReducer } = TransactionActions;
const { fetchAllBonus } = BonusActions;

const Recharge: React.FC = () => {
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
    else dispatch(requestRecharge({ amount: amount / enchangeRate }));
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
          sx={{ width: 1, maxWidth: 400 }}
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

  const _renderBonusItem = () => (
    <Grid container gap={2} mt={2} px={4} justifyContent="space-between">
      {_.map(bonusItems, (item, index) => (
        <Grid
          item
          xs={5.5}
          key={index}
          sx={{
            borderRadius: 2,
            background: themeMode === 'dark' ? '#29313C;' : '#D9D9D9',
            color: themeMode === 'dark' ? 'white' : 'black',
            py: 0.5,
          }}
        >
          <Typography sx={{ textAlign: 'center', fontSize: 15 }}>
            ${item?.amount}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: 15,
              color:
                themeMode === 'dark'
                  ? 'rgba(255, 255, 255, 0.26)!important'
                  : '#816A6A!important',
            }}
          >
            + ${item?.bonus} Thưởng
          </Typography>
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
      <Grid item xs={7}>
        <TextField
          fullWidth
          type="number"
          helperText={
            <Box
              sx={{ color: themeMode === 'dark' ? 'white!important' : 'black' }}
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
  );

  const _renderMobile = () => (
    <Stack
      direction="column"
      sx={{
        ...CommonStyles.displayInMobile,
        padding: 2,
      }}
    >
      <Typography
        sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}
      >
        Nạp Tiền
      </Typography>
      <Stack direction="row" alignItems="center" px={2}>
        <Avatar src={userData?.avatar || Assets.persionMobile} sx={{ width: 92, height: 92 }} />
        <Typography
          sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}
        >
          {userData.nickname}
        </Typography>
      </Stack>
      {_renderCard()}
      {_renderBonusItem()}
      <Button
        sx={{
          backgroundColor: 'background.burntSienna',
          color: 'text.secondary',
          textTransform: 'unset',
          height: 60,
          width: 143,
          fontWeight: 500,
          fontSize: '15px',
          marginTop: '22px',
          alignSelf: 'center',
        }}
        onClick={() => onSubmit()}
      >
        Nạp tiền
      </Button>
    </Stack>
  );

  // Constructors
  const renderMain = () => {
    return (
      <>
        {_renderMobile()}
        <Box
          component="main"
          sx={{
            minHeight: 'calc(100vh - 94px)',
            padding: {
              xs: 0,
              // md: '1em 0',
            },
            mx: 'auto',
            // maxWidth: '971px',
            ...CommonStyles.displayInDesktop,
          }}
        >
          <Grid container height="100%">
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
            >
              <Sidebar />
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              borderLeft="1px solid #949494"
              padding="19px 32px 19px 32px"
            >
              <Grid container columnSpacing={3} padding={0}>
                <Grid item xs={12}>
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
                          Nội dung:{' '}
                          <b>
                            tk:{userData?.username} {systemInfo?.message}
                          </b>
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        sx={{
                          height: '39px',
                          fontSize: '12px',
                          paddingLeft: '16px',
                          paddingRight: '16px',
                          marginTop: '30px',
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
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: '12px',
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
      </>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Nạp tiền" />;
};

export default Recharge;
