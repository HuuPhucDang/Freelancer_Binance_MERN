import React, { useMemo } from 'react';
import { Typography, Grid, Stack } from '@mui/material';
import { Utils } from '@/Libs';

interface IStaticHeaderProp {
  symbol: string;
}

const StaticHeader: React.FC<IStaticHeaderProp> = ({
  symbol,
}: IStaticHeaderProp) => {
  // Constructors
  const [latest24h, setLatest24h] = React.useState<any>({});

  React.useEffect(() => {
    Utils.WebSocket.emit('getCoin24h', { symbol }, (data: any) => {
      setLatest24h(data);
    });
    const intervalLatest24h = setInterval(() => {
      Utils.WebSocket.emit('getCoin24h', { symbol }, (data: any) => {
        setLatest24h(data);
      });
    }, 3000);
    return () => {
      clearInterval(intervalLatest24h);
    };
  }, [symbol]);

  // Renders
  const _renderStaticHeader = useMemo(
    () => (
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        height="100%"
      >
        <Stack direction="column">
          <Typography sx={{ fontSize: '12px' }}>
            {Number(latest24h?.lastPrice).toFixed(4)}
          </Typography>
          <Typography sx={{ fontSize: '12px' }}>$1.1111</Typography>
        </Stack>
        <Stack direction="column">
          <Typography sx={{ fontSize: 10 }}>Biến động giá 24h</Typography>
          <Typography
            sx={{
              fontSize: 10,
              color: Number(latest24h?.priceChange) < 0 ? '#C83535' : '#408827',
            }}
          >
            {Number(latest24h?.priceChange).toFixed(4)}{' '}
            {latest24h?.priceChangePercent}%
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography sx={{ fontSize: 10 }}>Giá cao nhất 24h</Typography>
          <Typography sx={{ fontSize: 10 }}>
            {Number(latest24h?.highPrice).toFixed(4)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography sx={{ fontSize: 10 }}>Giá thấp nhất 24h</Typography>
          <Typography sx={{ fontSize: 10 }}>
            {Number(latest24h?.lowPrice).toFixed(4)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography sx={{ fontSize: 10 }}>KL 24h(EDU)</Typography>
          <Typography sx={{ fontSize: 10 }}>
            {Number(latest24h?.volume).toFixed(4)}
          </Typography>
        </Stack>
      </Stack>
    ),
    [latest24h]
  );

  const renderMain = () => {
    const getUSDT = symbol.substring(symbol.length - 4);
    return (
      <Grid container>
        <Grid item xs={2.5}>
          <Stack
            direction="row"
            sx={{ pr: 1, height: '66px', padding: '10px 4px' }}
          >
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: '100%',
                borderRight: '1px solid #BBAEAE',
              }}
            >
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 600,
                  marginRight: '4px',
                  lineHeight: '18px',
                }}
              >
                {symbol.replace(getUSDT, '/')}
                {getUSDT}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={9.5}>
          {_renderStaticHeader}
        </Grid>
      </Grid>
    );
  };

  return renderMain();
};

export default StaticHeader;
