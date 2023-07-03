import { Button, Typography, Grid, TextField, Stack } from '@mui/material';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { AdminLayout } from '../../../Components/DefaultLayout';

import { Utils } from '@libs';
import { pushAlert } from '../../../Libs/utils/Widget.utils';

const types = [
  {
    label: 'Mua',
    value: 'buy',
  },
  {
    label: 'Bán',
    value: 'sell',
  },
];

const Request: React.FC = () => {
  const [buttons, setButtons] = React.useState<any[]>([]);

  useEffect(() => {
    Utils.WebSocket.emit('getAllMoonboot', null, (data: any) => {
      setButtons(data);
    });
    Utils.WebSocket.on('updateAllMoonbotNow', (data) => {
      setButtons(data);
    });
    return () => {
      Utils.WebSocket.off('updateAllMoonbotNow');
      // Utils.WebSocket.disconnect();
    };
  }, []);

  // Events
  const onSave = (e: any, id: string) => {
    e.preventDefault();
    const time = e.target.time.value;
    const limitedTime = e.target.limitedTime.value;
    const probability = Number.parseFloat(
      (Number(e.target.probability.value) / 100).toString()
    );
    if (time && limitedTime && probability && id) {
      Utils.WebSocket.emit(
        'updateMoonbot',
        { id, time, limitedTime, probability },
        () => {}
      );
    } else pushAlert({ type: 'error', message: 'Please fill required field!' });
  };

  // Renders
  const _renderCards = (type: string) => {
    const buttonsType = buttons.filter(
      (item: { type: string }) => item.type === type
    );
    return (
      <Grid container columnSpacing={2} rowSpacing={2} marginBottom="20px">
        {_.map(buttonsType, (item, index) => (
          <Grid item xs={12} key={index}>
            <Grid
              container
              columnSpacing={2}
              rowSpacing={2}
              key={index}
              component="form"
              onSubmit={(e: any) => onSave(e, item.id)}
            >
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  label="Thời gian"
                  name="time"
                  key={`time-${index}`}
                  defaultValue={0 || item?.time}
                  required
                  inputProps={{ step: '1' }}
                  sx={{
                    label: {
                      fontSize: {
                        xs: '4px',
                        md: '16px',
                      },
                      top: {
                        xs: '8px',
                        md: '0px',
                      },
                    },
                    input: {
                      fontSize: {
                        xs: '4px',
                        md: '16px',
                      },
                      height: {
                        xs: '0px',
                        md: '43px',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  size="small"
                  name="limitedTime"
                  label="Giới hạn thời gian"
                  key={`limited-time-${index}`}
                  defaultValue={0 || item?.limitedTime}
                  required
                  inputProps={{ step: '1' }}
                  sx={{
                    label: {
                      fontSize: {
                        xs: '4px',
                        md: '16px',
                      },
                      top: {
                        xs: '8px',
                        md: '0px',
                      },
                    },
                    input: {
                      fontSize: {
                        xs: '4px',
                        md: '16px',
                      },
                      height: {
                        xs: '0px',
                        md: '43px',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Rủi Ro"
                  name="probability"
                  key={`probability-${index}`}
                  defaultValue={0 || item?.probability * 100}
                  required
                  inputProps={{ step: '1', max: '100', min: '0' }}
                  InputProps={{
                    inputProps: { step: '1', max: '100', min: '0' },
                  }}
                  onBlur={(e: any) => {
                    if (e.target.value > 100) e.target.value = 100;
                    else if (e.target.value > 0 && e.target.value < 100) {
                      const isNaN = Number.isNaN(Number(e.target.value));
                      if (isNaN) e.target.value = 1;
                      else e.target.value = Math.ceil(e.target.value);
                    } else e.target.value = '';
                  }}
                  sx={{
                    label: {
                      fontSize: {
                        xs: '4px',
                        md: '16px',
                      },
                      top: {
                        xs: '8px',
                        md: '0px',
                      },
                    },
                    input: {
                      padding: 0,
                      fontSize: {
                        xs: '4px',
                        md: '16px',
                      },
                      height: {
                        xs: '0px',
                        md: '43px',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  color="success"
                  variant="contained"
                  fullWidth
                  size="small"
                  onClick={(e) => onSave(e, item?.id)}
                  type="submit"
                  sx={{
                    height: {
                      xs: '16px',
                      md: '60px',
                    },
                    borderRadius: {
                      xs: '4px',
                      md: '0px',
                    },
                    fontSize: {
                      xs: '4px',
                      md: '15px',
                    },
                    transform: {
                      xs: 'translateY(-5px)',
                      md: 'unset',
                    },
                  }}
                >
                  Lưu
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  };

  const _renderMain = () => {
    return (
      <Stack
        sx={{
          padding: {
            xs: '0px',
            md: '20px',
          },
        }}
        direction="column"
      >
        <Typography
          sx={{ fontSize: { xs: '10px', pc: '30px' }, fontWeight: 700 }}
        >
          Chỉnh sửa giá
        </Typography>
        <Grid
          container
          marginTop="20px"
          spacing={2}
          justifyContent="space-between"
        >
          {types.map((item: { label: string; value: string }) => {
            return (
              <Grid item xs={12} key={`item-${item.value}`}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    mb: { xs: '10px', pc: '30px' },
                    fontSize: { xs: '8px', pc: '20px' },
                  }}
                >
                  {item.label}
                </Typography>
                {_renderCards(item.value)}
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    );
  };
  return <AdminLayout content={_renderMain()} screenTitle="Can Thiệp" />;
};

export default Request;
