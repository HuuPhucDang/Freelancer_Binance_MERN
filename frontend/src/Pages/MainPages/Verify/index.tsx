import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  Avatar,
} from '@mui/material';
// Import local
import DefaultLayout from '@/Components/DefaultLayout';
import { Sidebar } from '../../../Components/LayoutParts';

const Verify: React.FC = () => {
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
                Xác minh
              </Typography>
              <Stack direction="row" marginTop="20px">
                <Avatar
                  sx={{ width: '60px', height: '60px', marginRight: '20px' }}
                />
                <Typography
                  sx={{
                    marginRight: '16px',
                    fontSize: '17px',
                    fontWeight: 600,
                  }}
                >
                  Anonymous-User-b5b47p
                </Typography>
              </Stack>
              <Stack
                sx={{
                  padding: '20px',
                  backgroundColor: 'background.secondary',
                  marginTop: '30px',
                }}
              >
                <Grid container>
                  <Grid item md={9}>
                    <Stack direction="column">
                      <Typography
                        sx={{
                          fontSize: '16px',
                          lineHeight: '28px',
                          fontWeight: 400,
                        }}
                      >
                        Xác minh danh tính của bạn để mua và giao dịch trên
                        Binance.
                      </Typography>
                      <Stack direction="row" marginTop="20px">
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
                          Cập nhật thẻ CCCD/CMND
                        </Button>
                        <Button
                          size="small"
                          sx={{
                            fontSize: '12px',
                            textTransform: 'unset',
                            backgroundColor: 'background.burntSienna',
                            color: 'text.secondary',
                            height: '30px',
                            padding: '0 15px',
                          }}
                        >
                          Cập nhật ảnh chân dung
                        </Button>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item md={3}>
                    <Typography
                      sx={{
                        fontSize: '16px',
                        lineHeight: '28px',
                        fontWeight: 400,
                      }}
                    >
                      FAQ
                    </Typography>
                    <Link
                      sx={{
                        fontSize: '11px',
                        lineHeight: '14px',
                        fontWeight: 400,
                        color: 'text.burntSienna',
                        textAlign: 'left',
                        marginTop: '20px',
                      }}
                    >
                      Xác minh danh tính
                    </Link>
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    );
  };
  return <DefaultLayout content={renderMain()} screenTitle="Xác minh" />;
};

export default Verify;
