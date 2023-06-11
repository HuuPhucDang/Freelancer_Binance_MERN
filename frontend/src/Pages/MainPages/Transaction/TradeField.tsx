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
import { UserActions, TradeActions } from '@/Reducers/Actions';

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
  [ENUMS.EUserType.BEGINNER]: [0],
  [ENUMS.EUserType.INTERMEDIATE]: [0, 1],
  [ENUMS.EUserType.ADVANCE]: [0, 1, 2],
  [ENUMS.EUserType.PROFESSINAL]: [0, 1, 2, 3],
};

const LIMIT_PROBABILITY: any = {
  '30s': 0.1,
  '60s': 0.2,
  '120s': 0.3,
  '150s': 0.5,
};

const { getSelf } = UserActions;
const { createTrade } = TradeActions;
enum TRADE_TYPE {
  BUY = 'buy',
  SELL = 'sell',
}
interface ITradeFieldProps {
  symbol: string;
}

const TradeField: React.FC<ITradeFieldProps> = ({
  symbol,
}: ITradeFieldProps) => {
  // Constructors
  const dispatch = useTypedDispatch();
  const isActionLoading = useSelector((state: RootState) =>
    _.get(state.TRADE, 'isFetchLoading')
  );
  const isLogged = useSelector((state: RootState) =>
    _.get(state.AUTH, 'isLogged')
  );
  const userDetails = useSelector((state: RootState) =>
    _.get(state.USER, 'details')
  );
  const [userType, setUserType] = React.useState<string>(
    ENUMS.EUserType.BEGINNER
  );
  const [betTime, setBetTime] = React.useState<string>('30s');
  const [betSellTime, setBetSellTime] = React.useState<string>('30s');
  const [probability, setProbability] = React.useState<number>(
    LIMIT_PROBABILITY[betTime]
  );
  const [sellProbability, setSellProbability] = React.useState<number>(
    LIMIT_PROBABILITY[betSellTime]
  );
  const [ballance, setBallance] = React.useState<number>(0);
  const [betAmount, setBetAmount] = React.useState<number>(0);
  const [betSellAmount, setBetSellAmount] = React.useState<number>(0);
  const [moonbotButtons, setMoonbootButtons] = React.useState<any>([]);
  const [coinPrice, setCoinPrice] = React.useState<number>(0);

  React.useEffect(() => {
    dispatch(getSelf());
    return () => {
      // clearInterval(intervalLatest24h);
    };
  }, []);

  React.useEffect(() => {
    Utils.WebSocket.emit('getAllMoonboot', null, (data: any) => {
      setMoonbootButtons(data);
    });
    Utils.WebSocket.on('updateAllMoonbotNow', (data) => {
      setMoonbootButtons(data);
    });
    const updateCoinPriceInterval = setInterval(() => {
      Utils.WebSocket.emit('getCoinWithSymbol', { symbol }, (data: any) => {
        setCoinPrice(data?.price);
      });
    }, 3000);
    return () => {
      clearInterval(updateCoinPriceInterval);
    };
  }, []);

  React.useEffect(() => {
    const getUserType =
      _.get(userDetails, 'userType.type') || ENUMS.EUserType.BEGINNER;
    const getBanlance = _.get(userDetails, 'wallet.balance') || 0;
    setUserType(getUserType);
    setBallance(getBanlance);
  }, [userDetails]);

  // Events
  const onSetBetTime = (time: string, type: TRADE_TYPE) => {
    if (type === TRADE_TYPE.BUY) {
      if (time !== betTime) {
        setBetTime(time);
        setProbability(LIMIT_PROBABILITY[time]);
      }
    } else {
      if (time !== betSellTime) {
        setBetSellTime(time);
        setSellProbability(LIMIT_PROBABILITY[time]);
      }
    }
  };

  const createNewTrade = (betType: TRADE_TYPE) => {
    let validated = true;
    if (betTime === 'buy') validated = _.includes(LIMIT_BET[userType], betTime);
    else validated = _.includes(LIMIT_BET[userType], betSellTime);
    if (validated) {
      const payload = {
        betPrice: coinPrice,
        betAmount,
        type: betType,
        symbol,
        probability,
        time: betTime,
      };
      dispatch(createTrade(payload));
    }
  };

  // Renders
  const _renderMoonBot = (type: TRADE_TYPE) =>
    _.map(_.filter(moonbotButtons, ['type', type]), (item, index) => (
      <Grid item xs={6} sm={3} md={3} key={`${item?.id}`}>
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
          disabled={!_.includes(LIMIT_BET[userType], index)}
          onClick={() => onSetBetTime(`${item?.time}s`, type)}
        >
          {item?.time}s
        </Button>
      </Grid>
    ));

  const _renderInputs = (type: TRADE_TYPE) => {
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
            onChange={(e) => {
              if (type === TRADE_TYPE.BUY) setBetAmount(Number(e.target.value));
              else setBetSellAmount(Number(e.target.value));
            }}
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
            value={coinPrice}
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
            value={
              type === TRADE_TYPE.BUY
                ? betAmount + betAmount * probability
                : betSellAmount + betSellAmount * sellProbability
            }
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
            value={
              type === TRADE_TYPE.BUY
                ? betAmount - betAmount * probability
                : betSellAmount - betSellAmount * sellProbability
            }
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
        Số dư: {ballance - betAmount - betSellAmount}
      </Typography>
      {_renderInputs(TRADE_TYPE.BUY)}
      <Grid container spacing={0.5} marginTop="5px">
        {_renderMoonBot(TRADE_TYPE.BUY)}
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
        onClick={() => createNewTrade(TRADE_TYPE.BUY)}
      >
        Mua
      </Button>
    </Grid>
  );

  const _renderRightSide = () => (
    <Grid item xs={6}>
      <Typography sx={{ fontSize: '13px', lineHeight: '15px' }}>
        Thời gian: {betTime}
      </Typography>
      {_renderInputs(TRADE_TYPE.SELL)}
      <Grid container spacing={0.5} marginTop="5px">
        {_renderMoonBot(TRADE_TYPE.SELL)}
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
        onClick={() => createNewTrade(TRADE_TYPE.SELL)}
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
