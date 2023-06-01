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
            <Stack direction="column">
              <Typography
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
              >
                Liên kết tài khoản ngân hàng
              </Typography>

              <Box
                component="form"
                sx={{
                  padding: '20px',
                  backgroundColor: 'background.secondary',
                  marginTop: '30px',
                }}
              >
                <Stack direction="column">
                  <InputLabel
                    sx={{
                      color: 'text.primary',
                      marginBottom: '5px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    Họ và tên
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    placeholder="Họ và tên"
                    sx={{ height: '32px', fontSize: '13px' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <ContactEmergencyIcon sx={{ fontSize: '16px' }} />
                      </InputAdornment>
                    }
                  />
                </Stack>
                <Stack direction="column" marginTop="16px">
                  <InputLabel
                    sx={{
                      color: 'text.primary',
                      marginBottom: '5px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    Số tài khoản
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    placeholder="Họ và tên"
                    sx={{ height: '32px', fontSize: '13px' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <CreditCardIcon sx={{ fontSize: '16px' }} />
                      </InputAdornment>
                    }
                  />
                </Stack>
                <Stack direction="column" marginTop="16px">
                  <InputLabel
                    sx={{
                      color: 'text.primary',
                      marginBottom: '5px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    Ngân hàng
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    placeholder="Họ và tên"
                    sx={{ height: '32px', fontSize: '13px' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountBalanceIcon sx={{ fontSize: '16px' }} />
                      </InputAdornment>
                    }
                  />
                </Stack>
                <Stack direction="column" marginTop="16px">
                  <InputLabel
                    sx={{
                      color: 'text.primary',
                      marginBottom: '5px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    Chi nhánh ngân hàng
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    placeholder="Họ và tên"
                    sx={{ height: '32px', fontSize: '13px' }}
                    startAdornment={
                      <InputAdornment position="start">
                        <CommentBankIcon sx={{ fontSize: '16px' }} />
                      </InputAdornment>
                    }
                  />
                </Stack>
              </Box>
              <Stack direction="row" alignItems="center" padding="16px">
                <GppGoodIcon sx={{ marginRight: '10px' }} />
                <Typography sx={{ fontSize: '13px' }}>
                  Mọi thông tin của bạn đều được bảo mật theo tiêu chuẩn quốc tế
                  PCI DSSDSS
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
                    height: '30px',
                    padding: '0 15px',
                    marginRight: '20px',
                  }}
                >
                  Lưu thông tin
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="Liên kết tài khoản ngân hàng" />;
};

export default ConnectBank;
