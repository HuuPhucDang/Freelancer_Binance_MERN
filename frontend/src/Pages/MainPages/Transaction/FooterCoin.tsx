import React from 'react';
import { Typography, Grid, Stack, Link } from '@mui/material';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import TuneIcon from '@mui/icons-material/Tune';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';
import _ from 'lodash';

const FooterCoin: React.FC = () => {
  // Constructors
  const [coinData, setCoinData] = React.useState<any>([]);

  React.useEffect(() => {
    Utils.WebSocket.emit('getLatestCoins', null, (data: any) => {
      setCoinData(data);
    });
    Utils.WebSocket.on('updateAllCoinPriceNow', (data) => {
      setCoinData(data);
    });
    return () => {
      // clearInterval(intervalLatest24h);
    };
  }, []);

  // Renders
  const _renderCoins = () =>
    _.map(coinData, (item: any, index: any) => {
      if (index < 3)
        return (
          <Grid
            item
            xs={3.66}
            display="flex"
            flexDirection="row"
            alignItems="center"
            sx={{ fontSize: '11px', color: '#BBAEAE' }}
          >
            {item?.symbol} {item?.price}
          </Grid>
        );
      return null;
    });

  const renderMain = () => {
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
            {_renderCoins()}
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

  return renderMain();
};

export default FooterCoin;
