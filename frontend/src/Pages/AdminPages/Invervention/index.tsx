import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActions,
  Grid,
  TextField,
  Stack,
} from '@mui/material';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { AdminLayout } from '../../../Components/DefaultLayout';

import { Utils } from '@libs';

const Request: React.FC = () => {
  useState<boolean>(false);
  const [coinData, setCoinData] = useState<any>([]);
  const [newIntervention, setNewIntervention] = useState<any>({});
  const [intervention, setIntervention] = useState<any>({});
  const [renderKey, setRenderKey] = useState<number>(Math.random());

  useEffect(() => {
    Utils.WebSocket.emit('getLatestCoins', null, (data: any) => {
      setCoinData(data);
      const newInter: any = {};
      _.forEach(data, (item) => (newInter[item?.symbol] = item?.intervention));
      setNewIntervention(newInter);
      setRenderKey(Math.random());
      setIntervention(newInter);
    });
    Utils.WebSocket.on('updateAllCoinPriceNow', (data) => {
      setCoinData(data);
      const newInter: any = {};
      _.forEach(data, (item) => (newInter[item?.symbol] = item?.intervention));
      setNewIntervention(newInter);
      setRenderKey(Math.random());
    });
    return () => {
      Utils.WebSocket.off('updateAllCoinPriceNow');
      Utils.WebSocket.off('updateAllCoinPriceNow');
      // Utils.WebSocket.disconnect();
    };
  }, []);

  // Events
  const onInteracIntervention = (symbol: any) => {
    Utils.WebSocket.emit('interventionCoin', {
      symbol,
      intervention: 0,
    });
  };

  const onIncreaseDegreeSymbol = (symbol: any, type: 'increase' | 'degree') => {
    const value =
      type === 'increase'
        ? Math.abs(intervention[symbol])
        : -Math.abs(intervention[symbol]);
    Utils.WebSocket.emit('interventionCoin', {
      symbol,
      intervention: value,
    });
    // setIntervention({
    //   ...intervention,
    //   [symbol]: value,
    // });
  };

  // Renders
  const _renderCards = () =>
    _.map(coinData, (item, index) => (
      <Grid item xs={4} key={index}>
        <Card sx={{ maxWidth: 1, borderRadius: '0px' }}>
          <CardHeader
            sx={{
              padding: {
                xs: 0,
                md: '24px',
              },
            }}
            avatar={
              <Avatar
                aria-label="recipe"
                src={item?.icon}
                sx={{ width: { xs: '15px' }, height: { xs: '15px' } }}
              >
                R
              </Avatar>
            }
            title={
              <Typography fontSize={{ xs: 6, pc: 20 }} fontWeight="bold">
                {item?.symbol}
                {item?.intervention < 0 && (
                  <KeyboardDoubleArrowDownIcon color="error" sx={{ ml: 2 }} />
                )}
                {item?.intervention > 0 && (
                  <KeyboardDoubleArrowUpIcon color="success" sx={{ ml: 2 }} />
                )}
              </Typography>
            }
            subheader={
              <Typography fontSize={{ xs: 4, pc: 14 }}>
                {item?.price} ({newIntervention[item?.symbol]})
              </Typography>
            }
          />
          <CardContent
            sx={{
              padding: {
                xs: '0',
                md: '24px',
              },
            }}
          >
            <Stack
              direction="row"
              spacing={{
                xs: '2px',
                md: 2,
              }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                color="error"
                variant="contained"
                size="small"
                onClick={() => onIncreaseDegreeSymbol(item?.symbol, 'degree')}
                sx={{
                  flex: 1,
                  borderRadius: '0px',
                  height: {
                    xs: '10px',
                    md: '45px',
                  },
                  fontSize: {
                    xs: '4px',
                    md: '14px',
                  },
                  width: {
                    xs: '24px',
                    md: 'auto',
                  },
                  minWidth: {
                    xs: '24px',
                    md: 'auto',
                  },
                  textTransform: 'unset',
                }}
              >
                Giảm
              </Button>
              <TextField
                type="number"
                size="small"
                key={`${item?.symbol}${renderKey}`}
                defaultValue={intervention[item?.symbol] || '0.000'}
                onChange={(e) =>
                  setIntervention({
                    ...intervention,
                    [item?.symbol]: parseFloat(e.target.value),
                  })
                }
                sx={{
                  flex: 1,
                  padding: 0,
                  fontSize: { xs: '4px', md: '14px' },
                  input: {
                    fontSize: { xs: '4px', md: '14px' },
                    padding: 0,
                    height: {
                      xs: '13px',
                      md: '45px',
                    },
                  },
                }}
                inputProps={{ step: '0.0001', min: 0 }}
              />
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={() => onIncreaseDegreeSymbol(item?.symbol, 'increase')}
                sx={{
                  flex: 1,
                  borderRadius: '0px',
                  height: {
                    xs: '10px',
                    md: '45px',
                  },
                  fontSize: {
                    xs: '4px',
                    md: '14px',
                  },
                  width: {
                    xs: '24px',
                    md: 'auto',
                  },
                  minWidth: {
                    xs: '24px',
                    md: 'auto',
                  },
                  textTransform: 'unset',
                }}
              >
                Tăng
              </Button>
            </Stack>
          </CardContent>
          <CardActions disableSpacing>
            {intervention?.[item?.symbol] !== 0 && item?.intervention !== 0 && (
              <Button
                color="error"
                onClick={() => onInteracIntervention(item?.symbol)}
                variant="contained"
                fullWidth
              >
                Kết Thúc can thiệp
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    ));

  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column">
        <Typography
          sx={{ fontSize: { xs: '10px', pc: '30px' }, fontWeight: 700 }}
        >
          Can Thiệp
        </Typography>
        <Grid
          container
          marginTop="20px"
          columnSpacing={{
            xs: '10px',
            md: 10,
          }}
          rowSpacing={{
            xs: '20px',
            md: 3,
          }}
          justifyContent="space-between"
        >
          {_renderCards()}
        </Grid>
      </Stack>
    );
  };
  return <AdminLayout content={_renderMain()} screenTitle="Can Thiệp" />;
};

export default Request;
