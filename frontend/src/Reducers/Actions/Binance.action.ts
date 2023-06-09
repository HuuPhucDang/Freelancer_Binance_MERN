import { ACTION_TYPES } from '@/Constants';
import API from '@/Apis';
import { Utils } from '@libs';

// SINGLE ACTIONS
const setBinanceLoading = (payload: boolean) => {
  return {
    type: ACTION_TYPES.SET_BINANCE_ACTION_LOADING,
    payload,
  };
};

const resetBinanceReducer = () => {
  return {
    type: ACTION_TYPES.RESET_BINANCE_REDUCER,
  };
};

// ASYNC ACTIONS
const getSinglePriceFail = () => {
  return {
    type: ACTION_TYPES.GET_SINGLE_PRICE_FAILURE,
  };
};

const getSinglePriceSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_SINGLE_PRICE_SUCCESS,
    payload,
  };
};

const getSinglePrice = (payload: { symbol: string }) => {
  return async (dispatch: any) => {
    dispatch(setBinanceLoading(true));
    await API.getSinglePrice(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(getSinglePriceFail());
        else {
          dispatch(getSinglePriceSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getSinglePriceFail());
      });
  };
};

const getCandleStickFail = () => {
  return {
    type: ACTION_TYPES.GET_CANDLE_STICK_FAILURE,
  };
};

const getCandleStickSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_CANDLE_STICK_SUCCESS,
    payload,
  };
};

const getCandleStick = (payload: { symbol: string; interval: string }) => {
  return async (dispatch: any) => {
    dispatch(setBinanceLoading(true));
    await API.getCandleStick(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(getCandleStickFail());
        else {
          dispatch(getCandleStickSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getCandleStickFail());
      });
  };
};

const getTopTenCoupleTickersFail = () => {
  return {
    type: ACTION_TYPES.GET_TOP_TEN_COUPLE_TICKERS_FAILURE,
  };
};

const getTopTenCoupleTickersSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_TOP_TEN_COUPLE_TICKERS_SUCCESS,
    payload,
  };
};

const getTopTenCoupleTickers = (payload: { symbols: string[] }) => {
  return async (dispatch: any) => {
    dispatch(setBinanceLoading(true));
    await API.getTopTenCoupleTickers(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(getTopTenCoupleTickersFail());
        else {
          dispatch(getTopTenCoupleTickersSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getTopTenCoupleTickersFail());
      });
  };
};

const getExchangeFail = () => {
  return {
    type: ACTION_TYPES.GET_EXCHANGE_FAILURE,
  };
};

const getExchangeSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.GET_EXCHANGE_SUCCESS,
    payload,
  };
};

const getExchange = (payload: { symbol: string }) => {
  return async (dispatch: any) => {
    dispatch(setBinanceLoading(true));
    await API.getExchange(payload)
      .then(async (response: any) => {
        const results = await Utils.resolveResponse(response);
        if (!results) await dispatch(getExchangeFail());
        else {
          dispatch(getExchangeSuccess(results));
        }
      })
      .catch(async (error) => {
        await Utils.resolveFailureResponse(error);
        await dispatch(getExchangeFail());
      });
  };
};

export default {
  getSinglePrice,
  resetBinanceReducer,
  getCandleStick,
  getTopTenCoupleTickers,
  getExchange,
};
