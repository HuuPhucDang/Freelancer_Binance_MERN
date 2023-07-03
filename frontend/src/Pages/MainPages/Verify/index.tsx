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
  useTheme,
  useMediaQuery,
} from '@mui/material';
// Import local
import { UserLayout } from '@/Components/DefaultLayout';
import { Sidebar } from '@/Components/LayoutParts';
import { UploadAvatar, UploadIDCard } from '@/Components/Popup';
import { Utils } from '@/Libs';
import { ROUTERS } from '@/Constants';
import { RootState, useTypedDispatch } from '@/Reducers/store';
import { UserActions } from '@/Reducers/Actions';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const { getSelf } = UserActions;

const Verify: React.FC = () => {
  // Constructors
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useTypedDispatch();
  const userData = Utils.getUserData();
  const details = useSelector((state: RootState) =>
    _.get(state.USER, 'details')
  );
  const [isShowUploadIDCardPopup, setIsShowUploadIDCardPopup] =
    React.useState<boolean>(false);
  const [isShowAvatarPopup, setIsShowAvatarPopup] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(getSelf());
  }, []);

  const _renderUnverifyField = React.useMemo(() => {
    return (
      <Stack direction="column">
        <Typography
          sx={{
            marginTop: {
              xs: '8px',
              md: '30px',
            },
            fontSize: {
              xs: '22px',
              pc: '24px',
            },
            lineHeight: '28px',
            fontWeight: 400,
          }}
        >
          {userData?.verification?.status === 'pending' &&
          userData?.verification?.backImageUrl &&
          userData?.verification?.frontImageUrl &&
          userData?.verification?.selfieImageUrl
            ? 'Danh tính của bạn đang được xác minh!'
            : `${
                userData?.verification?.status === 'denied'
                  ? 'Xác minh của bạn đã bị từ chối. Vui lòng xác minh lại!'
                  : 'Xác minh danh tính của bạn để mua và giao dịch trên Binance.'
              }`}
        </Typography>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          marginTop={{
            xs: '20px',
            pc: '40px',
          }}
          marginBottom={{
            xs: '20px',
            pc: '40px',
          }}
          spacing={{
            xs: '20px',
            md: 'unset',
          }}
        >
          <Button
            size="small"
            sx={{
              fontSize: {
                xs: '20px',
                pc: '18px',
              },
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
              color: 'text.secondary',
              height: { xs: '44px', pc: '63px' },
              padding: '0 15px',
              marginRight: '20px',
              width: {
                xs: '100%',
                pc: '341px',
              },
              fontWeight: 400,
            }}
            disabled={
              userData?.verification?.backImageUrl &&
              userData?.verification?.frontImageUrl &&
              userData?.verification?.status === 'pending'
            }
            onClick={() => setIsShowUploadIDCardPopup(true)}
          >
            Cập nhật thẻ CCCD/CMND
          </Button>
          <Button
            size="small"
            sx={{
              fontSize: {
                xs: '20px',
                pc: '18px',
              },
              textTransform: 'unset',
              backgroundColor: 'background.burntSienna',
              color: 'text.secondary',
              height: { xs: '44px', pc: '63px' },
              padding: '0 15px',
              width: {
                xs: '100%',
                pc: '341px',
              },
              fontWeight: 400,
            }}
            onClick={() => setIsShowAvatarPopup(true)}
            disabled={
              userData?.verification?.selfieImageUrl &&
              userData?.verification?.status === 'pending'
            }
          >
            Cập nhật ảnh chân dung
          </Button>
        </Stack>
      </Stack>
    );
  }, [details]);

  const _renderVerifiedField = () => {
    return (
      <Stack direction="column">
        <Typography
          sx={{
            fontSize: '14px',
            lineHeight: '28px',
            fontWeight: 400,
          }}
        >
          {userData?.verification?.status === 'approved' && (
            <>
              Danh tính của bạn đã được xác minh danh tính. Bạn có thể bắt đầu{' '}
              <Link
                href={ROUTERS.TRANSACTION}
                sx={{ textDecoration: 'underline', color: 'text.primary' }}
              >
                giao dịch trên Binance
              </Link>
              .
            </>
          )}
          {userData?.verification?.status === 'denied' &&
            'Danh tính của bạn đã bị từ chối'}
        </Typography>
      </Stack>
    );
  };

  const _renderDesktopSection = () => {
    return (
      <Stack padding="0 10px">
        <Stack
          sx={{
            padding: '20px',
            backgroundColor: 'background.mainContent',
          }}
        >
          <Grid container>
            <Grid item xs={10}>
              {userData?.verification?.status === 'pending' ||
              userData?.verification?.status === 'denied' ||
              !userData?.verification
                ? _renderUnverifyField
                : _renderVerifiedField()}
            </Grid>
            <Grid
              item
              xs={2}
              marginTop={{
                xs: '20px',
                md: 0,
              }}
            >
              <Stack justifyContent="flex-end">
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      pc: '20px',
                    },
                    lineHeight: '28px',
                    fontWeight: 400,
                  }}
                >
                  FAQ
                </Typography>
                <Link
                  sx={{
                    fontSize: {
                      xs: '10px',
                      pc: '20px',
                    },
                    marginTop: '10px',
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
    );
  };

  const _renderMobileSection = () => {
    return (
      <Stack padding="0 30px">
        <Stack>
          <Grid container>
            <Grid
              item
              xs={12}
              marginTop={{
                xs: '0',
                md: 0,
              }}
            >
              <Stack justifyContent="flex-end">
                <Typography
                  sx={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontWeight: 400,
                  }}
                >
                  FAQ
                </Typography>
                <Link
                  sx={{
                    fontSize: '16px',
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
            <Grid item xs={12}>
              {userData?.verification?.status === 'pending' ||
              userData?.verification?.status === 'denied' ||
              !userData?.verification
                ? _renderUnverifyField
                : _renderVerifiedField()}
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    );
  };

  const renderMain = () => {
    return (
      <Box
        component="main"
        sx={{
          display: 'flex',
          minHeight: {
            xs: 'calc(100vh - 70px)',
            md: 'calc(100vh - 180px)',
          },
          padding: {
            xs: '0',
          },
          margin: {
            xs: 0,
            md: '20px auto 0px auto',
          },
        }}
      >
        <UploadIDCard
          open={isShowUploadIDCardPopup}
          onClose={() => setIsShowUploadIDCardPopup(false)}
        />
        <UploadAvatar
          open={isShowAvatarPopup}
          onClose={() => setIsShowAvatarPopup(false)}
        />
        <Grid container>
          {isMd ? null : (
            <Grid
              item
              xs={12}
              md={2}
              sx={{
                position: {
                  xs: 'sticky',
                  md: 'unset',
                },
                top: '70px',
                backgroundColor: 'background.default',
                zIndex: 1,
              }}
              borderTop="1px solid rgba(187, 174, 174, 0.9)"
            >
              <Sidebar />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={10}
            borderLeft="1px solid #949494"
            padding={{
              xs: '10px',
              pc: '60px 71px',
            }}
            borderTop="1px solid rgba(187, 174, 174, 0.9)"
          >
            <Stack direction="column">
              <Typography
                sx={{
                  fontSize: {
                    xs: '24px',
                    pc: '64px',
                  },
                  lineHeight: {
                    xs: '34px',
                    pc: '70px',
                  },
                  fontWeight: 600,
                  alignSelf: {
                    xs: 'center',
                    md: 'unset',
                  },
                }}
              >
                Xác minh
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                marginTop="40px"
                padding={{ xs: '0 20px', md: 0 }}
              >
                <Avatar
                  src={userData.avatar}
                  sx={{
                    width: { xs: '60px', pc: '93px' },
                    height: { xs: '60px', pc: '93px' },
                    marginRight: '20px',
                  }}
                />
                <Typography
                  sx={{
                    marginRight: '16px',
                    fontSize: {
                      xs: '24px',
                      pc: '25px',
                    },
                    fontWeight: 600,
                  }}
                >
                  {userData.nickname}
                </Typography>
              </Stack>
              <Divider
                sx={{
                  margin: {
                    xs: '4px 0 20px 0',
                    md: '25px 0 5px 0',
                  },
                }}
              />
              {isMd ? _renderMobileSection() : _renderDesktopSection()}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  };
  return <UserLayout content={renderMain()} screenTitle="Xác minh" />;
};

export default Verify;
