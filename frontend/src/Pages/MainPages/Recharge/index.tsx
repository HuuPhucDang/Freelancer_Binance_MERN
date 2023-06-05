import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import Assets from '@/Assets';

const Recharge: React.FC = () => {
  // Constructors
  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 'calc(100vh - 94px)',
          padding: '1em 0',
          mx: 'auto',
        }}
      >
        <Grid container columnSpacing={4} height="100%">
          <Grid item md={2.5}>
            <Sidebar />
          </Grid>
          <Grid item md={9.5} borderLeft="1px solid #949494">
            <Grid container columnSpacing={3}>
              <Grid item md={7.5}>
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
                      marginTop: '6px',
                    }}
                  >
                    Nạp tiền qua hệ thống banking ngân hàng
                  </Typography>
                  <Stack direction="column" marginTop="24px">
                    <Box
                      sx={{
                        padding: '10px 16px',
                        backgroundColor: 'background.bankCardInformation',
                        borderRadius: '3px',
                      }}
                    >
                      <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
                        Họ và tên người nhận:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: '12px',
                          marginTop: '2px',
                        }}
                      >
                        Số tài khoản:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: '12px',
                          marginTop: '2px',
                        }}
                      >
                        Ngân hàng:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: '12px',
                          marginTop: '2px',
                        }}
                      >
                        Nội dung:
                      </Typography>
                    </Box>
                    <OutlinedInput
                      type="text"
                      placeholder="Số tiền muốn nạp"
                      sx={{
                        height: '39px',
                        fontSize: '12px',
                        paddingLeft: '16px',
                        marginTop: '30px',
                        backgroundColor: 'background.chargeInput',
                        color: 'text.primary',
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
                    <Button
                      sx={{
                        backgroundColor: 'background.burntSienna',
                        color: 'text.secondary',
                        textTransform: 'unset',
                        height: '26px',
                        width: '120px',
                        fontWeight: 400,
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
              <Grid item md={4.5}>
                <Box
                  component="img"
                  src={Assets.qrImage}
                  sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Nạp tiền" />;
};

export default Recharge;
