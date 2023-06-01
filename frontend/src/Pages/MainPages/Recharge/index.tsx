import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  TextField,
} from '@mui/material';
// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import Assets from '@/Assets';

const Recharge: React.FC = () => {
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
        <Grid container>
          <Grid item md={2.5}>
            <Sidebar />
          </Grid>
          <Grid item md={9.5} borderLeft="1px solid #949494">
            <Grid container columnSpacing={4}>
              <Grid item md={8}>
                <Stack direction="column">
                  <Typography
                    sx={{
                      fontSize: '24px',
                      lineHeight: '34px',
                      fontWeight: 600,
                    }}
                  >
                    Nạp tiền
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      lineHeight: '24px',
                      fontWeight: 400,
                    }}
                  >
                    Nạp tiền qua hệ thống banking ngân hàng
                  </Typography>
                  <Stack direction="column" marginTop="24px">
                    <Box
                      sx={{
                        padding: '10px 16px',
                        backgroundColor: 'background.secondary',
                      }}
                    >
                      <Typography sx={{ fontSize: '12px' }}>
                        Họ và tên người nhận:
                      </Typography>
                      <Typography sx={{ fontSize: '12px' }}>
                        Số tài khoản:
                      </Typography>
                      <Typography sx={{ fontSize: '12px' }}>
                        Ngân hàng
                      </Typography>
                      <Typography sx={{ fontSize: '12px' }}>
                        Nội dung
                      </Typography>
                    </Box>
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
                        placeholder="Số tiền muốn nạp"
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
                        Tự quy đổi thành: USDT
                      </Typography>
                    </Stack>
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
                      Gửi lệnh
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item md={4}>
                <Box
                  component="img"
                  src={Assets.qrImage}
                  sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="Nạp tiền" />;
};

export default Recharge;
