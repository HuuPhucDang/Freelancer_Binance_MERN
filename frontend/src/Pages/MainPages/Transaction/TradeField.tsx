import React from 'react';
import {
  Typography,
  Grid,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Box,
  Link,
} from '@mui/material';
import _ from 'lodash';
import { useSelector } from 'react-redux';

import { useTypedDispatch, RootState } from '../../../Reducers/store';
import { Utils } from '@/Libs';
import { ROUTERS, ENUMS } from '@/Constants';
import { UserActions } from '@/Reducers/Actions';

const styleBox = {
  height: '24px',
  width: '100%',
  marginTop: '10px',
  backgroundColor: 'background.secondary',
  padding: '10px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
};
const styleInput = {
  flex: 1,
  input: {
    padding: '6px 12px 6px 4px',
    fontSize: '8px',
  },
  '> ::before': {
    borderBottom: 'none',
  },
  '> ::after': {
    borderBottom: 'none',
  },
};

const LIMIT_BET: any = {
  [ENUMS.EUserType.BEGINNER]: ['30s'],
  [ENUMS.EUserType.INTERMEDIATE]: ['30s', '60s'],
  [ENUMS.EUserType.ADVANCE]: ['30s', '60s', '120s'],
  [ENUMS.EUserType.PROFESSINAL]: ['30s', '60s', '120s', '150s'],
};

const { getSelf } = UserActions;

const TradeField: React.FC = () => {
  // Constructors
  const dispatch = useTypedDispatch();
  const isLogged = useSelector((state: RootState) =>
    _.get(state.AUTH, 'isLogged')
  );
  const userDetails = useSelector((state: RootState) =>
    _.get(state.USER, 'details')
  );
  const [userType, setUserType] = React.useState<string>(
    ENUMS.EUserType.BEGINNER
  );
  const [probability, setProbability] = React.useState<number>(0);
  const [betTime, setBetTime] = React.useState<number>(30);
  const [ballance, setBallance] = React.useState<number>(0);
  const [betAmount, setBetAmount] = React.useState<number>(0);

  React.useEffect(() => {
    dispatch(getSelf());
    return () => {
      // clearInterval(intervalLatest24h);
    };
  }, []);

  React.useEffect(() => {
    const getUserType =
      _.get(userDetails, 'userType.type') || ENUMS.EUserType.BEGINNER;
    const getBanlance = _.get(userDetails, 'wallet.balance') || 0;
    const getProbability = _.get(userDetails, 'userType.probability') || 0;
    setUserType(getUserType);
    setProbability(getProbability);
    setBallance(getBanlance);
  }, [userDetails]);

  // Events
  const onSetBetTime = (time: string) => {
    if (Number(time) !== betTime) setBetTime(Number(time));
  };

  // Renders
  const _renderMoonBot = (type: 'BUY' | 'SELL') =>
    _.map(['30s', '60s', '120s', '160s'], (item, index) => (
      <Grid item xs={6} sm={3} md={3} key={`${item}-${index}${type}`}>
        <Button
          variant="contained"
          sx={{
            fontSize: 9,
            lineHeight: '11px',
            textTransform: 'unset',
            backgroundColor: 'background.newsHeader',
            color: 'text.secondary',
            width: '100%',
            paddingX: '0',
            minWidth: 'unset',
          }}
          disabled={!_.includes(LIMIT_BET[userType], item)}
          onClick={() => onSetBetTime(item.replace('s', ''))}
        >
          {item}
        </Button>
      </Grid>
    ));

  const _renderInputs = (type: 'BUY' | 'SELL') => {
    return (
      <>
        <Box sx={styleBox}>
          <TextField
            placeholder="Số tiền khách bỏ ra để mua/ bán"
            variant="filled"
            type="number"
            sx={styleInput}
            inputProps={{
              step: 0.01,
            }}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: '8px' }}>USDT</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={styleBox}>
          <TextField
            placeholder="Giá ngay thời điểm hiện tại"
            variant="filled"
            sx={styleInput}
            type="number"
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: '8px' }}>USDT</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={styleBox}>
          <TextField
            placeholder="Số tiền thực tế nhận về"
            variant="filled"
            sx={styleInput}
            disabled
            type="number"
            value={betAmount + betAmount * probability}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: '8px' }}>USDT</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={styleBox}>
          <TextField
            placeholder="Số tiền thực tế trả về"
            variant="filled"
            sx={styleInput}
            disabled
            type="number"
            value={betAmount - betAmount * probability}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: '8px' }}>USDT</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </>
    );
  };

  const _renderLeftSide = () => (
    <Grid item xs={6}>
      <Typography sx={{ fontSize: '13px', lineHeight: '15px' }}>
        Số dư: {ballance - betAmount}
      </Typography>
      {_renderInputs('BUY')}
      <Grid container spacing={0.5} marginTop="5px">
        {_renderMoonBot('BUY')}
      </Grid>
      <Button
        color="success"
        variant="contained"
        fullWidth
        size="small"
        sx={{
          marginTop: '10px',
          fontSize: 12,
          fontWeight: 900,
          background: '#2EBD85',
        }}
      >
        Mua
      </Button>
    </Grid>
  );

  const _renderRightSide = () => (
    <Grid item xs={6}>
      <Typography sx={{ fontSize: '13px', lineHeight: '15px' }}>
        Thời gian: {betTime}s
      </Typography>
      {_renderInputs('SELL')}
      <Grid container spacing={0.5} marginTop="5px">
        {_renderMoonBot('SELL')}
      </Grid>
      <Button
        color="error"
        variant="contained"
        fullWidth
        size="small"
        sx={{
          marginTop: '10px',
          fontSize: 12,
          fontWeight: 900,
          background: '#F03030',
        }}
      >
        Bán
      </Button>
    </Grid>
  );

  const _renderRequireLogin = () => (
    <Grid item xs={12}>
      <Typography
        sx={{ fontSize: '13px', lineHeight: '15px', textAlign: 'center' }}
      >
        Vui lòng{' '}
        <Link
          href={ROUTERS.SIGN_IN}
          sx={{ color: 'orange', fontWeight: 'bold' }}
        >
          Đăng Nhập
        </Link>{' '}
        hoặc{' '}
        <Link
          href={ROUTERS.SIGN_UP}
          sx={{ color: 'orange', fontWeight: 'bold' }}
        >
          Đăng ký
        </Link>{' '}
        để sử dụng!
      </Typography>
    </Grid>
  );

  const renderMain = () => {
    return (
      <Stack
        flex={1}
        padding="5px"
        sx={{
          width: 1,
          '& .MuiInputBase-root:before': {
            borderBottom: 0,
          },
          '& .Mui-disabled': {
            background: 'none!important',
          },
        }}
      >
        <Grid container columnSpacing={1}>
          {!isLogged && _renderRequireLogin()}
          {isLogged && _renderLeftSide()}
          {isLogged && _renderRightSide()}
        </Grid>
      </Stack>
    );
  };

  return renderMain();
};

export default TradeField;
