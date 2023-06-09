import { outsideEndpointRequest } from '@/Configs';
import { API } from '@/Constants';
const { BINANCE_API } = API;

export const getSinglePrice = async (payload: { symbol: string }) => {
  return outsideEndpointRequest(BINANCE_API.SINGLE_PRICE, 'GET', payload);
};

export const getCandleStick = async (payload: {
  symbol: string;
  interval: string;
}) => {
  return outsideEndpointRequest(BINANCE_API.CANDLE_STICK, 'GET', payload);
};

export const getTopTenCoupleTickers = async (payload: {
  symbols: string[];
}) => {
  return outsideEndpointRequest(BINANCE_API.TEN_COUPLE_TICKERS, 'GET', payload);
};

export const getExchange = async (payload: { symbol: string }) => {
  return outsideEndpointRequest(BINANCE_API.EXCHANGE, 'GET', payload);
};
