import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Divider,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import GppGoodIcon from '@mui/icons-material/GppGood';
// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';

const ConnectBank: React.FC = () => {
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
        <Grid container columnSpacing={2} height="100%">
          <Grid item md={2.5}>
            <Sidebar />
          </Grid>
          <Grid item md={9.5} borderLeft="1px solid #949494">
            <Stack direction="column" sx={{ paddingRight: '30px' }}>
              <Typography
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
              >
                Liên kết tài khoản ngân hàng
              </Typography>
              <Divider sx={{ marginTop: '6px', marginBottom: '15px' }} />

              <Stack direction="column" paddingRight="30px">
                <Box
                  component="form"
                  sx={{
                    padding: '6px 50px 45px 27px',
                    backgroundColor: 'background.mainContent',
                  }}
                >
                  <Stack direction="column">
                    <InputLabel
                      sx={{
                        color: 'text.primary',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      Họ và tên
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      placeholder="Họ và tên"
                      sx={{
                        height: '32px',
                        fontSize: '13px',
                        fontWeight: 600,
                        background: '#ffffff',
                        color: 'rgba(0,0,0,0.62)',
                      }}
                      startAdornment={
                        <InputAdornment
                          position="start"
                          sx={{ marginRight: '14px' }}
                        >
                          <ContactEmergencyIcon sx={{ fontSize: '18px' }} />
                        </InputAdornment>
                      }
                    />
                  </Stack>
                  <Stack direction="column" marginTop="13px">
                    <InputLabel
                      sx={{
                        color: 'text.primary',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      Số tài khoản
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      placeholder="Số tài khoản"
                      sx={{
                        height: '32px',
                        fontSize: '13px',
                        fontWeight: 600,
                        background: '#ffffff',
                        color: 'rgba(0,0,0,0.62)',
                      }}
                      startAdornment={
                        <InputAdornment
                          position="start"
                          sx={{ marginRight: '14px' }}
                        >
                          <CreditCardIcon sx={{ fontSize: '18px' }} />
                        </InputAdornment>
                      }
                    />
                  </Stack>
                  <Stack direction="column" marginTop="13px">
                    <InputLabel
                      sx={{
                        color: 'text.primary',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      Ngân hàng
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      placeholder="Ngân hàng"
                      sx={{
                        height: '32px',
                        fontSize: '13px',
                        fontWeight: 600,
                        background: '#ffffff',
                        color: 'rgba(0,0,0,0.62)',
                      }}
                      startAdornment={
                        <InputAdornment
                          position="start"
                          sx={{ marginRight: '14px' }}
                        >
                          <AccountBalanceIcon sx={{ fontSize: '18px' }} />
                        </InputAdornment>
                      }
                    />
                  </Stack>
                  <Stack direction="column" marginTop="13px">
                    <InputLabel
                      sx={{
                        color: 'text.primary',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      Chi nhánh ngân hàng
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      placeholder="Chi nhánh ngân hàng"
                      sx={{
                        height: '32px',
                        fontSize: '13px',
                        fontWeight: 600,
                        background: '#ffffff',
                        color: 'rgba(0,0,0,0.62)',
                      }}
                      startAdornment={
                        <InputAdornment
                          position="start"
                          sx={{ marginRight: '14px' }}
                        >
                          <CommentBankIcon sx={{ fontSize: '18px' }} />
                        </InputAdornment>
                      }
                    />
                  </Stack>
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  padding="16px 16px 8px 16px"
                >
                  <GppGoodIcon sx={{ marginRight: '10px', color: '#545454' }} />
                  <Typography sx={{ fontSize: '13px', color: 'text.primary' }}>
                    Mọi thông tin của bạn đều được bảo mật theo tiêu chuẩn quốc
                    tế PCI DSSDSS
                  </Typography>
                </Stack>
                <Stack direction="column" alignItems="flex-end">
                  <Button
                    size="small"
                    sx={{
                      fontSize: '12px',
                      textTransform: 'unset',
                      backgroundColor: 'background.burntSienna',
                      color: 'text.secondary',
                      height: '34px',
                      padding: '0 15px',
                      width: '148px',
                      fontWeight: 600,
                    }}
                  >
                    Lưu thông tin
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    );
  };
  return (
    <DefaultLayout
      content={renderMain()}
      screenTitle="Liên kết tài khoản ngân hàng"
    />
  );
};

export default ConnectBank;
