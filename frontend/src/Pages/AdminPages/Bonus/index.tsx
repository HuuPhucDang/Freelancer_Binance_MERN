import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { AdminLayout } from '@/Components/DefaultLayout';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { BonusActions } from '@/Reducers/Actions';

const { fetchAllBonus, updateBonus } = BonusActions;

const BankInformation = () => {
  const dispatch = useTypedDispatch();
  const items: any = useSelector((state: RootState) =>
    _.get(state.BONUS, 'items')
  );
  const [updatedItems, setUpdatedItems] = React.useState<any>({});

  React.useEffect(() => {
    dispatch(fetchAllBonus());
  }, []);

  React.useEffect(() => {
    const newItems: any = {};
    _.forEach(items, (item) => {
      newItems[item?.id] = {
        amount: item?.amount,
        bonus: item?.bonus,
      };
    });
    setUpdatedItems(newItems);
  }, [items]);

  const onSave = (id: string) => {
    if (id) {
      dispatch(updateBonus(id, updatedItems[id]));
    }
  };
  const _renderMain = () => {
    return (
      <Stack sx={{ padding: '20px' }} direction="column" rowGap={2}>
        <Typography
          sx={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}
        >
          Thông tin nạp thưởng
        </Typography>
        {_.map(updatedItems, (item: any, index) => {
          return (
            <Grid
              key={index}
              container
              maxWidth="800px"
              spacing={2}
              alignItems="center"
            >
              <Grid item xs={4}>
                <TextField
                  label="Nạp"
                  fullWidth
                  value={item?.amount}
                  type="number"
                  onChange={(e) =>
                    setUpdatedItems({
                      ...updatedItems,
                      [index]: {
                        ...updatedItems[index],
                        amount: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Thưởng"
                  fullWidth
                  value={item?.bonus}
                  type="number"
                  onChange={(e) =>
                    setUpdatedItems({
                      ...updatedItems,
                      [index]: {
                        ...updatedItems[index],
                        bonus: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  fullWidth
                  color="success"
                  onClick={() => onSave(index)}
                >
                  Lưu
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </Stack>
    );
  };
  return (
    <AdminLayout content={_renderMain()} screenTitle="Thông tin nạp thưởng" />
  );
};

export default BankInformation;
