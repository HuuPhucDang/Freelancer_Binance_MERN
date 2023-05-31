import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  TextField,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import Assets from '@/Assets';
import { Sidebar } from '../../../Components/LayoutParts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Support: React.FC = () => {
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
          <Grid item md={3}>
            <Sidebar />
          </Grid>
          <Grid item md={9}>
            <Stack direction="column">
              <Typography
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
              >
                CSKH trực tuyến
              </Typography>
              <Stack direction="column" marginTop="20px">
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    backgroundColor: 'background.burntSienna',
                    padding: '10px',
                  }}
                >
                  <AccountBoxIcon
                    sx={{ color: 'text.secondary', marginRight: '10px' }}
                  />
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: '20px',
                      fontWeight: 400,
                    }}
                  >
                    Admin
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                direction="column"
                sx={{
                  width: '100%',
                  backgroundColor: 'background.secondary',
                  padding: '20px',
                }}
              >
                <Box
                  sx={{
                    padding: '16px 10px',
                    border: '1px solid #ccc',
                    maxHeight: '260px',
                    overflow: 'auto',
                  }}
                >
                  <Stack direction="column">
                    <Stack direction="row" alignItems="center">
                      <Typography sx={{ fontSize: '14px' }}>
                        You (change name)
                      </Typography>
                      <Divider sx={{ flex: 1, marginLeft: '10px' }} />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        marginLeft: '20px',
                        marginTop: '5px',
                      }}
                    >
                      Bạn cần tôi giúp gì?{' '}
                    </Typography>
                  </Stack>
                  <Stack direction="column" marginTop="16px">
                    <Stack direction="row" alignItems="center">
                      <Typography sx={{ fontSize: '14px' }}>Linh</Typography>
                      <Divider sx={{ flex: 1, marginLeft: '10px' }} />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        marginLeft: '20px',
                        marginTop: '5px',
                      }}
                    >
                      Em cần hỗ trợ....{' '}
                    </Typography>
                  </Stack>
                  <Stack direction="column" marginTop="16px">
                    <Stack direction="row" alignItems="center">
                      <Typography sx={{ fontSize: '14px' }}>
                        You (change name)
                      </Typography>
                      <Divider sx={{ flex: 1, marginLeft: '10px' }} />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        marginLeft: '20px',
                        marginTop: '5px',
                      }}
                    >
                      .........
                    </Typography>
                  </Stack>
                  <Stack direction="column" marginTop="16px">
                    <Stack direction="row" alignItems="center">
                      <Typography sx={{ fontSize: '14px' }}>Linh</Typography>
                      <Divider sx={{ flex: 1, marginLeft: '10px' }} />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        marginLeft: '20px',
                        marginTop: '5px',
                      }}
                    >
                      .........
                    </Typography>
                  </Stack>
                  <Stack direction="column" marginTop="16px">
                    <Stack direction="row" alignItems="center">
                      <Typography sx={{ fontSize: '14px' }}>Linh</Typography>
                      <Divider sx={{ flex: 1, marginLeft: '10px' }} />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        marginLeft: '20px',
                        marginTop: '5px',
                      }}
                    >
                      .........
                    </Typography>
                  </Stack>
                  <Stack direction="column" marginTop="16px">
                    <Stack direction="row" alignItems="center">
                      <Typography sx={{ fontSize: '14px' }}>Linh</Typography>
                      <Divider sx={{ flex: 1, marginLeft: '10px' }} />
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        marginLeft: '20px',
                        marginTop: '5px',
                      }}
                    >
                      .........
                    </Typography>
                  </Stack>
                </Box>
                <TextField
                  rows={3}
                  multiline
                  placeholder="Điền nội dung tin nhắn"
                  sx={{
                    marginTop: '10px',
                    background: '#ffffff',
                    borderColor: '#000000',
                    ' *': {
                      color: '#000000',
                    },
                    '::placeholder': {
                      color: 'rgba(0,0,0,0.5)',
                    },
                  }}
                />
                <Button
                  sx={{
                    backgroundColor: 'background.burntSienna',
                    color: 'text.secondary',
                    textTransform: 'unset',
                    height: '30px',
                    width: '120px',
                    fontWeight: 700,
                    fontSize: '14px',
                    marginTop: '10px',
                    alignSelf: 'flex-end',
                  }}
                >
                  Gửi
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="CSKH trực tuyến" />;
};

export default Support;
