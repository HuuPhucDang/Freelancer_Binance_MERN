import React from 'react';
import {
  Container,
  Grid,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Typography,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';

const WithdrawMoney: React.FC = () => {
  // Constructors

  const renderMain = () => {
    return (
      <Container
        component="main"
        maxWidth="md"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: '1em 0',
          mx: 'auto',
        }}
      >
        <Grid container columnSpacing={4}>
          <Grid item md={2.5}>
            <Sidebar />
          </Grid>
          <Grid item md={9.5} borderLeft="1px solid #949494">
            <Stack direction="column" sx={{ p: 2 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  lineHeight: '34px',
                  fontWeight: 600,
                }}
              >
                Rút tiền
              </Typography>
              <OutlinedInput
                type="text"
                placeholder="Số tiền muốn rút"
                sx={{
                  height: '59px',
                  fontSize: '15px',
                  paddingLeft: '22px',
                  marginTop: '40px',
                  backgroundColor: 'background.chargeInput',
                  color: 'text.primary',
                  borderRadius: '3px',
                }}
                endAdornment={
                  <InputAdornment position="start">
                    <Typography
                      sx={{
                        fontSize: '12px',
                        marginLeft: '16px',
                        color: 'text.primary',
                      }}
                    >
                      Tự quy đổi thành: USDT
                    </Typography>
                  </InputAdornment>
                }
              />
              <FormControl fullWidth sx={{ marginTop: '20px' }}>
                <InputLabel
                  sx={{
                    paddingLeft: '22px',
                    fontSize: '15px',
                    color: 'text.primary',
                  }}
                >
                  Phương thức nhận tiền
                </InputLabel>
                <Select
                  value=""
                  label="Phương thức nhận tiền"
                  sx={{
                    backgroundColor: 'background.chargeInput',
                    color: 'text.primary',
                    borderRadius: '3px',
                    ' >': { borderRadius: '3px' },
                    border: 'none',
                  }}
                ></Select>
              </FormControl>
              <Button
                sx={{
                  backgroundColor: 'background.burntSienna',
                  color: 'text.secondary',
                  textTransform: 'unset',
                  height: '43px',
                  width: '265px',
                  fontWeight: 500,
                  fontSize: '15px',
                  marginTop: '22px',
                  alignSelf: 'center',
                }}
              >
                Rút tiền
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Rút tiền" />;
};

export default WithdrawMoney;
