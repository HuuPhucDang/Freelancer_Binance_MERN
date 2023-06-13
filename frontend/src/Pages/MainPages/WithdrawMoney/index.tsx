import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
  Grid,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Typography,
  InputAdornment,
  Box,
  MenuItem,
  TextField,
} from '@mui/material';

// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { TransactionActions, UserActions } from '@/Reducers/Actions';
import { Utils } from '@/Libs';

const { getSelf } = UserActions;
const { requestWithdraw, resetTransactionReducer } = TransactionActions;

const WithdrawMoney: React.FC = () => {
  // Constructors
  const userData = Utils.getUserData();
  const dispatch = useTypedDispatch();
  const requestWithdrawSuccess = useSelector((state: RootState) =>
    _.get(state.TRANSACTION, 'requestWithdrawSuccess')
  );
  const errMsg = 'Trường này là bắt buộc';
  const [isErr, setIsErr] = React.useState<boolean>(false);
  const [bank, setBank] = React.useState<string>('');
  const [amount, setAmount] = React.useState<number>(0);
  const [enchangeRate, setEnchangeRate] = React.useState<number>(0);

  React.useEffect(() => {
    dispatch(getSelf());
    Utils.WebSocket.emit(
      'exchangeCurrency',
      { symbol: 'VNDUSDT' },
      (data: any) => {
        setEnchangeRate(data || 0);
      }
    );
  }, []);

  React.useEffect(() => {
    if (requestWithdrawSuccess) {
      setIsErr(false);
      setBank('');
      setAmount(0);
      dispatch(resetTransactionReducer());
    }
  }, [requestWithdrawSuccess]);

  const onSubmit = async () => {
    if (!bank || !amount) setIsErr(true);
    else dispatch(requestWithdraw({ amount }));
  };

  const withdrawMoneyType = React.useMemo(() => {
    const bank = userData?.bank;
    if (bank)
      return (
        <MenuItem value={bank?.id}>
          {bank?.bankName} - {bank?.fullname} - {bank?.accountNumber}
        </MenuItem>
      );
    return <MenuItem disabled>Không có phương thức nhận tiền</MenuItem>;
  }, [userData]);

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
        <Grid container columnSpacing={4}>
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
            <Stack direction="column" sx={{ p: 2 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  lineHeight: '34px',
                  fontWeight: 600,
                }}
              >
                Rút tiền
              </Typography>
              <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                placeholder="Số tiền muốn rút"
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
                    height: '59px',
                    fontSize: '15px',
                    paddingLeft: '22px',
                    marginTop: '40px',
                    backgroundColor: 'background.chargeInput',
                    color: 'text.primary',
                    borderRadius: '3px',
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
                        Tự quy đổi thành: {amount * enchangeRate} VND
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                error={isErr && !amount}
                helperText={isErr ? errMsg : ''}
              />
              <FormControl fullWidth sx={{ marginTop: '20px' }}>
                <InputLabel
                  sx={{
                    paddingLeft: '22px',
                    fontSize: '15px',
                    color: 'text.primary',
                  }}
                >
                  Phương thức nhận tiền
                </InputLabel>
                <Select
                  value={bank}
                  onChange={(event: any) => setBank(event.target.value)}
                  label="Phương thức nhận tiền"
                  sx={{
                    backgroundColor: 'background.chargeInput',
                    color: 'text.primary',
                    borderRadius: '3px',
                    padding: '0 22px',
                    ' >': { borderRadius: '3px' },
                    border: 'none',
                  }}
                >
                  {withdrawMoneyType}
                </Select>
              </FormControl>
              <Button
                sx={{
                  backgroundColor: 'background.burntSienna',
                  color: 'text.secondary',
                  textTransform: 'unset',
                  height: '43px',
                  width: '265px',
                  fontWeight: 500,
                  fontSize: '15px',
                  marginTop: '22px',
                  alignSelf: 'center',
                }}
                disabled={!bank || !amount}
                onClick={() => onSubmit()}
              >
                Rút tiền
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Rút tiền" />;
};

export default WithdrawMoney;
