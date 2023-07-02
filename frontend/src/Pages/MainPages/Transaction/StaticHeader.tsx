import React, { useMemo } from 'react';
import {
  Typography,
  Grid,
  Stack,
  // Button,
  IconButton,
  Popover,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Utils } from '@/Libs';
import SsidChartIcon from '@mui/icons-material/SsidChart';
interface IStaticHeaderProp {
  symbol: string;
}

const StaticHeader: React.FC<IStaticHeaderProp> = ({
  symbol,
}: IStaticHeaderProp) => {
  // Constructors
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [latest24h, setLatest24h] = React.useState<any>({});
  const [enchangeRate, setEnchangeRate] = React.useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  React.useEffect(() => {
    Utils.WebSocket.emit('getCoin24h', { symbol }, (data: any) => {
      setLatest24h(data);
    });
    Utils.WebSocket.emit(
      'exchangeCurrency',
      { symbol: 'USDTVND' },
      (data: any) => {
        setEnchangeRate(data || 0);
      }
    );
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
        direction={isSm ? 'column' : 'row'}
        justifyContent="space-evenly"
        alignItems={isSm ? 'flex-start' : 'center'}
        height="100%"
        padding={isSm ? '10px' : '0'}
        spacing={isSm ? '10px' : '0'}
      >
        <Stack direction="column">
          <Typography
            sx={{
              fontSize: {
                xs: '12px',
                pc: '20px',
              },
            }}
          >
            {Number(latest24h?.lastPrice).toFixed(2)}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: '12px',
                pc: '20px',
              },
            }}
          >
            {(enchangeRate * latest24h?.lastPrice || 0).toFixed(2)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography
            sx={{
              fontSize: {
                xs: '10px',
                pc: '20px',
              },
            }}
          >
            Biến động giá 24h
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: '10px',
                pc: '20px',
              },
              color: Number(latest24h?.priceChange) < 0 ? '#C83535' : '#408827',
            }}
          >
            {Number(latest24h?.priceChange).toFixed(2)}{' '}
            {latest24h?.priceChangePercent}%
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography
            sx={{
              fontSize: {
                xs: '10px',
                pc: '20px',
              },
            }}
          >
            Giá cao nhất 24h
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: '10px',
                pc: '20px',
              },
            }}
          >
            {Number(latest24h?.highPrice).toFixed(2)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography
            sx={{
              fontSize: {
                xs: '10px',
                pc: '20px',
              },
            }}
          >
            Giá thấp nhất 24h
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: '10px',
                pc: '20px',
              },
            }}
          >
            {Number(latest24h?.lowPrice).toFixed(2)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography
            sx={{
              fontSize: {
                xs: '10px',
                pc: '20px',
              },
            }}
          >
            KL 24h(EDU)
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: '10px',
                pc: '20px',
              },
            }}
          >
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
      <Grid container height="max-content">
        <Grid item xs={4} md={2.8}>
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
                  fontSize: {
                    xs: '15px',
                    pc: '25px',
                  },
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
        <Grid item xs={8} md={9.2}>
          {isSm ? (
            <Stack
              height="100%"
              alignItems="center"
              flexDirection="row"
              justifyContent="flex-end"
            >
              <IconButton
                aria-describedby={id}
                onClick={handleClick}
                sx={{ marginRight: '10px' }}
              >
                <SsidChartIcon />
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                {_renderStaticHeader}
              </Popover>
            </Stack>
          ) : null}
          {!isSm ? _renderStaticHeader : null}
        </Grid>
      </Grid>
    );
  };

  return renderMain();
};

export default StaticHeader;
