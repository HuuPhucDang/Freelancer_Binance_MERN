import React from 'react';
import {
  Container,
  Grid,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from '@mui/material';
// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';

const WithdrawMoney: React.FC = () => {
  // Constructors

  const renderMain = () => {
    return (
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: '1em 0',
          mx: 'auto',
        }}
      >
        <Grid container columnSpacing={2}>
          <Grid item md={3}>
            <Sidebar />
          </Grid>
          <Grid item md={9}>
            <Stack direction="column">
              <Typography
                sx={{
                  fontSize: '24px',
                  lineHeight: '34px',
                  fontWeight: 600,
                }}
              >
                Rút tiền
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  height: '45',
                  width: '100%',
                  marginTop: '20px',
                  backgroundColor: 'background.secondary',
                  padding: '10px',
                }}
              >
                <TextField
                  id="standard-basic"
                  placeholder="Số tiền muốn rút"
                  variant="filled"
                  sx={{
                    flex: 1,
                    input: {
                      padding: '6px 12px 6px 4px',
                      fontSize: '12px',
                    },
                  }}
                />
                <Typography sx={{ fontSize: '12px', marginLeft: '16px' }}>
                  Số dư tài khoản
                </Typography>
              </Stack>
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'text.primary' }}
                >
                  Phương thức nhận tiền
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                ></Select>
              </FormControl>
              <Button
                sx={{
                  backgroundColor: 'background.burntSienna',
                  color: 'text.secondary',
                  textTransform: 'unset',
                  height: '30px',
                  width: '120px',
                  fontWeight: 700,
                  fontSize: '14px',
                  marginTop: '20px',
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
  return <DefaultLayout content={renderMain()} screenTitle="Rút tiền" />;
};

export default WithdrawMoney;
