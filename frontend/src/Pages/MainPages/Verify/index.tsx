import React from 'react';
import {
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  Avatar,
  Divider,
  Box,
} from '@mui/material';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { UploadAvatar, UploadIDCard } from '../../../Components/Popup';

const Verify: React.FC = () => {
  // Constructors
  const [isShowUploadAvatarPopup, setIsShowUploadAvatarPopup] =
    React.useState<boolean>(false);
  const [isShowUploadIDCardPopup, setIsShowUploadIDCardPopup] =
    React.useState<boolean>(false);

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
        <UploadAvatar
          open={isShowUploadAvatarPopup}
          onClose={() => setIsShowUploadAvatarPopup(false)}
        />
        <UploadIDCard
          open={isShowUploadIDCardPopup}
          onClose={() => setIsShowUploadIDCardPopup(false)}
        />
        <Grid container columnSpacing={4}>
          <Grid item md={2.5}>
            <Sidebar />
          </Grid>
          <Grid item md={9.5} borderLeft="1px solid #949494">
            <Stack direction="column">
              <Typography
                sx={{ fontSize: '24px', lineHeight: '34px', fontWeight: 600 }}
              >
                Xác minh
              </Typography>
              <Stack direction="row" marginTop="40px">
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
              <Divider sx={{ margin: '25px 0 5px 0' }} />
              <Stack padding="0 10px">
                <Stack
                  sx={{
                    padding: '20px',
                    backgroundColor: 'background.mainContent',
                  }}
                >
                  <Grid container>
                    <Grid item md={10}>
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
                              fontSize: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.burntSienna',
                              color: 'text.secondary',
                              height: '30px',
                              padding: '0 15px',
                              marginRight: '20px',
                              width: '187px',
                              fontWeight: 400,
                            }}
                            onClick={() => setIsShowUploadIDCardPopup(true)}
                          >
                            Cập nhật thẻ CCCD/CMND
                          </Button>
                          <Button
                            size="small"
                            sx={{
                              fontSize: '10px',
                              textTransform: 'unset',
                              backgroundColor: 'background.burntSienna',
                              color: 'text.secondary',
                              height: '30px',
                              padding: '0 15px',
                              width: '187px',
                              fontWeight: 400,
                            }}
                            onClick={() => setIsShowUploadAvatarPopup(true)}
                          >
                            Cập nhật ảnh chân dung
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item md={2}>
                      <Stack>
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
                            fontSize: '10px',
                            lineHeight: '14px',
                            fontWeight: 400,
                            color: '#7D6F6F',
                            textAlign: 'left',
                            textDecoration: 'underline',
                          }}
                        >
                          Xác minh danh tính
                        </Link>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Xác minh" />;
};

export default Verify;
