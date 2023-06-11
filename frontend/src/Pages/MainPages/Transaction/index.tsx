import React from 'react';
import { Typography, Grid, Stack, Box, Link } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { UserLayout } from '@/Components/DefaultLayout';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { StocksChart } from '@/Components/LayoutParts';
import TuneIcon from '@mui/icons-material/Tune';
import VolatilityTable from './VolatilityTable';
import CoinValueTable from './CoinValueTable';
import MyInvoiceTable from './MyInvoiceTable';
import StaticHeader from './StaticHeader';
import TradeField from './TradeField';
import { ROUTERS } from '../../../Constants';
import { useTypedDispatch } from '../../../Reducers/store';
import { Utils } from '@/Libs';

const Transaction: React.FC = () => {
  // Constructors
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  const dispatch = useTypedDispatch();
  const volatilityRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const symbol = query.get('symbol');
    if (!symbol) Utils.replace(`${ROUTERS.TRANSACTION}?symbol=BTCUSDT`);
    return () => {
      // clearInterval(intervalLatest24h);
    };
  }, []);

  // Renders

  const _renderLeftSection = () => {
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          borderLeft="1px solid #BBAEAE"
          borderBottom="1px solid #BBAEAE"
        >
          <StaticHeader symbol={query.get('symbol') || 'BTCUSDT'} />
        </Grid>
        <Grid
          item
          xs={12}
          padding="0 !important"
          sx={{ borderLeft: '0.5px solid #BBAEAE' }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={2.5}
              order={{ md: 1, xs: 2 }}
              borderRight="1px solid #ccc"
              padding="0"
              ref={volatilityRef}
              sx={{ maxHeight: 'calc(100vh - 170px) !important' }}
            >
              <VolatilityTable symbol={query.get('symbol') || 'BTCUSDT'} />
            </Grid>
            <Grid item xs={12} md={9.5} order={{ md: 2, xs: 1 }}>
              <Stack direction="column">
                <Stack
                  sx={{
                    width: 1,
                    maxWidth: '100%',
                    height: 'calc(100vh - 408px) !important',
                    background: '#000',
                  }}
                >
                  <StocksChart />
                </Stack>
                <Stack
                  flex={1}
                  padding="5px"
                  sx={{
                    width: 1,
                    '& .MuiInputBase-root:before': {
                      borderBottom: 0,
                    },
                  }}
                >
                  <Grid container columnSpacing={1}>
                    <TradeField />
                  </Grid>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const _renderRightSection = () => {
    return (
      <Stack
        direction="column"
        maxHeight={{
          xs: '100%',
          md: 'calc(100vh - 114px)',
        }}
      >
        <Stack
          direction="column"
          flex={1}
          borderBottom="1px solid #ccc"
          sx={{ maxHeight: '370px' }}
        >
          <CoinValueTable />
        </Stack>
        <Stack
          direction="column"
          flex={1}
          minHeight="300px"
          maxHeight={{
            xs: 'calc(100vh - 484px)',
            md: 'calc(100vh - 480px)',
            lg: 'calc(100vh - 474px)',
          }}
        >
          <Typography
            sx={{
              fontSize: '11px',
              fontWeight: 500,
              textAlign: 'center',
              lineHeight: '13px',
              my: 1,
            }}
          >
            Giao dịch của tôi
          </Typography>
          <MyInvoiceTable />
        </Stack>
      </Stack>
    );
  };

  const _renderBottomSection = () => {
    return (
      <Grid container>
        <Grid item xs={6} sm={6} md={2} order={{ xs: 2, md: 1 }}>
          <Stack padding="10px 10px">
            <Stack
              direction="row"
              alignItems="center"
              borderRight="1px solid #ccc"
            >
              <TapAndPlayIcon
                sx={{
                  marginRight: '10px',
                  color: '#408827',
                  fontSize: '16px',
                }}
              />
              <Typography sx={{ fontSize: '12px', color: '#408827' }}>
                Kết nối ổn định
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={0}
          sm={12}
          md={7}
          order={{ xs: 1, md: 2 }}
          display={{ xs: 'none', sm: 'block' }}
        >
          <Grid container padding="10px 20px">
            <Grid
              item
              xs={1}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              sx={{ fontSize: '11px', color: '#BBAEAE' }}
            >
              <TuneIcon />
            </Grid>
            <Grid
              item
              xs={3.66}
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{ fontSize: '11px', color: '#BBAEAE' }}
            >
              EDUUSDT{' '}
              <span
                style={{
                  color: '#F03030',
                  display: 'inline-block',
                  margin: '0 2px',
                }}
              >
                -1.81
              </span>{' '}
              1.111094
            </Grid>
            <Grid
              item
              xs={3.66}
              display="flex"
              alignItems="center"
              flexDirection="row"
              sx={{ fontSize: '11px', color: '#BBAEAE' }}
            >
              EDUUSDT{' '}
              <span
                style={{
                  color: '#F03030',
                  display: 'inline-block',
                  margin: '0 2px',
                }}
              >
                -1.81
              </span>{' '}
              1.111094
            </Grid>
            <Grid
              item
              xs={3.66}
              display="flex"
              alignItems="center"
              flexDirection="row"
              sx={{ fontSize: '11px', color: '#BBAEAE' }}
            >
              EDUUSDT{' '}
              <span
                style={{
                  color: '#F03030',
                  display: 'inline-block',
                  margin: '0 2px',
                }}
              >
                -1.81
              </span>{' '}
              1.111094
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6} md={3} order={{ xs: 3, md: 3 }}>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-evenly"
            padding="10px 0"
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              borderLeft={{
                xs: 'none',
                md: '1px solid #BBAEAE',
              }}
              paddingLeft="10px"
            >
              <NotificationsIcon
                sx={{
                  fontSize: '16px',
                  marginRight: '6px',
                  color: '#7D6F6F',
                }}
              />
              <Typography
                sx={{ fontSize: '11px', fontWeight: 500, color: '#7D6F6F' }}
              >
                Thông báo
              </Typography>
            </Stack>
            <Link href={ROUTERS.SUPPORT}>
              <Stack flexDirection="row" alignItems="center">
                <MarkChatUnreadIcon
                  sx={{
                    fontSize: '16px',
                    marginRight: '6px',
                    color: '#7D6F6F',
                  }}
                />
                <Typography
                  sx={{ fontSize: '11px', fontWeight: 500, color: '#7D6F6F' }}
                >
                  Hỗ trợ trực tuyến
                </Typography>
              </Stack>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          overflowX: 'hidden',
          mx: 'auto',
        }}
      >
        <Grid
          container
          flex={1}
          display="flex"
          borderTop="1px solid #BBAEAE"
          borderBottom="1px solid #BBAEAE"
        >
          <Grid item xs={12} md={10}>
            {_renderLeftSection()}
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            borderLeft="1px solid #BBAEAE"
            borderRight="1px solid #BBAEAE"
          >
            {_renderRightSection()}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {_renderBottomSection()}
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Giao dịch" />;
};

export default Transaction;
