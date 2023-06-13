import React from 'react';
import { Typography, Grid, Stack, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { UserLayout } from '@/Components/DefaultLayout';
import { StocksChart } from '@/Components/LayoutParts';
import VolatilityTable from './VolatilityTable';
import CoinValueTable from './CoinValueTable';
import MyInvoiceTable from './MyInvoiceTable';
import StaticHeader from './StaticHeader';
import TradeField from './TradeField';
import FooterCoin from './FooterCoin';
import { ROUTERS } from '../../../Constants';
import { Utils } from '@/Libs';

const Transaction: React.FC = () => {
  // Constructors
  const { search } = useLocation();
  const query = new URLSearchParams(search);
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
                    <TradeField symbol={query.get('symbol') || 'BTCUSDT'} />
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
          <FooterCoin />
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Giao dịch" />;
};

export default Transaction;
