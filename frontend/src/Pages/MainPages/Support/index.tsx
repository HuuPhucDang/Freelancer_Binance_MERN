import React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  TextField,
  Divider,
} from '@mui/material';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '../../../Components/LayoutParts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Support: React.FC = () => {
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
            <Stack direction="column">
              <Typography
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
              >
                CSKH trực tuyến
              </Typography>
              <Stack direction="column" marginTop="30px">
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    backgroundColor: 'background.burntSienna',
                    padding: '10px',
                  }}
                >
                  <AccountBoxIcon
                    sx={{ color: '#545454', marginRight: '10px' }}
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
                  backgroundColor: 'background.mainContent',
                  padding: '20px 60px',
                }}
              >
                <Box
                  sx={{
                    padding: '0px 10px 16px 10px',
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
                      <Typography sx={{ fontSize: '14px' }}>10:05</Typography>
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
                      <Typography sx={{ fontSize: '14px' }}>10:04</Typography>
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
                      <Typography sx={{ fontSize: '14px' }}>10:03</Typography>
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
                      <Typography sx={{ fontSize: '14px' }}>10:02</Typography>
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
                      <Typography sx={{ fontSize: '14px' }}>10:01</Typography>
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
                  rows={2}
                  multiline
                  placeholder="Điền nội dung tin nhắn"
                  sx={{
                    marginTop: '10px',
                    background: '#ffffff',
                    borderColor: '#000000',
                    fontSize: '12px',
                    ' *': {
                      color: '#000000',
                      fontSize: '12px',
                    },
                  }}
                />
                <Button
                  sx={{
                    backgroundColor: 'background.burntSienna',
                    color: 'text.secondary',
                    textTransform: 'unset',
                    height: '30px',
                    width: '144px',
                    fontWeight: 600,
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
  return <UserLayout content={renderMain()} screenTitle="CSKH trực tuyến" />;
};

export default Support;
